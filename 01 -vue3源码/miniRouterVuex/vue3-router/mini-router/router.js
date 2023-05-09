import RouterLink from "./router-link";
import RouterView from "./router-view";
import { ref } from "vue";
export const createRouter = (options) => {
  const router = {
    options,
    current: ref(window.location.hash.replace("#", "") || "/"),
    install(app) {
      const router = this;

      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
    },
  };
  window.addEventListener("hashchange", () => {
    router.current.value = window.location.hash.slice(1);
  });

  return router;
};
