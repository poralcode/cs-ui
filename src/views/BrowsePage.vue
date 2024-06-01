<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div class="main-content bg-slate-50 flex flex-col items-center">
      <!-- Align this in top -->
      <div class="w-9/12 flex justify-between max-w-7xl p-5 space-x-6">
        <!-- Filter Elements -->
        <div class="w-3/12 p-5">
          <div class="flex justify-between items-center">
            <p class="sub-headline-5 ml-1 mb-5 mt-4">Filter</p>
          </div>
          <!-- Filter Ratings -->
          <p class="filter-heading ml-1">Ratings</p>
          <div class="flex justify-between">
            <button class="btn-icon" @click="dismissErrorMessage">
              <font-awesome-icon
                :icon="['far', 'star']"
                class="error-icon text-orange-500"
              />
            </button>
            <button class="btn-icon" @click="dismissErrorMessage">
              <font-awesome-icon
                :icon="['far', 'star']"
                class="error-icon text-orange-500"
              />
            </button>
            <button class="btn-icon" @click="dismissErrorMessage">
              <font-awesome-icon
                :icon="['far', 'star']"
                class="error-icon text-orange-500"
              />
            </button>
            <button class="btn-icon" @click="dismissErrorMessage">
              <font-awesome-icon
                :icon="['far', 'star']"
                class="error-icon text-orange-500"
              />
            </button>
            <button class="btn-icon" @click="dismissErrorMessage">
              <font-awesome-icon
                :icon="['far', 'star']"
                class="error-icon text-orange-500"
              />
            </button>
          </div>
          <!-- Filter Likes -->
          <p class="filter-heading ml-1 mt-5">Likes</p>
          <!-- Filter Readers -->
          <p class="filter-heading ml-1 mt-5">Readers</p>
          <!-- Filter Authors -->
          <p class="filter-heading ml-1 mt-5">Authors</p>
          <div class="input-container mt-2">
            <div class="input-container-inner">
              <span>
                <font-awesome-icon
                  :icon="['fas', 'search']"
                  class="input-icon"
                />
              </span>
              <input
                v-model="search"
                maxlength="255"
                type="text"
                id="search-authors"
                placeholder="Search for authors"
              />
            </div>
          </div>
        </div>
        <!-- Cards Elements -->
        <div class="w-full p-5 flex flex-col">
          <div class="mb-8" v-if="errorMessage">
            <p class="notice-error">
              <font-awesome-icon
                :icon="['fas', 'circle-exclamation']"
                class="error-icon ml-2 mr-3"
              />{{ errorMessage }}
              <button class="btn-icon" @click="dismissErrorMessage">
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  class="error-icon ml-5 mr-2"
                />
              </button>
            </p>
          </div>

          <div v-if="isGettingPapers" class="flex w-full justify-center mt-9">
            <font-awesome-icon
              :icon="['fas', 'spinner']"
              class="spinner text-blue-700"
              size="3x"
            />
          </div>

          <div
            v-if="!isGettingPapers"
            class="flex justify-between items-center"
          >
            <p class="sub-headline-3">Find Papers</p>
            <div class="flex justify-end items-center space-x-3">
              <span class="text-gray-500 font-medium text-sm">View</span>
              <button class="btn-icon">
                <!-- Grid icon in fontawesome is not free, I have to create my own. -->
                <div class="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div class="bg-black rounded-sm"></div>
                  <div class="bg-black rounded-sm"></div>
                  <div class="bg-black rounded-sm"></div>
                  <div class="bg-black rounded-sm"></div>
                </div>
              </button>
              <button class="btn-icon">
                <font-awesome-icon
                  :icon="['fas', 'list']"
                  class="input-icon-2 text-gray-500"
                />
              </button>
            </div>
          </div>

          <div
            v-if="!isGettingPapers"
            class="grid grid-cols-4 gap-y-8 gap-4 mt-5"
          >
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
      <!-- Show this only if there are multiple items. -->
      <div class="w-9/12 flex max-w-7xl p-5 mb-8 justify-end hidden">
        <p class="headline-3 border">This is navigation page</p>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import appHeader from "@/components/AppHeader.vue";
import appFooter from "@/components/AppFooter.vue";
import cardItem from "@/components/CardItem.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
library.add(far);

export default {
  name: "paper",
  components: {
    appHeader,
    appFooter,
    cardItem,
    FontAwesomeIcon,
  },
  data() {
    return {
      isGettingPapers: false,
      errorMessage: "",
      search: "",
      userPapers: null,
      paper: null,
      filter: null,
      searchQueryFromRoute: this.$route.query.q || "",
    };
  },
  mounted() {
    this.getPapers();
  },
  methods: {
    async getPapers() {
      this.isGettingPapers = true;
      try {
        const response = this.searchQueryFromRoute
          ? await this.$api.searchPaper(
              this.searchQueryFromRoute,
              "approved",
              this.filter
            )
          : await this.$api.getPapers(50, "default", "approved");
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
