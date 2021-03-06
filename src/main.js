import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import httpcommon from "./http-common.js";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.config.productionTip = false;

Vue.prototype.$http = httpcommon;

httpcommon.defaults.timeout = 10000;

httpcommon.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// httpcommon.interceptors.response.use(
//   (response) => {
//     if (response.status === 200 || response.status === 201) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   },
//   (error) => {
//     console.log(error)
//     if (error && error.response && error.response.status) {
//       switch (error.response.status) {
//         case 400:
//           alert("Bad request");
//           break;
//         case 401:
//           alert(error.response.data.message);
//           break;
//         case 403:
//           router.replace({
//             path: "/login",
//             query: { redirect: router.currentRoute.fullPath },
//           });
//           break;
//         case 404:
//           alert("page not exist");
//           break;
//         case 500:
//           alert("Une erreur inconnue s'est produite!");
          
//           break;  
//         case 502:
//           setTimeout(() => {
//             router.replace({
//               path: "/login",
//               query: {
//                 redirect: router.currentRoute.fullPath,
//               },
//             });
//           }, 1000);
//       }
//       return Promise.reject(error.response);
//     }
//   }
// );
