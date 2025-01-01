const { validationResult } = require('express-validator');
const bookService = require('../../services/v1/book.admin.service');

/**
 * Controller to create a book.
 */
exports.createBook = async (req, res) => {
  try {
    // Run validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Call the service function
    const book = await bookService.createBook(req.body, req.file);
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to add a chapter to a book.
 */
exports.addChapter = async (req, res) => {
  try {
    // Run validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the service function
    const chapter = await bookService.addChapter(req.params.bookId, req.body);
    res.status(201).json({ message: 'Chapter added successfully', chapter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to delete a book.
 */
exports.deleteBook = async (req, res) => {
  try {
    // Call the service function
    const result = await bookService.deleteBook(req.params.bookId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to delete a chapter.
 */
exports.deleteChapter = async (req, res) => {
  try {
    // Call the service function
    const result = await bookService.deleteChapter(req.params.chapterId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to edit a book.
 */
exports.editBook = async (req, res) => {
  try {
    // Run validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the service function
    const result = await bookService.editBook(req.params.bookId, req.body, req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to edit a chapter.
 */
exports.editChapter = async (req, res) => {
  try {
    // Run validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the service function
    const result = await bookService.editChapter(req.params.chapterId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
