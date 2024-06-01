<template>
  <div class="w-full">
    <div class="flex justify-center">
      <font-awesome-icon
        v-if="isLoading"
        :icon="['fas', 'spinner']"
        class="spinner text-blue-700"
        size="2x"
      />
    </div>
    <div v-if="errorMessage && !isLoading">
      <p class="notice-error">
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="error-icon ml-2 mr-3"
        />{{ errorMessage }}
      </p>
    </div>
    <div
      v-if="papers.length === 0 && !isLoading"
      class="flex flex-col items-center mt-16 text-gray-500"
    >
      <font-awesome-icon
        :icon="['fas', 'stopwatch']"
        size="5x"
        class="text-gray-300 mb-5"
      />
      <p>{{ emptyMessage }}</p>
    </div>
    <div v-else>
      <div v-if="!isLoading">
        <div class="flex justify-between items-center">
          <p class="font-semibold">
            {{ papers.length }} item{{ papers.length === 1 ? " is" : "s are" }}
            {{ statusMessage }}.
          </p>
          <div class="flex items-center justify-between space-x-2">
            <span class="text-gray-500 font-medium text-sm">View</span>
            <button class="btn-icon">
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
        <div class="w-full grid grid-cols-4 gap-y-8 gap-4 mt-5 mb-10">
          <card-item
            v-for="paper in papers"
            :key="paper.id"
            :paper="paper"
            :publicView="false"
            :showStatus="true"
            :showAllAuthor="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardItem from "@/components/CardItem.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "PapersTab",
  components: {
    cardItem,
    FontAwesomeIcon,
  },
  props: {
    papers: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    emptyMessage: {
      type: String,
      required: true,
    },
    statusMessage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add specific styles for PapersTab here if necessary. */
</style>
