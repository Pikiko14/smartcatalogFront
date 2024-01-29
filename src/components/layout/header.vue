<template>
  <q-toolbar class="header-toolbar">
    <q-img class="logo-img" :src="brandIcon"></q-img>
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
        <q-btn
          flat
          dense
          class="q-ml-md"
          rounded
          :style="{ color: color || '#fba124' }"
          icon="language"
        >
          <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
            {{ $t('language') }}
          </q-tooltip>
          <q-menu class="round-10">
            <q-list dense>
              <q-item
                clickable
                v-ripple
                v-for="(lang, idx) in localeOptions"
                :key="idx"
                :class="{ 'text-white': locale === lang.value }"
                @click="setLocale(lang.value)"
                :style="{
                  backgroundColor:
                    lang.value === locale
                      ? color
                        ? color
                        : '#fba124'
                      : 'transparent',
                }"
              >
                <q-item-section avatar>
                  <q-icon :name="`img:${lang.icon}`"></q-icon>
                </q-item-section>
                <q-item-section style="margin-left: -20px">
                  <q-item-label class="text-bold">
                    {{ lang.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <!-- end right btn -->
    </q-toolbar-title>
  </q-toolbar>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import { LocalStorage } from 'quasar';

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
    brandIcon: {
      type: String,
      default: () => '/images/logo.webp',
    },
  },
  components: {},
  setup() {
    // data
    const { locale } = useI18n({ useScope: 'global' });
    const localeOptions = [
      { value: 'es', label: 'Spanish', icon: '/images/spanish.png' },
      { value: 'en', label: 'English', icon: '/images/english.png' },
    ];

    // return
    return {
      locale,
      localeOptions,
      setLocale(lang: string) {
        locale.value = lang;
        LocalStorage.set('lang', lang);
      },
    };
  },
});
</script>
