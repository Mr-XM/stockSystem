<!--个人信息采集-->
<template>
    <div class="information">
      <div class="information-header">
        <div class="information-header-logo">
          <router-link to="/"><img src="../assets/img/logo.gif" alt=""></router-link>
        </div>
        <div class="information-header-title">
          <h2>个人信息采集</h2>
        </div>
      </div>
      <div class="information-contain">
          <div class="information-contain-left">
            <div class="information-contain-left-header">
              <img src="../assets/img/icon_pc2.png" alt="">
              开户前所需材料
            </div>
            <div class="information-contain-left-contain">
              <p style="padding: 5px;font-size: 16px;">请准备本人二代身份证，请确保您的电脑配备有摄像头、麦克风、耳机，并正常使用。</p>
              <img style=" margin: 3rem;" src="../assets/img/khicons.png" alt="">
            </div>
            <div class="information-contain-left-footer">
              如果您因忘带身份证或电脑未配备摄像头等设备终止开户，您可以随时下载手机APP或登陆开户页面继续开户。
            </div>
          </div>
          <div class="information-contain-right">
            <div class="information-contain-right-header">
              身份信息采集
              <span style="font-size: 14px;letter-spacing: 0">(身份证正反面信息上传)</span>
            </div>
            <div class="information-contain-right-contain">
              <div class="information-contain-right-contain-front">
                <p>身份证人像面</p>
                <div>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
              <div class="information-contain-right-contain-reverse">
                <p>身份证国徽面</p>
                <div>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess1"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </div>
            <div class="information-contain-right-explain">
              请先上传身份证人像、国徽面照，作为开户备案（仅作为备案使用，不对外公开）。
              <ul>
                <li>1.请使用二代身份证原件照片，扫描件、复印件等不能通过审核哦；</li>
                <li>2.上传的身份证正面照片必须能看清姓名、证件号、证件地址、发证机关、证件有效期。</li>
                <li>3.上传身份证图片只支持JPG、PNG、GIF格式，图片不可大于3M。</li>
                <li>4.拍摄身份证时，请保持图片清晰，能够清楚识别身份证信息。</li>
              </ul>
            </div>
            <div class="information-contain-right-footer">
              <el-button type="primary" @click="back">上一步</el-button>
              <el-button type="primary" @click="submit">继续完善信息</el-button>
            </div>
          </div>
      </div>
      <Footer></Footer>
    </div>
</template>
<script>
  import Footer from '../components/Footer'
  import axios from 'axios'
    export default {
        name: "Information",
      data() {
        return {
          imageUrl: '',
          imageUrl1:''
        };
      },
      methods: {
        back(){
          this.$router.go(-1);
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          return this.imageUrl;
        },
        handleAvatarSuccess1(res, file) {
          this.imageUrl1 = URL.createObjectURL(file.raw);
          return this.imageUrl1;
        },
        submit(){
          console.log(this.imageUrl +"11111" + this.imageUrl1);
              alert("照片上传成功");
              this.$router.push('/information-2')
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      },

        components:{
          Footer
        }
    }
</script>

<style scoped lang="scss">
  .information{
    margin:16px auto;
    width: 1000px;
    &-header{
      width: 1000px;
      height:72px;
      margin: 0 auto;
      position: relative;
      &-logo{
        img{
          margin-top: 30px;
        }
      }
      &-title{
        width: 160px;
        height:35px;
        position: absolute;
        left: 130px;
        top:25px;
        text-align: center;
        letter-spacing: 3px;
        border-left:1px solid #ccc;
        line-height: 35px;
      }
    }
    &-contain {
      width: 100%;
      height: 500px;
      border-top: 2px solid #2f5895;
      border-bottom: 2px solid #2f5895;
      position: relative;
      &-left {
        margin: 20px 0;
        float: left;
        width: 40%;
        height: 460px;
        border-right: 1px solid #ccc;
        font-family: 'Microsoft YaHei';
        &-header {
          height: 6rem;
          margin-right: 1rem;
          border-bottom: 1px dashed #ccc;
          letter-spacing: 3px;
          font-weight: 100;
          font-size: 20px;
          line-height: 6rem;
          img {
            float: left;
            padding-right: 2rem;
          }
        }
        &-contain {
          margin-top: 5rem;
        }
        &-footer {
          color: red;
        }
      }
      &-right {
        margin: 20px 0;
        width: 60%;
        height: 460px;
        position: absolute;
        top:0;
        right:0;
        font-family: 'Microsoft YaHei';
        &-header {
          height: 6rem;
          margin-left: 1rem;
          border-bottom: 1px dashed #ccc;
          letter-spacing: 3px;
          font-weight: 100;
          font-size: 20px;
          line-height: 6rem;
        }
        &-contain{
          width: 100%;
          height:200px;
          display: flex;
          justify-content:space-between;
          &-front{
            width: 40%;
            height:200px;
            text-align: center;
            flex: 1;
          }
          &-reverse{
            width: 40%;
            height:200px;
            text-align: center;
            flex: 1;
          }
        }
        &-explain{
          width: 93%;
          margin: 1rem auto;
        }
        &-footer{
          width: 100%;
          height: 10%;
          button{
            flex: 1;
            width: 30%;
            margin-left: 14%;
            background:#2F5895;
          }
        }
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 214px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 214px;
    height: 160px;
    display: block;
  }
</style>
