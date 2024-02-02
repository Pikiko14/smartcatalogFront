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
          class="q-pa-none"
          v-for="(item, idx) in shoppingItems"
          :key="idx"
          :class="{ 'q-mt-sm': $q.screen.gt.sm }"
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
              v-model="item.quantity"
              :title="$t('editQuantity')"
              auto-save
              v-slot="scope"
            >
              <VueNumberInput
                v-model="scope.value"
                :min="0"
                inline
                center
                controls
              />
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
import { computed, defineComponent } from 'vue';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import { useShoppingBagStore } from 'src/stores/shoppingBag';

export default defineComponent({
  name: 'ShoppingBagComponent',
  props: {
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  components: {
    VueNumberInput,
  },
  setup(props, { emit }) {
    // data
    const utils = new Utils('bag');
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

    // return
    return {
      url,
      total,
      utils,
      deleteItem,
      shoppingItems,
      closeShippingBag,
    };
  },
});
</script>
