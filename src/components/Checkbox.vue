<template>
  <input type="checkbox" @change="change" v-model="modelValue" />
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
  },
  methods: {
    change() {
      this.$emit('update:model-value', this.modelValue);
    },
  },
};
</script>

<style scoped>
.checkbox {
  width: 20px;
  height: 20px;
}
</style>
