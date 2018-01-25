import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: {
        id: '',
        admin: false,
        accessToken: '',
        email: '',
      },
      loading: true,
      error: {
        message: '',
      },
    },
    mutations: {
      SET_USER(state, auth) {
        state.user.admin = true;
        state.user.id = auth.userID;
        state.user.email = auth.email;
        state.user.accessToken = auth.accessToken;
        localStorage.setItem('USER_ID', auth.userID);
        localStorage.setItem('USER_EMAIL', auth.email);
        localStorage.setItem('ACCESS_TOKEN', auth.accessToken);
      },
    },
  });
};

export default createStore;
