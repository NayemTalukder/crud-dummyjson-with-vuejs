<template>
  <div @click="onSubmit" class="FormSubmitButton">
    <div v-if="!loader" class="SubmitButtonContainer">
      <div class="SubmitButton">{{ label }}</div>
    </div>
    <Loader />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { PropType } from "vue";
import type { product } from "../../types";
import { useProductStore } from "../../stores/product";
import { addItem, updateItem } from "../../service";
import { updateObjArray, getFieldValuePair, getFieldValue } from "../../helper";
import Loader from "../Loader.vue";

export default defineComponent({
  name: "FormSubmitButton",
  components: { Loader },
  props: {
    label: {
      type: null as unknown as PropType<string>,
      required: true,
    },
    item: {
      type: null as unknown as PropType<product>,
      required: false,
    },
    updateField: {
      type: null as unknown as PropType<string>,
      required: false,
    },
  },
  setup(props) {
    const store = useProductStore();

    const loader = computed(() => {
      return store.loader;
    });

    async function onCreate() {
      await addItem(store.newProduct);
      store.setModalState({
        show: true,
        mainHeader: "Created",
        type: "Alert",
        item: store.newProduct,
      });
    }

    async function onUpdate() {
      const pair = getFieldValuePair(
        props.updateField as string,
        null as unknown as string,
        store.newProduct as unknown as product
      );

      const oldValue = getFieldValue(
        props.item as unknown as product,
        props.updateField as string
      );

      await updateItem(props.item?.id as unknown as string, pair as object);
      updateObjArray(
        store.products,
        props.item as unknown as product,
        pair as object
      );
      store.resetModalState();

      store.setModalState({
        show: true,
        mainHeader: "Updated",
        subHeader: props.updateField,
        type: "Alert",
        oldValue: oldValue,
        newValue: Object.values(pair as object)[0],
        item: props.item,
      });
    }

    async function onSubmit() {
      store.setLoader(true);
      if (props.label == "Add") await onCreate();
      else if (props.label == "Update") await onUpdate();
      store.setLoader(false);
    }

    return { onSubmit, loader };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.FormSubmitButton {
  margin-top: 1.3vw;
  margin-bottom: 0.5vw;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5));
}

.SubmitButtonContainer {
  @extend %center;
  background-color: $primaryColor;
  height: 2.5vw;
}

.SubmitButtonContainer:hover {
  @extend %center;
  background-color: $tertiaryColor;
  height: 2.6vw;
  cursor: pointer;
}

.SubmitButton {
  color: $white;
  padding: 1rem 2rem;
}
</style>
