<template>
  <div class="SortFilterContainer">
    <!-- Sort -->
    <div class="SortContainer">
      <div class="SortHeading">Sort By</div>
      <select class="select" v-model="sortBy">
        <option class="option" disabled value="">Please select one</option>
        <option class="option">Rating</option>
        <option class="option">Stock</option>
      </select>
    </div>
    <!-- Order -->
    <div class="OrderContainer">
      <div class="OrderHeading">Order By</div>
      <select :disabled="sortBy === ''" class="select" v-model="orderBy">
        <option class="option">Asc</option>
        <option class="option">Desc</option>
      </select>
    </div>
    <!-- Filter -->
    <div class="FilterContainer">
      <div class="FilterHeading">Filter By Price</div>
      <select class="select" v-model="filterBy">
        <option class="option" disabled value="">Please select one</option>
        <option class="option">0 - 100</option>
        <option class="option">100 - 300</option>
        <option class="option">300 - 600</option>
        <option class="option">600 - 1200</option>
        <option class="option">1200 - 2000</option>
      </select>

      <div
        v-if="sortBy !== '' || filterBy !== ''"
        @click="onClear()"
        class="clear"
      >
        clear
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useProductStore } from "../stores/product";
import { getAllProducts, getProducts } from "../service";
import { getData } from "../helper";

export default defineComponent({
  name: "SortFilter",
  setup() {
    const store = useProductStore();
    const sort = ref<string>("");
    const filter = ref<string>("");
    const order = ref<string>("Asc");

    const sortBy = computed({
      get() {
        return sort.value;
      },
      set(newValue) {
        sort.value = newValue as string;
      },
    });

    const filterBy = computed({
      get() {
        return filter.value;
      },
      set(newValue) {
        filter.value = newValue as string;
      },
    });

    const orderBy = computed({
      get() {
        return order.value;
      },
      set(newValue) {
        order.value = newValue as string;
      },
    });

    watch(sort, async (newVal, oldValue) => {
      store.setLoaderOverlay(true);
      if (
        oldValue === "" &&
        store.filter.priceRange.upperLimit === 0 &&
        store.rawProducts.length === 0
      )
        store.setRowProducts(await getAllProducts());
      store.setFilter({ sortBy: newVal });
      store.setFilteredProducts(await getData(store.filter, store.rawProducts));
      store.setProducts(store.filteredProducts.slice(0, 10));
      store.setLoaderOverlay(false);
    });

    watch(filter, async (newVal, oldValue) => {
      store.setLoaderOverlay(true);
      if (
        oldValue === "" &&
        store.filter.sortBy === "" &&
        store.rawProducts.length === 0
      )
        store.setRowProducts(await getAllProducts());
      const priceRange = {
        lowerLimit: parseInt(newVal.split(" - ")[0]),
        upperLimit: parseInt(newVal.split(" - ")[1]),
      };
      store.setFilter({ priceRange });
      store.setFilteredProducts(await getData(store.filter, store.rawProducts));
      store.setProducts(store.filteredProducts.slice(0, 10));
      store.setLoaderOverlay(false);
    });

    watch(order, async (newVal) => {
      store.filteredProducts.reverse();
      store.setProducts(store.filteredProducts.slice(0, 10));
      if (newVal === "Desc") store.setFilter({ desc: true });
      else store.setFilter({ desc: false });
      store.setLoaderOverlay(false);
    });

    async function onClear() {
      store.setLoaderOverlay(true);
      store.setLimitReached(false);
      sort.value = "";
      filter.value = "";
      order.value = "Asc";
      store.setProducts(await getProducts());
      store.setLoaderOverlay(false);
    }

    return {
      sortBy,
      filterBy,
      orderBy,
      onClear,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/typography.scss";

.SortFilterContainer {
  @extend %center;
  width: 100%;
  justify-content: space-between;
}

.SortContainer,
.FilterContainer,
.OrderContainer {
  @extend %center;
  padding: 2rem 0;
  // justify-content: flex-start;
  // width: 30%
}

.SortHeading,
.FilterHeading,
.OrderHeading {
  @extend %center;
  margin-right: 1rem;
  font-size: 2rem;
}

.select {
  text-align: center;
  height: 3rem;
  width: 15vw;
  cursor: pointer;
}

.clear {
  margin-left: 1.5rem;
  color: $primaryColor;
  cursor: pointer;
}
</style>
