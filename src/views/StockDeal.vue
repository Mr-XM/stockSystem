<template>
  <div>
    <post-header></post-header>
    <!--buyData:购买数据传送-->
    <div class="stockDeal">
      <el-tabs v-model="activeName" style="text-align: center" type="border-card">
        <el-tab-pane label="买入" name="first">
          <div class="stockDeal-form" style="width: 400px;float: left">
            <el-form label-width="80px" size="samll">
              <el-form-item label="股票ID:">
                <el-input disabled style="width:220px;" :value="stock_id"></el-input>
              </el-form-item>
              <div class="priceRange">
                <span>跌停:</span>
                <span>{{stockInfo[0]*0.9}}</span>
                <span>涨停:</span>
                <span>{{stockInfo[0]*1.1}}</span>
              </div>

              <el-form-item label="价格:">
                <el-input-number
                  v-model="nowPrice"
                  :min="stockInfo[0]*0.9"
                  :max="stockInfo[0]*1.1"
                  :precision="2"
                  :step="0.01"
                  style="width:220px;"
                ></el-input-number>
              </el-form-item>

              <el-form-item label="数量:">
                <el-input-number
                  :min="100"
                  v-model="nowCount"
                  :step="100"
                  step-strictly
                  style="width:220px;"
                ></el-input-number>
              </el-form-item>
            </el-form>

            <div style="text-align: center">
              <el-button type="primary" @click="BuySubmit()">买入</el-button>
              <el-button @click="backQutoe()">取消</el-button>
            </div>
          </div>
          <div class="stockInfo" style="float: left">
            <div>
              <i class="el-icon-user-solid"></i>
              账户余额：{{ balance}}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="卖出" name="second">
          <div class="stockDeal-form" style="width: 400px;float: left">
            <el-form label-width="80px" size="samll" ref="nowStockInfo" :model="nowStockInfo">
              <el-form-item label="股票ID:">
                <el-input disabled :value="stock_id" style="width:220px;"></el-input>
              </el-form-item>
              <div class="priceRange">
                <span>跌停:</span>
                <span>{{stockInfo[0]*0.9}}</span>
                <span>涨停:</span>
                <span>{{stockInfo[0]*1.1}}</span>
              </div>
              <el-form-item label="价格:" id="price">
                <el-input-number
                  v-model="nowPrice"
                  :precision="2"
                  :step="0.01"
                  :min="stockInfo[0]*0.9"
                  :max="stockInfo[0]*1.1"
                  style="width:220px;"
                ></el-input-number>
              </el-form-item>

              <el-form-item label="数量:">
                <el-input-number
                  :min="100"
                  v-model="nowCount"
                  :step="100"
                  step-strictly
                  style="width:220px;"
                ></el-input-number>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <span>抱歉,你尚未买入股票！</span>
              <el-button disabled type="primary" @click="sellSubmit()">卖出</el-button>
              <el-button @click="backQutoe()">取消</el-button>
            </div>
          </div>
          <div class="stockInfo" style="float: left;text-align: center">
            <div>
              <i class="el-icon-user-solid"></i>
              账户余额：{{balance}}
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="stockDeal-Info">
        <trade-info></trade-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TradeInfo from "./TradeInfo";
import PostHeader from "../components/PostHeader";
import { mapState, mapMutations } from "vuex";

export default {
  inject: ["reload"],
  components: {
    PostHeader,
    TradeInfo
  },
  computed: {
    ...mapState(["phone"])
  },
  created() {
    this.localLogin(localStorage.phone);
    let balanceUrl = `http://www.xml626.cn:8081/getAccountBalance?phone=${this.phone}`;
    axios
      .get(balanceUrl)
      .then(res => {
        this.userId = res.data.user_id;
        this.balance = res.data.account_balance;
      })
      .catch(err => {
        console.log(err);
      });

    this.stock_id = this.$route.params.id;
    console.log(this.stock_id);
    let url1 = `http://www.xml626.cn:8081/getStockInfoByStockCode?stockCode=${this.stock_id}`;
    axios
      .get(url1) //请求股票类型
      .then(res => {
        this.stock_type = res.data.stock_type;
        let url2 = `https://bird.ioliu.cn/v2?url=http://hq.sinajs.cn/list=${this.stock_type}${this.stock_id}`;
        axios
          .post(url2)
          .then(res => {
            var extract = res.data.split(",").slice(2, 4); //
            //    console.log(extract);
            this.stockInfo = extract;
            this.nowPrice = this.stockInfo[1]; //价格
            console.log(this.stockInfo);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      isShow: false,
      userId: "",
      stockInfo: [], //当前股票信息
      activeName: "first",
      nowStockInfo: {},
      balance: 0, //余额
      nowPrice: "", //购买价格
      nowCount: "", //购买数量
      stock_id: "", //股票id
      stock_type: "" //股票类型
    };
  },
  methods: {
    ...mapMutations(["localLogin"]),
    //买入
    BuySubmit() {
      console.log(this.stock_id);
      console.log(this.nowPrice);
      console.log(this.nowCount);
      let totalPrice = this.nowPrice * this.nowCount;
      if (totalPrice > this.balance) {
        alert("余额不足!");
      } else {
        this.balance = this.balance - totalPrice;
        var restingOrderUrl = `http://www.xml626.cn:8081/restingOrder?userId=${this.userId}&stockId=${this.stock_id}&number=${this.nowCount}&price=${this.nowPrice}&type=buy`;
        console.log(restingOrderUrl);
        axios
          .get(restingOrderUrl)
          .then(res => {
            console.log(restingOrderUrl);
            console.log(res);
            if (res.status == 200) {
              alert("挂单成功");
              // this.reload();
              this.$router.go(0);
            } else {
              alert("网络错误");
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    },
    sellSubmit() {},
    backQutoe() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.stockDeal {
  width: 800px;
  height: auto;
  background-color: #fff;
  margin: 50px auto;
}
.stockInfo {
  // background-color: rgba(36, 149, 238, 0.66);
  margin: 50px auto;
  left: 100px;
  text-align: center;
  font-size: 16pt;
  color: rgb(16, 16, 16);
  //border-radius:8px;border:1px solid #BBFFFF;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.stockDeal-form {
  top: 80px;
}
.priceRange {
  padding-left: 25px;
}
.priceRange span:nth-child(2n) {
  color: #ff8000;
}
.priceRange span:nth-child(2n + 1) {
  color: #003398;
}
.priceRange span:nth-child(1) {
  margin-left: 55px;
}
.priceRange span:nth-child(3) {
  margin-left: 90px;
}
</style>
