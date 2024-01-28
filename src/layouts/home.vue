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
import { defineComponent, ref } from 'vue';
import HeaderToolbar from 'src/components/layout/header.vue';

export default defineComponent({
  name: 'HomeLayout',
  components: {
    HeaderToolbar,
  },
  setup() {
    const title = ref<string>('Catalogo enero');

    return {
      title,
    };
  },
});
</script>
