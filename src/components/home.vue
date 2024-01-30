<template>
  <section class="full-width q-px-lg">
    <SimpleSlider :catalogue="catalogue" />
  </section>
</template>
<script lang="ts">
import SimpleSlider from './sliders/simple.vue';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';

export default {
  name: 'HomePageComponent',
  components: {
    SimpleSlider,
  },
  props: {
    catalogue: {
      type: Object as () => CatalogueInterface,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    // return data
    return {};
  },
};
</script>
