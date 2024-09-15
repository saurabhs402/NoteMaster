const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const sendEmail = require("../Utils/email");
const crypto = require("crypto");
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STR, { expiresIn: "1h" });
};

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_STR);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) throw new Error("The user with the given token is not exist");
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, confirmPassword });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Req Body:", req.body);

  try {
    const user = await User.findOne({ email }).select("+password");
    console.log("User:", user);
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async function (req, res) {
  //1.Get the user based on posted email

  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(404)
      .json({ message: "User not find with the given email" });

  // 2.Generate a Random Reset Token

  const resetToken = user.createResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // 3. Send the Token back to the user email

  req.protocol=process.env.BASE_URL_FRONTEND
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;
  const message = `We have received a reset password request.Please use the below link to reset your password\n\n${resetUrl}`;
  console.log(resetUrl);
  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request received",
      message: message,
    });

    res.status(200).json({
      success: "success",
      message: "Password reset link send to the user email.",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({ validateBeforeSave: false });

    console.log("error:",err)
    res.status(500).json({
      message:
        err.message ||
        "There was an error sending password reset email.Please try again later",
    });
  }
};

const resetPassword = async function (req, res) {
  // 1.If the user exits with the given token and token hasn't expired

  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: new Date() },
  });

  if (!user)
    return res.status(400).json({ message: "Token is invalid or expired" });

  try {
    // 2.Resetting the user password
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.createResetPasswordToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now(); // implicit convert timestamp(ms) to date

    await user.save(); //here validation requires

    // 3.Login the user
    res.status(201).json({
      success: "success",
      message: "Password reset successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Password Reset Unsuccessfull",
    });
  }
};

module.exports = {
  protect,
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
};
