import { boot } from 'quasar/wrappers';
import VueSocialSharing from 'vue-social-sharing';

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(VueSocialSharing);
});
