<template>
  <thead class="thead">
    <tr>
      <th>Thumbnail</th>
      <th>Title</th>
      <th>Description</th>
      <th>Price</th>
      <th>Discount</th>
      <th>Rating</th>
      <th>Stock</th>
      <th>Brand</th>
      <th>Category</th>
      <th>Images</th>
      <th>Dtails</th>
      <th>Add to Cart</th>
      <th>Delete</th>
    </tr>
  </thead>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/typography.scss";

.thead {
  width: 100%;
  display: flex;

  tr {
    width: 100%;
    display: flex;
  }

  th {
    background-color: $primaryColor;
    padding: 1rem;
    color: $white;
    border: 0.1rem solid $tertiaryColor;
    width: 15%;
    overflow: hidden;
  }
}
</style>
