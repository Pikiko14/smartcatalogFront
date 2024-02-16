<template>
  <q-list separator>
    <q-item-label header> {{ $t('searchLabel') }} </q-item-label>
    <q-item style="margin-top: -20px">
      <q-item-section>
        <q-item-label>
          <q-input
            outlined
            :placeholder="$t('redDress')"
            v-model="search"
            dense
            rounded
            debounce="1500"
            @update:model-value="doSearchProduct"
          >
            <template v-slot:append>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item style="margin-top: 10px"></q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterSection',
  components: {},
  setup(props, { emit }) {
    // data
    const search = ref<string>('');

    // computed

    // methods
    const doSearchProduct = () => {
      emit('do-search', search.value);
    };

    // return
    return {
      search,
      doSearchProduct,
    };
  },
});
</script>
