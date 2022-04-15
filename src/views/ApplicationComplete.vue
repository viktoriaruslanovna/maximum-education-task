<template>
  <div class="applicationcomplete">
    <div class="applicationcomplete__content">
      <div class="wrapperright">
        <span @click="close" class="cross">+</span>
      </div>
      <h1 class="applicationcomplete__title title">Заявка отправлена</h1>
      <div class="applicationcomplete__imgwrapper">
        <img
          class="applicationcomplete__img"
          src="../media/success_img.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { completeStorage } from '@/storage/completeStorage';
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      setComplete: 'form/setComplete',
    }),

    close() {
      completeStorage.set(false);
      this.$router.push({ path: '/' });
      this.setComplete(false);
    },
  },
};
</script>

<style scoped>
.applicationcomplete {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.applicationcomplete__content {
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 10px solid rgb(43, 36, 36);
}

.wrapperright {
  display: flex;
  justify-content: end;
  width: 100%;
}

.cross {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 50px;
  transform: rotate(45deg);
}

.applicationcomplete__img {
  width: 300px;
}
</style>
