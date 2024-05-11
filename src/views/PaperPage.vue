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
          <p class="headline-3">Citation</p>
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
          <p class="text-base">
            {{ paper.Keywords }}
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
    return {};
  },
  computed: {
    paper() {
      return this.$store.state.papers[this.$route.query.paper_id]; // Fetch the paper from the Vuex store using the ID
    },
    authors() {
      const allAuthors = this.paper.authors.map((author) => author.name);
      return `${allAuthors.join(", ")}`;
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
  },
};
</script>
<style scoped>
/* Put CSS style here only if necessary. */
</style>
