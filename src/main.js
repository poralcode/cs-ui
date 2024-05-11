import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import apiRequest from "@/services/APIRequest.js";
import store from "@/services/Store";
import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "@/views/LandingPage.vue";
import SigninPage from "@/views/SigninPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import HomePageStudent from "@/views/HomePageStudent.vue";
import HomePageFaculty from "@/views/HomePageFaculty.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import PaperPage from "@/views/PaperPage.vue";
import BrowsePage from "@/views/BrowsePage.vue";

const routes = [
  { path: "/", name: "home", component: LandingPage },
  { path: "/landing", name: "landing", component: LandingPage },
  { path: "/signin", name: "signin", component: SigninPage },
  { path: "/register", name: "register", component: RegistrationPage },
  { path: "/paper", name: "paper", component: PaperPage },
  { path: "/browse", name: "browse", component: BrowsePage },
  { path: "/student", name: "student", component: HomePageStudent },
  { path: "/faculty", name: "faculty", component: HomePageFaculty },
  { path: "/404", name: "404", component: NotFoundPage },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.userProfile !== null;
  const userType = isLoggedIn ? store.state.userProfile["user-type"] : null;

  // Check if the target route exists
  if (!router.hasRoute(to.name)) {
    next("/404"); // Redirect to 404 page if the route doesn't exist
  } else if (isLoggedIn && to.name === "landing") {
    // If the user is logged in and tries to access the landing page, redirect them to their home page
    next(`/${userType}`);
  } else if (!isLoggedIn && (to.name === "student" || to.name === "faculty")) {
    // If the user tries to access student or faculty page but is not logged in, redirect to sign in page
    next("/signin");
  } else if (
    isLoggedIn &&
    to.name !== userType &&
    to.name !== "browse" &&
    to.name !== "paper"
  ) {
    // If the user tries to access a page that does not match their user type and is not the browse page, redirect to their home page
    next(`/${userType}`);
  } else {
    next();
  }
});

const app = createApp(App);
app.config.globalProperties.$api = apiRequest;
app.use(router).use(store).mount("#app");
