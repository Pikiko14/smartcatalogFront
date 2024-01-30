<template>
  <swiper
    :autoplay="{ delay: 4500, pauseOnMouseEnter: true }"
    pagination
    :spaceBetween="0"
    :slides-per-view="1"
    :modules="modules"
  >
    <swiper-slide v-for="(media, idx) in medias" :key="idx">
      <img class="media-product-galery-img" :src="`${url}/${media.path}`" />
    </swiper-slide>
  </swiper>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
// Import Swiper styles
import 'swiper/css';
// Import Swiper Vue.js components
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { MediaProductInterface } from 'src/interfaces/product.interface';

export default {
  name: 'MediasGaleryProducts',
  props: {
    medias: {
      type: Array as () => MediaProductInterface[],
      default: () => [],
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // data
    const url = process.env.API_URL;

    // methods

    // return statement
    return {
      url,
      modules: [Autoplay, Pagination],
    };
  },
};
</script>
