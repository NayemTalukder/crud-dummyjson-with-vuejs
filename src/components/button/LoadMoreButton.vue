<template>
  <div v-if="!limitReached || noProduct.length === 0" class="wrapper">
    <div
      v-if="!loader"
      @click="onLaodMore"
      :class="['Button', { 'd-none': isHide }]"
    >
      <div className="ButtonInner">{{ title }}</div>
    </div>
    <Loader />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import type { PropType } from "vue";
import { getProducts } from "../../service";
import { useProductStore } from "../../stores/product";
import Loader from "../Loader.vue";

export default defineComponent({
  name: "LoadMoreButton",
  props: {
    title: {
      type: null as unknown as PropType<string>,
      required: true,
    },
    hide: {
      type: false as unknown as PropType<boolean>,
      required: false,
    },
  },
  components: { Loader },
  setup(props) {
    const store = useProductStore();
    const isHide = computed(() => {
      return props.hide;
    });

    const loader = computed(() => {
      return store.loader;
    });

    const noProduct = computed(() => {
      return store.products;
    });

    async function onLaodMore() {
      store.setLoader(true);
      if (
        store.filter.sortBy === "" &&
        store.filter.priceRange.upperLimit === 0
      ) {
        const data = await getProducts(
          store.products[store.products.length - 1].id
        );

        if (data.length === 0) store.setLimitReached(true);
        else store.products = [...store.products, ...data];
      } else {
        const curNumItems = store.products.length;
        if (store.filteredProducts.length > curNumItems) {
          store.setProducts([
            ...store.products,
            ...store.filteredProducts.slice(curNumItems, curNumItems + 10),
          ]);
        } else store.setLimitReached(true);
      }
      store.setLoader(false);
    }

    const limitReached = computed(() => {
      return store.limitReached;
    });

    return { loader, isHide, onLaodMore, limitReached, noProduct };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.wrapper {
  display: flex;
}

.Button {
  background-color: $primaryColor;
  color: $white;
  cursor: pointer;
  border-radius: 0.5vw;
}

.Button:hover {
  opacity: 0.9;
  color: $secondaryColor;
}

.ButtonInner {
  padding: 0.5vw 2vw;
  margin-top: -0.3vw;
}
</style>
