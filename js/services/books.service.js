import { defaultBooks } from './books.js';
import { storageService } from './async-storage-service.js';
import { utilitiesService } from './utilities.service.js';


const BOOKS_KEY = 'booksCache';
const API_BOOKS = 'apiBooks';

export const booksService = {
    query,
    saveBook,
    removeBook,
    getBookById,
    getPrevNextBookId,
    addReview,
    removeReview,
    getBookFromGoogle,
    formatAndSaveGoogleBook
}


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

function saveBook(book) {
    return storageService.post(BOOKS_KEY, book)
        .then(book => book);
}

function removeBook(bookId) {
    return storageService.remove(BOOKS_KEY, bookId);
}



function getBookById(bookId) {
    return storageService.get(BOOKS_KEY, bookId);
}

function getPrevNextBookId(bookId) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            const idx = books.findIndex(book => book.id === bookId)
            const nextBookId = (idx === books.length - 1) ? books[0].id : books[idx + 1].id
            const prevBookId = (idx === 0) ? books[books.length - 1].id : books[idx - 1].id
            return {
                nextBookId,
                prevBookId
            }
        });
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

function getBookFromGoogle(term) {


    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${term}`;
    return axios.get(url)
        .then(res => res.data.items)
}

function formatAndSaveGoogleBook(book) {
    const { title, subtitle, authors, publishedDate, description, pageCount, categories, language } = book.volumeInfo;
    let thumbnail = '';
    if (book.volumeInfo.imageLinks) thumbnail = book.volumeInfo.imageLinks.thumbnail;
    const formattedBook = {
        id: book.id,
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail,
        language,
        listPrice: {
            amount: 666,
            currencyCode: _getCurrenyCodeByCountry(book.saleInfo.country),
            isForSale: false
        }
    }
    return saveBook(formattedBook);
}

function _getCurrenyCodeByCountry(countryCode) {
    switch (countryCode) {
        case 'IL':
            return 'ILS';


        default:
            break;
    }
}