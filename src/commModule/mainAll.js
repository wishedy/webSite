import Vue from 'vue';
import "scss/base.scss";
import store from "./store/store.js"
import App from './App';
import Router from "vue-router"
import routes from "./router/router.config"
Vue.use(Router);
const router  = new Router(routes);
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
