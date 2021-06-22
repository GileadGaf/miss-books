import bookPreview from './book-preview.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list">
  
        <li v-for="book in books" :key="book.id" class="book-preview-container">
        <router-link :to="'/book/'+book.id">
        <section class="book-container">
        <button @click.prevent="remove(book.id)">✖</button>
        <book-preview :book="book"  />
        </section>
    </router-link>
</li>
    </ul>
    `,
    methods: {
        remove(bookId) {
            var isAccepted = confirm('Are you sure you want to remove this book?')
            if (!isAccepted) return;
            console.log('removing...');
            this.$emit('remove', bookId);
        },

    },
    components: {
        bookPreview
    },


};