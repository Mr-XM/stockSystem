<!--个人信息完善页面-->
<template>
  <div class="information">
    <router-view name="top"></router-view>
    <div class="information-header">
      <div class="information-header-logo">
        <router-link to="/">
          <img src="../assets/img/logo.gif" alt />
        </router-link>
      </div>
      <div class="information-header-title">
        <h2>个人信息完善</h2>
      </div>
    </div>
    <div class="information-contain">
      <div class="information-contain-wrap">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号：" style="margin-top: 10%;width: 67%" prop="phone_number">
            <el-input
              onkeyup="value=value.replace(/[^\d]/g,'')"
              v-model="ruleForm.phone_number"
              placeholder="请输入手机号"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input
              maxlength="6"
              id="uname"
              onblur="if(!/^[\u4e00-\u9fa5]+$/gi.test(document.getElementById('uname').value))
                        alert('只能输入汉字');"
              style="width: 60%"
              v-model="ruleForm.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="radio">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开户银行：" prop="account_type" style="margin-top: 0;height: 3rem">
            <el-select v-model="ruleForm.account_type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.account_type"
                :label="item.label"
                :value="item.account_type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号：" prop="account_num" style="margin-top: 0;height: 3rem">
            <el-input
              onkeyup="value=value.replace(/[^\d]/g,'')"
              style="width: 60%"
              v-model="ruleForm.account_num"
              placeholder="请输入卡号"
              maxlength="19"
            ></el-input>
          </el-form-item>
          <el-form-item show-password label="交易密码：" prop="account_pass">
            <el-input
              type="password"
              style="width: 60%"
              v-model="ruleForm.account_pass"
              placeholder="请输入6位交易密码"
              maxlength="6"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
import { mapState } from "vuex";
export default {
  name: "Information_2",
  components: {
    Footer
  },
  computed: {
    ...mapState(["phone"])
  },
  data() {
    return {
      radio: "男", //单选按钮
      text: "",
      input: "",
      ruleForm: {
        phone_number: "",
        name: "",
        sex: "",
        account_type: "",
        account_num: "",
        account_pass: ""
      },
      rules: {
        phone_number: [
          {
            required: true,
            clearable: "true",
            message: "用户名不能为空！",
            trigger: "blur"
          },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "用户名不能为空！", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别！", trigger: "change" }],
        account_type: [
          { required: true, message: "请选择开户银行！", trigger: "change" }
        ],
        account_num: [
          { required: true, message: "卡号不能为空！", trigger: "blur" },
          { min: 19, max: 19, message: "请输入正确的手机号", trigger: "blur" }
        ],
        account_pass: [
          { required: true, message: "交易密码不能为空！", trigger: "blur" }
        ]
      },
      options: [
        {
          account_type: "中国银行",
          label: "中国银行"
        },
        {
          account_type: "招商银行",
          label: "招商银行"
        },
        {
          account_type: "广东银行",
          label: "广东银行"
        },
        {
          account_type: "邮政储蓄银行",
          label: "邮政储蓄银行"
        },
        {
          account_type: "哈尔滨银行",
          label: "哈尔滨银行"
        },
        {
          account_type: "交通银行",
          label: "交通银行"
        }
      ]
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('success!');
          // console.log(this.phone);
          axios({
            url:
              "http://www.xml626.cn:8081/openUser?phone_number=" +
              this.ruleForm.phone_number +
              "&userName=" +
              this.ruleForm.name +
              "&accountType=" +
              this.ruleForm.account_type +
              "&accountNum=" +
              this.ruleForm.account_num +
              "&account_password=" +
              this.ruleForm.account_pass +
              "&userSex=" +
              this.ruleForm.sex,
            method: "post",
            data: {
              phone: this.ruleForm.phone_number,
              user_name: this.ruleForm.name,
              user_sex: this.ruleForm.sex,
              account_type: this.ruleForm.account_type,
              account_num: this.ruleForm.account_num,
              account_password: this.ruleForm.account_pass
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.success == true) {
                alert("信息上传成功！");
                this.$router.push("/");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    check() {}
  }
};
</script>

<style scoped lang="scss">
.information {
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
    height: 500px;
    border-top: 2px solid #2f5895;
    border-bottom: 2px solid #2f5895;
    &-wrap {
      width: 60%;
      margin: 1rem auto;
    }
  }
}
</style>
