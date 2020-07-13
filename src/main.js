import Vue from 'vue';
import App from './App.vue';
import router from './router';
import httpcommon from './http-common.js';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



Vue.config.productionTip = false;

Vue.prototype.$http = httpcommon; 

httpcommon.defaults.timeout = 10000;

httpcommon.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

httpcommon.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
         
         //do something
          break;
      
        case 401:
          alert("session expired");
          break;        case 403:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });           break;        case 404:
          alert('page not exist');
          break;        case 502:
         setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);