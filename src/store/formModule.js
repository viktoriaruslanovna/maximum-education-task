import axios from 'axios';
import { completeStorage } from '@/storage/completeStorage';

export const formModule = {
  state: () => ({
    complete: false,
    form: {
      selectCity: '',
      checkboxOnline: false,
      selectTheme: '',
      anotherTheme: '',
      descriptionProblem: '',
      screenFile: '',
    },
  }),

  mutations: {
    setComplete(state, complete) {
      state.complete = complete;
    },
    setSelectCity(state, selectCity) {
      state.form.selectCity = selectCity;
    },
    setCheckboxOnline(state, checkboxOnline) {
      state.form.checkboxOnline = checkboxOnline;
    },
    setSelectTheme(state, selectTheme) {
      state.form.selectTheme = selectTheme;
    },
    setAnotherTheme(state, anotherTheme) {
      state.form.anotherTheme = anotherTheme;
    },
    setDescriptionProblem(state, descriptionProblem) {
      state.form.descriptionProblem = descriptionProblem;
    },
    setScreenFile(state, screenFile) {
      state.form.screenFile = screenFile;
    },
  },

  actions: {
    async sendForm({ state, commit }) {
      const formData = new FormData();
      formData.append(
        'city',
        state.form.checkboxOnline ? 'online' : state.form.selectCity,
      );
      formData.append(
        'theme',
        state.form.anotherTheme
          ? state.form.anotherTheme
          : state.form.selectTheme,
      );
      formData.append('description', state.form.descriptionProblem);
      formData.append('screenFile', state.form.screenFile);

      try {
        const response = await axios.post(
          'https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/send-form',
          formData,
        );
        commit('setSelectCity', '');
        commit('setCheckboxOnline', false);
        commit('setSelectTheme', '');
        commit('setAnotherTheme', '');
        commit('setDescriptionProblem', '');
        commit('setScreenFile', '');

        completeStorage.set(true);
        commit('setComplete', true);
        console.log(response);
      } catch (e) {
        console.log(e);
        alert('Ошибка отправки заявки');
      }
    },
  },

  namespaced: true,
};
