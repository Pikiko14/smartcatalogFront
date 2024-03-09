<template>
  <q-page
    class="row"
    :class="{
      'items-center justify-evenly': profile.type_slider !== 'Landing',
    }"
  >
    <q-banner
      class="text-white full-width q-pa-none relative banner-landing"
      v-if="profile.type_slider === 'Landing'"
    >
      <img
        width="100%"
        height="300px"
        :src="profile.landing_banner"
        alt="Banner image logo"
      />
      <div
        class="banner-overflow"
        :style="{ background: profile.brand_color }"
        style="opacity: 0.6"
      ></div>
    </q-banner>
    <HomePageComponent
      v-if="loadedCatalog"
      :catalogue="catalogue"
      :profile="profile"
    />
    <Loader v-if="!loadedCatalog" />
    <NotFound v-if="notFoundShow" />
    <noSubscription v-if="noSubscription" />
    <FooterComponent
      v-if="
        profile.type_slider === 'Landing' && !notFoundShow && !noSubscription
      "
      :profile="profile"
    />
  </q-page>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from 'src/stores/main';
import Loader from 'src/components/layout/loader.vue';
import HomePageComponent from 'src/components/home.vue';
import NotFound from 'src/components/layout/notFound.vue';
import FooterComponent from 'src/components/layout/footer.vue';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import noSubscription from 'src/components/layout/noSubscription.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    Loader,
    NotFound,
    noSubscription,
    FooterComponent,
    HomePageComponent,
  },
  setup() {
    // data
    const route = useRoute();
    const router = useRouter();
    const store = useMainStore();
    const notFoundShow = ref(false);
    const loadedCatalog = ref(false);
    const noSubscription = ref(false);

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
        const response: any = await store.showCatalogue(id);
        if (response?.success) {
          await setVisitToCatalogue(id);
          const realTitle = document.title;
          document.title = `${realTitle} | ${response?.data.catalogue.name}`;
          return true;
        }
        if (
          response.code === 'ERR_BAD_REQUEST' &&
          response.response.data.error
        ) {
          // validate if no exists catalogs
          if (response?.response.status === 422) {
            notFoundShow.value = true;
            return true;
          }
          if (
            response?.response.status === 403 &&
            response?.response.data.data.error === 'not_active'
          ) {
            notFoundShow.value = true;
            return true;
          }
          // validations active error
          const { data } = response.response.data;
          if (data['no_subscription']) {
            noSubscription.value = true;
            return true;
          }
        }
      } catch (error) {
      } finally {
        loadedCatalog.value = true;
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
      notFoundShow,
      loadedCatalog,
      noSubscription,
    };
  },
});
</script>
