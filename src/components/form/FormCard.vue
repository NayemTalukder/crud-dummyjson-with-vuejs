<template>
  <div class="FormCard" style="">
    <div class="FormHeadingContainer">
      <div class="FormHeading">{{ formHeading }}</div>
    </div>
    <div class="FormBox">
      <form action="">
        <slot name="body"></slot>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "LoadMoreButton",
  props: {
    formHeading: {
      type: null as unknown as PropType<string>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.FormCard {
  @extend %center;
  flex-direction: column;
  justify-content: unset;
  width: 50%;
  padding: 4%;
}

.FormHeadingContainer {
  padding: 1vw;
}

.FormHeading {
  font-size: 2vw;
  color: $white;
}

.FormBox {
  background-color: $tertiaryColor;
  width: 100%;
  padding: 5%;
  filter: drop-shadow(0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.5));
}
</style>
