import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router';
import App from './App.vue';
import './taiwind.css';
import { createI18n } from 'vue-i18n';
const i18n = createI18n({ legacy: false, locale: 'en' });
const app = createApp(App);
const pinia = createPinia();
app.use(pinia).use(i18n).use(router).mount('#app');
