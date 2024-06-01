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
      <!-- Align this in top -->
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
          <!-- 30% width -->
          <div class="flex items-center justify-between">
            <p class="headline-3">Citation</p>
            <font-awesome-icon
              v-if="isDeletingPaper || isUpdatingStatus"
              :icon="['fas', 'spinner']"
              class="spinner text-blue-700"
              size="2x"
            />
            <div
              v-if="isLoggedIn && !isUpdatingStatus && userType === 'faculty'"
              class="flex items-center justify-between space-x-2"
            >
              <button class="btn-icon" @click="updatPaperStatus('approved')">
                <font-awesome-icon
                  :icon="['fas', 'thumbs-up']"
                  class="text-blue-500 mr-2"
                /><span class="text-blue-500 font-semibold">Approve</span>
              </button>
              <button class="btn-icon" @click="updatPaperStatus('declined')">
                <font-awesome-icon
                  :icon="['fas', 'thumbs-down']"
                  class="text-red-500 mr-2"
                /><span class="text-red-500 font-semibold">Decline</span>
              </button>
            </div>
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
          <p class="font-semibold mt-3 text-sm text-gray-400">Title</p>
          <p class="text-sm">{{ paper.title }}</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">
            {{ authorString }}
          </p>
          <p class="text-sm">{{ authors }}</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Date published</p>
          <p class="">{{ formatDate(paper["date-published"]) }}</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Abstract</p>
          <p class="text-sm">
            {{ paper.abstract }}
          </p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Keywords</p>
          <p class="text-sm">
            {{ keywords }}
          </p>
        </div>
      </div>
      <div class="w-9/12 flex flex-col max-w-7xl p-5 mb-8">
        <p class="headline-3">Related Literature</p>
        <p class="text-sm text-gray-400">No related literature so far.</p>
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
import { faL, fas } from "@fortawesome/free-solid-svg-icons";
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
      errorMessage: "",
      showEditForm: false,
      userType: this.$store.state.userProfile["user-type"],
    };
  },
  computed: {
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
  },
  mounted() {},
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
    handleEditSuccess(data) {
      this.paper = data;
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
    async updatPaperStatus(status) {
      this.isUpdatingStatus = true;
      try {
        const response = await this.$api.updatPaperStatus(
          this.paper.id,
          status
        );
        if (response.data["is-success"]) console.log("OK");
        // this.$router.push({ path: "/student" });
        else this.errorMessage = response.data.message;
      } catch (error) {
        this.errorMessage = "Unable to update the status of this paper.";
        console.error(error);
      } finally {
        this.isUpdatingStatus = false;
      }
    },
  },
};
</script>
<style scoped>
/* Put CSS style here only if necessary. */
</style>
