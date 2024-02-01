<template>
  <section class="product-information row">
    <div class="col-12">
      <span class="text-h5 text-bold">
        {{ product.name }}
        | {{ product.reference }}
      </span>
      <q-btn
        style="margin-top: -2px; z-index: 1; right: 20px; top: 10px"
        icon="close"
        flat
        dense
        rounded
        color="red"
        v-close-popup
        class="float-right absolute-top-right"
      >
        <q-tooltip class="bg-red">
          {{ $t('close') }}
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-12">
      <span class="font-12 text-bold">
        <q-chip
          size="8pt"
          square
          class="text-white"
          v-for="(category, idx) in categories"
          :key="idx"
          :style="{ backgroundColor: color || '#fba124' }"
        >
          {{ category.name }}
        </q-chip>
      </span>
    </div>
    <div class="col-12 q-mt-md">
      <q-scroll-area
        class="q-pr-md q-pl-xs"
        :bar-style="barStyle"
        :thumb-style="thumbStyle"
        style="width: 100%; height: 380px"
      >
        <section
          v-html="product.description.replace(/\n/g, '<br>')"
          class="text-justify"
        ></section>
      </q-scroll-area>
    </div>
    <div class="col-12 text-center q-mt-xl">
      <q-btn
        rounded
        no-caps
        unelevated
        text-color="white"
        :label="$t('addToCart')"
        :style="{ backgroundColor: color || '#fba124' }"
      ></q-btn>
    </div>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { ref } from 'vue';
import { ProductInterface } from 'src/interfaces/product.interface';
import { CategoryInterface } from 'src/interfaces/categories.interface';

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
    color: {
      type: String,
      default: () => '#fba124',
    },
    categories: {
      type: Array as () => CategoryInterface[],
      default: () => [],
    },
  },
  setup(props) {
    // data
    const thumbStyle = ref<any>({
      right: '4px',
      borderRadius: '5px',
      backgroundColor: props.color || '#fba124',
      width: '5px',
      opacity: 0.75,
    });

    const barStyle = ref<any>({
      right: '2px',
      borderRadius: '9px',
      backgroundColor: props.color || '#fba124',
      width: '9px',
      opacity: 0.2,
    });

    // return data
    return {
      thumbStyle,
      barStyle,
    };
  },
};
</script>
