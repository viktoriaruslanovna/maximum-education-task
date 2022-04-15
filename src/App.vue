<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import ApplicationForm from '@/views/ApplicationForm.vue';
import { mapState } from 'vuex';

export default {
  components: {
    ApplicationForm,
  },

  computed: {
    ...mapState({
      complete: state => state.form.complete,
    }),
  },

  watch: {
    complete() {
      if (this.complete) {
        this.$router.push({ path: '/complete' });
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  min-height: 100%;
}

input {
  outline: none;
}

select {
  outline: none;
}

.app {
  font-family: 'Roboto', sans-serif;
}

.title {
  font-size: 22px;
}
</style>
