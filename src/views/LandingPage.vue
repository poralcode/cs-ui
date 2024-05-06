<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div class="main-content">
      <!-- Start of Main content -->
      <div class="flex justify-center">
        <div class="w-7/10 flex justify-between max-w-7xl mt-10 p-5">
          <div class="flex">
            <!-- Left container content goes here -->
            <div>
              <p class="headline">
                Unlock Academic Insights Instantly with Connect Scholar
              </p>
              <p class="sub-headline">
                Effortlessly Unlock Insights, Foster Collaboration, and Stay
                Ahead in Your Academic Pursuits.
              </p>
              <div class="flex items-center space-x-4 mt-8">
                <p class="sub-headline-2">
                  Got any research papers to publish?
                </p>
                <button class="btn-text">Submit it for free</button>
              </div>
              <hr class="mt-10" />
              <p class="font-medium mt-5 mb-5">Latest publish by authors</p>
              <div v-if="isGettingPapers" class="flex mt-9">
                <font-awesome-icon
                  :icon="['fas', 'spinner']"
                  class="spinner text-blue-700"
                  size="3x"
                />
              </div>
              <div class="flex space-x-4">
                <card-item
                  v-for="paper in userPapers"
                  :key="paper.id"
                  :paper="paper"
                  :publicView="true"
                  :showStatus="false"
                />
              </div>
            </div>
          </div>
          <div class="flex-shrink-0">
            <!-- Right container content goes here -->
            <img :src="doodle_books" width="500" alt="Books" />
          </div>
        </div>
      </div>
      <!-- End of Main content -->
    </div>
    <app-footer class="mt-5" />
  </div>
</template>

<script>
import appHeader from "@/components/AppHeader.vue";
import appFooter from "@/components/AppFooter.vue";
import cardItem from "@/components/CardItem.vue";
import doodle_books from "@/assets/images/doodle_books.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
  name: "LandingPage",
  components: {
    appHeader,
    appFooter,
    cardItem,
    FontAwesomeIcon,
  },
  data() {
    return {
      doodle_books,
      userPapers: null,
      isGettingPapers: false,
    };
  },
  mounted() {
    this.getPapers();
  },
  methods: {
    async getPapers() {
      this.isGettingPapers = true;
      try {
        const response = await this.$api.getPapers(3, "default", "approved");
        if (response.data["is-success"])
          this.userPapers = response.data["user-papers"];
        else this.errorMessage = response.data.message;
      } catch (error) {
        this.errorMessage = "Unable to retrieve list of user papers.";
        console.error(error);
      } finally {
        this.isGettingPapers = false;
      }
    },
  },
};
</script>

<style scoped>
/* Put CSS style here only if necessary. */
</style>
