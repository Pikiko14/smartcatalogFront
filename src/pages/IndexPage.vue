<template>
  <q-page class="row items-center justify-evenly">
    <HomePageComponent :catalogue="catalogue" />
  </q-page>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { useRoute } from 'vue-router';
import HomePageComponent from 'src/components/home.vue';
import { useMainStore } from 'src/stores/main';
import { computed, defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    HomePageComponent,
  },
  setup() {
    // data
    const route = useRoute();
    const store = useMainStore();

    // computed
    const catalogue = computed(() => {
      return store.catalog;
    });

    // methods
    const showCatalogue = async (id: string) => {
      try {
        const response = store.showCatalogue(id);
        if (response) {
          console.log(response);
        }
      } catch (error) {}
    };

    // hook
    onBeforeMount(async () => {
      const { catalogId } = route.params as any;
      await showCatalogue(catalogId);
    });

    // return statement
    return {
      catalogue,
    };
  },
});
</script>
