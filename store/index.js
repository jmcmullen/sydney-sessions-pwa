import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: {
        id: '',
        accessToken: '',
        email: '',
      },
      admin: {
        id: '',
        token: null,
      },
      loading: true,
      error: {
        message: '',
      },
    },
    mutations: {
      SET_USER(state, auth) {
        state.user.id = auth.userID;
        state.user.email = auth.email;
        state.user.accessToken = auth.accessToken;
        localStorage.setItem('USER_ID', auth.userID);
        localStorage.setItem('USER_EMAIL', auth.email);
        localStorage.setItem('ACCESS_TOKEN', auth.accessToken);
      },
      SET_ADMIN(state, { admin }) {
        state.admin = admin;
        localStorage.setItem('ADMIN_ID', admin.user.id);
        localStorage.setItem('ADMIN_TOKEN', admin.token);
      },
    },
  });
};

export default createStore;
