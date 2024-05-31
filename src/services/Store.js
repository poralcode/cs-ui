import { createStore } from "vuex";

export default createStore({
  state: {
    userProfile: null /* This will hold the user's profile. */,
    papers:
      {} /* This will hold all paper objects, keyed by their IDs. This is used when clicking the CardItem or the Research Paper.*/,
  },
  mutations: {
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },

    addPaper(state, paper) {
      state.papers[paper.id] = paper;
    },
  },
});
