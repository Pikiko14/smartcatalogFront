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
            <span v-if="v$.name.regex.$invalid">
              {{ $t('noValid') }}
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
            <span v-if="v$.last_name.regex.$invalid">
              {{ $t('noValid') }}
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
            <span v-if="v$.city.regex.$invalid">
              {{ $t('noValid') }}
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
            <span v-if="v$.address.regex.$invalid">
              {{ $t('noValid') }}
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
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
} from '@vuelidate/validators';
import { useShoppingBagStore } from 'src/stores/shoppingBag';
import { useMainStore } from 'src/stores/main';
import { ShoppingBagInterface } from 'src/interfaces/shoppingBag.interface';
import { Utils } from 'src/utils/utils';
import { useI18n } from 'vue-i18n';
import { ResponseObj } from 'src/interfaces/api';
import { notification } from 'src/boot/notification';
const { regex } = helpers;

export default defineComponent({
  name: 'FinishOrderSection',
  props: {
    color: {
      type: String,
      default: () => '#fba124',
    },
  },
  setup(props, { emit }) {
    // data
    const { t } = useI18n();
    const utils = new Utils('order');
    const countries = ref<any>([]);
    const countriesAll = ref<any>([]);
    const client = ref<any>({
      name: '',
      last_name: '',
      address: '',
      city: '',
      document: '',
      email: '',
      phone: '',
      country: 'Colombia',
    });
    const mainStore = useMainStore();
    const shoppingStore = useShoppingBagStore();

    // rules
    const orderRule = {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(90),
        regex: regex(/^[a-zA-Z\u00C0-\u024F\s]+$/),
      },
      last_name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(90),
        regex: regex(/^[a-zA-Z\u00C0-\u024F\s]+$/),
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
        regex: regex(/^[a-zA-Z\u00C0-\u024F\s]+$/),
      },
      address: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(90),
        regex: regex(/^[a-zA-Z0-9#-°\s]+$/),
      },
    };
    const v$ = useVuelidate(orderRule, client);

    // computed
    const shoppingItems = computed(() => {
      return shoppingStore.items;
    });

    const total = computed(() => {
      return shoppingStore.total;
    });

    const profile = computed(() => {
      return mainStore.profile;
    });

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
      // prepare message label
      const message = prepareMessage();
      // send order to backend
      try {
        const catalogueId = mainStore.catalog._id;
        const response = (await shoppingStore.doOrder(
          client.value,
          catalogueId
        )) as ResponseObj;
        if (response?.success) {
          client.value = {
            name: '',
            last_name: '',
            address: '',
            city: '',
            document: '',
            email: '',
            phone: '',
            country: 'Colombia',
          };
          notification('positive', response.message, 'primary');
          setTimeout(() => {
            const whatsappLink = `https://wa.me/${profile.value.phone_number}/?text=${message}`;
            window.open(whatsappLink, '_blank');
          }, 1500);
          emit('close-modal');
        }
      } catch (error) {
      } finally {
      }
    };

    const prepareMessage = () => {
      const whatsappMessage = profile.value.whatsapp_message;
      if (!whatsappMessage) {
        console.error('No hay mensaje de WhatsApp disponible.');
        return;
      }

      // Set client data
      let clientLabel = '';
      const keysObject = Object.keys(client.value);
      keysObject.map((data: any) => {
        if (data === 'address') {
          client.value[data] = client.value[data].replace('#', 'N°');
        }
        clientLabel += `%0D%0A *${t(data)}*: ${client.value[data]} `;
      });

      // Set shopping items data
      let itemsString = '';
      shoppingItems.value.forEach((data: ShoppingBagInterface, idx: number) => {
        itemsString += `${idx === 0 ? '%0D%0A' : ''}*${data.name} | ${
          data.attribute
        } | x${data.quantity} | ${utils.formatPrice(data.total)}* %0D%0A`;
      });

      // Replace templates
      const replacements = [
        { pattern: /{{\s*order\s*}}/g, replacement: itemsString },
        {
          pattern: /{{\s*total\s*}}/g,
          replacement: `${utils.formatPrice(total.value)}`,
        },
        { pattern: /{{\s*cliente\s*}}/g, replacement: `${clientLabel}` },
      ];
      let messageClean = clearHtml(whatsappMessage);
      replacements.forEach(({ pattern, replacement }) => {
        messageClean = messageClean.replace(pattern, replacement);
      });

      // Return messages
      return messageClean;
    };

    const clearHtml = (message: string) => {
      let cleanMessage: any = message.replace(
        /<(?!\/?(br|b)\s*\/?>)[^>]+>/g,
        ''
      ); // Elimina todas las etiquetas excepto <br> y <br/>
      cleanMessage = cleanMessage.replace(/<br\s*[/]?>/gi, '%0D%0A'); // Convierte <br> y <br/> en %0D%0A
      cleanMessage = cleanMessage.replace(/<b>(.*?)<\/b>/gi, '*$1*'); // Elimina <b> y </b>, conserva el texto entre ellos
      cleanMessage = cleanMessage.replace(/\*\*(.*?)\*\*/g, '*$1*'); // Elimina asteriscos dobles que puedan quedar después de la conversión de negritas
      return cleanMessage;
    };

    const addProductToCart = async () => {
      try {
        await shoppingStore.addToCart();
      } catch (error) {}
    };

    // hook
    onBeforeMount(async () => {
      await listCountries();
      await addProductToCart();
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
