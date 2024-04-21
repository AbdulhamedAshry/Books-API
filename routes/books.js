const express = require('express');
const router = express.Router();
const {addBook, getAllBooks, getSingleBook, deleteBook, updateBook} = require('../controllers/books');

router.route('/').post(addBook).get(getAllBooks);
router.route('/:id').get(getSingleBook).delete(deleteBook).patch(updateBook);

module.exports = router;