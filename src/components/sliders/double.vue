<template>
  <section class="slider-container">
    <div class="flip-book" id="demoBookExample" data-density="hard">
      <!--first page-->
      <div class="page page-cover page-cover-top" data-density="hard">
        <div class="page-content">
          <img id="firstImage" @load="setButtonsFirst" width="100%" height="100%" :src="firstPage.images[0].path" class="img-carousel" />
          <q-btn
            dense
            color="primary"
            round
            v-for="(button, idx) in firstPage.images[0].buttons" :key="idx"
            :id="button.reference"
            icon="add_shopping_cart"
            @click="doAddProductToCard(button.product)"
            :style="`position: absolute; top: ${button.y}px; left:${button.x}px`"
          >
          </q-btn>
        </div>
      </div>
      <!--end first page-->

      <!--all pages-->
      <div class="page" v-for="(page, idx) in pages" :key="idx">
        <div class="page-content" v-for="(image, img) in page.images" :key="`img-${img}`">
          <img @load="setButtons(idx, false)" width="100%" height="100%" :id="`img-${idx}`" :src="image.path" class="img-carousel" />
          <q-btn
            dense
            color="primary"
            round
            v-for="(button, idx) in image.buttons" :key="idx"
            @click="doAddProductToCard(button.product)"
            :id="button.reference"
            icon="add_shopping_cart"
            class="animate__animated animate__bounce animate__repeat-3"
            :style="`position: absolute; top: ${button.y}px; left:${button.x}px`"
          >
          </q-btn>
        </div>
      </div>
      <!--end all pages-->

      <!--last page-->
      <div class="page page-cover page-cover-bottom" data-density="hard">
        <div class="page-content">
          <img id="lastImage" @load="setButtonsLast" width="100%" height="100%" :src="lastPage.images[0].path" class="img-carousel" />
          <q-btn
            dense
            color="primary"
            round
            @click="doAddProductToCard(button.product)"
            v-for="(button, idx) in lastPage.images[0].buttons" :key="idx"
            :id="button.reference"
            icon="add_shopping_cart"
            :style="`position: absolute; top: ${button.y}px; left:${button.x}px`"
          >
          </q-btn>
        </div>
      </div>
      <!--end last page-->

      <!--arrow section-->
      <q-btn
        :style="{
          color: color || '#fba124',
        }"
        color=""
        flat
        class="swiper-button-next"
      ></q-btn>
      <q-btn
        :style="{
          color: color || '#fba124',
        }"
        flat
        class="swiper-button-prev"
      ></q-btn>
      <!--end arrow section-->
    </div>
  </section>
</template>
  <!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
  import { PageFlip } from 'page-flip'
  import { onBeforeMount, ref } from 'vue';
  import { CatalogueInterface } from 'src/interfaces/catalog.interface';
  import { useQuasar } from 'quasar';
  import { emit } from 'cluster';
  import { notification } from 'src/boot/notification';
  import { ProductInterface } from 'src/interfaces/product.interface';
import { useI18n } from 'vue-i18n';

  export default {
    name: 'DoubleSliderComponent',
    components: {
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
    emits: [
      'show-product'
    ],
    setup(props, { emit }) {
      // data
      const q = useQuasar()
      const firstPage = ref<any>({})
      const pages = ref<any[]>([])
      const lastPage = ref<any>({})
      const { t } = useI18n()

      // computed

      //methods
      const setImages = () => {
        let i = 0
        props.catalogue.pages?.map((data: any) => {
          if (i === 0) {
            firstPage.value = data
          }
          if (i !== 0 && props.catalogue && props.catalogue.pages && i !== props.catalogue.pages.length - 1) {
            pages.value.push(data)
          }
          if (props.catalogue && props.catalogue.pages && i === props.catalogue.pages.length- 1) {
            lastPage.value = data
          }
          i++
        })
      }

      const setButtons = (idx: number, up = false) => {
        const index = !up ? idx : (idx + 1);
        const buttons: any[] = []
        const img: any = document.getElementById(`img-${idx}`)
        if (pages.value[index]) {
          pages.value[index].images[0].buttons.forEach(
            (button: any) => {
              let btn = JSON.parse(JSON.stringify(button));
              btn.x = (btn.x / (q.screen.gt.sm ? 400 : 538)) * img.width;
              btn.y = (btn.y / (q.screen.gt.sm ? 590 : 705)) * img.height;
              buttons.push(JSON.parse(JSON.stringify(btn)));
            }
          );
          pages.value[index].images[0].buttons = buttons || []
        }
      }

      const setButtonsFirst = () => {
        const buttons: any[] = []
        const img: any = document.getElementById('firstImage')
        firstPage.value.images[0].buttons.forEach(
          (button: any) => {
            let btn = JSON.parse(JSON.stringify(button));
            btn.x = (btn.x / (q.screen.gt.sm ? 400 : 538)) * img.width;
            btn.y = (btn.y / (q.screen.gt.sm ? 590 : 705)) * img.height;
            buttons.push(JSON.parse(JSON.stringify(btn)));
          }
        );
        firstPage.value.images[0].buttons = buttons || []
      }

      const setButtonsLast = () => {
        const buttons: any[] = []
        const img: any = document.getElementById('lastImage')
        lastPage.value.images[0].buttons.forEach(
          (button: any) => {
            let btn = JSON.parse(JSON.stringify(button));
            btn.x = (btn.x / (q.screen.gt.sm ? 400 : 538)) * img.width;
            btn.y = (btn.y / (q.screen.gt.sm ? 590 : 705)) * img.height;
            buttons.push(JSON.parse(JSON.stringify(btn)));
          }
        );
        lastPage.value.images[0].buttons = buttons || []
      }

      const doAddProductToCard = (product: ProductInterface) => {
      if (!product) {
        notification('negative', t('noProduct'), 'red');
        return false;
      }
      emit('show-product', product);
    };

      // on before mount
      onBeforeMount(() => {
        // prepare pages
        setImages()
        // prepare configuration
        setTimeout(() => {
          let config = {
            width: q.screen.gt.sm ? 500 : 380,
            height: q.screen.gt.sm ? 700 : 600,
            maxShadowOpacity: 0.1,
            showCover: false,
            disableFlipByClick: true,
            flippingTime: 1000,
            swipeTimeout: 1,
            touchPoint: 0.1,
            showPageCorners: false
          }
          const pageFlip = new PageFlip(
            document.getElementById('demoBookExample') as any,
            config
          )
          // load pages
          pageFlip.loadFromHTML(document.querySelectorAll('.page'))
          // observer event
        })
      })
  
      //return data
      return {
        pages,
        lastPage,
        firstPage,
        setButtons,
        setButtonsLast,
        setButtonsFirst,
        doAddProductToCard,
      };
    },
  };
</script>
  
<style scoped>
  /* Add any additional styles if needed */
  .flipbook {
    width: 90vw;
    height: 90vh;
  }
</style>
  