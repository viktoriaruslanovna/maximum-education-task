<template>
  <select
    :disabled="checkboxOnline"
    v-model="modelValue"
    @change="changeOption"
  >
    <option disabled value="">Выберите город</option>
    <option v-for="option in options" :key="option.id" :value="option.title">
      {{ option.title }}
    </option>
  </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },

  computed: {
    ...mapState({
      checkboxOnline: state => state.form.form.checkboxOnline,
    }),
  },
};
</script>

<style scoped>
.select {
  width: 250px;
  margin-bottom: 10px;
  padding: 7px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.4);
}
</style>
