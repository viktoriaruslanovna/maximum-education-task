import axios from 'axios';
import { createStore } from 'vuex';
import { formModule } from './formModule';

export default createStore({
  state: () => {
    cities: [];
  },

  mutations: {
    setCities(state, cities) {
      state.cities = cities;
    },
  },

  actions: {
    async fetchCities({ commit }) {
      try {
        const response = await axios.get(
          'https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/cities',
          {},
        );
        commit('setCities', response.data);
      } catch (e) {
        console.log(e);
        alert('Ошибка на сервере, попробуйте позже');
      }
    },
  },
  modules: {
    form: formModule,
  },
});
