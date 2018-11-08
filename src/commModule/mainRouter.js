import Vue from 'vue';
import "scss/base.scss";
import App from './App';
import Router from "vue-router"
import routes from "./router/router.config"
Vue.use(Router);
const router  = new Router(routes);
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});