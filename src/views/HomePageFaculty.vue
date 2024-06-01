<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div class="main-content bg-slate-50 flex flex-col items-center">
      <!-- Align this in top -->
      <div class="w-8/12 flex justify-between max-w-7xl p-5 mt-8">
        <!-- Navigation Tab -->
        <div class="flex">
          <button
            @click="setActiveTab('pending')"
            :class="{ 'nav-tab-button-active': activeTab === 'pending' }"
            class="nav-tab-button"
          >
            Pending
          </button>
          <button
            @click="setActiveTab('approved')"
            :class="{ 'nav-tab-button-active': activeTab === 'approved' }"
            class="nav-tab-button"
          >
            Approved
          </button>
          <button
            @click="setActiveTab('declined')"
            :class="{ 'nav-tab-button-active': activeTab === 'declined' }"
            class="nav-tab-button"
          >
            Declined
          </button>
        </div>
        <div class="input-container">
          <div class="input-container-inner">
            <span>
              <font-awesome-icon :icon="['fas', 'search']" class="input-icon" />
            </span>
            <input
              v-model="search"
              maxlength="255"
              type="text"
              id="search-papers"
              placeholder="Search for your papers"
            />
          </div>
        </div>
      </div>

      <!-- Content Based on Active Tab -->
      <div class="mt-8">
        <div v-if="activeTab === 'pending'">
          <div
            v-if="papers.pending.length === 0"
            class="flex flex-col items-center mt-16 text-gray-500"
          >
            <font-awesome-icon
              :icon="['fas', 'stopwatch']"
              size="5x"
              class="text-gray-300 mb-5"
            />
            <p>
              This is where you cane see a list of research papers waiting for
              your approval.
            </p>
          </div>
          <div v-else>
            <!-- Render pending papers -->
            <div
              v-for="paper in papers.pending"
              :key="paper.id"
              class="paper-item"
            >
              {{ paper.title }}
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'approved'">
          <div
            v-if="papers.approved.length === 0"
            class="flex flex-col items-center mt-16 text-gray-500"
          >
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              size="5x"
              class="text-gray-300 mb-5"
            />
            <p>
              This is where you can see a list of research papers you have
              approved.
            </p>
          </div>
          <div v-else>
            <!-- Render approved papers -->
            <div
              v-for="paper in papers.approved"
              :key="paper.id"
              class="paper-item"
            >
              {{ paper.title }}
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'declined'">
          <div
            v-if="papers.declined.length === 0"
            class="flex flex-col items-center mt-16 text-gray-500"
          >
            <font-awesome-icon
              :icon="['fas', 'circle-exclamation']"
              size="5x"
              class="text-gray-300 mb-5"
            />
            <p>
              This is where you can see a list of research papers you have
              declined.
            </p>
          </div>
          <div v-else>
            <!-- Render declined papers -->
            <div
              v-for="paper in papers.declined"
              :key="paper.id"
              class="paper-item"
            >
              {{ paper.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>
<script>
import dataMixins from "@/mixins/DataMixins.js";
import appHeader from "@/components/AppHeader.vue";
import appFooter from "@/components/AppFooter.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
  name: "faculty-page",
  mixins: [dataMixins],
  components: {
    FontAwesomeIcon,
    appHeader,
    appFooter,
  },
  data() {
    return {
      errorMessage: "",
      search: "",
      activeTab: "pending", // Add activeTab state
      papers: {
        // Add papers object to manage the list of research papers
        pending: [],
        approved: [],
        declined: [],
      },
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.fetchPapers(); // Fetch papers based on the active tab
    },
    fetchPapers() {
      // Placeholder method to fetch papers based on activeTab
      // You can replace this with an actual API call
      if (this.activeTab === "pending") {
        this.papers.pending = []; // Example empty list for the pending tab
      } else if (this.activeTab === "approved") {
        this.papers.approved = []; // Example empty list for the approved tab
      } else if (this.activeTab === "declined") {
        this.papers.declined = []; // Example empty list for the declined tab
      }
    },
  },
  mounted() {
    this.fetchPapers(); // Fetch papers when component is mounted
  },
};
</script>

<style scoped>
/* Put CSS style here only if necessary. */
</style>
