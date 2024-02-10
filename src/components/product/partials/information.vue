<template>
  <section class="product-information row d-flex flex-center">
    <div class="col-12">
      <span class="text-h5 text-bold">
        {{ product.name }}
        | {{ product.reference }}
      </span>
      <q-btn
        style="margin-top: -2px; z-index: 1; right: 20px; top: 10px"
        icon="close"
        flat
        dense
        rounded
        color="red"
        v-close-popup
        class="float-right absolute-top-right"
      >
        <q-tooltip class="bg-red">
          {{ $t('close') }}
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-12">
      <span class="text-h5 text-bold">
        {{ price }}
      </span>
    </div>
    <div class="col-12">
      <q-scroll-area style="height: 30px; width: 100%">
        <div class="row no-wrap">
          <span
            class="font-12 text-bold"
            v-for="(category, idx) in categories"
            :key="idx"
          >
            <q-chip
              size="8pt"
              square
              class="text-white"
              :style="{ backgroundColor: color || '#fba124' }"
            >
              {{ category.name }}
            </q-chip>
          </span>
        </div>
      </q-scroll-area>
    </div>
    <div class="col-12 q-mt-md">
      <q-scroll-area
        class="q-pr-md q-pl-xs"
        :bar-style="barStyle"
        :thumb-style="thumbStyle"
        style="width: 100%; height: 380px"
      >
        <section
          v-html="product.description.replace(/\n/g, '<br>')"
          class="text-justify"
        ></section>
      </q-scroll-area>
    </div>
    <div
      class="col-12 col-md-6 text-center q-mt-lg"
      :class="{ 'q-pr-md': $q.screen.gt.sm }"
      v-if="product.variants && product.variants?.length > 0"
    >
      <q-select
        rounded
        color="primary"
        lazy-rules
        v-model="variant"
        dense
        emit-value
        map-options
        :options="variants"
        outlined
        :label="$t('selectOption')"
      />
    </div>
    <div
      class="col-12 col-md-6 text-center q-mt-lg"
      :class="{ 'q-pl-md': $q.screen.gt.sm }"
    >
      <q-btn
        rounded
        no-caps
        unelevated
        size="12pt"
        text-color="white"
        class="full-width"
        :label="$t('addToCart')"
        @click="doAddToShoppingBag"
        :disable="
          product.variants && product.variants.length > 0 && !variant
            ? true
            : false
        "
        :style="{ backgroundColor: color || '#fba124' }"
      >
        <!--<q-menu fit class="round-10">
          <q-list>
            <q-item v-for="(variant, idx) in product.variants" :key="idx">
              <q-item-section>
                <q-item-label>
                  {{ variant.attribute }}
                </q-item-label>
                <q-item-label caption>
                  {{ variant.reference }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>-->
      </q-btn>
    </div>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { computed, ref } from 'vue';
import {
  PricesInterface,
  ProductInterface,
  StatusPrice,
  VariantsInterface,
} from 'src/interfaces/product.interface';
import { useShoppingBagStore } from 'src/stores/shoppingBag';
import { CategoryInterface } from 'src/interfaces/categories.interface';
import { ShoppingBagInterface } from 'src/interfaces/shoppingBag.interface';
import { notification } from 'src/boot/notification';
import { useI18n } from 'vue-i18n';
import { Utils } from 'src/utils/utils';

export default {
  name: 'InformationProductComponenet',
  components: {},
  props: {
    product: {
      type: Object as () => ProductInterface,
      default: () => {
        return {};
      },
    },
    color: {
      type: String,
      default: () => '#fba124',
    },
    categories: {
      type: Array as () => CategoryInterface[],
      default: () => [],
    },
  },
  setup(props) {
    // data
    const { t } = useI18n();
    const variant = ref<any>();
    const barStyle = ref<any>({
      right: '2px',
      borderRadius: '9px',
      backgroundColor: props.color || '#fba124',
      width: '9px',
      opacity: 0.2,
    });
    const thumbStyle = ref<any>({
      right: '4px',
      borderRadius: '5px',
      backgroundColor: props.color || '#fba124',
      width: '5px',
      opacity: 0.75,
    });
    const utils = new Utils('product');
    const shoppingStore = useShoppingBagStore();

    // computed
    const variants = computed(() => {
      return props.product.variants?.map((data: VariantsInterface) => {
        return {
          label: data.attribute,
          value: data.reference,
          prices: data.prices,
        };
      });
    });

    const price = computed(() => {
      const price = props.product.prices.find(
        (data: PricesInterface) => data.status === 'active'
      );
      return utils.formatPrice(price?.value || 0);
    });

    // methods
    const doAddToShoppingBag = () => {
      try {
        const item: any = variant.value
          ? props.product?.variants?.find(
              (data: VariantsInterface) =>
                data.reference.toLocaleLowerCase() ===
                variant.value.toLocaleLowerCase()
            )
          : props.product;
        const pricesArr =
          item?.prices && item?.prices.length > 0
            ? item?.prices
            : props.product.prices;
        const price = getPrice(pricesArr);
        const data: ShoppingBagInterface = {
          price: price.value,
          pricesList: pricesArr,
          reference: item?.reference,
          attribute: item?.attribute || '',
          quantity: 1,
          tax: item.tax,
          name: props.product.name,
          img: props.product.default_image?.path || '',
          parent: props.product?._id,
        };
        shoppingStore.pushItemToBag(data);
        notification('positive', t('addedToCart'), 'primary');
        variant.value = null;
      } catch (error) {
        console.log(error);
      }
    };

    const getPrice = (prices: PricesInterface[] | any) => {
      if (prices && prices.length > 0) {
        return prices.find(
          (data: PricesInterface) => data.status === StatusPrice.active
        );
      }
      return null;
    };

    // return data
    return {
      variant,
      barStyle,
      variants,
      thumbStyle,
      price,
      doAddToShoppingBag,
    };
  },
};
</script>
