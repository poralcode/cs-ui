<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div
      v-if="showUploadForm"
      class="main-content bg-slate-50 flex flex-col items-center"
    >
      <div class="w-8/12 flex justify-between max-w-7xl p-5 mt-8">
        <button class="btn-icon-lg" @click="showUploadForm = false">
          <font-awesome-icon
            :icon="['fas', 'arrow-left']"
            class="input-icon-2 mr-4"
            size="1x"
          />Cancel upload
        </button>
      </div>
      <div class="w-8/12 flex justify-between max-w-7xl p-5">
        <upload-form @upload-success="handleUploadSuccess" />
      </div>
    </div>
    <div
      v-if="!showUploadForm"
      class="main-content bg-slate-50 flex flex-col items-center"
    >
      <!-- Align this in top -->
      <div class="w-8/12 flex justify-between max-w-7xl p-5 mt-8">
        <p class="sub-headline-3">My Papers</p>
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
      <!-- Align this just below -->
      <div
        class="w-8/12 max-w-7xl flex justify-end items-center space-x-3 pl-5 pr-5 pb-5"
      >
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

      <div v-if="isGettingPapers" class="flex mt-9">
        <font-awesome-icon
          :icon="['fas', 'spinner']"
          class="spinner text-blue-700"
          size="3x"
        />
      </div>

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

      <div
        v-if="!isGettingPapers"
        class="w-8/12 grid grid-cols-4 gap-y-8 gap-4 max-w-7xl mb-8 pl-5 pr-5"
      >
        <button class="btn-card" @click="uploadFile">
          <!-- input
            type="file"
            id="fileUpload"
            ref="fileUpload"
            @change="handleFileUpload"
            style="display: none"
            accept=".pdf"
          /> -->
          <font-awesome-icon
            :icon="['fas', 'cloud-arrow-up']"
            class="input-icon-2 text-gray-300"
            size="3x"
          />
          <span class="text-gray-400 font-medium">New Paper</span>
        </button>
        <card-item
          v-for="paper in filteredPapers"
          :key="paper.id"
          :paper="paper"
          :showStatus="true"
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
import cardItem from "@/components/CardItem.vue";
import uploadForm from "@/components/UploadForm.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
  name: "student-page",
  mixins: [dataMixins],
  components: {
    FontAwesomeIcon,
    appHeader,
    appFooter,
    cardItem,
    uploadForm,
  },
  data() {
    return {
      isGettingPapers: false,
      errorMessage: "",
      userPapers: null,
      search: "",
      //pdf: null,
      showUploadForm: false,
    };
  },
  computed: {
    filteredPapers() {
      if (this.search) {
        return this.userPapers.filter((paper) =>
          paper.title.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.userPapers;
      }
    },
  },
  mounted() {
    this.getStudentPapers();
  },
  methods: {
    uploadFile() {
      //this.$refs.fileUpload.click();
      this.showUploadForm = true;
    },
    /* handleFileUpload() {
      this.dismissErrorMessage();
      const files = this.$refs.fileUpload.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type !== "application/pdf") {
          this.errorMessage = "The selected file is not a valid PDF file.";
        } else {
         // this.pdf = file;
          this.showUploadForm = true;
        }
      }
    },*/
    dismissErrorMessage() {
      this.errorMessage = "";
    },
    async getStudentPapers() {
      this.isGettingPapers = true;
      this.dismissErrorMessage();
      try {
        const response = await this.$api.getStudentPapers(
          this.userProfile["id"]
        );
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
    handleUploadSuccess(data) {
      this.showUploadForm = false;
      console.log("Response from server: " + data);
      console.log("Response from server of user-paper: " + data["user-paper"]);
      this.userPapers.unshift(data["user-paper"]);
    },
  },
};
</script>
<style scoped>
/* Put CSS style here only if necessary. */
</style>
