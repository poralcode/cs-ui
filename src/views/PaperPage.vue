<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div
      v-if="showEditForm"
      class="main-content bg-slate-50 flex flex-col items-center"
    >
      <div class="w-8/12 flex justify-between max-w-7xl p-5 mt-8">
        <button class="btn-icon-lg" @click="showEditForm = false">
          <font-awesome-icon
            :icon="['fas', 'arrow-left']"
            class="input-icon-2 mr-4"
            size="1x"
          />Cancel Edit
        </button>
      </div>
      <div class="w-8/12 flex justify-between max-w-7xl p-5">
        <edit-form
          :paperid="paper.id"
          :pTitle="paper.title"
          :pAbstract="paper.abstract"
          :pAuthors="authors"
          :pKeywords="keywords"
          @edit-success="handleEditSuccess"
        />
      </div>
    </div>

    <div
      v-if="!showEditForm"
      class="main-content bg-slate-50 flex flex-col items-center"
    >
      <div class="w-9/12 flex justify-between max-w-7xl p-5 mt-8 space-x-6">
        <div class="w-full border rounded-lg bg-white p-5 flex flex-col">
          <div class="flex justify-end">
            <button class="btn-normal">
              <font-awesome-icon
                :icon="['fas', 'download']"
                class="mr-2"
              />Download
            </button>
          </div>
          <div class="flex flex-col flex-grow justify-center items-center mt-4">
            <p class="headline-2 text-center">{{ paper.title }}</p>
            <p class="sub-headline-4 mt-3">
              {{ authorString }} : {{ authors }}
            </p>
          </div>
          <div class="flex justify-center">
            <button class="btn-none-bg pr-4 pl-4 font-medium text-blue-700">
              Continue reading...
            </button>
          </div>
          <div class="flex justify-end space-x-4">
            <button class="btn-icon">
              <font-awesome-icon
                :icon="['fas', 'star']"
                class="text-yellow-500 mr-2"
                title="Ratings"
              /><span>{{ paper.rates }}</span>
            </button>
            <button class="btn-icon">
              <font-awesome-icon
                :icon="['fas', 'thumbs-up']"
                class="text-blue-500 mr-2"
                title="Likes"
              /><span>{{ formatNumber(paper.likes) }}</span>
            </button>
            <button disabled class="btn-icon">
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="text-black-500 mr-2"
                title="Views"
              /><span>{{ formatNumber(paper.views) }}</span>
            </button>
          </div>
        </div>

        <div class="w-5/12 border rounded-lg bg-white p-5">
          <div class="flex items-center justify-between">
            <p class="headline-3">Citation</p>
            <font-awesome-icon
              v-if="isDeletingPaper || isUpdatingStatus"
              :icon="['fas', 'spinner']"
              class="spinner text-blue-700"
              size="2x"
            />
            <!-- Conditional display for faculty user type -->
            <div
              v-if="isLoggedIn && userType === 'faculty' && !isUpdatingStatus"
            >
              <div
                v-if="
                  paper.status === 'approved' || paper.status === 'declined'
                "
                class="flex items-center justify-between space-x-2"
              >
                <button class="btn-icon" @click="updatePaperStatus('pending')">
                  <font-awesome-icon
                    :icon="['fas', 'arrows-rotate']"
                    class="text-orange-500 mr-2"
                  /><span class="text-orange-500 font-semibold"
                    >Revert to Pending</span
                  >
                </button>
              </div>
              <div
                v-if="paper.status === 'pending'"
                class="flex items-center justify-between space-x-2"
              >
                <button class="btn-icon" @click="updatePaperStatus('approved')">
                  <font-awesome-icon
                    :icon="['fas', 'circle-check']"
                    class="text-blue-500 mr-2"
                  /><span class="text-blue-500 font-semibold">Approve</span>
                </button>
                <button class="btn-icon" @click="updatePaperStatus('declined')">
                  <font-awesome-icon
                    :icon="['fas', 'thumbs-down']"
                    class="text-red-500 mr-2"
                  /><span class="text-red-500 font-semibold">Decline</span>
                </button>
              </div>
            </div>
            <!-- Conditional display for student user type -->
            <div
              v-if="isLoggedIn && !isDeletingPaper && userType === 'student'"
              class="flex items-center justify-between space-x-2"
            >
              <button class="btn-icon" @click="showEditForm = true">
                <font-awesome-icon
                  :icon="['fas', 'pen']"
                  class="text-blue-500 mr-2"
                /><span class="text-blue-500 font-semibold">Edit</span>
              </button>
              <button class="btn-icon" @click="deletePaper">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-red-500 mr-2"
                /><span class="text-red-500 font-semibold">Delete</span>
              </button>
            </div>
          </div>
          <p
            class="font-semibold mt-3 text-sm text-gray-400"
            v-if="
              isLoggedIn && (userType === 'faculty' || userType === 'student')
            "
          >
            Status
          </p>
          <!-- Status with Icon and Color -->
          <p
            v-if="
              isLoggedIn && (userType === 'faculty' || userType === 'student')
            "
            :class="['capitalize', statusIcon.colorClass]"
          >
            <font-awesome-icon :icon="statusIcon.icon" class="mr-2" />{{
              paper.status
            }}
          </p>
          <p class="font-semibold mt-3 text-sm text-gray-400">Title</p>
          <p class="text-sm">{{ paper.title }}</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">
            {{ authorString }}
          </p>
          <p class="text-sm">{{ authors }}</p>
          <!-- <p class="font-semibold mt-2 text-sm text-gray-400">Date published</p>
          <p class="">{{ formatDate(paper["date-published"]) }}</p> -->
          <p class="font-semibold mt-2 text-sm text-gray-400">Abstract</p>
          <p class="text-sm">{{ paper.abstract }}</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Keywords</p>
          <p class="text-sm">{{ keywords }}</p>
        </div>
      </div>
      <!-- <div class="w-9/12 flex flex-col max-w-7xl p-5 mb-0">
        <p class="headline-3">Related Literature</p>
        <p class="text-sm text-gray-400">No related literature so far.</p>
      </div> -->
      <div class="w-9/12 flex flex-col max-w-7xl p-5 mb-8">
        <p class="headline-3">Related Paper</p>
        <p
          class="text-sm text-gray-400"
          v-if="!isGettingRelatedPapers && relatedPapers.length === 0"
        >
          No related paper.
        </p>
        <font-awesome-icon
          v-if="isGettingRelatedPapers"
          :icon="['fas', 'spinner']"
          class="spinner text-blue-700"
          size="2x"
        />
        <div
          v-if="!isGettingRelatedPapers"
          class="grid grid-cols-5 gap-y-8 gap-4 mt-5"
        >
          <card-item
            v-for="paper in relatedPapers"
            :key="paper.id"
            :paper="paper"
            :showStatus="false"
            :publicView="true"
          />
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
import cardItem from "@/components/CardItem.vue";
import editForm from "@/components/EditForm.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
  name: "paper",
  mixins: [dataMixins],
  components: {
    appHeader,
    appFooter,
    cardItem,
    editForm,
    FontAwesomeIcon,
  },
  data() {
    return {
      isDeletingPaper: false,
      isUpdatingStatus: false,
      isGettingRelatedPapers: true,
      errorMessage: "",
      showEditForm: false,
      relatedPapers: [],
    };
  },
  computed: {
    userType() {
      const type = this.$store.state.userProfile["user-type"];
      return type !== null ? type : "unknown";
    },
    paper() {
      return this.$store.state.papers[this.$route.query.paper_id]; // Fetch the paper from the Vuex store using the ID
    },
    authors() {
      const allAuthors = this.paper.authors.map((author) => author.name);
      return `${allAuthors.join(", ")}`;
    },
    keywords() {
      const allKeywords = this.paper.keywords.map((keyword) => keyword.name);
      return `${allKeywords.join(", ")}`;
    },
    authorString() {
      return this.paper.authors.length > 1 ? "Authors" : "Author";
    },
    statusIcon() {
      switch (this.paper.status) {
        case "approved":
          return { icon: ["fas", "circle-check"], colorClass: "text-blue-500" };
        case "declined":
          return { icon: ["fas", "thumbs-down"], colorClass: "text-red-500" };
        case "pending":
          return {
            icon: ["fas", "hourglass-half"],
            colorClass: "text-orange-500",
          };
        default:
          return {
            icon: ["fas", "question-circle"],
            colorClass: "text-gray-500",
          };
      }
    },
  },
  mounted() {
    this.searchRelatedPapers();
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k";
      } else {
        return num;
      }
    },
    handleEditSuccess(updatedPaper) {
      this.paper.title = updatedPaper.title;
      this.paper.abstract = updatedPaper.abstract;
      this.paper.authors = updatedPaper.authors;
      this.paper.keywords = updatedPaper.keywords;
      this.showEditForm = false;
    },
    async deletePaper() {
      this.isDeletingPaper = true;
      try {
        const response = await this.$api.deletePaper(this.paper.id);
        if (response.data["is-success"])
          this.$router.push({ path: "/student" });
        else this.errorMessage = response.data.message;
      } catch (error) {
        this.errorMessage = "Unable to delete this paper.";
        console.error(error);
      } finally {
        this.isDeletingPaper = false;
      }
    },
    async updatePaperStatus(status) {
      this.isUpdatingStatus = true;
      try {
        const response = await this.$api.updatePaperStatus(
          this.paper.id,
          status
        );
        if (response.data["is-success"]) this.paper.status = status;
        else this.errorMessage = response.data.message;
      } catch (error) {
        this.errorMessage = "Unable to update the status of this paper.";
        console.error(error);
      } finally {
        this.isUpdatingStatus = false;
      }
    },
    async searchRelatedPapers() {
      this.isGettingRelatedPapers = true;
      try {
        const [responseAuthors, responseKeywords] = await Promise.all([
          this.$api.searchPaper(this.paper.authors, "approved", "author"),
          this.$api.searchPaper(this.paper.keywords, "approved", "keywords"),
        ]);

        this.relatedPapers = [];
        if (responseAuthors.data["is-success"]) {
          this.relatedPapers.push(...responseAuthors.data["user-papers"]);
        } else {
          this.errorMessage = responseAuthors.data.message;
        }

        if (responseKeywords.data["is-success"]) {
          this.relatedPapers.push(...responseKeywords.data["user-papers"]);
        } else {
          this.errorMessage = responseKeywords.data.message;
        }
      } catch (error) {
        this.errorMessage = "Unable to retrieve list of related papers.";
        console.error(error);
      } finally {
        this.isGettingRelatedPapers = false;
      }
    },
  },
};
</script>

<style scoped>
/* Put CSS style here only if necessary. */
</style>
