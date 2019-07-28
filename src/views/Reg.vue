<!--注册-->
<template>
  <div class="register">
    <RegHeader></RegHeader>
    <div class="register-contain">
      <div class="register-contain-left">
        <el-form
          style="margin: 5% 20%"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号：" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber" placeholder="手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="设置密码：" prop="password">
            <el-input placeholder="请输入密码" maxlength="13" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input placeholder="请确认密码" maxlength="13" v-model="ruleForm.checkPass" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="register-contain-right">
        <span>
          已有账号，请
          <router-link to="/login">直接登录</router-link>
        </span>
        <p style="margin-left:15px;">使用合作网站账号登录</p>
        <el-button type="primary" style="margin-left:10px;">
          <img
            style="width: 18px;position: absolute;top:10px;left:10px;"
            src="../assets/icon/qq.png"
            alt
          />
          腾讯QQ账号登录
        </el-button>
        <el-button type="primary">
          <img
            style="width: 20px;
            position: absolute;
            top:10px;
            left:10px;"
            src="../assets/icon/wb.png"
            alt
          />
          新浪微博账号登录
        </el-button>
        <el-button type="primary">
          <img
            style="width: 20px;
            position: absolute;
            top:10px;
            left:10px;"
            src="../assets/icon/wx.png"
            alt
          />微信扫一扫极速登录
        </el-button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import RegHeader from "../components/RegHeader";
import Footer from "../components/Footer";
import axios from "axios";
import url from "@/service.config.js";

export default {
  name: "Reg",

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      text: "123",
      input: "",
      ruleForm: {
        phoneNumber: "",
        password: "",
        checkPass: ""
      },
      rules: {
        phoneNumber: [
          { required: true, message: "手机号不能为空！", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 5, max: 20, message: "密码位数在5-20位", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm.phoneNumber + " " + this.ruleForm.password);
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm.phoneNumber);
          if (!myreg.test(this.ruleForm.phoneNumber)) {
            alert("请输入有效的手机号码！");
            this.ruleForm.phoneNumber = "";
          } else {
            axios({
              url:
                "http://www.xml626.cn:8081/createUser?phone_number=" +
                this.ruleForm.phoneNumber +
                "&password=" +
                this.ruleForm.password,
              method: "post",
              data: {
                phoneNumber: this.ruleForm.phoneNumber,
                password: this.ruleForm.password,
                checkPass: this.ruleForm.checkPass
              }
            })
              .then(res => {
                if (res.data.success == true) {
                  alert("注册成功！");
                  this.ruleForm.phoneNumber = this.ruleForm.password = this.ruleForm.checkPass =
                    "";
                  this.$router.push("/login");
                } else if (res.data.success == false) {
                  alert(res.data.msg);
                }
              })
              .catch(err => {
                console.log(this.phoneNumber + " " + this.password);
                alert("注册失败！");
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
    RegHeader,
    Footer
  }
};
</script>

<style scoped lang="scss">
.register {
  margin: 10px auto;
  width: 1000px;
  &-contain {
    width: 100%;
    height: 500px;
    border-top: 2px solid #2f5895;
    border-bottom: 2px solid #2f5895;
    &-left {
      margin: 20px 0;
      float: left;
      width: 645px;
      height: 460px;
      border-right: 1px solid #dcdcdc;
      font-family: "Microsoft YaHei";
    }
    &-right {
      float: left;
      width: 270px;
      padding: 50px 40px;
      font-size: 14px;
      span {
        padding-left: 10px;
        line-height: 54px;
        font-size: 16px;
        color: #333;
        a {
          color: blue;
        }
      }
      p {
        line-height: 50px;
        font-size: 14px;
        color: #909090;
      }
      button {
        display: block;
        width: 190px;
        margin-bottom: 10px;
        padding: 12px 30px;
        background: #0f88eb;
        border-radius: 3px;
        position: relative;
        img {
        }
      }
    }
  }
}
</style>
