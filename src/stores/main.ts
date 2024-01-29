/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Request } from 'src/api/api';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';
import { ResponseObj } from 'src/interfaces/api';

const path = 'catalogues';
const handlerRequest = new Request({
  Accept: 'application/json',
});

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

  // methods
  const showCatalogue = async (id: string) => {
    try {
      try {
        const response = (await handlerRequest.doGetRequest(
          `${path}/show/${id}`,
          '',
          true
        )) as ResponseObj;
        if (response.success) {
          catalog.value = response.data;
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return statement
  return {
    catalog,
    showCatalogue,
  };
});
