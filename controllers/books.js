const Books = require('../models/books');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError} = require('../errors/notfounderror');
const {CustomAPIError} = require('../errors/customapierror');

const addBook = async (req, res) => {
    const book = await Books.create(req.body);
    res.status(StatusCodes.CREATED).json({book});
};

const getAllBooks = async (req, res) => {
    const books = await Books.find(req.body);
    res.status(StatusCodes.OK).json({books});
};

const getSingleBook = async (req, res) => {
    const {params: {id: bookId}} = req;
    const book = await Books.findOne({_id: bookId});

    if(!book){
        throw new NotFoundError(`No Book with id: ${bookId}`);
    }
    res.status(StatusCodes.OK).json({book});
};

const deleteBook = async (req, res) => {
    const {params: {id: bookId}} = req;
    const book = await Books.findByIdAndDelete({_id: bookId});

    if(!book){
        throw new NotFoundError(`No Book with id: ${bookId}`);
    }

    res.status(StatusCodes.OK).json({book});
};

const updateBook = async (req, res) => {
    const{params: {id: bookId},
    body: {bookauthor, bookname}} = req;

    if(bookauthor === '' || bookname === ''){
        throw new CustomAPIError('Author, name mustn\'t be empty');
    }

    const book = await Books.findByIdAndUpdate({_id: bookId}, req.body, {new: true, runValidators: true});

    if(!book){
        throw new NotFoundError(`No Book with id: ${bookId}`);
    }

    res.status(StatusCodes.OK).json({book});
};

module.exports = {
    addBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    updateBook
};