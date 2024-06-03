<template>
  <div>
    <div class="input-container mb-4">
      <label for="username">Are you a Student or Faculty?</label>
      <div class="input-container-inner">
        <span>
          <font-awesome-icon :icon="['fas', 'suitcase']" class="input-icon" />
        </span>
        <select v-model="usertype" :disabled="isLoading">
          <option value="student">I am student</option>
          <option value="faculty">I am faculty</option>
        </select>
        <span class="right-icon">
          <font-awesome-icon
            :icon="['fas', 'chevron-down']"
            class="input-icon"
          />
        </span>
      </div>
    </div>
    <div class="input-container">
      <label for="username">Username or email</label>
      <div class="input-container-inner">
        <span>
          <font-awesome-icon :icon="['fas', 'at']" class="input-icon" />
        </span>
        <input
          v-model="username"
          :disabled="isLoading"
          maxlength="255"
          type="text"
          id="username"
          placeholder="someone@email.com"
        />
      </div>
    </div>
    <div class="input-container mt-5">
      <label for="password"
        >Password
        <button class="btn-text" :disabled="isLoading">
          I forgot my password
        </button></label
      >
      <div class="input-container-inner">
        <span>
          <font-awesome-icon :icon="['fas', 'key']" class="input-icon" />
        </span>
        <input
          v-model="password"
          :disabled="isLoading"
          maxlength="255"
          type="password"
          id="password"
          placeholder="your password"
        />
      </div>
    </div>
    <div class="input-container mt-2 flex justify-end">
      <button @click="signIn" :disabled="isLoading" class="btn-normal mt-5">
        <p v-if="isLoading">Signing in...</p>
        <p v-else>Sign in</p>
        <font-awesome-icon
          v-if="isLoading"
          :icon="['fas', 'spinner']"
          class="input-icon"
        />
      </button>
    </div>
    <div class="input-container mt-2">
      <p v-if="errorMessage" class="notice-error">{{ errorMessage }}</p>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
  name: "app-header",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      usertype: "student" /* Default selected usertype */,
      username: "",
      password: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async signIn() {
      this.errorMessage = "";
      this.isLoading = true;
      try {
        const response = await this.$api.signIn(
          this.usertype,
          this.username,
          this.password
        );
        if (response.data["is-success"]) {
          this.$store.commit("setUserProfile", response.data["user-profile"]);
          this.$router.push("/" + response.data["user-profile"]["user-type"]);
        } else {
          this.errorMessage = response.data.message;
        }
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
