<template>
  <div class="card-view" @click="navigateToPaper">
    <div class="card-main-content">
      <img :src="paper['image-url']" alt="Image" />
      <div class="mt-4">
        <div class="card-title">{{ paper.title }}</div>
        <p class="card-author">{{ authorString }}</p>
      </div>
    </div>
    <div class="additional-info">
      <p class="card-date">{{ formatDate(paper["date-published"]) }}</p>
      <p
        v-if="showStatus"
        class="font-medium capitalize"
        :class="getStatusColor(paper.status)"
      >
        <font-awesome-icon
          :icon="['fas', getStatusIcon(paper.status)]"
          title="Status"
        /><span>{{ paper.status }}</span>
      </p>
    </div>
    <div class="card-footer">
      <p>
        <font-awesome-icon
          :icon="['fas', 'star']"
          class="text-yellow-500"
          title="Ratings"
        /><span>{{ paper.rates }}</span>
      </p>
      <p>
        <font-awesome-icon
          :icon="['fas', 'thumbs-up']"
          class="text-blue-500"
          title="Likes"
        /><span>{{ formatNumber(paper.likes) }}</span>
      </p>
      <p>
        <font-awesome-icon
          :icon="['fas', 'eye']"
          class="text-black-500"
          title="Views"
        /><span>{{ formatNumber(paper.views) }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import logo from "@/assets/images/logo.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
  name: "cart-item",
  props: ["paper", "showStatus", "publicView", "showAllAuthor"],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    authorString() {
      const authors = this.paper?.authors?.map((author) => author.name) || [];
      const authorWord = authors.length === 1 ? "Author" : "Authors";
      if (
        !authors.length ||
        (authors.length === 1 && !this.publicView && !this.showAllAuthor)
      ) {
        return "";
      }
      if (!this.publicView) {
        return `${authorWord}: ${
          this.showAllAuthor
            ? authors.join(", ")
            : `by you and ${authors.slice(1).join(", ")}`
        }`;
      }
      return `${authorWord}: ${authors.join(", ")}`;
    },
  },
  methods: {
    navigateToPaper() {
      this.$store.commit("addPaper", this.paper);
      this.$router.push({
        path: "/paper",
        query: { paper_id: this.paper.id },
      });
    },
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
    getStatusIcon(status) {
      switch (status) {
        case "approved":
          return "circle-check";
        case "pending":
          return "clock";
        case "declined":
          return "circle-exclamation";
        default:
          return "";
      }
    },
    getStatusColor(status) {
      switch (status) {
        case "approved":
          return "text-blue-500";
        case "pending":
          return "text-orange-500";
        case "declined":
          return "text-red-500";
        default:
          return "";
      }
    },
  },
};
</script>
<style scoped>
/* Put CSS style here only if necessary. */
</style>
