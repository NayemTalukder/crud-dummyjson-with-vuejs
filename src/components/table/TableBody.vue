<template>
  <tbody class="tbody">
    <tr v-for="(item, index) in productList" :key="index">
      <TableCell :item="item" label="Thumbnail" iconType="dot" />
      <TableCell :item="item" :info="item.title" label="Title" />
      <TableCell :item="item" label="Description" iconType="dot" />
      <TableCell :item="item" :info="item.price" label="Price" />
      <TableCell
        :item="item"
        :info="item.discountPercentage"
        label="Discount Percentage"
      />
      <TableCell :item="item" :info="item.rating" label="Rating" />
      <TableCell :item="item" :info="item.stock" label="Stock" />
      <TableCell :item="item" :info="item.brand" label="Brand" />
      <TableCell :item="item" :info="item.category" label="Category" />
      <TableCell :item="item" label="Images" iconType="dot" />
      <TableCell :item="item" iconType="info" />
      <TableCell :item="item" iconType="cart" />
      <TableCell :item="item" iconType="remove" />
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TableCell from "./TableCell.vue";
import { useProductStore } from "../../stores/product";

export default defineComponent({
  name: "TableBody",
  components: { TableCell },
  setup() {
    const store = useProductStore();

    const productList = computed(() => {
      return store.products;
    });

    return {
      productList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.tbody {
  width: 100%;

  tr {
    width: 100%;
    display: flex;
  }

  td {
    @extend %center;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: $white;
    color: $secondaryColor;
    padding: 1.6vw;
    width: 15%;
    border: 0.15rem solid $tertiaryColor;
    text-align: center;
    overflow: hidden;
  }
}
</style>
