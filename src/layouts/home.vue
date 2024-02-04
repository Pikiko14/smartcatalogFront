<template>
  <q-layout view="hHh lpr fFf">
    <!--header-->
    <q-header class="bg-white">
      <HeaderToolbar
        :color="color"
        :title="title"
        :brandIcon="
          profile.profile_pictury
            ? `${url}/profile/${profile.profile_pictury}`
            : '/images/logo.webp'
        "
        @open-shopping-bag="openShoppingBag"
      />
    </q-header>
    <!--end header-->

    <!--drawer-->
    <q-drawer
      v-model="shoppingBagDrawer"
      side="right"
      behavior="mobile"
      :width="340"
      elevated
    >
      <ShoppingBag
        :color="color"
        @finish-order="doFinishOrder"
        @close-shopping-bag="shoppingBagDrawer = false"
      />
    </q-drawer>
    <!--end drawer-->

    <!--modal complete order-->
    <q-dialog v-model="openFinishOrderModal">
      <q-card class="finish-order round-10">
        <q-card-section class="title relative">
          <span class="text-h6" :style="{ color: color || '#000000' }">
            {{ $t('completePurchaseOrder') }}
          </span>
          <q-btn
            class="absolute-top-right close-btn-modal"
            icon="close"
            flat
            dense
            color="red"
            v-close-popup
            rounded
          >
            <q-tooltip class="bg-red">
              {{ $t('close') }}
            </q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section style="margin-top: -25px">
          <FinishOrder :color="color" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--end modal complete order-->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { LocalStorage } from 'quasar';
import { useMainStore } from 'src/stores/main';
import HeaderToolbar from 'src/components/layout/header.vue';
import ShoppingBag from 'src/components/layout/shoppingBag.vue';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import FinishOrder from 'src/components/layout/finishOrderSection.vue';

export default defineComponent({
  name: 'HomeLayout',
  components: {
    HeaderToolbar,
    ShoppingBag,
    FinishOrder,
  },
  setup() {
    // data
    const store = useMainStore();
    const url = process.env.API_URL;
    const title = ref<string>('Catalogo enero');
    const shoppingBagDrawer = ref<boolean>(false);
    const openFinishOrderModal = ref<boolean>(false);
    const { locale } = useI18n({ useScope: 'global' });

    // computed
    const profile = computed(() => {
      return store.profile;
    });

    const openShoppingBag = () => {
      shoppingBagDrawer.value = !shoppingBagDrawer.value;
    };

    const color = computed(() => {
      return profile.value.brand_color;
    });

    const doFinishOrder = () => {
      shoppingBagDrawer.value = !shoppingBagDrawer.value;
      openFinishOrderModal.value = !openFinishOrderModal.value;
    };

    // hook
    onBeforeMount(() => {
      if (LocalStorage.getItem('lang')) {
        locale.value = LocalStorage.getItem('lang') as string;
      }
    });

    return {
      url,
      title,
      color,
      profile,
      doFinishOrder,
      openShoppingBag,
      shoppingBagDrawer,
      openFinishOrderModal,
    };
  },
});
</script>
