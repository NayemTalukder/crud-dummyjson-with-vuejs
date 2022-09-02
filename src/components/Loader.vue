<template>
  <div class="loader">
    <font-awesome-icon
      v-if="loader"
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
      return store.loader;
    });
    return { loader };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/typography.scss";
.loader {
  @extend %center;
}

.spinner {
  color: $primaryColor;
}
</style>
