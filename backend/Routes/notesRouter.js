const express = require('express');
const notesController = require('../Controllers/notesController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.route('/').get(authController.protect, notesController.getNotes);
router.route('/').post(authController.protect, notesController.createNote);
router.route('/:id').put(authController.protect, notesController.updateNote);
router.route('/:id').delete(authController.protect, notesController.deleteNote);

module.exports = router;
