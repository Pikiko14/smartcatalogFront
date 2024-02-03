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
        @close-shopping-bag="shoppingBagDrawer = false"
      />
    </q-drawer>
    <!--end drawer-->

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

export default defineComponent({
  name: 'HomeLayout',
  components: {
    HeaderToolbar,
    ShoppingBag,
  },
  setup() {
    // data
    const store = useMainStore();
    const url = process.env.API_URL;
    const title = ref<string>('Catalogo enero');
    const shoppingBagDrawer = ref<boolean>(false);
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
      openShoppingBag,
      shoppingBagDrawer,
    };
  },
});
</script>
