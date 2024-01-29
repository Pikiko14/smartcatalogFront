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

const url = process.env.API_URL;

export const useMainStore = defineStore('mainStore', () => {
  // data
  const profile = ref<any>({});
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
            console.log(profile.value);
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

  // return statement
  return {
    profile,
    catalog,
    showCatalogue,
  };
});
