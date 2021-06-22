import { booksService } from '../services/books.service.js';
import { utilitiesService } from '../services/utilities.service.js';
import bookList from '../cmps/book-list.js';
import bookFilter from '../cmps/book-filter.js'

export default {
    template: `
                <section class="book-app app-main">
                <book-filter @filtered="setFilter"> </book-filter>
                <router-link to="/book/add" class="add-books-link"  >Add books</router-link> 
                 <book-list  :books="booksToShow" @remove="removeBook"></book-list>
                </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
        }
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            booksService.query()
                .then(books => this.books = books);
        },
        removeBook(bookId) {
            booksService.removeBook(bookId)
                .then(() => this.loadBooks())
        },
        setFilter(filterBy) {
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity;
            this.filterBy = filterBy
        },
        isFilterEmpty() {
            return !this.filterBy || (!this.filterBy.title && !this.filterBy.minPrice && this.filterBy.maxPrice === Infinity);
        }
    },
    computed: {
        booksToShow() {
            if (this.filterBy) console.log('this.filterBy booksToShow', this.filterBy);
            if (this.isFilterEmpty()) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter((book, idx) => {
                var bookPrice = book.listPrice.amount;
                const isTitleIncludes = book.title.toLowerCase().includes(searchStr)
                const isInclude = isTitleIncludes &&
                    bookPrice >= this.filterBy.minPrice &&
                    bookPrice <= this.filterBy.maxPrice;
                return isInclude
            });
            console.log('booksToShow', booksToShow);
            return booksToShow;
        }
    },
    components: {
        bookList,
        bookFilter
    }
};