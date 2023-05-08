import { a } from "./a.js";
import { createApp, h } from "vue";
import App from "./page/App.vue";
import "./index.css";
// const App = {
//   render() {
//     return h("div", null, [h("p", null, "hello world")]);
//   },
// };
createApp(App).mount("#app");
console.log(a);
