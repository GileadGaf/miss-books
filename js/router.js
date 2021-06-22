// import carEdit from './pages/car-edit.js';
import bookDetails from './pages/book-details.js';
import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import bookApp from './pages/book-app.js';
import bookAdd from './pages/book-add.js';
import aboutTeam from './cmps/about-team.js';
import aboutServices from './cmps/about-services.js';


const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/add',
        component: bookAdd
    },
    {
        path: '/about',
        component: aboutPage,
        children: [{
                path: 'team',
                component: aboutTeam
            },
            {
                path: 'service',
                component: aboutServices
            },
        ]
    },
    // {
    //     path: '/car/edit/:carId?',
    //     component: carEdit
    // },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = new VueRouter({ routes });