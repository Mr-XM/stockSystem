<!--个人登录中心-->
<template>
  <div class="loginHeader">
    <div class="loginHeader-logo">
      <router-link to="/">
        <img src="../assets/img/logo.gif" alt>
      </router-link>
    </div>
    <div class="loginHeader-title">
      <h2>个人登录中心</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginHeader",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.loginHeader {
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
    width: 160px;
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
