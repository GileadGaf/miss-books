export default {
    props: ['txt'],
    template: `
    <div class="long-text">
       <section>
           <p>{{displayText}}</p>
           <div v-if="txt.length>100">
              <button @click="toggleTextDisplay" >{{buttonTxt}}</button>                   
           </div>
      </section>
    </div>
    `,
    data() {
        return {
            isShowingFullText: false
        }
    },
    methods: {
        toggleTextDisplay() {
            this.isShowingFullText = !this.isShowingFullText;
        }
    },
    computed: {
        displayText() {
            if (this.isShowingFullText) {
                return this.txt;
            }
            return (this.txt.substring(0, 100) + '...');
        },
        buttonTxt() {
            return (this.isShowingFullText) ? 'Read less' : 'Read more...';
        }
    }
};