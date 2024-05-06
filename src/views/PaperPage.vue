<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <div class="main-content bg-slate-50 flex flex-col items-center">
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
            <p class="headline-2">This is just an example of the title</p>
            <p class="sub-headline-4 mt-3">Author: Alejo Rostata</p>
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
              /><span>4.9</span>
            </button>
            <button class="btn-icon">
              <font-awesome-icon
                :icon="['fas', 'thumbs-up']"
                class="text-blue-500 mr-2"
                title="Likes"
              /><span>2k</span>
            </button>
            <button disabled class="btn-icon">
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="text-black-500 mr-2"
                title="Views"
              /><span>5k</span>
            </button>
          </div>
        </div>

        <div class="w-5/12 border rounded-lg bg-white p-5">
          <!-- 30% width -->
          <p class="headline-3">Citation</p>
          <p class="font-semibold mt-3 text-sm text-gray-400">Title</p>
          <p class="text-sm">This is just an example of the title</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Author</p>
          <p class="text-sm">Alejo Rostata</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Date published</p>
          <p class="">March 15, 2024</p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Abstract</p>
          <p class="text-sm">
            This study examines the impact of technology on the education
            system.
          </p>
          <p class="font-semibold mt-2 text-sm text-gray-400">Keywords</p>
          <p class="text-base">
            AI, Technology, Education, Technology and Edudcation
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
import appHeader from "@/components/AppHeader.vue";
import appFooter from "@/components/AppFooter.vue";
import cardItem from "@/components/CardItem.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

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
      paper: null,
    };
  },
  mounted() {
    // console.log("He: " + JSON.stringify(this.$route.query.paper));
    // console.log("He: " + this.$route.query.paper);
    // const obj = this.$route.query;
    // this.paper = JSON.stringify(obj.paper);
    // console.log("He2: " + obj.paper);
  },
  methods: {},
};
</script>
<style scoped>
/* Put CSS style here only if necessary. */
</style>
