export default {
    props: ['book'],
    template: `
    <div class="book-preview">
        <img v-if="book.listPrice.isOnSale" src="img/on-sale.png" />
        <h2>{{book.title}}</h2>
        <p>{{displayPrice}}</p>
    </div>
    `,
    computed: {
        displayPrice() {
            const price = this.book.listPrice.amount;
            const currency = this.book.listPrice.currencyCode;
            var bookPrice = new Intl.NumberFormat((currency), { style: 'currency', currency }).format(price);
            return bookPrice;
        },
    }
};