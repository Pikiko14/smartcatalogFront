/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';

export const useMainStore = defineStore('mainStore', () => {
  // data
  const catalog = ref<CatalogueInterface>({
    _id: '',
    id: '',
    name: '',
    start_date: '',
    end_date: '',
    is_active: false,
    cover: '',
    user_id: '',
    pages: [],
  });

  // return statement
  return {
    catalog,
  };
});
