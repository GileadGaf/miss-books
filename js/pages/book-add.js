import { booksService } from '../services/books.service.js';
import { eventBus } from '../services/event-bus-service.js';
import { utilitiesService } from '../services/utilities.service.js';

export default {
    template: `
    <section class="book-add app-main">
        <h3>Add a new book</h3>
      <section>
        <input type="search" placeholder="Type the name of the book" v-model="term" @input="triggerDebounce"  >
      </section>
       <ul class="found-books-list" v-if="books.length">
           <li v-for="(book,idx) in books" :key="book.id" >
        {{book.volumeInfo.title}}    
        <button  @click="saveBook(book,idx)">➕ </button>   
        </li>
    </ul>
    </section>
    `,


    data() {
        return {
            books: [],
            term: null
        };
    },
    created() {

    },
    computed: {

    },
    methods: {
        displayBooks() {
            booksService.getBookFromGoogle(this.term)
                .then(books => {
                    this.books = books;
                })
        },
        saveBook(bookFromGoogle, bookIdx) {
            booksService.formatAndSaveGoogleBook(bookFromGoogle)
                .then(book => {
                    this.books.splice(bookIdx, 1);
                    const msg = {
                        txt: 'The book was successfully added!',
                        type: 'success',
                        linkTitle: 'Check this book out',
                        link: '/book/' + book.id
                    };
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: err,
                        type: 'fail',
                    };
                    eventBus.$emit('show-msg', msg);
                })
        },
        triggerDebounce() {
            utilitiesService.debounce(this.displayBooks)();
        }
    }
};