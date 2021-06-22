export default {
    template: `
        <section class="app-main about-page">
            <h2>Miss books was founded at 3021</h2>
            <p> {{renderedString}} </p>
</section>
    `,
    data() {
        return {
            interval: null
        }
    },
    created() {
        this.interval = setInterval(() => {
            console.log(Date.now());
        }, 1000 * 60)
    },
    destroyed() {
        clearInterval(this.interval);
        this.interval = null;
    },
    mounted() {},
    methods: {

    },
    computed: {
        renderedString() {
            return `The Little Miss Books book series by Roger Hargreaves & Adam Hargreaves includes books Little Miss Bossy (Mr. Men and Little Miss),
         Little Miss Naughty (Mr. Men and Little Miss), Little Miss Neat (Mr. Men and Little Miss),
          and several more. See the complete Little Miss Books series book list in order, box sets or omnibus editions, and companion titles`;
        }
    }
}