<template>
  <div class="w-full flex flex-col items-center">
    <!-- <div class="w-full flex justify-end">
      <div class="w-56 h-28 object-cover rounded overflow-hidden border">
        <pdf-thumbnail :pdf="pdf" />
      </div>
    </div> -->
    <div class="mb-3" v-if="errorMessage">
      <p class="notice-error mr-3">
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="error-icon ml-2 mr-3"
        />{{ errorMessage }}
      </p>
    </div>
    <div class="w-full">
      <div class="input-container full-width">
        <label for="title">Title of Research</label>
        <div class="input-container-inner">
          <span>
            <font-awesome-icon :icon="['fas', 'heading']" class="input-icon" />
          </span>
          <input
            v-model="title"
            :disabled="isLoading"
            maxlength="255"
            type="text"
            id="title"
            placeholder="e.g. The Impact of Climate Change on Crop Yield..."
          />
        </div>
      </div>

      <div class="input-container full-width mt-3">
        <label for="abstract">Abstract</label>
        <div class="input-container-inner">
          <span>
            <font-awesome-icon :icon="['fas', 'font']" class="input-icon" />
          </span>
          <input
            v-model="abstract"
            :disabled="isLoading"
            maxlength="255"
            type="text"
            id="abstract"
            placeholder="e.g. This research paper explores the effects of climate change on crop yield..."
          />
        </div>
      </div>

      <div class="input-container full-width mt-3">
        <label for="authors">Authors separated by commas</label>
        <div class="input-container-inner">
          <span>
            <font-awesome-icon
              :icon="['fas', 'user-plus']"
              class="input-icon"
            />
          </span>
          <input
            v-model="authors"
            :disabled="isLoading"
            maxlength="255"
            type="text"
            id="authors"
            placeholder="e.g. Alejo Rostata, Ralph Edwin Panti"
          />
        </div>
      </div>

      <div class="input-container full-width mt-3">
        <label for="keywords">Keywords separated by commas</label>
        <div class="input-container-inner">
          <span>
            <font-awesome-icon :icon="['fas', 'bookmark']" class="input-icon" />
          </span>
          <input
            v-model="keywords"
            :disabled="isLoading"
            maxlength="255"
            type="text"
            id="keywords"
            placeholder="e.g. Climate Change, Crop Yield, Data Analysis, Farming Strategies"
          />
        </div>
      </div>
    </div>

    <div class="flex w-full justify-end mt-5 mb-9">
      <button class="btn-normal" @click="upload" :disabled="isLoading">
        <p v-if="isLoading">Saving...</p>
        <p v-else>Save</p>
        <font-awesome-icon
          v-if="isLoading"
          :icon="['fas', 'spinner']"
          class="input-icon"
        />
      </button>
    </div>
  </div>
</template>

<script>
import dataMixins from "@/mixins/DataMixins.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PdfThumbnail from "@/components/PdfThumbnail.vue";

library.add(fas);

export default {
  name: "UploadForm",
  props: ["pdf"],
  mixins: [dataMixins],
  components: {
    FontAwesomeIcon,
    PdfThumbnail,
  },
  data() {
    return {
      title: "",
      abstract: "",
      authors: "",
      keywords: "",
      errorMessage: "",
      isLoading: false,
    };
  },
  methods: {
    async upload() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const response = await this.$api.uploadPaper(
          this.userProfile["id"],
          this.title,
          this.abstract,
          this.authors,
          this.keywords
          //this.pdf
        );
        if (response.data["is-success"]) {
          this.$emit("upload-success", response.data);
        } else this.errorMessage = response.data.message;
      } catch (error) {
        this.errorMessage = "Failed, please try again.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Put CSS style here only if necessary. */
</style>
