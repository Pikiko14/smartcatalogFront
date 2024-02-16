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
        v-if="$q.screen.gt.sm"
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
        v-if="$q.screen.gt.sm"
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
        v-if="$q.screen.gt.sm"
        :style="{ color: color || '#fba124' }"
      >
        <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
          {{ $t('search') }}
        </q-tooltip>
        <q-menu class="round-10" @before-show="loadCategories">
          <Filters
            @do-search="doSearch"
            :categories="categories"
            :color="color"
          />
        </q-menu>
      </q-btn>
      <!-- finish middle btn -->

      <!--right btn-->
      <div class="right-btn">
        <q-btn
          flat
          dense
          icon="share"
          rounded
          class="q-ml-md"
          v-if="$q.screen.lt.sm"
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
          v-if="$q.screen.lt.sm"
          :style="{ color: color || '#fba124' }"
        >
          <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
            {{ $t('search') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          dense
          rounded
          class="q-ml-md"
          icon="shopping_bag"
          @click="openShoppingBag"
          :style="{ color: color || '#fba124' }"
        >
          <q-tooltip :style="{ backgroundColor: color || '#fba124' }">
            {{ $t('soppingBag') }}
          </q-tooltip>
          <q-chip
            size="7pt"
            v-if="totalItemsInBag > 0"
            class="text-white chip-bag"
            :style="{ backgroundColor: color ? '#fba124' : '#000000' }"
          >
            {{ totalItemsInBag }}
          </q-chip>
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';
import Filters from './filterSection.vue';
import { useShoppingBagStore } from 'src/stores/shoppingBag';
import { useMainStore } from 'src/stores/main';

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
  components: {
    Filters,
  },
  setup(props, { emit }) {
    // data
    const router = useRouter();
    const mainStore = useMainStore();
    const shoppingStore = useShoppingBagStore();
    const { locale } = useI18n({ useScope: 'global' });
    const localeOptions = [
      { value: 'es', label: 'Spanish', icon: '/images/spanish.png' },
      { value: 'en', label: 'English', icon: '/images/english.png' },
    ];

    // computed
    const totalItemsInBag = computed(() => {
      const totalQuantity = shoppingStore.items
        ? shoppingStore.items.reduce(
            (totalQuantity, item) => totalQuantity + item.quantity,
            0
          )
        : 0;

      return totalQuantity;
    });

    const categories = computed(() => {
      return mainStore.categories;
    });

    // methods
    const openShoppingBag = () => {
      emit('open-shopping-bag');
    };

    const doSearch = async (search: string) => {
      try {
        const response = await mainStore.doSearchProduct(search);
        if (response?.success) {
          router.push({
            name: 'home',
            query: {
              search,
            },
          });
        }
      } catch (error) {}
    };

    const loadCategories = async () => {
      if (categories.value.length > 0) {
        return false;
      }
      try {
        await mainStore.listUserCategories();
      } catch (error) {}
    };

    // return
    return {
      locale,
      doSearch,
      categories,
      localeOptions,
      loadCategories,
      totalItemsInBag,
      openShoppingBag,
      setLocale(lang: string) {
        locale.value = lang;
        LocalStorage.set('lang', lang);
      },
    };
  },
});
</script>
