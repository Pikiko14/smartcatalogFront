<template>
  <section class="product-information row">
    <div class="col-12">
      <span class="text-h5">{{ product.name }}</span>
      <q-btn
        style="margin-top: -2px"
        class="float-right"
        icon="close"
        flat
        dense
        rounded
        color="red"
        v-close-popup
      >
        <q-tooltip class="bg-red">
          {{ $t('close') }}
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-12 q-mt-md">
      <q-scroll-area style="width: 100%; height: 400px">
        <section
          v-html="product.description.replace(/\n/g, '<br>')"
          class="text-justify"
        ></section>
      </q-scroll-area>
    </div>
    <div class="col-12 text-center q-mt-xl">
      <q-btn
        label="Agregar al carrito"
        color="secondary"
        rounded
        no-caps
        unelevated
      ></q-btn>
    </div>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { ProductInterface } from 'src/interfaces/product.interface';

export default {
  name: 'InformationProductComponenet',
  components: {},
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
