<template>
  <section class="product-section">
    <div class="product-galery q-py-none">
      <MediasGalery :medias="product.medias" />
    </div>
    <div class="product-detailt q-pa-md">
      <InformationProduct :product="product" />
    </div>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import MediasGalery from './partials/medias.vue';
import InformationProduct from './partials/information.vue';
import { ProductInterface } from 'src/interfaces/product.interface';

export default {
  name: 'ProductCardModal',
  components: {
    MediasGalery,
    InformationProduct,
  },
  props: {
    product: {
      type: Object as () => ProductInterface,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    // data

    // return data
    return {};
  },
};
</script>
