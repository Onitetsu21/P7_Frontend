import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Forum from "../views/Forum.vue";
import Profil from "../views/Profil.vue";
import Signin from "../views/Signin.vue";
import PostDetail from "../views/PostDetail.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Home,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/forum",
    name: "Forum",
    component: Forum,
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetail,
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      allowAnonymous: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnonymous && !JSON.parse(localStorage.getItem("userLog"))) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
