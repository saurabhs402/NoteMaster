const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const authRouter=require('./Routes/authRouter')
const notesRouter=require('./Routes/notesRouter')


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.all('*', function (req, res, next) {
    res.status(404).json({
        status: 'Fail',
        message: `Can't find ${req.originalUrl} url on the server`
    })
})
module.exports = app