<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <HeaderToolbar :title="title" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import HeaderToolbar from 'src/components/layout/header.vue';
import { useI18n } from 'vue-i18n';
import { LocalStorage } from 'quasar';

export default defineComponent({
  name: 'HomeLayout',
  components: {
    HeaderToolbar,
  },
  setup() {
    const title = ref<string>('Catalogo enero');
    const { locale } = useI18n({ useScope: 'global' });

    // hook
    onBeforeMount(() => {
      if (LocalStorage.getItem('lang')) {
        locale.value = LocalStorage.getItem('lang') as string;
      }
    });

    return {
      title,
    };
  },
});
</script>
