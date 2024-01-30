<template>
  <section class="slider-container">
    <div class="slider-wrapper">
      <swiper
        ref="swiperRef"
        :effect="'fade'"
        :navigation="{
          enabled: true,
          nextEl: '.q-btn.swiper-button-next',
          prevEl: '.q-btn.swiper-button-prev',
        }"
        :space-between="50"
        :modules="modules"
        @slideChange="reSizeButtons"
        :slides-per-view="1"
      >
        <swiper-slide
          class="relative"
          v-for="(page, idx) in catalogue.pages"
          :key="idx"
        >
          <img
            id="slider-simple-item"
            class="slider-simple-item"
            :src="`${url}/${page.images[0].path}`"
          />
          <q-btn
            v-for="(btn, idx) in buttons"
            round
            :key="idx"
            unelevated
            @click="doAddProductToCard(btn.product)"
            text-color="white"
            icon="shopping_cart"
            size="8pt"
            :style="{
              left: `${btn.x}px`,
              top: `${btn.y}px`,
              background: color || '#fba124',
            }"
            class="absolute tetx-white"
          ></q-btn>
        </swiper-slide>
        <!-- Navigation arrows -->
        <q-btn flat class="swiper-button-next"></q-btn>
        <q-btn flat class="swiper-button-prev"></q-btn>
      </swiper>
    </div>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import 'swiper/css';
import { ref } from 'vue';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';

export default {
  name: 'SimpleSlider',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    catalogue: {
      type: Object as () => CatalogueInterface,
      default: () => ({}),
    },
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  setup(props) {
    // data
    const swiperRef = ref<any>();
    const buttons = ref<any>([]);
    const url = process.env.API_URL;

    // methods
    const reSizeButtons = (element: any) => {
      buttons.value = [];
      if (props.catalogue && props.catalogue.pages) {
        const imageElement: any = document.getElementById('slider-simple-item');
        props.catalogue.pages[element.activeIndex].images[0].buttons.forEach(
          (button: any) => {
            let btn = JSON.parse(JSON.stringify(button));
            console.log(btn);
            btn.x = (btn.x / 400) * imageElement.width;
            btn.y = (btn.y / 590) * imageElement.height;
            buttons.value.push(JSON.parse(JSON.stringify(btn)));
          }
        );
      }
    };

    const doAddProductToCard = (product: any) => {
      console.log(product);
    };

    //return data
    return {
      url,
      buttons,
      swiperRef,
      Navigation,
      reSizeButtons,
      doAddProductToCard,
      modules: [Navigation, EffectFade],
    };
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
