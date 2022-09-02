<template>
  <div v-if="modalState.show && modalState.type === 'Alert'" class="Modal">
    <div class="Modal-Wrapper">
      <!-- {/* Modal Header */} -->
      <div class="Modal-Header">
        <div class="Main-header font-s-2">
          {{ modalState.mainHeader }}
        </div>
        <div class="Sub-header font-s-1 mr-b--1_7">
          {{ item.title }}
        </div>
        <!-- {/* Close Icon */} -->
        <div>
          <font-awesome-icon
            @click="onClose(modalState.mainHeader)"
            class="closeIcon size-2"
            icon="fa-solid fa-xmark"
          />
        </div>
      </div>
      <!--  Modal Body  -->
      <div class="Modal-Body">
        <img class="thumbnail" :src="item.thumbnail" />
        <!-- For Create -->
        <div v-if="modalState.mainHeader === 'Created'" class="infoWrapper">
          <p>Price: {{ item.price }}</p>
          <p>Brand: {{ item.brand }}</p>
          <p>Rating: {{ item.rating }}</p>
          <p>Stock: {{ item.stock }}</p>
          <p>Discount Percentage: {{ item.discountPercentage }}</p>
        </div>
        <!-- For Update -->
        <div v-if="modalState.mainHeader === 'Updated'" class="updatedWrapper">
          <p class="fieldUpdated">{{ modalState.subHeader }} Updated</p>
          <!-- Thumbnail -->
          <div v-if="modalState.subHeader === 'Thumbnail'" class="imageWrapper">
            <img class="thumbnail" :src="modalState.newValue" alt="" />
          </div>
          <!-- Render Images -->
          <div v-if="modalState.subHeader === 'Images'">
            <p>Old Imagees</p>
            <div class="imageWrapper">
              <img
                v-for="(src, i) in modalState.oldValue"
                :key="i"
                class="img"
                :src="src"
              />
            </div>
            <p>New Imagees</p>
            <div class="imageWrapper">
              <img
                v-for="(src, i) in modalState.newValue"
                :key="i"
                class="img"
                :src="src"
              />
            </div>
          </div>
          <div
            v-if="
              modalState.subHeader !== 'Thumbnail' &&
              modalState.subHeader !== 'Images'
            "
            class="Updated"
          >
            <p>Old Value: {{ modalState.oldValue }}</p>
            <p>New Value: {{ modalState.newValue }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductStore } from "../../stores/product";
import type { product } from "@/types";

export default defineComponent({
  name: "ViewUpdateModal",
  setup() {
    const store = useProductStore();

    function onClose(val: string) {
      store.resetModalState();
      if (val === "Created") window.location.href = "/add-product";
    }

    const modalState = computed(() => {
      return store.modalState;
    });

    const item = computed(() => {
      return store.modalState.item as product;
    });

    return { modalState, item, onClose };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

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
}

.Modal-Wrapper {
  @extend %center;
  flex-direction: column;
  background-color: $white;
  color: $tertiaryColor;
  width: 30vw;
  border-radius: 0.3vw;
  // box-shadow: '1px 2px 9px #F4AAB9';
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

.Updated {
  @extend %center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding: 2rem;
}
</style>
