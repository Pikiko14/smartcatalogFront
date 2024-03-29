/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { Request } from 'src/api/api';
import { Storage } from 'src/utils/storage';
import { ResponseObj } from 'src/interfaces/api';
import { ProfileInterface } from 'src/interfaces/profile.interface';
import { ProductInterface } from 'src/interfaces/product.interface';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';
import { CategoryInterface } from 'src/interfaces/categories.interface';

const path = 'catalogues';
const storage = new Storage('');
const handlerRequest = new Request({
  Accept: 'application/json',
});

export const useMainStore = defineStore('mainStore', () => {
  // data
  const product = ref<ProductInterface>({
    categories: [],
    description: '',
    name: '',
    prices: [],
    reference: '',
    tax: 0,
  });
  const profile = ref<ProfileInterface>({});
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
  const categories = ref<CategoryInterface[]>([]);

  // methods
  const showCatalogue = async (id: string) => {
    try {
      const response = (await handlerRequest.doGetRequest(
        `${path}/show/${id}`,
        '',
        true
      )) as ResponseObj;
      if (response.success) {
        catalog.value = response.data.catalogue;
        profile.value = response.data.profile;
        // change title
        if (profile.value.brand_name) {
          document.title = profile.value.brand_name;
          if (profile.value.profile_pictury) {
            const newFaviconLink = document.createElement('link');
            newFaviconLink.rel = 'icon';
            newFaviconLink.href = `${profile.value.profile_pictury}`;
            newFaviconLink.type = 'image/png';
            // Obtener el elemento head
            const headElement = document.head;
            // Obtener el enlace actual del favicon
            const currentFaviconLink =
              document.querySelector('link[rel="icon"]');
            // Reemplazar el enlace actual con el nuevo
            headElement.replaceChild(newFaviconLink, currentFaviconLink as any);
          }
        }
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  const showProduct = async (id: string | undefined) => {
    try {
      const response = (await handlerRequest.doGetRequest(
        `products/${id}/show`,
        '',
        true
      )) as ResponseObj;
      if (response.success) {
        product.value = response.data;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getGeolocationData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.GEO_URL}${process.env.GEO_API_KEY}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const doVisitInCatalogue = async (params: any) => {
    const isVisit = storage.getItemStorage(
      'local',
      `is-visit-${params.catalogue_id}`
    );
    if (isVisit) {
      return true;
    }
    try {
      const response = (await handlerRequest.doPostRequest(
        'visits',
        params,
        true
      )) as ResponseObj;
      if (response?.success) {
        storage.saveInStorage('local', `is-visit-${params.catalogue_id}`, true);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const doFilterProduct = async (search: string, categoriesString: string) => {
    try {
      const response = (await handlerRequest.doGetRequest(
        `products/filter/front?product=${search}&categories=${categoriesString}&catalogue_id=${catalog.value._id}`,
        '',
        true
      )) as ResponseObj;
      if (response.success) {
        catalog.value.pages = [];
        catalog.value.pages = response.data;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const listUserCategories = async () => {
    try {
      const response = (await handlerRequest.doGetRequest(
        `categories/list/${catalog.value._id}`,
        '',
        true
      )) as ResponseObj;
      if (response?.success) {
        categories.value = response.data;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCatalogue = async (params: any) => {
    try {
      const response = (await handlerRequest.doPostRequest(
        'catalogues/download/pdf',
        params,
        true
      )) as ResponseObj;
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProduct = async (productId: string) => {
    try {
      const response = (await handlerRequest.doGetRequest(
        `products/${productId}/show`,
        '',
        false
      )) as ResponseObj;
      if (response.success) {
        product.value = response.data;
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return statement
  return {
    profile,
    catalog,
    product,
    categories,
    showProduct,
    showCatalogue,
    filterProduct,
    doFilterProduct,
    downloadCatalogue,
    listUserCategories,
    doVisitInCatalogue,
    getGeolocationData,
  };
});
