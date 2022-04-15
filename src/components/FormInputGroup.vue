<template>
  <div class="inputwrapper">
    <Checkbox
      v-if="input.class === 'checkbox'"
      :class="input.class"
      :model-value="modelValue"
      @update:model-value="newValue => (modelValue = newValue)"
    />
    <Radio
      v-else
      :class="input.class"
      :value="theme"
      :model-value="modelValue"
      @update:model-value="newValue => (modelValue = newValue)"
    />
    <label class="inputwrapper__name">{{
      input.label ? input.label : theme
    }}</label>
  </div>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue';
import Radio from '@/components/Radio.vue';

export default {
  props: {
    input: {
      type: Object,
      required: true,
    },
    modelValue: {
      required: true,
    },
    theme: {
      type: String,
      required: false,
    },
  },

  components: {
    Checkbox,
    Radio,
  },

  watch: {
    modelValue() {
      this.$emit('update:model-value', this.modelValue);
    },
  },
};
</script>

<style scoped>
.inputwrapper {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.inputwrapper__name {
  margin-left: 10px;
  font-size: 14px;
}
</style>
