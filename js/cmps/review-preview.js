export default {
    props: ['review'],
    template: `
    <div class="review-preview">
        <h2>By {{review.readerName}}</h2>
        <h3>Rate:{{reviewRating}}</h3>
        <p> {{review.comments}} </p>
    </div>
    `,
    computed: {
        reviewRating() {
            const rating = this.review.rating;
            if (rating === 1) return (rating + ' star');
            return rating + ' stars';




        }
    }
};