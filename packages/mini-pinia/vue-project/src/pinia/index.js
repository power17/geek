import { computed, reactive, toRefs } from 'vue';
export function useCounterStore() {
  const state = reactive({ count: 0 });
  const store = reactive({
    ...toRefs(state),
    inc() {
      state.count++;
    },
    doubleCounter() {
      return;
    },
    $patch(partialStateOrMutator) {
      if (typeof partialStateOrMutator === 'object') {
        Object.keys(partialStateOrMutator).forEach((key) => {
          state[key] = partialStateOrMutator[key];
        });
      } else {
        partialStateOrMutator(state);
      }
    },
  });
  return store;
}


export function defineStore1(options) {
  const { state: stateFn, actions, getters } = options;
  const state = reactive(stateFn());
  return function useStore() {
    const store = reactive({
      ...toRefs(state),
      ...Object.keys(actions).reduce((wrapActions, actionName) => {
        wrapActions[actionName] = () => actions[actionName].call(store);
        return wrapActions;
      }, {}),
      ...Object.keys(getters || {}).reduce((computedGetters, name) => {
        computedGetters[name] = computed(() => {
          return getters[name].call(store, store);
        });
        return computedGetters;
      }, {}),
      $patch(partialStateOrMutator) {
        if (typeof partialStateOrMutator === 'object') {
          Object.keys(partialStateOrMutator).forEach((key) => {
            state[key] = partialStateOrMutator[key];
          });
        } else {
          partialStateOrMutator(state);
        }
      },
    });
    return store;
  };
}

export { createPinia } from "./createPinia"; 
export { defineStore } from "./store"
