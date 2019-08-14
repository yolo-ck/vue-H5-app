// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MintUI from 'mint-ui';
// import Vue from 'vue'
import 'mint-ui/lib/style.css';
import VueRouter from 'vue-router';
// import $ from 'jquery'
import '../static/fonts/iconfont.css';


import axios from 'axios';
import store from './store/store.js';
import Vuex from 'vuex';
import global from './data/global';
import Cube from 'cube-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import '../static/css/ios/global.css';

Vue.prototype.GLOBAL = global;

Vue.use(Vuex)
//设置axios为form-data
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// axios.defaults.headers.get["Content-Type"] =
//   "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [
  function (data) {
    let ret = "";
    for (let it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  }
];
Vue.prototype.$http = axios
// import MobileSelect from 'mobile-select'
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MintUI);


Vue.use(Cube)

Vue.use(Vant);


const isProd = process.env.NODE_ENV === 'production'


if (isProd) {


  document.addEventListener('deviceready', function () {


    StatusBar.styleLightContent();
    // StatusBar.backgroundColorByHexString("#B53535");
    // StatusBar.overlaysWebView(false);
    Keyboard.hideFormAccessoryBar(true);
    // Keyboard.shrinkView(false);


    // if(devive)

    new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    })
  })

} else {


  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App
    },
    template: '<App/>'
  })
}


document.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, isPassive() ? {
  capture: false,
  passive: false
} : false);

function isPassive() {
  var supportsPassiveOption = false;
  try {
    addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassiveOption = true;
      }
    }));
  } catch (e) {}
  return supportsPassiveOption;
}
