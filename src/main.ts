import Vue from "vue";
import VueCurrencyFilter from "vue-currency-filter";
import VueMoment from "vue-moment";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueMoment);
Vue.use(VueCurrencyFilter, {
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
