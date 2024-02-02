/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ShoppingBagInterface } from 'src/interfaces/shoppingBag.interface';

export const useShoppingBagStore = defineStore('shoppingBagStore', () => {
  // data
  const total = ref<number>(0);
  const items = ref<ShoppingBagInterface[]>([]);

  // methods
  const pushItemToBag = (item: ShoppingBagInterface) => {
    const index = items.value.findIndex(
      (data: ShoppingBagInterface) => data.reference === item.reference
    );
    // si no existe lo agregamos
    if (index === -1) {
      items.value.push(item);
    } else {
      // si existe le sumamos una unidad
      items.value[index].quantity++;
    }
    calculateTotal();
  };

  const deleteItemFromBag = (idx: number) => {
    if (items.value[idx]) {
      items.value.splice(idx, 1);
    }
    calculateTotal();
  };

  const calculateTotal = () => {
    total.value = 0;
    items.value = items.value.map((data: ShoppingBagInterface) => {
      data.total = Math.round(data.price * data.quantity);
      const taxDivisor = data.tax / 100;
      const base = data.price / (taxDivisor + 1);
      data.taxTotal = (base * taxDivisor).toFixed(2);
      total.value += data.total;
      return data;
    });
  };

  // return statement
  return {
    total,
    items,
    pushItemToBag,
    deleteItemFromBag,
  };
});
