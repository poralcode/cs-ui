<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div class="main-content bg-slate-50 flex flex-col items-center">
      <!-- Align this in top -->
      <div class="w-8/12 flex justify-between max-w-7xl p-5 mt-8">
        <!-- Navigation Tab -->
        <div class="flex">
          <button
            @click="activeTab = 'pending'"
            :class="{ 'nav-tab-button-active': activeTab === 'pending' }"
            class="nav-tab-button"
          >
            Pending
          </button>
          <button
            @click="activeTab = 'approved'"
            :class="{ 'nav-tab-button-active': activeTab === 'approved' }"
            class="nav-tab-button"
          >
            Approved
          </button>
          <button
            @click="activeTab = 'declined'"
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
      <div class="w-8/12 flex justify-between max-w-7xl p-5">
        <papers-tab
          v-if="activeTab === 'pending'"
          :papers="papers.pending"
          :isLoading="isGettingPendingPapers"
          :errorMessage="errorMessagePendingPapers"
          emptyMessage="This is where you can see a list of research papers waiting for your approval."
          statusMessage="waiting for your approval"
        />
        <papers-tab
          v-if="activeTab === 'approved'"
          :papers="papers.approved"
          :isLoading="isGettingApprovedPapers"
          :errorMessage="errorMessageApprovedPapers"
          emptyMessage="This is where you can see a list of research papers you have approved."
          statusMessage="been approved by you"
        />
        <papers-tab
          v-if="activeTab === 'declined'"
          :papers="papers.declined"
          :isLoading="isGettingDeclinedPapers"
          :errorMessage="errorMessageDeclinedPapers"
          emptyMessage="This is where you can see a list of research papers you have declined."
          statusMessage="been declined by you"
        />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import dataMixins from "@/mixins/DataMixins.js";
import appHeader from "@/components/AppHeader.vue";
import appFooter from "@/components/AppFooter.vue";
import PapersTab from "@/components/PapersTab.vue";
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
    PapersTab,
  },
  data() {
    return {
      isGettingPendingPapers: true,
      isGettingApprovedPapers: true,
      isGettingDeclinedPapers: true,
      errorMessagePendingPapers: "",
      errorMessageApprovedPapers: "",
      errorMessageDeclinedPapers: "",
      search: "",
      activeTab: "pending",
      papers: {
        pending: [],
        approved: [],
        declined: [],
      },
    };
  },
  methods: {
    async fetchPapers() {
      await Promise.all([
        this.getPendingPapers(),
        this.getApprovedPapers(),
        this.getDeclinedPapers(),
      ]);
    },
    async getPendingPapers() {
      this.isGettingPendingPapers = true;
      try {
        const response = await this.$api.getPapers(0, "date-asc", "pending");
        if (response.data["is-success"])
          this.papers.pending = response.data["user-papers"];
        else this.errorMessagePendingPapers = response.data.message;
      } catch (error) {
        this.errorMessagePendingPapers = "Unable to retrieve list of papers.";
        console.error(error);
      } finally {
        this.isGettingPendingPapers = false;
      }
    },
    async getApprovedPapers() {
      this.isGettingApprovedPapers = true;
      try {
        const response = await this.$api.getPapers(0, "date-asc", "approved");
        if (response.data["is-success"])
          this.papers.approved = response.data["user-papers"];
        else this.errorMessageApprovedPapers = response.data.message;
      } catch (error) {
        this.errorMessageApprovedPapers = "Unable to retrieve list of papers.";
        console.error(error);
      } finally {
        this.isGettingApprovedPapers = false;
      }
    },
    async getDeclinedPapers() {
      this.isGettingDeclinedPapers = true;
      try {
        const response = await this.$api.getPapers(0, "date-asc", "declined");
        if (response.data["is-success"])
          this.papers.declined = response.data["user-papers"];
        else this.errorMessageDeclinedPapers = response.data.message;
      } catch (error) {
        this.errorMessageDeclinedPapers = "Unable to retrieve list of papers.";
        console.error(error);
      } finally {
        this.isGettingDeclinedPapers = false;
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
