<template>
  <table className="table font-size-2-5">
    <TableHeader />
    <TableBody />
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import MainLayout from "../layouts/MainLayout.vue";
import TableHeader from "./TableHeader.vue";
import TableBody from "./TableBody.vue";

export default defineComponent({
  name: "HomeView",
  components: { TableHeader, TableBody },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.table {
  @extend %center;
  flex-direction: column;
  width: 100%;
  color: $white;
  background-color: $tertiaryColor;
}
</style>
