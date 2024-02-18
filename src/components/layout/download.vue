<template>
  <q-card class="download-catalogue round-10">
    <q-card-section>
      <span class="text-h6 text-bold">
        {{ $t('downloadCatalogue') }}
      </span>
      <q-btn
        flat
        dense
        rounded
        icon="close"
        color="red"
        v-close-popup
        id="closeModalBtn"
        class="float-right"
      >
        <q-tooltip class="bg-red">
          {{ $t('close') }}
        </q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section style="margin-top: -20px">
      <q-form @submit="doDownloadCatalogue" class="row">
        <div class="col-12 font-12 text-justify">
          <span class="text-bold">{{ $t('note') }} </span>
          <span class="q-pl-sm">
            {{ $t('downloadSendEmail') }}
          </span>
        </div>
        <div class="col-12 q-mt-sm">
          <label for="">{{ $t('email') }}</label>
          <q-input
            dense
            rounded
            outlined
            lazy-rules
            color="primary"
            v-model="client.email"
            @blur="v$.email.$touch"
            :error="v$.email.$error"
            placeholder="jhon@doe.com"
          >
            <template v-slot:error>
              <span v-if="v$.email.required.$invalid">
                {{ $t('required') }}
              </span>
              <span v-if="v$.email.email.$invalid">
                {{ $t('invalidEmail') }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-12 text-center">
          <q-btn
            no-caps
            rounded
            unelevated
            type="submit"
            :loading="loading"
            text-color="white"
            :label="$t('download')"
            :style="{ backgroundColor: color || '#fba124' }"
          ></q-btn>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { defineComponent, ref } from 'vue';
import { useMainStore } from 'src/stores/main';
import { notification } from 'src/boot/notification';
import { required, email } from '@vuelidate/validators';

export default defineComponent({
  name: 'SocialShareCard',
  props: {
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  setup() {
    // data
    const client = ref({
      email: null,
    });
    const store = useMainStore();
    const loading = ref<boolean>(false);

    // rules
    const orderRule = {
      email: {
        required,
        email,
      },
    };
    const v$ = useVuelidate(orderRule, client);

    // computed

    // methods
    const doDownloadCatalogue = async () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      loading.value = true;
      try {
        const params = {
          email: client.value?.email,
          id: store.catalog._id,
        };
        const response = await store.downloadCatalogue(params);
        if (response?.success) {
          notification('positive', response?.message, 'primary');
          document.getElementById('closeModalBtn')?.click();
        }
      } catch (error) {
      } finally {
        loading.value = true;
      }
    };

    // life cycle

    // return
    return {
      v$,
      client,
      loading,
      doDownloadCatalogue,
    };
  },
});
</script>
