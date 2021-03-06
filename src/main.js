import "@babel/polyfill";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import store from './store/index';
import router from "./router";
import "./registerServiceWorker";
import firebase from "firebase";
require("firebase/auth");
import axios from "axios";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

var config = {
  apiKey: "AIzaSyCCOJ2pcMGlxFiGisLXnIT9cbxwsB-UIHI",
  authDomain: "jokenpokemon-893d7.firebaseapp.com",
  databaseURL: "https://jokenpo-61b11.firebaseio.com/",
  projectId: "jokenpokemon-893d7",
  storageBucket: "jokenpokemon-893d7.appspot.com",
  messagingSenderId: "537544646420"
};

firebase.initializeApp(config);

Vue.use(VueMaterial);

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
