import { computed, getCurrentInstance, inject, reactive, toRefs } from 'vue';
import { piniaSymbol } from './createPinia';
export function defineStore(id, options) {

  const { state: stateFn, actions, getters } = options;
  const state = reactive(stateFn());
  return function useStore() {
    // 获取组件实例
    const currentInstance = getCurrentInstance(); // 获取pinia实例
    const pinia = currentInstance && inject(piniaSymbol); // 判断是否存在
    if (!pinia._s.has(id)) {
      pinia._s.set(id, state);
    } // 获取store
    const store = pinia._s.get(id);
    return store;
  };
}
