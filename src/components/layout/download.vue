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
        class="float-right"
      >
        <q-tooltip class="bg-red">
          {{ $t('close') }}
        </q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section style="margin-top: -20px">
      <q-form @submit="doDownloadCatalogue" class="row">
        <div class="col-12">
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
    const doDownloadCatalogue = () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      try {
        alert(123);
      } catch (error) {}
    };

    // life cycle

    // return
    return {
      v$,
      client,
      doDownloadCatalogue,
    };
  },
});
</script>
