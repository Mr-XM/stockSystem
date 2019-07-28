<!--开户-->
<template>
  <div class="count">
    <div class="count-header">
      <div class="count-header-logo">
        <router-link to="/">
          <img src="../assets/img/logo.gif" alt />
        </router-link>
      </div>
      <div class="count-header-title">
        <h2>个人开户中心</h2>
      </div>
    </div>
    <div class="count-contain">
      <div class="count-contain-left">
        <div class="count-contain-left-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item style="margin-top: 10%;width: 100%" prop="phoneNum">
              <el-input v-model="ruleForm.phoneNum" placeholder="手机号" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 10%;width: 60%;position: relative" prop="checkNum">
              <el-input v-model="ruleForm.checkNum" maxlength="6" placeholder="验证码"></el-input>
              <el-button
                id="button"
                @click="getNum('ruleForm')"
                type="danger"
                style="position: absolute;top:1px;left:175px"
              >发送验证码</el-button>
            </el-form-item>
            <p style="color:#fff;">若您未收到验证码,请拨打客服热线:95357</p>
            <el-button id="btn" type="warning" @click="submitForm('ruleForm')">马上开户</el-button>
          </el-form>
        </div>
      </div>
      <div class="count-contain-right"></div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../components/Footer";
import Top from "../components/Top";
import axios from "axios";
export default {
  name: "Count",
  data() {
    return {
      text: "",
      input: "",
      ruleForm: {
        phoneNum: "",
        checkNum: ""
      },
      rules: {
        phoneNum: [
          { required: true, message: "手机号不能为空！", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        checkNum: [{ message: "验证码不能为空！", trigger: "blur" }]
      }
    };
  },
  methods: {
    getNum(formName) {
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
      if (!myreg.test(this.ruleForm.phoneNum)) {
        alert("请输入正确的手机号码！");
        this.ruleForm.phoneNum = "";
      } else {
        axios({
          url:
            "http://www.xml626.cn:8081/sendMessage?phone=" +
            this.ruleForm.phoneNum,
          method: "post",
          data: {
            phoneNum: this.ruleForm.phoneNum
          }
        })
          .then(res => {
            console.log(this.ruleForm.phoneNum);
            console.log("开户");
            console.log(res);
            var oBtn = document.getElementById("button");
            oBtn.innerHTML = "已发送";
            alert("验证码已发送！");
          })
          .catch(err => {
            console.log(err);
            alert("发送验证码失败!");
          });
      }
    },
    submitForm(formName) {
      console.log(this.ruleForm.phoneNum + " " + this.ruleForm.checkNum);
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm.phoneNum);
          console.log(this.ruleForm.checkNum);
          if (!myreg.test(this.ruleForm.phoneNum)) {
            //console.log("请输入有效的手机号码！");
            alert("请输入正确的手机号码！");
            this.ruleForm.phoneNum = "";
          } else {
            axios({
              url: `http://www.xml626.cn:8081/loginByMessagePost?phone=${this.ruleForm.phoneNum}&code=${this.ruleForm.checkNum}`, //url.控制器下的方法
              method: "post"
            })
              .then(res => {
                console.log(res);
                if (res.data.success == true) {
                  alert("success！");
                  this.ruleForm.phoneNum = this.ruleForm.checkNum = "";
                  this.$router.push("/information");
                } else {
                  alert("验证码不正确！");
                }
              })
              .catch(err => {
                alert("提交信息失败！");
                console.log(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    Footer
  }
};
</script>
<style scoped lang="scss">
#btn {
  width: 100%;
  margin-top: 10px;
}
.count {
  margin: 10px auto;
  width: 1000px;
  &-header {
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
  &-contain {
    width: 100%;
    height: 500px;
    border-top: 2px solid #2f5895;
    border-bottom: 2px solid #2f5895;
    background: url("../assets/img/banner_pckaihu.jpg");
    &-left {
      margin: 20px 0;
      float: left;
      width: 500px;
      height: 460px;
      border-right: 1px solid #dcdcdc;
      font-family: "Microsoft YaHei";
      &-form {
        margin: 10% auto;
        width: 290px;
        background: rgba(0, 0, 0, 0.5);
        padding: 36px 20px;
      }
    }
    &-right {
      position: absolute;
      top: 240px;
      right: 188px;
      display: inline-block;
      *display: inline;
      zoom: 1;
      width: 468px;
      height: 151px;
      background: url(../assets/img/unit-a.png) no-repeat;
    }
  }
}
</style>
