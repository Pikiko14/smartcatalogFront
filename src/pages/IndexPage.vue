<template>
  <q-page class="row items-center justify-evenly">
    <HomePageComponent :catalogue="catalogue" :profile="profile" />
    <Loader v-if="!loadedCatalog" />
  </q-page>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { useRoute, useRouter } from 'vue-router';
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
    const router = useRouter();
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

    const doSearch = async (search: string) => {
      try {
        const categoriesString = route.query.categories
          ? (route.query.categories as string)
          : '';
        const response = await store.doFilterProduct(search, categoriesString);
        if (response?.success) {
          router.push({
            name: 'home',
            query: {
              search,
              categories: categoriesString,
            },
          });
        }
      } catch (error) {}
    };

    const doFilterCategory = async (categoriesSelecteds: string[]) => {
      try {
        const search = (route.query.search as string) || '';
        const categoriesString =
          categoriesSelecteds.length > 0
            ? JSON.stringify(categoriesSelecteds)
            : '';
        const response = await store.doFilterProduct(search, categoriesString);
        if (response?.success) {
          router.push({
            name: 'home',
            query: {
              search,
              categories: categoriesString,
            },
          });
        }
      } catch (error) {}
    };

    const doFilterPages = async () => {
      try {
        const search = (route.query.search as string) || '';
        const categoriesString = route.query.categories
          ? route.query.categories
          : '';
        const response = await store.doFilterProduct(
          search,
          categoriesString as string
        );
        if (response?.success) {
          router.push({
            name: 'home',
            query: {
              search,
              categories: categoriesString,
            },
          });
        }
      } catch (error) {}
    };

    // hook
    onBeforeMount(async () => {
      const { catalogId } = route.params as any;
      await showCatalogue(catalogId);
      await setVisitToCatalogue(catalogId);
      if (route.query.search && !route.query.categories) {
        await doSearch(route.query.search as string);
      }
      if (route.query.categories && !route.query.search) {
        await doFilterCategory(JSON.parse(route.query.categories as string));
      }
      if (route.query.categories && route.query.search) {
        await doFilterPages();
      }
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
