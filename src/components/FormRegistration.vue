<template>
  <div>
    <div class="flex items-center space-x-7">
      <div>
        <div class="input-container">
          <label for="username">Are you a Student or Faculty?</label>
          <div class="input-container-inner">
            <span>
              <font-awesome-icon
                :icon="['fas', 'suitcase']"
                class="input-icon"
              />
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
        <div class="input-container mt-5">
          <label for="first-name">First Name</label>
          <div class="input-container-inner">
            <span>
              <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
            </span>
            <input
              v-model="firstname"
              :disabled="isLoading"
              maxlength="255"
              type="text"
              id="first-name"
              placeholder="Your first name"
            />
          </div>
        </div>
        <div class="input-container mt-5">
          <label for="username">Email</label>
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
      </div>
      <div>
        <div class="input-container">
          <label for="id-number">ID Number</label>
          <div class="input-container-inner">
            <span>
              <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
            </span>
            <input
              v-model="idnumber"
              :disabled="isLoading"
              maxlength="255"
              type="text"
              id="id-number"
              placeholder="Your ID Number"
            />
          </div>
        </div>
        <div class="input-container mt-5">
          <label for="last-name">Last Name</label>
          <div class="input-container-inner">
            <span>
              <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
            </span>
            <input
              v-model="lastname"
              :disabled="isLoading"
              maxlength="255"
              type="text"
              id="last-name"
              placeholder="Your last name"
            />
          </div>
        </div>
        <div class="input-container mt-5">
          <label for="password">Password</label>
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
      </div>
    </div>
    <div class="flex justify-end">
      <button @click="signIn" :disabled="isLoading" class="btn-normal mt-5">
        <p v-if="isLoading">Waiting...</p>
        <p v-else>Register</p>
        <font-awesome-icon
          v-if="isLoading"
          :icon="['fas', 'spinner']"
          class="input-icon"
        />
      </button>
    </div>
    <div class="mt-2">
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
      idnumber: "",
      firstname: "",
      lastname: "",
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
        const response = await this.$api.register(
          this.usertype,
          this.idnumber,
          this.firstname,
          this.lastname,
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
