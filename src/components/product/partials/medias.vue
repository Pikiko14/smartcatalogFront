<template>
  <div class="thumb-example">
    <swiper
      :zoom="true"
      class="top-swiper"
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :modules="modules"
      :space-between="0"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :autoplay="{ delay: 4500, pauseOnMouseEnter: true }"
    >
      <swiper-slide class="slide" v-for="(media, idx) in medias" :key="idx">
        <div class="swiper-zoom-container">
          <img class="media-product-galery-img" :src="`${url}/${media.path}`" />
        </div>
        <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
          {{ $t('doubleClickZoon') }}
        </q-tooltip>
      </swiper-slide>
    </swiper>
    <swiper
      class="thumbs-swiper"
      :modules="modules"
      :space-between="0"
      :slides-per-view="4"
      :watch-slides-progress="true"
      :prevent-clicks="false"
      :prevent-clicks-propagation="false"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide
        :centered-slides="true"
        class="slide"
        v-for="(media, idx) in medias"
        :key="idx"
      >
        <img :src="`${url}/${media.path}`" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Navigation, Thumbs, Autoplay, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type SwiperClass from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { MediaProductInterface } from 'src/interfaces/product.interface';

export default defineComponent({
  name: 'MediasGaleryProducts',
  props: {
    medias: {
      type: Array as () => MediaProductInterface[],
      default: () => [],
    },
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const url = process.env.API_URL;
    const thumbsSwiper = ref<SwiperClass>();
    const setThumbsSwiper = (swiper: SwiperClass) => {
      thumbsSwiper.value = swiper;
    };

    return {
      url,
      modules: [Navigation, Thumbs, Autoplay, Zoom],
      setThumbsSwiper,
      thumbsSwiper,
    };
  },
});
</script>

<style lang="scss" scoped>
.thumb-example {
  height: 600px;
}

.top-swiper,
.thumbs-swiper {
  .slide {
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.top-swiper {
  height: 85%;
  width: 100%;
}

.thumbs-swiper {
  height: 15%;
  box-sizing: border-box;
  padding: 10 0;

  .slide {
    width: 25%;
    height: 100%;
    opacity: 1;
    &:not(.swiper-slide-thumb-active) {
      opacity: 0.4;
    }
  }
}
</style>
