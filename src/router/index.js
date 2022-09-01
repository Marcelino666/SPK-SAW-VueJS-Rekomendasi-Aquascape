import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Forgot from "../views/Auth/Forgot.vue";
import Reset from "../views/Auth/Reset.vue";
import NotFound from "../views/NotFound.vue";
import Plants from "../views/Plant/Index.vue";
import PlantDetails from "../views/Plant/Detail.vue";
import AddPlant from "../views/Plant/Add.vue";
import EditPlant from "../views/Plant/Edit.vue";
import Criteria from "../views/Criterion/Index.vue";
import Weighting from "../views/Spk/Add.vue";
import SPKDetails from "../views/Spk/Detail.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
  },
  {
    path: "/reset/:token",
    name: "Reset",
    component: Reset,
  },
  {
    path: "/plants",
    name: "Plants",
    component: Plants,
  },
  {
    path: "/plants/add",
    name: "AddPlant",
    component: AddPlant,
  },
  {
    path: "/plants/:id",
    name: "PlantDetails",
    component: PlantDetails,
  },
  {
    path: "/plants/edit/:id",
    name: "EditPlant",
    component: EditPlant,
    props: true,
  },
  {
    path: "/criteria",
    name: "Criteria",
    component: Criteria,
  },
  {
    path: "/weighting",
    name: "Weighting",
    component: Weighting,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/spk/:id",
    name: "SPKDetails",
    component: SPKDetails,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Public Pages
  const publicPages = [
    "Home",
    "Login",
    "Register",
    "Forgot",
    "Reset",
    "NotFound",
  ].includes(to.name);

  // Admin Pages
  const adminPages = [
    "AddPlant", 
    "EditPlant"
  ].includes(to.name);

  // User Pages
  const userPages = [
    "Dashboard",
    "Criteria",
    "SPKDetails",
    "Weighting",
  ].includes(to.name);

  // Middleware Routes
  if (!publicPages && !store.getters["auth/authenticated"]) {
    next({ name: "Login" });
  } else {
    if (adminPages) {
      if (store.getters["auth/admin"]) {
        next();
      } else {
        next("NotFound");
      }
    } else if (userPages) {
      if (!store.getters["auth/admin"]) {
        next();
      } else {
        next("NotFound");
      }
    } else {
      next();
    }
  }
});

export default router;
