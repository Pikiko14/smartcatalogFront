<template>
  <section class="full-width q-px-lg">
    <!--Slider section simple-->
    <SimpleSlider
      :color="color"
      :catalogue="catalogue"
      @show-product="doShowProduct"
      v-if="profile.type_slider === 'Simple'"
    />
    <!--End slider sectionsimple-->

    <!--Slider section double-->
    <DoubleSlider
      :color="color"
      :catalogue="catalogue"
      @show-product="doShowProduct"
      v-if="profile.type_slider === 'Double' && render"
    />
   <!--End slider section double-->

    <!--product modal-->
    <q-dialog v-model="openProductModal" @before-hide="clearProduct">
      <q-card class="round-10 product-card">
        <q-card-section class="q-pa-none">
          <ProductCard :color="color" :product="product" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--end porduct modal-->
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import SimpleSlider from './sliders/simple.vue';
import DoubleSlider from './sliders/double.vue';
import ProductCard from './product/productCard.vue';
import { computed, ref, watch, nextTick } from 'vue';
import { ProductInterface } from 'src/interfaces/product.interface';
import { ProfileInterface } from 'src/interfaces/profile.interface';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';

export default {
  name: 'HomePageComponent',
  components: {
    ProductCard,
    SimpleSlider,
    DoubleSlider,
  },
  props: {
    catalogue: {
      type: Object as () => CatalogueInterface,
      default: () => {
        return {};
      },
    },
    profile: {
      type: Object as () => ProfileInterface,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    // data
    const product = ref<ProductInterface>({
      categories: [],
      description: '',
      name: '',
      prices: [],
      reference: '',
      tax: 19,
    });
    const render = ref<boolean>(true);
    const openProductModal = ref<boolean>(false);

    // watch
    watch(() => {
      return props.catalogue.pages;
    }, () => {
      render.value = false;
      nextTick(() => {
        render.value = true;
      })
    })

    // computed
    const color = computed(() => {
      return props.profile.brand_color;
    });

    // methods
    const doShowProduct = (data: ProductInterface) => {
      product.value = data;
      openModal();
    };

    const openModal = () => {
      openProductModal.value = !openProductModal.value;
    };

    const clearProduct = () => {
      product.value = {
        categories: [],
        description: '',
        name: '',
        prices: [],
        reference: '',
        tax: 19,
      };
    };

    // return data
    return {
      color,
      render,
      product,
      clearProduct,
      doShowProduct,
      openProductModal,
    };
  },
};
</script>
