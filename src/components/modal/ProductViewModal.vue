<template>
  <div v-if="modalState.show && modalState.type === 'SingleView'" class="Modal">
    <div class="Modal-Wrapper">
      <!-- {/* Modal Header */} -->
      <div class="Modal-Header">
        <div class="Main-header font-s-2">
          {{ item.title }}
        </div>
        <div class="Sub-header font-s-1 mr-b--1_7">
          <span class="brand">{{ item.brand }}</span>
          <span>{{ item.category }}</span>
        </div>
        <!-- {/* Close Icon */} -->
        <div>
          <font-awesome-icon
            @click="onClose"
            class="closeIcon size-2"
            icon="fa-solid fa-xmark"
          />
        </div>
      </div>
      <!--  Modal Body  -->
      <div class="Modal-Body">
        <div class="upperPart">
          <img class="thumbnail" :src="item.thumbnail" />
          <div class="infoWrapper">
            <star-rating
              :rating="item.rating"
              :increment="0.1"
              read-only
              :star-size="20"
            >
            </star-rating>
            <p>Price: {{ item.price }}</p>
            <p>Discount: {{ item.discountPercentage }}</p>
            <p>Stock: {{ item.stock }}</p>
          </div>
        </div>
        <div class="middlePart">
          <div class="secHeader">Description</div>
          <div class="description">{{ item.description }}</div>
        </div>
        <div class="lowerPart">
          <div class="secHeader">Images</div>
          <div class="imageWrapper">
            <img
              class="img"
              v-for="(src, i) in item.images"
              :key="i"
              :src="src"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductStore } from "../../stores/product";
import { getInputFieldType, getFieldValue } from "../../helper";
import StarRating from "vue-star-rating";
import type { product } from "@/types";

export default defineComponent({
  name: "ViewUpdateModal",
  components: { StarRating },
  setup() {
    const store = useProductStore();

    function onClose() {
      store.resetModalState();
    }

    function getType(label: string) {
      return getInputFieldType(label) as never;
    }

    const modalState = computed(() => {
      return store.modalState;
    });

    const item = computed(() => {
      return store.modalState.item as product;
    });

    return { getType, getFieldValue, modalState, item, onClose };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.Sub-header {
  @extend %center;
}

.thumbnail {
  width: 10vw;
  height: 10vw;
  margin-right: 2vw;
  // max-height: 11rem;
}

.infoWrapper {
  @extend %center;
  flex-direction: column;
  width: 50%;
}

.middlePart,
.lowerPart {
  @extend %center;
  flex-direction: column;
  padding: 0.5rem;
}

.secHeader {
  font-size: 2rem;
}

.imageWrapper {
  @extend %center;
  flex-wrap: wrap;
}

.img {
  width: 23%;
  margin: 1%;
}

.brand {
  margin-right: 2rem;
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
  max-height: 90vh;
  overflow: auto;
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

.upperPart {
  @extend %center;
}

.Modal-Footer {
  @extend %center;
  width: 100%;
  padding: 1vw;
}
</style>
