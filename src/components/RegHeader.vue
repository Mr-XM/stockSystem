<!--注册Header-->
<template>
  <div class="regHeader">
    <div class="regHeader-logo">
      <router-link to="/">
        <img src="../assets/img/logo.gif" alt>
      </router-link>
    </div>
    <div class="regHeader-title">
      <h2>用户注册</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegHeader",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.regHeader {
  width: 1000px;
  height: 72px;
  margin: 0 auto;
  position: relative;
  &-logo {
    img {
      margin-top: 30px;
    }
  }
  &-title {
    width: 110px;
    height: 35px;
    position: absolute;
    left: 130px;
    top: 25px;
    text-align: center;
    letter-spacing: 3px;
    border-left: 1px solid #ccc;
    line-height: 35px;
  }
}
</style>
