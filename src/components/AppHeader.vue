<template>
  <header class="app-header" :class="{ 'shadow-md': isScrolling }">
    <div class="flex w-9/12 max-w-7xl">
      <!-- Logo -->
      <div class="app-header-left-container">
        <router-link to="/">
          <img :src="logo" alt="Logo" />
        </router-link>
      </div>

      <!-- Search Bar -->
      <div
        class="app-header-middle-container"
        v-if="
          $route.name !== 'signin' &&
          $route.name !== 'register' &&
          $route.name !== 'student'
        "
      >
        <div class="main-search-bar">
          <span>
            <font-awesome-icon :icon="['fas', 'search']" class="input-icon" />
          </span>
          <input type="text" placeholder="Search topics or authors" />
        </div>
      </div>

      <!-- Register & Sign In Buttons -->
      <div
        class="app-header-right-container"
        v-if="
          !isLoggedIn && $route.name !== 'signin' && $route.name !== 'register'
        "
      >
        <router-link to="/register">
          <button class="btn-border">Register</button>
        </router-link>
        <router-link to="/signin">
          <button class="btn-normal">Sign In</button>
        </router-link>
      </div>

      <div
        class="app-header-right-container items-center"
        :class="{
          'w-full': $route.name === 'student' || $route.name === 'faculty',
        }"
        v-if="isLoggedIn"
      >
        <router-link to="/browse">
          <button
            v-if="$route.name !== 'browse' && $route.name !== 'paper'"
            class="btn-normal"
          >
            <font-awesome-icon
              :icon="['fas', 'search']"
              class="input-icon-2"
            />Find Papers
          </button>
        </router-link>
        <button class="btn-border-bottom">Dashboard</button>
        <router-link to="/browse">
          <button class="btn-none-bg">
            <span>Account</span
            ><img
              class="avatar-small"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLGd54hSGC4Ig1fZ4ahKQ2H9Ne_-uGP93fJ4TWrHj3rQ&s"
            />
          </button>
        </router-link>
      </div>
    </div>
  </header>
</template>
<script>
import dataMixins from "@/mixins/DataMixins.js";
import logo from "@/assets/images/logo.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
  name: "app-header",
  mixins: [dataMixins],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      logo,
      isScrolling: false,
    };
  },
  methods: {
    scroll() {
      this.isScrolling = window.scrollY > 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
};
</script>
<style scoped>
/* Put CSS style here only if necessary. */
</style>
