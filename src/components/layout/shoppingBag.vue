<template>
  <section class="shopping-bag full-width">
    <!--header shopping bag-->
    <div class="shopping-bag-header">
      <span class="text-h5" :style="{ color: color || '#fba124' }">
        {{ $t('shoppingBag') }}
      </span>
    </div>
    <!--end header shopping bag-->

    <!--body section-->
    <q-scroll-area class="shopping-bag-body" v-if="shoppingItems.length > 0">
      <q-list class="q-pa-none" separator inset>
        <q-item
          class="q-pa-none q-pb-sm"
          v-for="(item, idx) in shoppingItems"
          :key="idx"
          :class="{ 'q-py-sm': idx > 0 }"
        >
          <q-item-section avatar>
            <q-avatar size="40pt">
              <img :src="`${url}/${item.img}`" />
            </q-avatar>
          </q-item-section>
          <q-item-section class="cursor-pointer">
            <q-item-label class="font-12 item-title">
              <div class="ellipsis" style="width: 140px">
                {{ item.name }}
              </div>
            </q-item-label>
            <q-item-label caption>
              {{ item.attribute }} | {{ item.reference }}
            </q-item-label>
            <q-item-label caption>
              {{ item.quantity }} x {{ utils.formatPrice(item.price) }}
            </q-item-label>
            <q-popup-edit
              ref="popupEditQuantity"
              v-model="item.quantity"
              auto-save
            >
              <q-input
                rounded
                dense
                outlined
                debounce="1000"
                style="width: 160px"
                v-model.number="item.quantity"
                class="quiantity-input"
                @update:model-value="setQuantity(idx, item.quantity)"
              >
                <template v-slot:prepend>
                  <q-btn
                    @click="removeOne(idx)"
                    flat
                    dense
                    rounded
                    icon="remove"
                  ></q-btn>
                </template>
                <template v-slot:append>
                  <q-btn
                    @click="pushOne(idx)"
                    flat
                    dense
                    rounded
                    icon="add"
                  ></q-btn>
                </template>
              </q-input>
            </q-popup-edit>
            <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
              {{ $t('editQuantity') }}
            </q-tooltip>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              icon="delete"
              style="margin-top: -8px"
              size="10pt"
              color="red"
              flat
              dense
              @click="deleteItem(idx)"
              rounded
            >
              <q-tooltip class="bg-red">
                {{ $t('delete') }}
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <!--end body section-->

    <!--no icon-->
    <div class="col-12 no-product-section" v-if="shoppingItems.length < 1">
      <section class="row">
        <div class="col-12 text-center">
          <q-img src="/images/no-product.png" width="80px"></q-img>
        </div>
        <div class="col-12 text-center">
          <p class="text-h6">
            {{ $t('noProductInCart') }}
          </p>
        </div>
      </section>
    </div>
    <!--end no icons-->

    <!--total section -->
    <div class="shopping-bag-total" v-if="shoppingItems.length > 0">
      <span class="text-h6">
        {{ utils.formatPrice(total) }}
      </span>
    </div>
    <!--end footer shopping bag-->

    <!--footer shopping bag-->
    <div class="shopping-bag-footer" v-if="shoppingItems.length > 0">
      <q-btn
        :style="{ backgroundColor: color || '#fba124' }"
        unelevated
        rounded
        class="text-white"
        no-caps
        :label="$t('finishOrder')"
      ></q-btn>
    </div>
    <!--end footer shopping bag-->

    <!--close btn-->
    <q-btn
      @click="closeShippingBag"
      class="absolute-top"
      icon="close"
      color="red"
      style="top: 20px; left: 5px"
      dense
      rounded
      flat
    >
      <q-tooltip class="bg-red">
        {{ $t('close') }}
      </q-tooltip>
    </q-btn>
  </section>
</template>

<script lang="ts">
import { Utils } from 'src/utils/utils';
import { computed, defineComponent, ref } from 'vue';
import { useShoppingBagStore } from 'src/stores/shoppingBag';

export default defineComponent({
  name: 'ShoppingBagComponent',
  props: {
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  components: {},
  setup(props, { emit }) {
    // data
    const utils = new Utils('bag');
    const popupEditQuantity = ref();
    const url = process.env.API_URL;
    const shoppingStore = useShoppingBagStore();

    // computed
    const shoppingItems = computed(() => {
      return shoppingStore.items;
    });

    const total = computed(() => {
      return shoppingStore.total;
    });

    const closeShippingBag = () => {
      emit('close-shopping-bag');
    };

    const deleteItem = (idx: number) => {
      shoppingStore.deleteItemFromBag(idx);
    };

    const pushOne = (idx: number) => {
      shoppingStore.pushOne(idx);
    };

    const removeOne = (idx: number) => {
      shoppingStore.removeOne(idx);
    };

    const setQuantity = (idx: number, quantity: number) => {
      shoppingStore.setQuantity(idx, quantity);
      if (quantity && quantity > 0) {
        popupEditQuantity.value[idx].hide();
      }
    };

    // return
    return {
      url,
      total,
      utils,
      pushOne,
      removeOne,
      deleteItem,
      setQuantity,
      shoppingItems,
      closeShippingBag,
      popupEditQuantity,
    };
  },
});
</script>
