import { booksService } from '../services/books.service.js';
import { utilitiesService } from '../services/utilities.service.js';
import bookList from '../cmps/book-list.js';
import bookFilter from '../cmps/book-filter.js'

export default {
    template: `
                <section class="book-app app-main">
                <book-filter @filtered="setFilter"> </book-filter>
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
            this.filterBy = utilitiesService.getDeepCopy(filterBy);
        },
        isFilterEmpty() {
            return !this.filterBy || (!this.filterBy.title && !this.filterBy.minPrice && this.filterBy.maxPrice === Infinity);
        }
    },
    computed: {
        booksToShow() {
            if (this.filterBy) console.log(this.filterBy.maxPrice);
            console.log(this.isFilterEmpty());
            if (this.isFilterEmpty()) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                var bookPrice = book.listPrice.amount;
                return book.title.toLowerCase().includes(searchStr) &&
                    bookPrice >= this.filterBy.minPrice &&
                    bookPrice <= this.filterBy.maxPrice;
            });
            return booksToShow;
        }
    },
    components: {
        bookList,
        bookFilter
    }
};