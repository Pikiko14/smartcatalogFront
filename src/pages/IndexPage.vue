<template>
  <q-page class="row items-center justify-evenly">
    <HomePageComponent :catalogue="catalogue" :profile="profile" />
    <Loader v-if="!loadedCatalog" />
  </q-page>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { useRoute } from 'vue-router';
import { useMainStore } from 'src/stores/main';
import Loader from 'src/components/layout/loader.vue';
import HomePageComponent from 'src/components/home.vue';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    HomePageComponent,
    Loader,
  },
  setup() {
    // data
    const route = useRoute();
    const store = useMainStore();
    const loadedCatalog = ref(false);

    // computed
    const catalogue = computed(() => {
      return store.catalog;
    });

    const profile = computed(() => {
      return store.profile;
    });

    // methods
    const showCatalogue = async (id: string) => {
      try {
        const response = await store.showCatalogue(id);
        if (response?.success) {
          const realTitle = document.title;
          document.title = `${realTitle} | ${response?.data.catalogue.name}`;
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          loadedCatalog.value = true;
        }, 800);
      }
    };

    const setVisitToCatalogue = async (catalogId: string) => {
      try {
        const geoResponse = await store.getGeolocationData();
        if (geoResponse && geoResponse.city) {
          const params = {
            ...geoResponse,
            catalogue_id: catalogId,
          };
          await store.doVisitInCatalogue(params);
        }
      } catch (error) {}
    };

    // hook
    onBeforeMount(async () => {
      const { catalogId } = route.params as any;
      await showCatalogue(catalogId);
      await setVisitToCatalogue(catalogId);
    });

    // return statement
    return {
      profile,
      catalogue,
      loadedCatalog,
    };
  },
});
</script>
