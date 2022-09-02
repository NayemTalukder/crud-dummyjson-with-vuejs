<template>
  <div class="MainLayout">
    <MainHeader />
    <slot></slot>
    <slot name="body"></slot>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainHeader from "./components/header/MainHeader.vue";
import MainFooter from "./components/footer/MainFooter.vue";

export default defineComponent({
  name: "MainLayout",
  components: { MainHeader, MainFooter },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/typography.scss";

.MainLayout {
  @extend %center;
  flex-direction: column;
  width: 100%;
}
</style>
