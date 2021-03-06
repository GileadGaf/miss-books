import bookApp from './pages/book-app.js';
import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import { router } from './router.js';
import userMsg from './cmps/user-msg.js';

const options = {
    el: '#app',
    router,
    template: `
        <section>
            <app-header />
            <router-view />
            <user-msg />
            <app-footer />
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        userMsg,
        appFooter
    }
};

const app = new Vue(options);