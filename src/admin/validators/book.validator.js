const { body, param } = require('express-validator');

exports.validateCreateBook = [
  body('bookName').notEmpty().withMessage('Book name is required'),
  body('category').notEmpty().withMessage('Category is required'),
];

exports.validateAddChapter = [
  param('bookId').notEmpty().withMessage('Book ID is required'),
  body('chapterName').notEmpty().withMessage('Chapter name is required'),
  body('content').notEmpty().withMessage('Content is required'),
];
