<!--每个股票对应的帖子信息-->
<template>
  <div class="posts">
    <el-tabs class="title" v-model="activeName">
      <el-tab-pane label="全部" value="first" name="first" class="classify">
        <!--全部帖子内容-->
        <div class="post-content">
          <div class="dheader">
            <span class="l2 a2">评论</span>
            <span class="l1 a1">阅读</span>
            <span class="l3 a3">内容</span>
            <span class="l4 a4">作者</span>
            <span class="l5 a5">时间</span>
          </div>
          <div
            @click="goDetail(item.postId)"
            class="articleh"
            v-for="(item,index) in  postList "
            :key="index"
          >
            <span>{{item.comment}}</span>
            <span>{{item.read}}</span>
            <span>
              <a href :title="item.content">{{item.content}}</a>
            </span>
            <span>
              <a href :title="item.author">{{item.author}}</a>
            </span>
            <span>{{item.data}}</span>
          </div>
        </div>
      </el-tab-pane>
      <!--热帖内容-->
      <el-tab-pane label="热帖" name="second" class="classify">
        <div class="post-content">
          <div class="dheader">
            <span class="l2 a2">评论</span>
            <span class="l1 a1">阅读</span>
            <span class="l3 a3">内容</span>
            <span class="l4 a4">作者</span>
            <span class="l5 a5">时间</span>
          </div>
          <div class="articleh" v-for="(item,index) in hotList " :key="index">
            <span>{{item.stock_comment}}</span>
            <span>{{item.post_read}}</span>
            <span @click="goDetail(item.postId,item.post_text,item.user_name)">
              <a href :title="item.content">{{item.post_text}}</a>
            </span>
            <span>
              <a href :title="item.author">{{item.user_name}}</a>
            </span>
            <span>{{item.post_time}}</span>
          </div>
        </div>
      </el-tab-pane>
      <!--我的发表-->

      <el-tab-pane label="我的帖子" name="third" class="classify">
        <div class="post-content">
          <div class="dheader">
            <span class="l2 a2">评论</span>
            <span class="l1 a1">阅读</span>
            <span class="l3 a3">内容</span>
            <span class="l4 a4">作者</span>
            <span class="l5 a5">时间</span>
          </div>
          <div class="articleh" v-for="(item,index) in  myposts " :key="index">
            <span>{{item.stock_comment}}</span>
            <span>{{item.post_read}}</span>
            <span @click="goDetail(item.post_id)">
              <a href :title="item.content">{{item.post_text}}</a>
            </span>
            <span>
              <a href :title="item.author">{{item.user_name}}</a>
            </span>
            <span>{{item.post_time}}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Queue, Patient } from "./../assets/js/priority";
import { mapState } from "vuex";
import Axios from "axios";
export default {
  props: ["id", "name"],
  created() {
    let allUrl = `http://www.xml626.cn:8081/getForumInfo?stockId=${this.id}`;
    let HotUrl = `http://www.xml626.cn:8081/getHotForumInfo?stockId=${this.id}`;
    let myOptionsUrl = `http://www.xml626.cn:8081/getOwnForumInfo?userName=${this.phone}`;
    Axios.get(allUrl)
      .then(res => {
        console.log(res.data);
        var ed = new Queue();
        var List = [],
          List = res.data;
        for (let i = 0; i < List.length; i++) {
          var p = new Patient(
            List[i].post_read,
            List[i].stock_comment,
            List[i].post_text,
            List[i].user_name,
            List[i].post_time,
            List[i].post_id
          );
          ed.enqueue(p);
        }
        for (let i = 0; i < List.length; i++) {
          this.postList.push(ed.dequeue()[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
    Axios.get(HotUrl)
      .then(res => {
        this.hotList = res.data;
        //   console.log(this.hotList);
      })
      .catch(err => {
        console.log(err);
      });
    Axios.get(myOptionsUrl)
      .then(res => {
        this.myposts = res.data;
        console.log(this.myposts);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      postList: [], //全部帖子
      hotList: [], //热帖
      myposts: [], //我的帖子
      activeName: "first" //选中的帖子的分类
    };
  },
  computed: {
    ...mapState(["phone"])
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: `/detail/${id}`,
        query: { stock_id: this.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.posts {
  margin-bottom: 100px;
}
.title {
  background-color: #fff;
  margin-bottom: 300px;
  width: 80%;
  margin-left: 80px;
}
.post-content > div:nth-child(2n-1) {
  background-color: #f5f5f5;
}

.dheader {
  background-color: #f5f5f5;
  .a2 {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    vertical-align: bottom;
    width: 40px;
    margin-right: 20px;
    color: #474747;
    overflow: hidden;
  }
  .a1 {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    vertical-align: bottom;
    width: 40px;
    padding: 0;
    margin-right: 20px;
    color: #474747;
  }
  .a3 {
    vertical-align: bottom;
    text-align: center;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    vertical-align: bottom;
    width: 410px;
    font-size: 14px;
    padding-right: 4px;
    overflow: hidden;
  }
  .a4 {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    vertical-align: bottom;
    width: 109px;
    overflow: hidden;
    color: #474747;
  }
  .a5 {
    text-align: center;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    vertical-align: bottom;
    overflow: hidden;
  }
}
.articleh {
  float: left;
  height: 30px;
  width: 100%;
  span:nth-of-type(1) {
    display: block;
    float: left;
    height: 30px;
    line-height: 30px;
    width: 40px;
    padding: 0;
    margin-right: 20px;
    overflow: hidden;
    color: #474747;
  }
  span:nth-of-type(2) {
    display: block;
    float: left;
    height: 30px;
    line-height: 30px;
    width: 40px;
    margin-right: 10px;
    overflow: hidden;
    color: #474747;
  }
  span:nth-of-type(3) {
    display: block;
    float: left;
    height: 30px;
    line-height: 30px;
    width: 410px;
    font-size: 15px;
    padding-right: 4px;
    overflow: hidden;
    color: #474747;
  }
  span:nth-of-type(4) {
    display: block;
    float: left;
    height: 30px;
    line-height: 30px;
    width: 109px;
    overflow: hidden;
    color: #474747;
    font-size: 15px;
  }
  span:nth-of-type(5) {
    float: left;
    height: 30px;
    line-height: 30px;
    color: #474747;
    padding: 0 10px;
  }
}
a {
  text-decoration: none;
  color: #003399;
}
</style>