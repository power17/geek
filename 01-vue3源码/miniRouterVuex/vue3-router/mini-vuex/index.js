import { computed, reactive, watch } from "vue";

export const createStore = (options) => {
  const store = {
    _state: reactive(options.state()),
    get state() {
      return store._state;
    },
    set state(v) {
      console.warn("don't set");
    },
    _mutations: options.mutations,
    commit(type, payload) {
      const entry = store._mutations[type];
      if (entry) {
        store._withCommit(() => {
          entry.call(store.state, store.state, payload);
        });
      } else {
        console.warn(`unknow mutation type: ${type}`);
      }
    },
    _actions: options.actions,
    dispatch(type, payload) {
      const entry = store._actions[type];
      if (entry) {
        return entry.call(store.state, { commit: store.commit });
      } else {
        console.warn(`unknow actions type: ${type}`);
      }
    },
    _commit: false,
    _withCommit(fn) {
      store._commit = true;
      fn();
      store._commit = false;
    },
  };
  if (options.strict) {
    watch(
      store.state,
      () => {
        console.log("watch");
        if (!store._commit) {
          console.warn("please use commit to mutation state");
        }
      },
      {
        deep: true,
        flush: "sync",
      }
    );
  }
  // getters
  store.getters = {};
  Object.keys(options.getters).forEach((key) => {
    const result = computed(() => {
      const getter = options.getters[key];
      if (getter) {
        return getter.call(store, store.state);
      } else {
        console.error("unknown getter type" + key);
      }
    });
    Object.defineProperty(store.getters, key, {
      get() {
        return result;
      },
    });
  });
  store.install = (app) => {
    console.log("store", store);
    // 全局实例对象
    app.config.globalProperties.$store = store;
  };
  return store;
};
