<!--头部页面-->
<template>
  <div class="top">
    <div class="top-context">
      <ul class="top-context-left">
        <li>欢迎来到证券交易！</li>
        <li>
          <router-link to="/login">{{phone}}</router-link>
        </li>
        <li>
          <router-link to="/reg">免费注册</router-link>
        </li>
      </ul>
      <div class="top-context-center"></div>
      <ul class="top-context-right">
        <li>
          <router-link to="/">网站首页</router-link>
        </li>
        <li @click="exit" class="top-context-right-menu">
          <span class="menu">退出</span>
        </li>
        <li>
          <router-link to="/trade">证券交易</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Top",
  inject: ["reload"],
  created() {
    this.localLogin(localStorage.phone);
  },
  computed: {
    ...mapState(["phone"])
  },
  methods: {
    ...mapMutations(["exitLogin"]),
    ...mapMutations(["localLogin"]),
    exit() {
      if (this.phone != "未登录") {
        alert("退出成功！");
        this.exitLogin();
        this.reload();
      } else {
        alert("尚未登陆！");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.top {
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 3rem;
  box-shadow: 0 4px 4px #e6e6e6;
  background-color: #ffffff;
  &-context {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    &-left {
      width: 28%;
      height: 100%;
      flex: 1;
      li {
        float: left;
        padding: 0.5rem;
        a:hover {
          color: orange;
        }
      }
    }
    &-center {
      height: 100%;
      flex: 1;
    }
    &-right {
      width: 30%;
      height: 100%;
      flex: 0.8;
      li {
        float: left;
        padding: 0.5rem;
        img {
          width: 10px;
          height: 10px;
        }
        a:hover {
          color: orange;
        }
      }
      &-menu {
        a:hover {
          color: orange;
        }
        &-list {
          border: 1px solid #ccc;
          background: #ffffff;
          border-top: 0;
          position: absolute;
          top: 36px;
          right: 255px;
          width: 100px;
          display: none;
          li {
            padding: 0 14px;
          }
        }
      }
    }
  }
  .top-context-right-menu:hover {
    ul {
      display: block;
    }
    img {
      transform: rotate(90deg);
      transition: transform 0.2s;
    }
  }
  a {
    color: #6c6c6c;
  }
}
</style>
