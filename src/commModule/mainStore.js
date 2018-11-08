import Vue from 'vue';
import "scss/base.scss";
import store from "./store/store.js"
import App from './App';
new Vue({
    el: '#app',
    store,
    render: h => h(App)
});