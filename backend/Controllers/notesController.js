const Note = require('../Models/note');

// Get all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new note
const createNote = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!title || !description)
            throw Error('Please Enter title and description!!')

        const note = await Note.create({
            user: req.user._id,
            title,
            description,
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const note = await Note.findById(id);

        if (!note || note.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }

        note.title = title || note.title;
        note.description = description || note.description;
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);

        if (!note || note.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }
        console.log(note)

        await note.deleteOne();
        res.status(204).json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote }
