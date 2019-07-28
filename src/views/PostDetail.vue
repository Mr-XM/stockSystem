<!--帖子详情-->
<template>
  <div>
    <post-header></post-header>
    <div class="mainbody">
      <div class="stockheader">
        <div class="zwconttphoto">
          <a
            href="http://iguba.eastmoney.com/6689094678853260"
            data-poptype="2"
            data-popper="6689094678853260"
          >
            <img
              src="http://avator.eastmoney.com/qface/6689094678853260/50"
              width="50"
              height="50"
              class="userphoto"
            />
          </a>
        </div>
        <div class="zwconttbn">
          <a href="#" class="author">{{postData.user_name}}</a>
          <span class="influence">影响力</span>
          <el-rate
            class="grade"
            v-model="gradeFilter"
            disabled
            text-color="#ff9900"
            score-template="{gradeFilter}"
          ></el-rate>
        </div>
        <div class="zwfbtime">发表于 {{ postData.post_time}} 股吧网页版</div>
        <div></div>
      </div>
      <div class="zwconbody">
        <p>{{postData.post_text}}</p>
      </div>
      <div class="discuss">
        <el-button @click="dialogVisible = true" type="primary" icon="el-icon-edit" size="mini"></el-button>
        <span @click="comment()">评论</span>
      </div>
      <div class="delete" v-show="delBtn">
        <el-button @click=" deletePost()" type="danger" icon="el-icon-delete" size="mini"></el-button>
        <span @click=" deletePost()">删除</span>
      </div>
    </div>
    <div class="comment">
      <ul>
        <li class="on">全部评论</li>
      </ul>
      <div v-for="(val,index) in  commentList" :key="index">
        <div class="zwnick">{{val.user_name}}</div>
        <div class="zwlitime">{{val.reply_time}}</div>
        <div class="short_text">{{val.reply_Text}}</div>
        <div class="delCommentBtn">
          <span v-show="val.delBtn" @click="deleteComment(val.reply_id)">删除</span>
        </div>
      </div>
    </div>
    <el-dialog title="发表评论" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input
        :disabled="disabled"
        type="textarea"
        maxlength="50"
        show-word-limit
        autosize
        placeholder="请输入内容"
        v-model="textarea1"
      ></el-input>
      <div v-show="enterContent" class="enterContent">请输入内容！</div>
      <div v-show="sensitive" class="sensitive">输入内容包含敏感词!</div>
      <div v-show="success" class="success">发表成功！{{number}}秒后自动关闭！</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="disabledBtn"
          :loading="btnLoading"
          @click="submitComments()"
        >{{ submitBtn?'提交中':'确定'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Axios from "axios";
import PostHeader from "./../components/PostHeader";
import { mapState } from "vuex";
export default {
  components: {
    PostHeader
  },
  data() {
    return {
      stock_id: "", //股票id
      delBtn: false, //帖子是否可删除
      number: 3,
      disabled: false, //文本框是否可编辑
      submitBtn: false, //提交按钮的文字
      dialogVisible: false, //显示评论对话框
      postData: {}, //帖子信息
      btnLoading: false, //提交按钮的状态
      grade: 1,
      //(Math.random()*5).toFixed(1),// 随机数保留一位小数
      commentList: [], //评论信息
      textarea1: "", //评价文本框内容
      success: false, //发表成功显示
      disabledBtn: "disabled",
      enterContent: false, //是否显示输入内容
      sensitive: false, //敏感词提示
      post_id: "" // 帖子id
    };
  },
  watch: {
    textarea1: function() {
      var words = this.sensitiveWords(this.textarea1);
      var reg = "^[ ]+$";
      var re = new RegExp(reg);
      if (
        this.textarea1 == "" ||
        this.textarea1.length == 0 ||
        re.test(this.textarea1) == true
      ) {
        this.enterContent = true;
        this.disabledBtn = "disabled";
      } else if (words != true) {
        this.sensitive = true;
        this.disabledBtn = "disabled";
        this.enterContent = false;
      } else {
        this.enterContent = false; //不显示提示
        this.sensitive = false;
        this.disabledBtn = null; //按钮可用
      }
    }
  },
  computed: {
    ...mapState(["mycomments"]),
    ...mapState(["phone"]),
    //影响力
    gradeFilter() {
      return (Math.random() * 5).toFixed(1);
    },
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
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //评论
    comment() {
      this.enterContent = false;
      this.dialogVisible = true;
      this.disabled = false;
      this.textarea1 = "";
      this.success = false;
    },
    //提交评论
    submitComments() {
      let addReplyUrl = `http://www.xml626.cn:8081/addReply?post_id=${this.post_id}&user_name=${this.phone}&reply_Text=${this.textarea1}&stock_id=${this.stock_id}`;
      Axios.post(addReplyUrl)
        .then(res => {
          // console.log(addReplyUrl);
          //  console.log(res);
          if (res.status == 200) {
            this.btnLoading = true;
            this.submitBtn = true;
            this.disabled = true;
            var timer;
            timer = setInterval(() => {
              --this.number;
              if (this.number == 1) {
                this.dialogVisible = false;
                this.number = 3;
                clearInterval(timer);
                this.$router.go(0);
              }
            }, 2000);

            setTimeout(() => {
              this.success = true;
              this.btnLoading = false;
              this.submitBtn = false;
            }, 1000);
          } else {
            alert("网络错误！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //敏感次检查
    //1.首先定义一个敏感词的数组；
    //调用ensitiveWords(str)函数，传入需要验证的字符串；
    //如果返回值为true，则表明没有敏感词；
    //如果返回值为false，则表明含有敏感词
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
    //删除帖子
    deletePost() {
      let delUrl = `http://www.xml626.cn:8081/delForum?post_id=${this.post_id}`;
      Axios.post(delUrl)
        .then(res => {
          console.log(delUrl);
          console.log(res);
          if (res.status == 200) {
            alert("删除成功！");
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除回复
    deleteComment(replyId) {
      //  console.log(replyId);
      let delRaplyUrl = `http://www.xml626.cn:8081/delReply?reply_id=${replyId}`;
      Axios.post(delRaplyUrl)
        .then(res => {
          if (res.status == 200) {
            alert("删除成功！");
            this.$router.go(0);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //获取帖子详情信息
    this.stock_id = this.$route.query.stock_id;
    this.post_id = this.$route.params.id;
    console.log(this.post_id);
    let PostDetailUrl = `http://www.xml626.cn:8081/getForumByPostId?post_id=${this.post_id}`;
    Axios.get(PostDetailUrl)
      .then(res => {
        this.postData = res.data;
        if (this.postData.user_name == this.phone) {
          this.delBtn = true;
        }
        // console.log(this.postData);
      })
      .catch(err => {
        console.log(err);
      });
    //获取帖子评论
    let getCommentUrl = `http://www.xml626.cn:8081/selectReply?post_id=${this.post_id}`;
    Axios.get(getCommentUrl)
      .then(res => {
        let resList = res.data.slice(0, res.data.length - 1);
        //给每个数组-->对象元素添加一个布尔属性
        var newArr = resList.map((item, index) => {
          return Object.assign(item, { delBtn: false });
        });
        //判断是否是自己发的帖子
        this.commentList = newArr;
        this.commentList.map((val, index) => {
          if (val.user_name == this.phone) {
            val.delBtn = true;
          }
        });
        //    console.log(this.commentList);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.mainbody {
  width: 720px;
  margin: 0 auto;
  background: #fff;
  margin-top: 50px;
}
.comment {
  width: 720px;
  margin: 0 auto;
  background: #fff;
  margin-top: 30px;
}
.author {
  font-size: 16px;
  color: #039;
  text-decoration: none;
  padding-left: 60px;
  float: left;
}
.influence {
  float: left;
  margin-left: 15px;
  font-size: 12px;
  color: #979797;
  line-height: 20px;
}
.stockheader {
  position: relative;
}
.zwconttphoto {
  position: absolute;
  left: 0;
  top: 0;
}
.zwfbtime {
  color: #979797;
  padding: 0 0 20px 60px;
  font-size: 12px;
  clear: both;
  margin-top: 25px;
}
.zwconbody p {
  margin: 0px;
  padding: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.grade {
  float: left;
}
.on {
  display: inline-block;
  border-bottom: 2px solid #497ec8;
  height: 30px;
  font-size: 18px;
  line-height: 32px;
}
.zwnick {
  color: #039;
}
.zwlitime {
  color: #979797;
  font-size: 12px;
  line-height: 18px;
}
.short_text {
  font-size: 15px;
  line-height: 173%;
  color: #333;
  font-family: simsun;
}
.zwlitx {
  border-bottom: 1px solid #dadada;
  padding-bottom: 10px;
}
.discuss > button,
.delete > button {
  margin: 20px 0 20px 10px;
}
.delete,
.discuss {
  display: inline-block;
}
.discuss span,
.delete span {
  color: rgb(121, 114, 218);
  font-size: 17px;
  margin: 20px 0 20px 10px;
}
.success {
  margin-top: 15px;
  color: #ff8000;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
}
.enterContent {
  width: 100%;
  color: #ff8040;
  font-weight: bold;
}
.sensitive {
  width: 100%;
  color: #ff8040;
  font-weight: bold;
}
.delete {
  margin-left: 500px !important;
}
.commentDel {
  padding-left: 680px;
}
.delCommentBtn > span {
  color: rgb(121, 114, 218);
  font-size: 14px;
  cursor: pointer;
}
.delCommentBtn {
  padding-left: 670px;
}
</style>