<template>
  <section class="full-width">
    <q-form class="row" @submit="doSaveOrder">
      <div class="col-12 col-sm-6" :class="{ 'q-pr-md': $q.screen.gt.xs }">
        <label for="">{{ $t('name') }}</label>
        <q-input
          rounded
          color="primary"
          lazy-rules
          dense
          outlined
          placeholder="Jhon"
          v-model="client.name"
          @blur="v$.name.$touch"
          :error="v$.name.$error"
        >
          <template v-slot:error>
            <span v-if="v$.name.required.$invalid">
              {{ $t('required') }}
            </span>
            <span v-if="v$.name.minLength.$invalid">
              {{ $t('moreThree') }}
            </span>
            <span v-if="v$.name.maxLength.$invalid">
              {{ $t('loweSixthing') }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-6" :class="{ 'q-pl-md': $q.screen.gt.xs }">
        <label for="">{{ $t('lastName') }}</label>
        <q-input
          dense
          rounded
          outlined
          lazy-rules
          color="primary"
          placeholder="Doe"
          v-model="client.last_name"
          @blur="v$.last_name.$touch"
          :error="v$.last_name.$error"
        >
          <template v-slot:error>
            <span v-if="v$.last_name.required.$invalid">
              {{ $t('required') }}
            </span>
            <span v-if="v$.last_name.minLength.$invalid">
              {{ $t('moreThree') }}
            </span>
            <span v-if="v$.last_name.maxLength.$invalid">
              {{ $t('loweSixthing') }}
            </span>
          </template>
        </q-input>
      </div>
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
      <div class="col-12 col-sm-6" :class="{ 'q-pr-md': $q.screen.gt.xs }">
        <label for="">{{ $t('document') }}</label>
        <q-input
          rounded
          color="primary"
          lazy-rules
          dense
          outlined
          type="number"
          @blur="v$.document.$touch"
          :error="v$.document.$error"
          placeholder="10369874125"
          v-model.number="client.document"
        >
          <template v-slot:error>
            <span v-if="v$.document.required.$invalid">
              {{ $t('required') }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-6" :class="{ 'q-pl-md': $q.screen.gt.xs }">
        <label for="">{{ $t('phone') }}</label>
        <q-input
          rounded
          color="primary"
          lazy-rules
          dense
          outlined
          @blur="v$.phone.$touch"
          :error="v$.phone.$error"
          placeholder="+571237470364"
          v-model="client.phone"
        >
          <template v-slot:error>
            <span v-if="v$.phone.required.$invalid">
              {{ $t('required') }}
            </span>
            <span v-if="v$.phone.regex.$invalid">
              {{ $t('phoneRegexInvalid') }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-6" :class="{ 'q-pr-md': $q.screen.gt.sm }">
        <label for="">{{ $t('country') }}</label>
        <q-select
          rounded
          transition-show="scale"
          transition-hide="scale"
          color="primary"
          @blur="v$.country.$touch"
          lazy-rules
          dense
          outlined
          emit-value
          use-input
          @filter="filterFn"
          :options="countries"
          :error="v$.country.$error"
          placeholder="Colombia"
          v-model="client.country"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ scope.opt.label }}
                </q-item-label>
                <q-item-label caption>
                  {{ scope.opt.description }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template #error>
            <span v-if="v$.country.required.$invalid">
              {{ $t('required') }}
            </span>
          </template>
        </q-select>
      </div>
      <div class="col-12 col-sm-6" :class="{ 'q-pl-md': $q.screen.gt.xs }">
        <label for="">{{ $t('city') }}</label>
        <q-input
          rounded
          color="primary"
          lazy-rules
          dense
          outlined
          placeholder="Bogotá"
          v-model="client.city"
          @blur="v$.city.$touch"
          :error="v$.city.$error"
        >
          <template v-slot:error>
            <span v-if="v$.city.required.$invalid">
              {{ $t('required') }}
            </span>
            <span v-if="v$.city.minLength.$invalid">
              {{ $t('moreThree') }}
            </span>
            <span v-if="v$.city.maxLength.$invalid">
              {{ $t('loweSixthing') }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-12">
        <label for="">{{ $t('address') }}</label>
        <q-input
          rounded
          color="primary"
          lazy-rules
          dense
          outlined
          type="textarea"
          placeholder="Carrera 84 # 52 FC, Belen antioquia"
          v-model="client.address"
          @blur="v$.address.$touch"
          :error="v$.address.$error"
        >
          <template v-slot:error>
            <span v-if="v$.address.required.$invalid">
              {{ $t('required') }}
            </span>
            <span v-if="v$.address.minLength.$invalid">
              {{ $t('moreThree') }}
            </span>
            <span v-if="v$.address.maxLength.$invalid">
              {{ $t('loweSixthing') }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-12 text-center">
        <q-btn
          :style="{ backgroundColor: color || '#fba124' }"
          unelevated
          rounded
          type="submit"
          class="text-white"
          no-caps
          :label="$t('finishOrder')"
        ></q-btn>
      </div>
    </q-form>
  </section>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
} from '@vuelidate/validators';
import { ClientInterface } from 'src/interfaces/profile.interface';
const { regex } = helpers;

export default defineComponent({
  name: 'FinishOrderSection',
  props: {
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  setup() {
    // data
    const countries = ref<any>([]);
    const countriesAll = ref<any>([]);
    const client = ref<ClientInterface>({
      name: '',
      last_name: '',
      address: '',
      city: '',
      document: '',
      email: '',
      phone: '',
      country: 'Colombia',
    });

    // rules
    const orderRule = {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(90),
      },
      last_name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(90),
      },
      email: {
        required,
        email,
      },
      document: {
        required,
      },
      phone: {
        required,
        regex: regex(/^\+\d{1,4}[\s.-]?\(?\d{1,6}\)?[\s.-]?\d{1,15}$/),
      },
      country: {
        required,
      },
      city: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(90),
      },
      address: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(90),
      },
    };
    const v$ = useVuelidate(orderRule, client);

    // computed

    // methods
    const listCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (response.ok) {
          const data = await response.json();
          countries.value = data.map((data: any) => {
            return {
              label: data?.name.common,
              value: data?.name.common,
              icon: data?.flag,
            };
          });
          countriesAll.value = countries.value;
        } else {
          console.error('Error al obtener datos:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    const filterFn = (val: any, update: any) => {
      if (val === '') {
        update(() => {
          countries.value = countriesAll.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        countries.value = countriesAll.value.filter(
          (v: any) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const doSaveOrder = async () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      try {
      } catch (error) {
      } finally {
      }
    };

    // hook
    onBeforeMount(async () => {
      await listCountries();
    });

    // return
    return {
      v$,
      client,
      filterFn,
      countries,
      doSaveOrder,
    };
  },
});
</script>
