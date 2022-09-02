<template>
  <div :class="['FormItem']">
    <div :class="['FormItemLabelContainer', { inverse: inverse }]">
      <div class="FormItemLabel">{{ label }}</div>
    </div>

    <div :class="['inputFieldWrapper', { inverse: inverse }]">
      <input
        v-if="type === 'number'"
        v-model="input"
        class="InputField"
        :type="type"
        min="0"
        placeholder="0"
      />

      <input
        v-if="type === 'text'"
        v-model="input"
        class="InputField"
        :type="type"
        :placeholder="label"
      />

      <textarea
        v-if="type === 'textarea'"
        v-model="input"
        class="InputField TextAreaField"
        :type="type"
        :placeholder="label"
      ></textarea>

      <div id="fileInput" v-if="type === 'file'" class="fileInputWrapper">
        <input
          v-if="!onlyImage || (onlyImage && imgDisplay.length < 1)"
          @change="onLoadFile"
          class="InputField File"
          :type="type"
        />
        <div :class="['imgDisplay', { 'justify-content-center': onlyImage }]">
          <div class="imgWrapper" v-for="(src, i) in imgDisplay" :key="i">
            <img class="img" :src="src" />
            <font-awesome-icon
              @click="onDelete(src)"
              class="close"
              icon="fa-solid fa-circle-xmark"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import type { PropType } from "vue";
import { useProductStore } from "../../stores/product";
import { arrayDeleteByItem, loadFile } from "../../helper";

export default defineComponent({
  name: "LoadMoreButton",
  props: {
    label: {
      type: null as unknown as PropType<string>,
      required: true,
    },
    type: {
      type: null as unknown as PropType<string>,
      required: true,
    },
    onlyImage: {
      type: null as unknown as PropType<boolean>,
      required: false,
    },
    inverse: {
      type: null as unknown as PropType<boolean>,
      required: false,
    },
  },
  setup(props) {
    const store = useProductStore();
    const input = ref<string>("");
    const inputImg = ref<string[]>([]);

    function onLoadFile(event: Event) {
      inputImg.value.push(loadFile(event));
      if (props.onlyImage) {
        store.setNewProduct(props.label, inputImg.value[0]);
      } else store.setNewProduct(props.label, inputImg.value);
    }

    function onDelete(item: string) {
      arrayDeleteByItem(inputImg.value, item);
    }

    watch(input, (newVal) => {
      store.setNewProduct(props.label, newVal);
    });

    const imgDisplay = computed(() => {
      return inputImg.value;
    });
    return { input, imgDisplay, onLoadFile, onDelete };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.FormItem {
  @extend %center;
  align-items: unset;
  flex-direction: column;
  width: 100%;

  .FormItemLabelContainer {
    padding-top: 0.5vw;
    padding-bottom: 0.5vw;

    .FormItemLabel {
      font-size: 1.5vw;
      color: $white;
    }
  }

  .InputField,
  .selectField {
    height: 2.5vw;
    border: none;
  }

  .TextAreaField {
    min-height: 7rem;
    max-height: 20rem;
    resize: vertical;
    border: none;
  }

  .InputField:focus,
  .TextAreaField:focus {
    border: 1px solid $tertiaryColor;
  }

  input[placeholder],
  textarea[placeholder] {
    padding-left: 1vw;
    color: $placeholder;
    font-size: 0.9vw;
  }

  .imgDisplay {
    @extend %center;
    justify-content: unset;
    flex-wrap: wrap;
  }

  .imgWrapper {
    width: 46%;
    margin: 2%;
    margin-bottom: -2rem;
  }

  .img {
    width: 100%;
    height: 10rem;
    display: inline;
  }
  .close {
    position: relative;
    left: 90%;
    top: -10.5rem;
    width: 2rem;
    color: $primaryColor;
    cursor: pointer;
  }

  .inputFieldWrapper {
    width: 100%;

    .InputField {
      width: 100%;
    }
  }

  .inverse {
    width: 100% !important;
    .FormItemLabel {
      color: $tertiaryColor !important;
    }

    .InputField {
      width: 100%;
      background-color: $tertiaryColor !important;
    }

    .File {
      background-color: $white !important;
    }
  }
}
</style>
