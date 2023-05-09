import { createApp, reactive } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./strore";

const app = createApp(App);
app.use(router).use(store).mount("#app");
// console.log(app);
// app.config.globalProperties.$store = reactive({ count: 1 });
