<template>
  <div v-if="loader" class="loader">
    <font-awesome-icon
      class="spinner"
      size="lg"
      icon="fa-solid fa-circle-notch"
      spin
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductStore } from "../stores/product";

export default defineComponent({
  name: "LoaDer",
  setup() {
    const store = useProductStore();

    const loader = computed(() => {
      return store.loaderOverlay;
    });
    return { loader };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/typography.scss";
.loader {
  @extend %center;
  @extend %cover;
  @extend %absolute;
  background-color: $tertiaryColor;
  opacity: 0.75;
  z-index: 1;
}

.spinner {
  color: $primaryColor;
}
</style>
