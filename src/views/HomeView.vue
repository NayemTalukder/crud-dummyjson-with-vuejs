<template>
  <MainLayout>
    <ViewUpdateModal />
    <ProductViewModal />
    <AlertModal />
    <CartModal />
    <OverlayLoader />
    <template #body>
      <div className="ItemInfo">
        <!-- {/* Heading */} -->
        <div className="HeadingContainer">
          <div className="Heading">Products</div>
        </div>

        <!-- Sort Filter Section -->
        <SortFilter />

        <!-- {/* Item Info List */} -->
        <div className="ItemInfoListContainer">
          <TableComponent />
        </div>

        <div className="ActionBar">
          <LoadMoreButton title="Load More" />
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onUpdated } from "vue";
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
import Loader from "../components/Loader.vue";
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
    Loader,
    CartModal,
  },
  setup() {
    const store = useProductStore();

    onUpdated(() => {
      console.log("onUpdated :>> ");
    });

    onBeforeMount(async () => {
      store.setLoaderOverlay(true);
      store.setProducts(await getProducts());
      store.setLoaderOverlay(false);
    });

    const products = computed(() => {
      return store.products;
    });
    return { products };
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
  // background-color: $tertiaryColor;
  // border-radius: .3vw;
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
