<template>
  <div class="Footer">
    <div class="FooterText">All rights reserved © 2022</div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../assets/scss/typography.scss";

.Footer {
  @extend %center;
  // @extend %bottomFixed;
  height: 5rem;
  width: 100%;
  background-color: $black;
  color: $white;
  margin-top: 5%;
}
</style>
