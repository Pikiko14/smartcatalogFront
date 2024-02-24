<template>
  <div class="catalog-loading">
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoaderComponent',
});
</script>

<style scoped>
.spinner {
  position: relative;
  width: 52.8px;
  height: 52.8px;
  perspective: 105.6px;
}

.spinner div {
  width: 100%;
  height: 100%;
  background: #fba124;
  position: absolute;
  left: 50%;
  transform-origin: left;
  animation: spinner-16s03x 2.8s infinite;
}

.spinner div:nth-child(1) {
  animation-delay: 0.21s;
}

.spinner div:nth-child(2) {
  animation-delay: 0.42s;
}

.spinner div:nth-child(3) {
  animation-delay: 0.63s;
}

.spinner div:nth-child(4) {
  animation-delay: 0.84s;
}

.spinner div:nth-child(5) {
  animation-delay: 1.0499999999999998s;
}

@keyframes spinner-16s03x {
  0% {
    transform: rotateY(0deg);
  }

  50%,
  80% {
    transform: rotateY(-180deg);
  }

  90%,
  100% {
    opacity: 0;
    transform: rotateY(-180deg);
  }
}

.catalog-loading {
  width: 100%;
  height: 100vh;
  z-index: 9999999999;
  top: 0px;
  position: fixed;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
