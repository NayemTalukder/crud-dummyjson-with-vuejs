<template>
  <div v-if="!hide" class="wrapper">
    <div v-if="!loader" @click="onLaodMore" class="Button">
      <div class="ButtonInner">{{ title }}</div>
    </div>
    <Loader />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
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
      type: null as unknown as PropType<boolean>,
      required: false,
    },
  },
  components: { Loader },
  setup() {
    const store = useProductStore();

    const loader = computed(() => {
      return store.loader;
    });

    async function onLaodMore() {
      store.setLoader(true);
      if (store.products.length === 0) {
        store.setProducts(await getProducts());
      } else {
        if (
          store.filter.sortBy === "" &&
          store.filter.priceRange.upperLimit === 0
        ) {
          const data = await getProducts(
            store.products[store.products.length - 1].id
          );

          if (data.length === 0) store.setLimitReached(true);
          else store.setProducts([...store.products, ...data]);
        } else {
          const curNumItems = store.products.length;
          if (store.filteredProducts.length > curNumItems) {
            store.setProducts([
              ...store.products,
              ...store.filteredProducts.slice(curNumItems, curNumItems + 10),
            ]);
          } else store.setLimitReached(true);
        }
      }
      store.setLoader(false);
    }

    return { loader, onLaodMore };
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
