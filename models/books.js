const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    bookname:{
        type: String,
        requiured: [true, 'Book name must be provided'],
        maxlength: 20,
    },
    bookauthor: {
        type: String,
        required: [true, 'Author Must be provided'],
    },
    
},{timestamps: true});

module.exports = mongoose.model('books', booksSchema);