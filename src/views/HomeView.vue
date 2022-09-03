<template>
  <MainLayout>
    <ViewUpdateModal />
    <ProductViewModal />
    <AlertModal />
    <CartModal />
    <OverlayLoader />
    <template #body>
      <div class="ItemInfo">
        <!-- {/* Heading */} -->
        <div class="HeadingContainer">
          <div class="Heading">Products</div>
        </div>

        <!-- Sort Filter Section -->
        <SortFilter />

        <!-- {/* Item Info List */} -->
        <div class="ItemInfoListContainer">
          <TableComponent />
        </div>

        <div class="ActionBar">
          <LoadMoreButton title="Load More" :hide="limitReached" />
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from "vue";
import { useProductStore } from "../stores/product";
import { getProducts } from "../service";
import MainLayout from "../layouts/MainLayout.vue";
import TableComponent from "../components/table/TableComponent.vue";
import LoadMoreButton from "../components/button/LoadMoreButton.vue";
import ViewUpdateModal from "../components/modal/ViewUpdateModal.vue";
import ProductViewModal from "../components/modal/ProductViewModal.vue";
import AlertModal from "../components/modal/AlertModal.vue";
import CartModal from "../components/modal/CartModal.vue";
import OverlayLoader from "../components/OverlayLoader.vue";
import SortFilter from "../components/SortFilter.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainLayout,
    TableComponent,
    LoadMoreButton,
    ViewUpdateModal,
    AlertModal,
    OverlayLoader,
    ProductViewModal,
    SortFilter,
    CartModal,
  },
  setup() {
    const store = useProductStore();

    const limitReached = computed(() => {
      return store.limitReached;
    });

    onBeforeMount(async () => {
      store.setLoaderOverlay(true);
      store.setProducts(await getProducts());
      store.setLoaderOverlay(false);
    });

    const products = computed(() => {
      return store.products;
    });
    return { products, limitReached };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/typography.scss";

.ItemInfo {
  @extend %center;
  flex-direction: column;
  justify-content: unset;
  width: 80%;
  margin-top: 5vh;
  min-height: 70vh;
  color: $white;
}

.HeadingContainer {
  @extend %center;
  font-size: 3rem;
  margin-bottom: 2rem;
}

.ActionBar {
  @extend %center;
  margin-top: 1vw;
  width: 100%;
}
</style>
