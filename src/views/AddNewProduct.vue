<template>
  <MainLayout>
    <AlertModal />
    <div class="AddNewProduct">
      <FormCard formHeading="Add New Product">
        <template #body>
          <FormItem label="Title" type="text" />
          <FormItem label="Description" type="textarea" />
          <FormItem label="Price" type="number" />
          <FormItem label="Discount Percentage" type="number" />
          <FormItem label="Rating" type="number" />
          <FormItem label="Stock" type="number" />
          <FormItem label="Brand" type="text" />
          <FormItem label="Category" type="text" />
          <FormItem label="Thumbnail" type="file" :onlyImage="true" />
          <FormItem label="Images" type="file" />
          <FormSubmitButton label="Add" />
        </template>
      </FormCard>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useProductStore } from "../stores/product";
import FormCard from "../components/form/FormCard.vue";
import FormItem from "../components/form/FormItem.vue";
import FormSubmitButton from "../components/button/FormSubmitButton.vue";
import AlertModal from "../components/modal/AlertModal.vue";

export default defineComponent({
  name: "AddNewProduct",
  components: { AlertModal, MainLayout, FormCard, FormItem, FormSubmitButton },
  setup() {
    const store = useProductStore();

    onBeforeMount(() => store.resetNewProduct());

    const products = computed(() => {
      return store.products;
    });
    return { products };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/typography.scss";
.AddNewProduct {
  @extend %center;
  width: 100%;
}
</style>
