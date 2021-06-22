export default {
    template: `
       <section   class="review-add"> 
           <form @submit.prevent="submitReview">
               Full name:
               <input ref="readerName" type="text" v-model="review.readerName" />
             <label >
                 <div class="rating">
             Rate the book:
             <span v-for="idx in 5"  @click="saveRate(idx)"  > {{getAStar(idx)}} </span>
         </div>
                   <!-- <select v-model.number="review.rating" >
                       <option value="1">1 </option>
                       <option value="2">2 </option>
                       <option value="3">3 </option>
                       <option value="4">4 </option>
                       <option value="5">5 </option>
                   </select> -->
             </label>
             <label >
                 Read at:
                 <input type="date" v-model="review.readAt"   />
             </label>
             Comments:
             <textarea   cols="30" rows="10" v-model="review.comments" ></textarea>


             <button >Submit</button>
           </form>
         
           
      </section>
    `,
    data() {
        return {
            review: {
                readerName: 'Book Reader',
                rating: 1,
                readAt: null,
                comments: ''
            }
        }
    },
    computed: {


    },
    methods: {
        formatDate() {
            var date = new Date();
            var years = date.getFullYear();
            var months = date.getMonth() + 1;
            var days = date.getDate();
            var timeFormat = years + '-' + (months + '').padStart(2, '0') + '-' + (days + '').padStart(2, '0');
            return timeFormat;
        },

        submitReview() {
            this.$emit('sentReview', this.review);
            this.review = {
                readerName: 'Book Reader',
                rating: 1,
                readAt: null,
                comments: ''
            }
            this.review.readAt = this.formatDate();

        },
        getAStar(idx) {
            console.log(idx + ' ' + this.review.rating);
            if (this.review.rating < idx) return '☆'
            else return '★';
        },
        saveRate(idx) {
            this.review.rating = idx;
        }

    },
    created() {
        this.review.readAt = this.formatDate();
    },
    mounted() {
        const txtReaderName = this.$refs.readerName
        txtReaderName.focus();
        txtReaderName.select();

    }


}