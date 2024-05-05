<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div class="main-content">
      <!-- Start of Main content -->
      <div class="flex justify-center">
        <div class="w-7/10 flex justify-between max-w-7xl p-5">
          <div class="flex">
            <!-- Left container content goes here -->
            <div>
              <p class="headline">Sign in to your account</p>
              <div class="flex items-center space-x-1">
                <p class="sub-headline-2">Don't have an account yet?</p>
                <router-link to="/register">
                  <button class="btn-text">Register here</button>
                </router-link>
              </div>
              <form-signin class="mt-8" />
            </div>
          </div>
          <div class="flex-shrink-0">
            <!-- Right container content goes here -->
            <img :src="doodle_office" width="500" alt="Office" />
          </div>
        </div>
      </div>
      <!-- End of Main content -->
    </div>
    <app-footer />
  </div>
</template>

<script>
import dataMixins from '@/mixins/DataMixins.js';
import appHeader from "@/components/AppHeader.vue";
import appFooter from "@/components/AppFooter.vue";
import formSignin from "@/components/FormSignin.vue";
import doodle_office from "@/assets/images/doodle_office.svg";

export default {
  name: "LandingPage",
  mixins: [dataMixins],
  components: {
    appHeader,
    appFooter,
    formSignin,
  },
  data() {
    return {
      doodle_office,
    };
  },
};
</script>

<style scoped>
/* Put CSS style here only if necessary. */
</style>
