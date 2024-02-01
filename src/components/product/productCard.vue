<template>
  <section class="product-section relative">
    <div class="product-galery q-py-none">
      <MediasGalery :medias="product.medias" />
    </div>
    <div class="product-detailt q-pa-md">
      <InformationProduct
        :product="product"
        :categories="productBd.categories"
      />
    </div>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { computed, onBeforeMount } from 'vue';
import MediasGalery from './partials/medias.vue';
import { useMainStore } from 'src/stores/main';
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
  setup(props) {
    // data
    const store = useMainStore();

    // computed
    const productBd = computed(() => {
      return store.product;
    });

    // methods
    const loadProductData = async () => {
      try {
        await store.showProduct(props.product._id);
      } catch (error) {}
    };

    // life cycle
    onBeforeMount(async () => {
      await loadProductData();
    });

    // return data
    return {
      productBd,
    };
  },
};
</script>
