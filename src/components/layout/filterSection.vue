<template>
  <q-list dense>
    <q-item-label header> {{ $t('searchLabel') }} </q-item-label>
    <q-item style="margin-top: -10px">
      <q-item-section>
        <q-item-label>
          <q-input
            outlined
            :placeholder="$t('redDress')"
            v-model="search"
            dense
            rounded
            clearable
            debounce="1500"
            @update:model-value="doSearchProduct"
          >
            <template v-slot:append>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator class="q-mt-md"></q-separator>
    <q-item-label header> {{ $t('filterByCategories') }} </q-item-label>
    <q-option-group
      v-model="categoriesSelected"
      type="checkbox"
      :options="categoriesOptions"
      :color="color"
    >
      <template v-slot:label="opt">
        <div class="row items-center">
          <span>{{ opt.label }}</span>
          <q-icon :name="opt.icon" color="teal" size="1.5em" class="q-ml-sm" />
        </div>
      </template>
    </q-option-group>
  </q-list>
</template>

<script lang="ts">
import { CategoryInterface } from 'src/interfaces/categories.interface';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'FilterSection',
  props: {
    categories: {
      type: Array as () => CategoryInterface[],
      default: () => [],
    },
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  setup(props, { emit }) {
    // data
    const route = useRoute();
    const search = ref<string>('');
    const url = process.env.API_URL;
    const categoriesSelected = ref<number[]>([]);

    // computed
    const categoriesOptions = computed(() => {
      const categories = JSON.parse(JSON.stringify(props.categories));
      return categories.map((data: CategoryInterface) => {
        return {
          label: data.name,
          value: data._id,
          icon: `img:${
            data.image ? `${url}${data.image}` : '/images/no-image.png'
          }`,
        };
      });
    });

    // methods
    const doSearchProduct = () => {
      emit('do-search', search.value ? search.value : '');
    };

    // life cycle
    onBeforeMount(() => {
      if (route.query.search) {
        search.value = route.query.search as string;
      }
    });

    // return
    return {
      search,
      doSearchProduct,
      categoriesOptions,
      categoriesSelected,
    };
  },
});
</script>