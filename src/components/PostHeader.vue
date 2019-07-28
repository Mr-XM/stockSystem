<!--股票详情header-->
<template>
  <div class="Postheader">
    <div class="Postheader-content">
      <ul>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <a href="#">基金吧</a>
        </li>
        <li>
          <a href="#">访谈</a>
        </li>
        <li>
          <a href="#">话题</a>
        </li>
        <li>
          <a href="#">问董秘</a>
        </li>
        <li>
          <a href="#">悬赏问答</a>
        </li>
        <li>
          <a href="#" @click="addPost()">发帖子</a>
        </li>
        <li class="login">
          <router-link to="/login">{{phone}}</router-link>
        </li>
        <li class="register">
          <router-link to="/reg">注册</router-link>
        </li>
        <li @click="exit" class="top-context-right-menu">
          <span class="menu">退出</span>
        </li>
      </ul>
    </div>
    <div id="posted" v-show="isTrue">
      <div class="dialog-box">
        <div class="dialog-title">
          <div class="dialog-title-header">
            <span class="title">发表帖子</span>
            <span class="post_close" @click="close()">×</span>
          </div>
        </div>
        <form>
          <div class="dialog-content">
            <h5>内容</h5>
            <textarea ref="postText" required v-model="addpostContent"></textarea>
          </div>
          <div v-show="enterContent" class="enterContent">请输入内容！</div>
          <div v-show="sensitive" class="sensitive">输入内容包含敏感词!</div>
          <div class="hint" v-if="isPosted">发表成功！</div>
          <div class="content-submit">
            <el-button
              :disabled="disabledBtn"
              type="primary"
              @click.prevent="submit()"
              :loading="loading"
              class="submit"
            >{{Submit?'提交中':'确定'}}</el-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  created() {
    this.stock_id = this.$route.params.id;
    this.localLogin(localStorage.phone);
  },
  computed: {
    ...mapState(["phone"]), //
    format() {
      var NowTime = new Date();
      var month = NowTime.getMonth() + 1;
      var day = NowTime.getDate();
      var hour = NowTime.getHours();
      var minuties = NowTime.getMinutes();
      var seconds = NowTime.getSeconds();
      return month + "-" + day + "  " + hour + ":" + minuties + ":" + seconds;
    }
  },
  data() {
    return {
      stock_id: "",
      disabledBtn: "disabled", //提交按钮是否可用
      Submit: false, //提交帖子的按钮的内容
      isTrue: false, //显示对话框
      isPosted: false, //是否显示'发表成功'
      loading: false, //显示正在提交中
      addpostContent: "", //发帖子内容
      myPost: [],
      enterContent: false, //是否显示输入内容
      sensitive: false //敏感词提示
    };
  },
  watch: {
    addpostContent: function() {
      var words = this.sensitiveWords(this.addpostContent);
      var reg = "^[ ]+$";
      var re = new RegExp(reg);
      if (
        this.addpostContent == "" ||
        this.addpostContent.length == 0 ||
        re.test(this.addpostContent) == true
      ) {
        this.enterContent = true;
        this.disabledBtn = "disabled";
      } else if (words != true) {
        this.sensitive = true;
        this.disabledBtn = "disabled";
        this.enterContent = false;
      } else {
        this.enterContent = false;
        this.disabledBtn = null;
        this.sensitive = false;
      }
    }
  },
  methods: {
    ...mapMutations(["exitLogin"]),
    ...mapMutations(["localLogin"]),
    close() {
      this.isTrue = false;
    },
    //提交帖子
    submit() {
      let url = `http://www.xml626.cn:8081/addForum?post_title=${this.addpostContent}&post_text=${this.addpostContent}&user_name=${this.phone}&stock_id=${this.stock_id}`;
      axios
        .post(url)
        .then(res => {
          if (res.status == 200) {
            this.loading = true;
            this.Submit = true;
            this.$refs.postText.disabled = "disabled";
            setTimeout(() => {
              this.isPosted = true;
              this.loading = false;
              this.Submit = false;
            }, 2000);
            setTimeout(() => {
              this.isTrue = false;
              this.addpostContent = "";
              this.isPosted = false;
              this.$refs.postText.disabled = "";
              this.$router.go(0);
            }, 4000);
          } else {
            alert("服务器错误！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
   
    //发帖子
    addPost() {
      if (JSON.stringify(this.userInfo) === "{}") {
        this.$message({
          message: "请先登录！3秒后自动跳转",
          type: "warning"
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else {
        this.isTrue = true;
      }
    },
    //敏感词处理
    sensitiveWords(str) {
      var Words = ["笨蛋", "傻", "杀", "神经病"];
      var re = "";
      for (var i = 0; i < Words.length; i++) {
        if (i == Words.length - 1) re += Words[i];
        else re += Words[i] + "|";
      }
      var pattern = new RegExp(re, "g");
      var res = pattern.test(str);
      if (res) {
        // console.log();
        return false;
      } else {
        return true;
      }
    },
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

<style lang="scss" scoped>
a {
  text-decoration: none;
  font-size: 13px;
  color: #474747;
  display: inline-block;
}
.Postheader {
  width: 100%;
  height: 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 4px #e6e6e6;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1999;
  width: 100%;
  &-content {
    width: 60%;
    margin: 0 auto;
  }
  li {
    display: inline-block;
    padding: 0 12px;

    display: inline;
    zoom: 1;
    position: relative;
    line-height: 30px;
  }
}

#posted {
  z-index: 99999;
  clear: both;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog-box {
  width: 500px;
  height: 320px;
  border: 2px solid #808080;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
.dialog-title {
  height: 40px;
  background-color: #ff8040;
  color: #000000;
  line-height: 40px;
  font-weight: bold;
  padding: 0 10px;
  font-size: 18px;
}
.dialog-title-header {
  float: left;
  cursor: pointer;
  position: relative;
  width: 100%;
}
.el-button {
  float: right;
}

.dialog-content {
  width: 450px;
  margin: 0 auto;
  height: 180px;
  textarea {
    width: 450px;
    height: 150px;
  }
}
span.post_close {
  position: absolute;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
  color: #000000;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
}
.enterContent,
.hint,
.sensitive {
  width: 100%;
  color: #ff8040;
  font-weight: bold;
}
.register .login {
  margin-left: 20px;
}
</style>