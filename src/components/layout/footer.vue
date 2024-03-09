<template>
  <footer
    class="footer"
    :style="{ background: `${profile.brand_color || '#fba124'} !important` }"
  >
    <ul class="social-icon">
      <li
        class="social-icon__item"
        v-for="(rRsS, idx) in profile.rrss_link"
        :key="idx"
      >
        <a class="social-icon__link" :href="`${rRsS.url}`" target="__blank">
          <i :class="rRsSIcons[rRsS.type]"></i>
        </a>
      </li>
    </ul>
    <p>
      &copy;{{ year }} {{ profile.brand_name || 'CreWeb' }} | todos los derechos
      reservados.
    </p>
  </footer>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterPage',
  props: {
    brandName: {
      type: String,
      default: () => 'CreWeb',
    },
    profile: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    // data
    const year = new Date().getFullYear();
    const rRsSIcons: any = {
      Facebook: 'fab fa-facebook',
      Twitter: 'fab fa-twitter',
      Instagram: 'fab fa-instagram',
    };

    // computed
    // methods

    // life cycle

    // return
    return {
      year,
      rRsSIcons,
    };
  },
});
</script>

<style lang="css" scoped>
.footer {
  position: relative;
  width: 100%;
  min-height: 100px;
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
}

.social-icon,
.menu {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
}

.social-icon__item,
.menu__item {
  list-style: none;
}

.social-icon__link {
  font-size: 1.5rem;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;
  font-weight: 800;
}
.social-icon__link:hover {
  transform: translateY(-10px);
}

.menu__link {
  font-size: 1.2rem;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;
  text-decoration: none;
  opacity: 0.75;
  font-weight: 300;
  font-weight: 500;
}

.menu__link:hover {
  opacity: 1;
}

.footer p {
  color: #fff;
  margin: 0px 0 10px 0;
  font-size: 1rem;
  font-weight: 300;
  font-weight: 500;
}
</style>
