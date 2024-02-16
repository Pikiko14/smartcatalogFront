/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { Request } from 'src/api/api';
import { Storage } from 'src/utils/storage';
import { ResponseObj } from 'src/interfaces/api';
import { CatalogueInterface } from 'src/interfaces/catalog.interface';
import { ProfileInterface } from 'src/interfaces/profile.interface';
import { ProductInterface } from 'src/interfaces/product.interface';

const path = 'catalogues';
const storage = new Storage('');
const handlerRequest = new Request({
  Accept: 'application/json',
});

const url = process.env.API_URL;

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
          catalog.value = response.data.catalogue;
          profile.value = response.data.profile;
          // change title
          if (profile.value.brand_name) {
            document.title = profile.value.brand_name;
            if (profile.value.profile_pictury) {
              const newFaviconLink = document.createElement('link');
              newFaviconLink.rel = 'icon';
              newFaviconLink.href = `${url}/profile/${profile.value.profile_pictury}`;
              newFaviconLink.type = 'image/png';
              // Obtener el elemento head
              const headElement = document.head;
              // Obtener el enlace actual del favicon
              const currentFaviconLink =
                document.querySelector('link[rel="icon"]');
              // Reemplazar el enlace actual con el nuevo
              headElement.replaceChild(
                newFaviconLink,
                currentFaviconLink as any
              );
            }
          }
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
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

  const doSearchProduct = async (search: string) => {
    try {
      const response = (await handlerRequest.doGetRequest(
        `products/search/${search}?catalogue_id=${catalog.value._id}`,
        '',
        true
      )) as ResponseObj;
      if (response.success) {
        console.log(response);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // return statement
  return {
    profile,
    catalog,
    product,
    showProduct,
    showCatalogue,
    doSearchProduct,
    doVisitInCatalogue,
    getGeolocationData,
  };
});
