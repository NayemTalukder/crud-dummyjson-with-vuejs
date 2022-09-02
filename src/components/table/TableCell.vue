<template>
  <td>
    <span
      v-if="
        iconType === 'dot' ||
        iconType === 'info' ||
        iconType === 'cart' ||
        iconType === 'remove'
      "
    >
      <font-awesome-icon
        v-if="iconType === 'dot'"
        @click="viewDetails(item)"
        class="cursor-pointer"
        icon="fa-solid fa-ellipsis"
        size="lg"
      />
      <font-awesome-icon
        v-if="iconType === 'info'"
        @click="viweSingleProduct(item)"
        class="cursor-pointer"
        icon="fa-solid fa-info"
        size="lg"
      />
      <font-awesome-icon
        v-if="iconType === 'cart'"
        @click="addToCart(item)"
        class="cursor-pointer"
        icon="fa-solid fa-cart-plus"
        size="lg"
      />
      <font-awesome-icon
        v-if="iconType === 'remove'"
        @click="onDelete(item)"
        class="delete"
        icon="fa-solid fa-circle-xmark"
        size="lg"
      />
    </span>
    <span v-else>{{ info }}</span>
    <font-awesome-icon
      v-if="iconType !== 'info' && iconType !== 'cart' && iconType !== 'remove'"
      @click="onUpdate(item)"
      class="cursor-pointer"
      icon="fa-solid fa-pen-to-square"
      size="lg"
      :border="true"
    />
  </td>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { PropType } from "vue";
import { useProductStore } from "../../stores/product";
import { addItem, getItem, deleteItem } from "../../service";
import { arrayDeleteByItem, arrayFindObjIndex } from "../../helper";
import type { product, cartItem } from "../../types";

export default defineComponent({
  name: "TableCell",
  props: {
    item: {
      type: null as unknown as PropType<product>,
      required: true,
    },
    info: {
      type: null as unknown as PropType<string | number | string[]>,
      required: false,
    },
    label: {
      type: null as unknown as PropType<string>,
      required: false,
    },
    iconType: {
      type: null as unknown as PropType<string>,
      required: false,
    },
  },
  setup(props) {
    const store = useProductStore();

    const src = computed(() => {
      return props.item.thumbnail as string;
    });

    function addToCart(item: product) {
      const index = arrayFindObjIndex(store.cart, item);
      if (index > -1) {
        store.cart[index].quantity = store.cart[index].quantity + 1;
      } else store.setCart([...store.cart, { ...item, quantity: 1 }]);

      store.setModalState({
        show: true,
        mainHeader: "Added",
        type: "Alert",
        item: item,
      });
    }

    async function onSubmit() {
      await addItem(store.newProduct);
      window.location.href = "/add-product";
    }

    function onDelete(item: product) {
      deleteItem(item.id);
      arrayDeleteByItem(store.products, item);
      store.setModalState({
        show: true,
        mainHeader: "Deleted",
        type: "Alert",
        item: item,
      });
    }

    function onUpdate(item: product) {
      store.setModalState({
        show: true,
        onlyView: false,
        mainHeader: item.title,
        subHeader: props.label,
        type: "ViewUpdate",
        item: item,
      });
    }

    function viewDetails(item: product) {
      store.setModalState({
        show: true,
        mainHeader: item.title,
        subHeader: props.label,
        type: "ViewUpdate",
        item: item,
      });
    }

    async function viweSingleProduct(item: product) {
      store.setLoaderOverlay(true);
      const data = await getItem(item.id.toString());
      store.setModalState({
        show: true,
        type: "SingleView",
        item: data,
      });
      store.setLoaderOverlay(false);
    }

    return {
      src: src.value,
      onSubmit,
      onDelete,
      onUpdate,
      viewDetails,
      viweSingleProduct,
      addToCart,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.thumbnail {
  width: 100%;
}

.delete {
  color: $primaryColor;
  cursor: pointer;
}
</style>
