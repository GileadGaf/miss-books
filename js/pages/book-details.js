import longText from '../cmps/long-text.js';
import { booksService } from '../services/books.service.js';
import reviewAdd from '../cmps/review-add.js'
import reviewList from '../cmps/review-list.js';
import { eventBus } from '../services/event-bus-service.js';


export default {
    template: `
    <section v-if="book" class="book-details app-main">
        <router-link to="/book" class="back-to-list">Back</router-link>
        
        <main class="book-info" >
          <img :src="book.thumbnail" />
      <h2> {{book.title}}</h2>
        <h3> {{book.subtitle}}</h3>
        <h3 v-if="book.authors"> Authors: {{authors}} </h3>
        <h3 :class="priceColor" >Price: {{displayPrice}}</h3>
        <long-text v-if="book.description" :txt="book.description"> </long-text>
        <h4> No. of pages:{{pagesCount}} </h4> 
        <h4>Publish Date:{{publishedDate}} </h4>
        <img v-if="book.listPrice.isOnSale" src="img/on-sale.png" /> 
        <nav>
            <router-link :to="'/book/' + nextBookId" >Next Book</router-link>
            <router-link :to="'/book/' + prevBookId" >Previous Book</router-link>
        </nav>
</main>
 <review-add @sentReview="addReview" ></review-add>
    <review-list :reviews="getBookReviews" @remove="removeReview" > </review-list>

  
</section>
    `,
    data() {
        return {
            book: null,
            nextBookId: null,
            prevBookId: null
        };
    },
    created() {
        // const { bookId } = this.$route.params;
        // booksService.getBookById(bookId)
        //     .then(book => this.book = book);
    },
    computed: {
        displayPrice() {
            const price = this.book.listPrice.amount;
            const currency = this.book.listPrice.currencyCode;
            var bookPrice = new Intl.NumberFormat((currency), { style: 'currency', currency }).format(price);
            return bookPrice;
        },

        priceColor() {
            const price = this.book.listPrice.amount;
            if (price > 150) return 'red';
            if (price < 20) return 'green';
        },
        pagesCount() {
            const bookPagesCount = this.book.pageCount;
            if (bookPagesCount > 500) {
                return bookPagesCount + ' (Long reading)'
            }
            if (bookPagesCount > 200) {
                return bookPagesCount + ' (Decent reading)'
            }
            return bookPagesCount + ' (Light reading)';
        },
        publishedDate() {
            const currYear = new Date().getFullYear();
            const yearsPssed = currYear - this.book.publishedDate;
            if (yearsPssed > 10) {
                return this.book.publishedDate + ' 🕜Veteran book🕜';
            }
            if (yearsPssed < 1) {
                return this.book.publishedDate + ' 🌟New book!🌟'
            }
            return this.book.publishedDate;
        },
        authors() {
            return this.book.authors ? this.book.authors.join(' and ') : '';
        },

        getBookReviews() {
            return this.book.reviews;


        }
    },

    methods: {
        addReview(review) {
            booksService.addReview(this.book.id, review).then(book => {
                    this.book = book;
                    const msg = {
                        txt: 'Your review was successfully added!',
                        type: 'success',
                        linkTitle: 'Check this book out',
                        link: '/book/' + this.book.id
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
        removeReview(reviewId) {
            booksService.removeReview(this.book.id, reviewId).then(book => {
                this.book = book;
            })
        }
    },
    watch: {
        '$route.params.bookId': {
            immediate: true,
            handler() {
                const { bookId } = this.$route.params;
                booksService.getBookById(bookId)
                    .then(book => this.book = book);
                booksService.getPrevNextBookId(bookId)
                    .then(prevNext => {
                        this.nextBookId = prevNext.nextBookId
                        this.prevBookId = prevNext.prevBookId;
                    });
            },


        }
    },

    components: {
        longText,
        reviewAdd,
        reviewList
    }
};