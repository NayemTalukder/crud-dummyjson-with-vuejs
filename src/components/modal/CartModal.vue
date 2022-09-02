<template>
  <div v-if="modalState.show && modalState.type === 'CartModal'" class="Modal">
    <div class="Modal-Wrapper">
      <!-- {/* Modal Header */} -->
      <div class="Modal-Header">
        <div class="Main-header font-s-2">Cart</div>
        <div class="Sub-header font-s-1 mr-b--1_7">Items you added</div>
        <!-- {/* Close Icon */} -->
        <div>
          <font-awesome-icon
            @click="onClose()"
            class="closeIcon size-2"
            icon="fa-solid fa-xmark"
          />
        </div>
      </div>
      <!--  Modal Body  -->
      <div class="Modal-Body">
        <table>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>quantity</th>
            <th>Plus</th>
            <th>Minus</th>
          </tr>
          <tr v-for="(item, i) in cart" :key="i">
            <td><img class="thumbnail" :src="item.thumbnail" /></td>
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <font-awesome-icon
                class="icon"
                @click="modifyCart(item, 1)"
                icon="fa-solid fa-plus"
                size="lg"
              />
            </td>
            <td>
              <font-awesome-icon
                class="icon"
                @click="modifyCart(item, -1)"
                icon="fa-solid fa-minus"
                size="lg"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductStore } from "../../stores/product";
import { arrayFindObjIndex } from "../../helper";
import type { product, cartItem } from "@/types";

export default defineComponent({
  name: "ViewUpdateModal",
  setup() {
    const store = useProductStore();

    function onClose() {
      store.resetModalState();
    }

    function modifyCart(item: cartItem, val: number) {
      const index = arrayFindObjIndex(store.cart, item);
      if (index > -1) {
        const qty = store.cart[index].quantity + val;
        if (qty >= 0) store.cart[index].quantity = qty;
      }
    }

    const cart = computed(() => {
      return store.cart;
    });

    const modalState = computed(() => {
      return store.modalState;
    });

    const item = computed(() => {
      return store.modalState.item as product;
    });

    return { modalState, modifyCart, item, onClose, cart };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

tr {
  width: 100%;
  display: flex;
}

th {
  background-color: $primaryColor;
  padding: 1rem;
  color: $white;
  border: 0.1rem solid $tertiaryColor;
  width: 20%;
  overflow: hidden;
}

td {
  @extend %center;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: $white;
  color: $secondaryColor;
  padding: 0.3vw;
  width: 20%;
  border: 0.15rem solid $tertiaryColor;
  text-align: center;
  overflow: hidden;
}

.Sub-header {
  @extend %center;
}

.thumbnail {
  width: 50%;
}

.infoWrapper,
.updatedWrapper {
  @extend %center;
  flex-direction: column;
  width: 100%;
}

.Modal {
  @extend %center;
  @extend %cover;
  @extend %absolute;
  background-color: $tertiaryColor;
  opacity: 0.95;
  z-index: 2;
  overflow-y: auto;
}

.Modal-Wrapper {
  @extend %center;
  flex-direction: column;
  background-color: $white;
  color: $tertiaryColor;
  width: 30vw;
  border-radius: 0.3vw;
  overflow-y: auto;
}

.Modal-Header {
  @extend %center;
  position: relative;
  flex-direction: column;
  width: 100%;
  border-bottom: 2px solid $tertiaryColor;
  // padding: 1vw;
}

.Main-header {
  font-size: 2rem;
}

.closeIcon {
  position: relative;
  top: -1.2vw;
  right: -13.4vw;
  color: $primaryColor;
  cursor: pointer;
}

.closeIcon:hover {
  width: 2.1vw;
  height: 2.1vw;
}

.Modal-Body {
  @extend %center;
  flex-direction: column;
  padding: 1vw;
  width: 100%;
  border-bottom: 2px solid $tertiaryColor;
}

.fieldUpdated {
  background-color: $primaryColor;
  color: $white;
  margin: 1rem 0.5rem;
  padding: 0.5rem 1rem;
  text-align: center;
}

.imageWrapper {
  @extend %center;
  flex-wrap: wrap;
  width: 100%;
}

.img {
  width: 15%;
  margin: 1%;
}

.icon {
  cursor: pointer;
}
</style>
