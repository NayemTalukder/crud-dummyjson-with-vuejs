<template>
  <div class="Header">
    <div class="NavContainer">
      <nav class="MainNavContainer">
        <RouterLink class="NavItem" activeClass="active" to="/"
          >Products</RouterLink
        >
        <RouterLink class="NavItem" activeClass="active" to="/add-product"
          >Add New Product</RouterLink
        >
      </nav>
      <div v-if="cart.length !== 0" @click="onCartClick" class="Cart">
        <font-awesome-icon size="lg" icon="fa-solid fa-cart-shopping" />
        <span class="totalItem">{{ cart.length }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { product } from "@/types";
import { defineComponent, computed } from "vue";
import { useProductStore } from "../../../stores/product";

export default defineComponent({
  name: "MainHeader",
  setup() {
    const store = useProductStore();

    function onCartClick() {
      store.setModalState({
        show: true,
        type: "CartModal",
      });
    }

    const cart = computed(() => {
      return store.cart as product[];
    });
    return { cart, onCartClick };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/typography.scss";

.Header {
  @extend %center;
  align-items: unset;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 6rem;
  background-color: $tertiaryColor;
}

.NavContainer {
  @extend %center;
  justify-content: space-between;
  width: 30%;
}

.UserNavContainer {
  @extend %center;
}

.NavItem {
  font-size: 1.7rem;
  margin-right: 2vw;
  text-decoration: none;
  color: $white;
}

.NavItem:hover {
  color: $primaryColor;
}

.active {
  color: $primaryColor;
}

.Cart {
  @extend %center;
  cursor: pointer;
}

.totalItem {
  color: $primaryColor;
  position: relative;
  bottom: -1rem;
}

@media (max-width: 768px) {
  .NavItem {
    font-size: 1.4rem;
  }
}

@media (max-width: 556px) {
  .NavItem {
    font-size: 1.3rem;
  }
}
</style>
