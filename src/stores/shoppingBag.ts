/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Request } from 'src/api/api';
import { ShoppingBagInterface } from 'src/interfaces/shoppingBag.interface';
import { ResponseObj } from 'src/interfaces/api';

const pathProduct = 'products';
const handlerRequest = new Request({
  Accept: 'application/json',
});

export const useShoppingBagStore = defineStore('shoppingBagStore', () => {
  // data
  const total = ref<number>(0);
  const addedToCart = ref<any[]>([]);
  const items = ref<ShoppingBagInterface[]>([]);

  // methods
  const pushItemToBag = (item: ShoppingBagInterface) => {
    const index = items.value.findIndex(
      (data: ShoppingBagInterface) => data.reference === item.reference
    );
    // si no existe lo agregamos
    if (index === -1) {
      const addexIndex = addedToCart.value.findIndex(
        (data: string) => data === item.parent
      );
      if (addexIndex === -1) {
        addedToCart.value.push(item.parent);
      }
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

  const pushOne = (idx: number) => {
    if (items.value[idx]) {
      items.value[idx].quantity++;
    }
    calculateTotal();
  };

  const removeOne = (idx: number) => {
    if (items.value[idx]) {
      items.value[idx].quantity--;
      if (items.value[idx].quantity === 0) {
        items.value.splice(idx, 1);
      }
    }
    calculateTotal();
  };

  const setQuantity = (idx: number, quantity: number) => {
    if (items.value[idx]) {
      items.value[idx].quantity = quantity;
    }
    calculateTotal();
  };

  const addToCart = async () => {
    if (addedToCart.value.length === 0) {
      return false;
    }
    try {
      const params = {
        products: addedToCart.value,
      };
      const response = (await handlerRequest.doPostRequest(
        `${pathProduct}/add/to/cart`,
        params,
        true
      )) as ResponseObj;
      if (response.success) {
        addedToCart.value = [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return statement
  return {
    total,
    items,
    pushOne,
    removeOne,
    addToCart,
    setQuantity,
    pushItemToBag,
    deleteItemFromBag,
  };
});
