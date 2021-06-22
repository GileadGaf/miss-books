import reviewPreview from './review-preview.js';

export default {
    props: ['reviews'],
    template: `
    <ul class="review-list clear-list ">
        <li v-for="review in reviews" :key="review.id" class="review-preview-container">
        <button @click.stop="remove(review.id)">✖</button>
        <review-preview :review="review"  />
</li>
    </ul>
    `,
    methods: {
        remove(reviewId) {
            console.log('removing...');
            this.$emit('remove', reviewId);
        },

    },
    components: {
        reviewPreview
    },

};