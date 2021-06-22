export default {
    template: `
    <section class="book-filter">
    <h2> Find books by: </h2>
        <label>Title:</label>
        <input v-model="filterBy.title" type="text" @input="filter"  placeholder="Search..."> 

        Price
        From
        <section class="prices-filter">
       <input v-model.number="filterBy.minPrice" type="number" @input="filter"  placeholder="minimum price" />
       to
        <input v-model.number="filterBy.maxPrice" type="number" @input="filter"  placeholder="maximum price" />
      </section>
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: 1000 ** 1000
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
};