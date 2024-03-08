<template>
  <section class="landing-container row">
    <div class="col-12">
      <div class="row full-width">
        <!--Filter section-->
        <div class="col-12 col-md-3 q-pa-md" v-if="$q.screen.gt.sm">
          <FilterSection
            :color="color"
            @do-search="doSearch"
            :categories="categories"
            @do-filter-by-category="doFilterCategory"
          />
        </div>
        <!--end filter section-->

        <!--grid section-->
        <div class="col-12 col-md-9 row">
          <div
            class="col-6 col-sm-6 col-md-4 q-pa-md"
            v-for="(page, idx) in currentPage"
            :key="idx"
          >
            <q-img class="landing-card" :src="page.images[0].path">
              <div class="overflow">
                <q-avatar
                  v-for="(button, idx) in page.images[0].buttons"
                  :key="idx"
                  class="shadow-15"
                  :class="{ 'q-ml-md': idx > 0 }"
                  @click="doAddProductToCard(button.product)"
                >
                  <img
                    :src="button?.product?.default_image.path || ''"
                    :alt="`Default image for product ${button?.product?.name}`"
                  />
                  <q-tooltip :style="{ background: color || 'primary' }">
                    {{ button?.product?.name || '-' }}
                  </q-tooltip>
                </q-avatar>
              </div>
            </q-img>
          </div>

          <!--pagination section-->
          <div
            v-if="totalPages > 0"
            class="pagination-buttons col-12 text-center q-py-md"
          >
            <q-btn
              @click="goToFirstPage"
              :disabled="currentPageNumber <= 1"
              icon="keyboard_double_arrow_left"
              flat
              :style="{
                color: color || '#fba124',
              }"
              dense
            />
            <q-btn
              @click="goToPreviousPage"
              :disabled="currentPageNumber <= 1"
              icon="chevron_left"
              flat
              :style="{
                color: color || '#fba124',
              }"
              dense
            />
            {{ currentPageNumber }} / {{ totalPages }}
            <q-btn
              @click="loadMorePages"
              :disabled="currentPageNumber >= totalPages"
              icon="chevron_right"
              flat
              :style="{
                color: color || '#fba124',
              }"
              dense
            />
            <q-btn
              @click="goToLastPage"
              :disabled="currentPageNumber >= totalPages"
              icon="keyboard_double_arrow_right"
              flat
              :style="{
                color: color || '#fba124',
              }"
              dense
            />
          </div>
          <!--end pagination section-->
        </div>
        <!--end grid section-->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import FilterSection from '../layout/filterSection.vue';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';
import { useMainStore } from 'src/stores/main';
import { useRoute, useRouter } from 'vue-router';
import { notification } from 'src/boot/notification';
import { ProductInterface } from 'src/interfaces/product.interface';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LandingCatalogue',
  components: {
    FilterSection,
  },
  props: {
    catalogue: {
      type: Object as () => CatalogueInterface,
      default: () => ({}),
    },
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  setup(props, { emit }) {
    // data
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const mainStore = useMainStore();
    const currentPageNumber = ref(1);
    const totalPages = computed(() => {
      if (props.catalogue.pages) {
        return Math.ceil(props.catalogue.pages.length / 12); // Assuming each page has 12 items
      }
      return 0;
    });

    // computed
    const pages = computed(() => {
      return props.catalogue.pages;
    });

    const categories = computed(() => {
      return mainStore.categories;
    });

    // Función para dividir el arreglo en páginas
    function paginate(array: any[], pageSize: number, pageNumber: number) {
      --pageNumber; // Ajuste del número de página a base 0
      return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    }

    // Uso de la función paginate para obtener la página actual
    const pageSize = 12; // Tamaño de cada página
    const currentPage = computed(() => {
      const allPages = pages.value as any;
      return paginate(allPages, pageSize, currentPageNumber.value);
    });

    // Método para cargar más páginas
    function loadMorePages() {
      if (currentPageNumber.value < totalPages.value) {
        currentPageNumber.value++;
      }
    }

    // Método para ir a la página anterior
    function goToPreviousPage() {
      if (currentPageNumber.value > 1) {
        currentPageNumber.value--;
      }
    }

    // Método para ir a la primera página
    function goToFirstPage() {
      currentPageNumber.value = 1;
    }

    // Método para ir a la última página
    function goToLastPage() {
      currentPageNumber.value = totalPages.value;
    }

    const loadCategories = async () => {
      if (categories.value.length > 0) {
        return false;
      }
      try {
        await mainStore.listUserCategories();
      } catch (error) {}
    };

    const doSearch = async (search: string) => {
      try {
        const categoriesString = route.query.categories
          ? (route.query.categories as string)
          : '';
        const response = await mainStore.doFilterProduct(
          search,
          categoriesString
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

    const doFilterCategory = async (categoriesSelecteds: string[]) => {
      try {
        const search = (route.query.search as string) || '';
        const categoriesString =
          categoriesSelecteds.length > 0
            ? JSON.stringify(categoriesSelecteds)
            : '';
        const response = await mainStore.doFilterProduct(
          search,
          categoriesString
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

    const doAddProductToCard = async (product: ProductInterface) => {
      if (!product) {
        notification('negative', t('noProduct'), 'red');
        return false;
      }
      try {
        const response = (await mainStore.filterProduct(
          product._id as string
        )) as any;
        emit('show-product', response.data);
      } catch (error) {}
    };

    // life cycle
    onBeforeMount(() => {
      loadCategories();
    });

    // Return data
    return {
      pages,
      currentPage,
      currentPageNumber,
      totalPages,
      categories,
      doSearch,
      doFilterCategory,
      loadMorePages,
      goToFirstPage,
      goToLastPage,
      doAddProductToCard,
      goToPreviousPage,
    };
  },
});
</script>

<style scoped>
.pagination-buttons {
  margin-top: 12px;
}

/* Add any additional styles if needed */
</style>
