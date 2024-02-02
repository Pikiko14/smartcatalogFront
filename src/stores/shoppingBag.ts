/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ShoppingBagInterface } from 'src/interfaces/shoppingBag.interface';

export const useShoppingBagStore = defineStore('shoppingBagStore', () => {
  // data
  const items = ref<ShoppingBagInterface[]>([]);

  // methods
  const pushItemToBag = (item: ShoppingBagInterface) => {
    items.value.push(item);
  };

  // return statement
  return {
    items,
    pushItemToBag,
  };
});
