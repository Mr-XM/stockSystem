<!--忘记密码-->
<template>
  <div class="forget">
    <div class="forget-header">
      <div class="forget-header-logo">
        <router-link to="/">
          <img src="../assets/img/logo.gif" alt>
        </router-link>
      </div>
      <div class="forget-header-title">
        <h2>个人密码找回</h2>
      </div>
    </div>
    <div class="forget-contain">
      <div class="forget-contain-wrap">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号：" prop="phone">
            <el-input
              style="width: 60%"
              v-model="ruleForm.phone"
              placeholder="请输入手机号"
              maxlength="11"
            ></el-input>
            <el-button type="primary">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码：" prop="check" style="margin-top: 0;height: 3rem">
            <el-input style="width: 60%" v-model="ruleForm.check" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item show-password label="新密码：" prop="newPass">
            <el-input
              style="width: 60%"
              v-model="ruleForm.newPass"
              placeholder="请输入新密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import axios from "axios";
export default {
  name: "forget",
  components: {
    Footer
  },
  data() {
    return {
      text: "",
      input: "",
      ruleForm: {
        phone: "",
        check: "",
        newPass: ""
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空！", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        check: [
          { required: true, message: "验证码不能为空！", trigger: "blur" }
        ],
        newPass: [
          { required: true, message: "新密码不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit(formName) {
      console.log(
        this.ruleForm.phone +
          " " +
          this.ruleForm.check +
          " " +
          this.ruleForm.newPass
      );
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("success!");
          if (!myreg.test(this.ruleForm.phone)) {
            alert("请输入有效的手机号码！");
            this.ruleForm.phone = "";
          } else {
           
            axios({
              url: "", //url.控制器下的方法
              method: "post",
              data: {
                phone: this.ruleForm.phone,
                check: this.ruleForm.check,
                newPass: this.ruleForm.newPass
              }
            })
              .then(res => {
                if (res.data.code == 200) {
                  alert("注册成功！");
                  this.ruleForm.phone = this.ruleForm.check = this.ruleForm.newPass =
                    "";
                  this.$router.push("/login");
                }
              })
              .catch(err => {
                alert("修改密码失败！");
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
  }
};
</script>

<style scoped lang="scss">
.forget {
  margin: 16px auto;
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
    height: 360px;
    border-top: 2px solid #2f5895;
    border-bottom: 2px solid #2f5895;
    &-wrap {
      width: 60%;
      margin: 1rem auto;
    }
  }
}
</style>
