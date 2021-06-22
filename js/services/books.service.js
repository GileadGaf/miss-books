import { defaultBooks } from './books.js';
import { storageService } from './async-storage-service.js';
import { utilitiesService } from './utilities.service.js';


const BOOKS_KEY = 'booksCache';

export const booksService = {
    query,
    removeBook,
    getBookById,
    addReview,
    removeReview
}


const gBooks = defaultBooks;

//getBooks()
function query() {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (!books.length) {
                //defaults books will be added once the shop is empty without even a refresh
                const defBooks = defaultBooks;
                storageService.postMany(BOOKS_KEY, defBooks)
                return defBooks;
            }
            return books;

        })
}

function removeBook(bookId) {
    return storageService.remove(BOOKS_KEY, bookId);
}

function getBookById(bookId) {
    return storageService.get(BOOKS_KEY, bookId);
}

function addReview(bookId, review) {
    review.id = utilitiesService.makeId();
    return getBookById(bookId).then(book => {
        if (!book.reviews) book.reviews = [];
        book.reviews.push(review);
        return storageService.put(BOOKS_KEY, book);
    })
}

function removeReview(bookId, reviewId) {
    return getBookById(bookId)
        .then(book => {
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId);
            if (reviewIdx === -1) return Promise.reject('Failed to find the review!');
            book.reviews.splice(reviewIdx, 1);
            return storageService.put(BOOKS_KEY, book);
        })
}