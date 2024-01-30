<template>
  <section class="product-section">
    <div class="product-galery q-py-none">
      <MediasGalery :medias="product.medias" />
    </div>
    <div class="product-detailt q-pa-md">
      {{ product.name }}
    </div>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { ProductInterface } from 'src/interfaces/product.interface';
import MediasGalery from './partials/medias.vue';

export default {
  name: 'ProductCardModal',
  components: {
    MediasGalery,
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
