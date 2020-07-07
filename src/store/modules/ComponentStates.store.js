const initialState = () => ({
  confirmPageMessage: '',
  gouvernanceList: [],
});

export default {

  state: initialState(),

  // Getter functions
  getters: {
    confirmPageMessage: (state) => state.confirmPageMessage,
    gouvernanceList: (state) => state.gouvernanceList,
  },

  actions: {
    setConfirmPageMessage(context, confirmPageMessage) {
      context.commit('SET_CONFIRM_PAGE_MESSAGE', confirmPageMessage);
    },
    setGouvernanceList(context, gouvernanceList) {
      context.commit('SET_GOUVERNANCE_LIST', gouvernanceList);
    },
  },

  mutations: {
    SET_CONFIRM_PAGE_MESSAGE(state, confirmPageMessage) {
      state.confirmPageMessage = confirmPageMessage;
    },
    SET_GOUVERNANCE_LIST(state, gouvernanceList) {
      state.gouvernanceList = gouvernanceList;
    },
  },

};
