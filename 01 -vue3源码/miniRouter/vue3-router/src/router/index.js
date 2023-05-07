import { createRouter } from "../../mini-router/router";
import HelloWorld from "../components/HelloWorld.vue";
import Home from "../components/Home.vue";
const routes = [
  { path: "/foo", component: HelloWorld },
  { path: "/home", component: Home },
];
const router = createRouter({ routes });
export default router;
