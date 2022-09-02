<template>
  <div v-if="modalState.show && modalState.type === 'ViewUpdate'" class="Modal">
    <div class="Modal-Wrapper">
      <!-- {/* Modal Header */} -->
      <div class="Modal-Header">
        <div class="Main-header font-s-2">
          {{ modalState.mainHeader }}
        </div>
        <div class="Sub-header font-s-1 mr-b--1_7">
          {{ modalState.subHeader }}
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
        <span v-if="modalState.onlyView">
          <div
            v-if="modalState.subHeader === 'Description'"
            class="description"
          >
            {{ item.description }}
          </div>
          <div
            class="imageWrapper"
            v-else-if="modalState.subHeader === 'Thumbnail'"
          >
            <img class="thumbnail" :src="item.thumbnail" />
          </div>
          <div class="imageWrapper" v-else>
            <img
              class="img"
              v-for="(src, i) in item.images"
              :key="i"
              :src="src"
            />
          </div>
        </span>
        <FormItem
          v-else
          :label="modalState.subHeader"
          :type="getType(modalState.subHeader)"
          :inverse="true"
          :onlyImage="modalState.subHeader === 'Thumbnail'"
        />
      </div>
      <!-- {/* Modal Footer */} -->
      <div v-if="!modalState.onlyView" class="Modal-Footer">
        <FormSubmitButton
          label="Update"
          :item="item"
          :updateField="modalState.subHeader"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductStore } from "../../stores/product";
import FormSubmitButton from "../button/FormSubmitButton.vue";
import FormItem from "../form/FormItem.vue";
import { getInputFieldType, getFieldValue } from "../../helper";
import type { product } from "@/types";

export default defineComponent({
  name: "ViewUpdateModal",
  components: { FormItem, FormSubmitButton },
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

    return {
      getType,
      getFieldValue,
      modalState,
      onClose,
      item,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.Modal {
  @extend %center;
  @extend %cover;
  @extend %absolute;
  background-color: $tertiaryColor;
  opacity: 0.95;
  z-index: 1;
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
  padding: 1vw;
  width: 100%;
  border-bottom: 2px solid $tertiaryColor;
}

.Modal-Footer {
  @extend %center;
  width: 100%;
  padding: 1vw;
}

.imageWrapper {
  @extend %center;
  flex-wrap: wrap;
}
.thumbnail {
  width: 50%;
}

.img {
  width: 23%;
  margin: 1%;
}
</style>
