<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <HeaderToolbar
        :title="title"
        :brandIcon="`${url}/profile/${profile.profile_pictury}`"
      />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import HeaderToolbar from 'src/components/layout/header.vue';
import { useI18n } from 'vue-i18n';
import { LocalStorage } from 'quasar';
import { useMainStore } from 'src/stores/main';

export default defineComponent({
  name: 'HomeLayout',
  components: {
    HeaderToolbar,
  },
  setup() {
    // data
    const store = useMainStore();
    const url = process.env.API_URL;
    const title = ref<string>('Catalogo enero');
    const { locale } = useI18n({ useScope: 'global' });

    // computed
    const profile = computed(() => {
      return store.profile;
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
      profile,
    };
  },
});
</script>
