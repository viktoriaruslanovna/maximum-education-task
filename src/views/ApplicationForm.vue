<template>
  <div class="applicationform">
    <div class="applicationform__wrapper">
      <h1 class="applicationform__title title">
        Форма подачи заявки в отдел сервиса и качества
      </h1>
      <form
        class="form"
        @submit.prevent="sendForm"
        enctype="multipart/form-data"
      >
        <div class="form__group">
          <h2 class="form__title">
            Ваш филиал <span class="form__required">*</span>
          </h2>
          <Select
            class="select"
            :model-value="this.selectCity"
            @update:model-value="setSelectCity"
            :options="cities"
          />
          <FormInputGroup
            :input="inputs.checkbox"
            :model-value="checkboxOnline"
            @update:model-value="setCheckboxOnline"
          />
        </div>

        <div class="form__group">
          <h2 class="form__title">
            Тема обращения <span class="form__required">*</span>
          </h2>
          <div>
            <FormInputGroup
              v-for="(theme, index) in themesOfRequest"
              :key="index"
              :input="inputs.radio"
              :theme="theme"
              :model-value="selectTheme"
              @update:model-value="setSelectTheme"
            />
          </div>
          <input
            class="form__input"
            :value="anotherTheme"
            @input="e => setAnotherTheme(e.target.value)"
            placeholder="Другое"
          />
        </div>

        <div class="form__group">
          <h2 class="form__title">
            Описание проблемы <span class="form__required">*</span>
          </h2>
          <textarea
            class="textarea"
            :value="descriptionProblem"
            @input="e => setDescriptionProblem(e.target.value)"
          ></textarea>
        </div>

        <div class="form__group">
          <h2 class="form__title">Загрузка документов</h2>
          <p class="tooltip">
            Приложите, пожалуйста, полноэкранный скриншот. Это поможет быстрее
            решить проблему.
          </p>
          <input type="file" ref="screenFile" @change="selectFile" />
        </div>

        <input
          disabled
          ref="submitBtn"
          :class="validate ? 'btn active' : 'btn'"
          type="submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import FormInputGroup from '@/components/FormInputGroup.vue';
import Checkbox from '@/components/Checkbox.vue';
import Select from '@/components/Select.vue';

export default {
  components: {
    FormInputGroup,
    Checkbox,
    Select,
  },

  data() {
    return {
      themesOfRequest: [
        'Недоволен качеством услуг',
        'Расторжение договора',
        'Не приходит письмо активации на почту',
        'Не работает личный кабинет',
      ],

      inputs: {
        checkbox: {
          class: 'checkbox',
          label: 'Онлайн',
        },
        radio: {
          class: 'radio',
        },
      },

      active: false,
      activeArr: 0,
    };
  },

  methods: {
    ...mapActions({
      fetchCities: 'fetchCities',
      sendForm: 'form/sendForm',
    }),

    ...mapMutations({
      setSelectCity: 'form/setSelectCity',
      setCheckboxOnline: 'form/setCheckboxOnline',
      setSelectTheme: 'form/setSelectTheme',
      setAnotherTheme: 'form/setAnotherTheme',
      setDescriptionProblem: 'form/setDescriptionProblem',
      setScreenFile: 'form/setScreenFile',
    }),

    selectFile() {
      this.setScreenFile(this.$refs.screenFile.files[0]);
    },
  },

  computed: {
    ...mapState({
      cities: state => state.cities,
      selectCity: state => state.form.form.selectCity,
      checkboxOnline: state => state.form.form.checkboxOnline,
      selectTheme: state => state.form.form.selectTheme,
      anotherTheme: state => state.form.form.anotherTheme,
      descriptionProblem: state => state.form.form.descriptionProblem,
      screenFile: state => state.form.form.screenFile,
    }),

    validate() {
      if (
        (this.selectCity.length > 0 || this.checkboxOnline === true) &&
        (this.selectTheme.length > 0 || this.anotherTheme.length > 0) &&
        this.descriptionProblem.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  watch: {
    validate() {
      const submitBtn = this.$refs.submitBtn;
      if (this.validate) {
        submitBtn.removeAttribute('disabled');
      } else {
        submitBtn.setAttribute('disabled', 'true');
      }
    },

    selectTheme(e) {
      if (e) {
        this.setAnotherTheme('');
      }
    },

    anotherTheme(e) {
      if (e) {
        this.setSelectTheme('');
      }
    },
  },

  mounted() {
    this.fetchCities();
  },
};
</script>

<style scoped>
.applicationform {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.applicationform__wrapper {
  width: 60%;
  margin: 30px 0 50px;
}

.applicationform__title.title {
  padding: 17px 0;
}

.form {
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.form__group {
  display: flex;
  flex-direction: column;
}

.form__title {
  margin: 20px 0 10px 0;
  font-size: 17px;
  font-weight: normal;
}

.form__required {
  font-size: 17px;
  color: crimson;
}

.form__input {
  width: 250px;
  padding: 7px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.textarea {
  width: 100%;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.tooltip {
  margin-bottom: 5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}

.btn {
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  border: none;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.15);
}

.btn.active {
  background-color: rgba(255, 116, 3, 0.7);
}
</style>
