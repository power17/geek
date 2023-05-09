import { defineComponent, getCurrentInstance, h, unref } from "vue";
import HelloWorld from "../src/components/HelloWorld.vue";
export default defineComponent({
  setup() {
    return () => {
      const {
        proxy: { $router },
      } = getCurrentInstance();
      const route = $router.options.routes.find((route) => {
        return route.path === unref($router.current);
      });
      console.log(route);
      if (route) {
        return h(route.component);
      }
    };
  },
});
