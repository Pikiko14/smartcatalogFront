<template>
  <q-card class="social-share round-10">
    <q-card-section>
      <span class="text-h6 text-bold">
        {{ $t('shareCatalog') }}
      </span>
      <q-btn
        flat
        dense
        rounded
        icon="close"
        color="red"
        v-close-popup
        class="float-right"
      >
        <q-tooltip class="bg-red">
          {{ $t('close') }}
        </q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section style="margin-top: -20px">
      <div class="share-network-list">
        <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.network"
          :style="{ backgroundColor: network.color }"
          :url="dataShare.url"
          :title="dataShare.title"
          :hashtags="dataShare.hashtags"
          :description="dataShare.description"
        >
          <i :class="network.icon"></i>
          <span>{{ network.name }}</span>
        </ShareNetwork>
      </div>
    </q-card-section>
  </q-card>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SocialShareCard',
  setup() {
    // data
    const { t } = useI18n();
    const networks = [
      {
        network: 'email',
        name: 'Email',
        icon: 'far fah fa-lg fa-envelope',
        color: '#333333',
      },
      {
        network: 'facebook',
        name: 'Facebook',
        icon: 'fab fah fa-lg fa-facebook-f',
        color: '#1877f2',
      },
      {
        network: 'linkedin',
        name: 'LinkedIn',
        icon: 'fab fah fa-lg fa-linkedin',
        color: '#007bb5',
      },
      {
        network: 'pinterest',
        name: 'Pinterest',
        icon: 'fab fah fa-lg fa-pinterest',
        color: '#bd081c',
      },
      {
        network: 'telegram',
        name: 'Telegram',
        icon: 'fab fah fa-lg fa-telegram-plane',
        color: '#0088cc',
      },
      {
        network: 'tumblr',
        name: 'Tumblr',
        icon: 'fab fah fa-lg fa-tumblr',
        color: '#35465c',
      },
      {
        network: 'twitter',
        name: 'Twitter',
        icon: 'fab fah fa-lg fa-twitter',
        color: '#1da1f2',
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: 'fab fah fa-lg fa-whatsapp',
        color: '#25d366',
      },
    ];

    // computed
    const dataShare = computed(() => {
      return {
        url: window.location.href,
        title: document.title,
        description: t('shareDescription'),
        hashtags: t('hashtags'),
      };
    });

    // methods

    // life cycle

    // return
    return {
      networks,
      dataShare,
    };
  },
});
</script>
