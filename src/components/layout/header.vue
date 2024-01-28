<template>
  <q-toolbar class="header-toolbar">
    <q-img class="logo-img" src="/images/logo.webp"></q-img>
    <q-toolbar-title class="d-flex flex-center">
      <!--middle btn -->
      <q-btn
        flat
        dense
        rounded
        icon="cloud_download"
        :style="{ color: color || '#fba124' }"
      >
        <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
          {{ $t('download') }}
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        dense
        icon="share"
        rounded
        class="q-ml-md"
        :style="{ color: color || '#fba124' }"
      >
        <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
          {{ $t('share') }}
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        dense
        icon="search"
        rounded
        class="q-ml-md"
        :style="{ color: color || '#fba124' }"
      >
        <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
          {{ $t('search') }}
        </q-tooltip>
      </q-btn>
      <!-- finish middle btn -->

      <!--right btn-->
      <div class="right-btn">
        <q-btn
          flat
          dense
          icon="shopping_bag"
          rounded
          class="q-ml-md"
          :style="{ color: color || '#fba124' }"
        >
          <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
            {{ $t('soppingBag') }}
          </q-tooltip>
        </q-btn>
      </div>
      <!-- end right btn -->
    </q-toolbar-title>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderLayoutComponenet',
  props: {
    title: {
      type: String,
      default: () => '',
    },
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  components: {},
  setup() {
    return {};
  },
});
</script>
