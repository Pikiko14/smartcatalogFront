/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ShoppingBagInterface } from 'src/interfaces/shoppingBag.interface';

export const useShoppingBagStore = defineStore('shoppingBagStore', () => {
  // data
  const items = ref<ShoppingBagInterface[]>([]);

  // methods
  const pushItemToBag = (item: ShoppingBagInterface) => {
    const index = items.value.findIndex(
      (data: ShoppingBagInterface) => data.reference === item.reference
    );
    // si no existe lo agregamos
    if (index === -1) {
      items.value.push(item);
      return true;
    }
    // si existe le sumamos una unidad
    items.value[index].quantity++;
  };

  // return statement
  return {
    items,
    pushItemToBag,
  };
});
