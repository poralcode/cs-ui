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
              <p class="headline">Register your account</p>
              <div class="flex items-center space-x-1">
                <p class="sub-headline-2">Already have an account?</p>
                <router-link to="/signin">
                  <button class="btn-text">Sign in here</button>
                </router-link>
              </div>
              <form-registration class="mt-8" />
            </div>
          </div>
          <div class="flex-shrink-0">
            <!-- Right container content goes here -->
            <img :src="doodle_sofa" class="mt-14 ml-5" width="400" alt="Sofa" />
          </div>
        </div>
      </div>
      <!-- End of Main content -->
    </div>
    <app-footer />
  </div>
</template>

<script>
import appHeader from "@/components/AppHeader.vue";
import appFooter from "@/components/AppFooter.vue";
import formRegistration from "@/components/FormRegistration.vue";
import doodle_sofa from "@/assets/images/doodle_sofa.svg";

export default {
  name: "LandingPage",
  components: {
    appHeader,
    appFooter,
    formRegistration,
  },
  data() {
    return {
      doodle_sofa,
    };
  },
};
</script>

<style scoped>
/* Put CSS style here only if necessary. */
</style>
