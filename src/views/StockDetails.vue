<template>
  <div>
    <post-header></post-header>
    <!--头部-->
    <div class="stockInfo">
      <div>
        <span>{{stock_name}}</span>
        <span>({{ stock_id}})</span>
      </div>
      <div class="stockPrice">
        <div>
          <span>今日开盘价:</span>
          {{stockInfo[0]}}
        </div>
        <div>
          <span>昨日收盘价:</span>
          {{stockInfo[1]}}
        </div>
        <div>
          <span>当前价格:</span>
          {{stockInfo[2]}}
        </div>
        <div>
          <span>今日最高价:</span>
          {{stockInfo[3]}}
        </div>
        <div>
          <span>今日最低价:</span>
          {{stockInfo[4]}}
        </div>
        <div>
          <span>竞买价:</span>
          {{stockInfo[5]}}
        </div>

        <div>
          <span>竞卖价:</span>
          {{stockInfo[6]}}
        </div>
        <div>
          <span>成交股票数:</span>
          {{stockInfo[7]}}
        </div>
        <div>
          <span>成交金额:</span>
          {{stockInfo[8]}}
        </div>
      </div>
    </div>
    <div class="stockChart">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="分时图" name="first">
          <time-sharing-chart></time-sharing-chart>
        </el-tab-pane>
        <el-tab-pane label="日K图" name="second">
          <day-k-figure></day-k-figure>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <qutoe :id="stock_id"></qutoe>
    </div>
    <div class="post">
      <post-info :id="stock_id"></post-info>
      <!--股票信息-->
    </div>
  </div>
</template>

<script>
import TimeSharingChart from "./TimeSharingChart";
import DayKFigure from "./DayKFigure";
import { mapState } from "vuex";
import Qutoe from "./../views/Qutoe";
import PostInfo from "./../views/PostInfo";
import PostHeader from "./../components/PostHeader";
import axios from "axios";
export default {
  components: {
    PostHeader,
    PostInfo,
    Qutoe,
    DayKFigure,
    TimeSharingChart
  },
  data() {
    return {
      stock_id: "",
      stock_type: "",
      stock_name: "",
      activeName: "second",
      stockInfo: [] //0今日开盘价；1昨日收盘价；2当前价格；
      //3今日最高价；4今日最低价；5竞买价；6竞卖价；
      //7成交的股票数；8：成交金额，单位为“元”；
    };
  },
  created() {
    this.stock_id = this.$route.params.id;
    // console.log(this.stock_id);

    let url1 = `http://www.xml626.cn:8081/getStockInfoByStockCode?stockCode=${
      this.stock_id
    }`;
    // console.log(url1);
    axios
      .get(url1) //请求股票类型
      .then(res => {
        //     console.log(res.data.stock_name);
        this.stock_name = res.data.stock_name;
        this.stock_type = res.data.stock_type;
        //  console.log(this.stock_type);
        let url2 = `https://bird.ioliu.cn/v2?url=http://hq.sinajs.cn/list=${
          this.stock_type
        }${this.stock_id}`;
        axios
          .post(url2)
          .then(res => {
            var extract = res.data.split(",").slice(1, 10);   
            this.stockInfo = extract;
          })
          .catch(err => {
            console.log(err);

          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" >
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #f6f6f6;
}
.post {
  margin-top: 20px;
}
.stockInfo {
  margin-top: 50px;
  background-color: #fff;
  margin-left: 80px;
  height: 150px;
  width: 944px;
  color: #ff8000;
  font-size: 20px;
}
.stockChart {
  margin-left: 80px;
  margin-top: 10px;
}
div#myChart {
  margin-left: -20px !important;
}
div#tab-first,
div#tab-second {
  background-color: #fff;
}
.stockPrice span {
  color: #8080ff;
}
.stockPrice > div {
  margin-right: 15px;
  display: inline-block;
  width: 260px;
}
</style>