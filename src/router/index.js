import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Forum from "../views/Forum.vue";
import Profil from "../views/Profil.vue";
import Signin from "../views/Signin.vue";
import PostDetail from "../views/PostDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Home,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/forum",
    name: "Forum",
    component: Forum,
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetail,
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
