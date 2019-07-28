<!--页面底部-->
<template>
  <div class="footer">
    <div class="footer-server">
      <ul>
        <li>
          <router-link to>关于我们</router-link>
        </li>
        <li>
          <router-link to>广告服务</router-link>
        </li>
        <li>
          <router-link to>联系我们</router-link>
        </li>
        <li>
          <router-link to>诚聘英才</router-link>
        </li>
        <li>
          <router-link to>免责声明</router-link>
        </li>
        <li>
          <router-link to>法律声明</router-link>
        </li>
        <li>
          <router-link to>隐私保护</router-link>
        </li>
        <li>
          <router-link to>征稿启事</router-link>
        </li>
        <li>
          <router-link to>网站地图</router-link>
        </li>
        <li>
          <router-link to>放心搜</router-link>
        </li>
        <li>
          <router-link to>友情链接</router-link>
        </li>
      </ul>
    </div>
    <div class="footer-letter">
      违法和不良信息举报:18846153437 举报邮箱：
      <router-link to>1358841958@qq.com</router-link>
      <br />网站备案号:粤ICP备18158512  版权所有:黑龙江大学证劵学习小组 意见与建议:18846153437
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped lang="scss">
.footer {
  height: 10rem;
  margin-top: 10px;
  &-letter {
    height: 5rem;
    font-size: 12px;
    text-align: center;
    line-height: 2rem;
    padding-top: 5px;
    a {
      color: blue;
    }
  }
  &-server {
    height: 3rem;
    background: #2f5895;
    line-height: 3rem;
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        a {
          color: white;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
