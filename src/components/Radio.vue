<template>
  <input
    type="radio"
    :checked="selectTheme === value"
    :value="value"
    @change="change"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapMutations({
      setSelectTheme: 'form/setSelectTheme',
    }),

    change() {
      if (this.selectTheme !== this.value) {
        this.$emit('update:model-value', this.value);
      }
    },
  },

  computed: {
    ...mapState({
      selectTheme: state => state.form.form.selectTheme,
    }),
  },
};
</script>

<style scoped>
.radio {
  width: 20px;
  height: 20px;
}
</style>
