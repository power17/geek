import { unref, h, defineComponent } from "vue";
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const to = unref(props.to);
    return () => h("a", { href: "#" + to }, slots);
    // console.log(!slots.hasOwnProperty("default") && "default" in slots);
    // console.log(slots.default());
  },
});
