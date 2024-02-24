<template>
  <div class="not-found">
    <section class="grid-not-found">
      <div class="grid-container">
        <div class="image-section">
          <!-- Aquí va tu imagen o q-icon -->
          <q-avatar color="white" size="200pt">
            <q-icon size="100pt" name="sentiment_dissatisfied"></q-icon>
          </q-avatar>
        </div>
        <div class="text-section">
          <!-- Aquí va tu texto -->
          <div class="row">
            <div class="col-12">
              <p class="text-h2 text-bold">404</p>
            </div>
            <div class="col-12" style="margin-top: -20px">
              <p class="text-h6">{{ $t('notFoundCatalog') }}</p>
            </div>
            <div class="col-12" style="margin-top: -10px">
              <p style="color: #6f7378" class="font-12">
                {{ $t('notFoundCatalogText') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundComponent',
});
</script>

<style scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background: #dfdfe8;
  z-index: 999999999999999;
  top: 0;
}

.grid-not-found {
  width: 650px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas de igual tamaño */
  gap: 0px; /* Espacio entre las columnas */
}

.image-section {
  grid-column: 1; /* Esta sección ocupa la primera columna */
}

.text-section {
  display: flex;
  align-items: center;
  grid-column: 2; /* Esta sección ocupa la segunda columna */
  margin-left: -110px;
  z-index: 99;
}
</style>
