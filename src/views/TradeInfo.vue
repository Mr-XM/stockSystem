<!--交易记录-->
<template>
  <div>
    <el-tabs
      :data=" entryOrders"
      stripe
      style="width: 100%"
      type="border-card"
      row-class-name="tableRowClassName"
    >
      <el-tab-pane label="挂单">
        <el-table :data="entryOrders" style="width: 100%">
          <el-table-column prop="stock_id" label="股票代码"></el-table-column>
          <el-table-column prop="stock_name" label="股票名称"></el-table-column>
          <el-table-column prop="type" label="委托状态"></el-table-column>
          <el-table-column prop="number" label="未成交手数"></el-table-column>
          <el-table-column prop="price" label="委托价格"></el-table-column>
          <el-table-column prop="time" label="报单时间"></el-table-column>
          <el-table-column label="撤单">
            <template slot-scope="scope">
              <el-button size="mini" @click="revoke(scope.row.entrust_id)">撤单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="持仓信息">
        <!--
       "gainPrice":300, //浮动盈亏
        "number":1100,//持仓数量
        "useNumber":500,//可用数量
        "nowPrice":12,//当前价格
        "stock_name":"我也网络",//股票名字
        "user_id":"12313211",//用户的user—id
        "price":11.5,//持仓价格
        "entrust_id":"1231131",//交易单号
        "time":"2019-06-01 11:10:00",
        "stock_id":"000727",
        "value":3000,//市值
        "gain":"3.0%"//浮动盈亏比
        -->
        <el-table :data="positionInformation" style="width: 100%">
          <el-table-column prop="stock_id" label="股票代码"></el-table-column>
          <el-table-column prop="stock_name" label="股票名称"></el-table-column>
          <el-table-column prop="number" label="持仓数量"></el-table-column>
          <el-table-column prop="useNumber" label="可用数量"></el-table-column>
          <el-table-column prop="price" label="持仓价格"></el-table-column>
          <el-table-column prop="nowPrice" label="当前价格"></el-table-column>
          <el-table-column prop="gainPrice" label="浮动盈亏"></el-table-column>
          <el-table-column prop="gain" label="浮动盈亏比"></el-table-column>
          <el-table-column prop="value" label="市值"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="当日委托">
        <el-table :data="delegate" style="width: 100%">
          <el-table-column prop="time" label="委托时间"></el-table-column>
          <el-table-column prop="station" label="委托状态"></el-table-column>
          <el-table-column prop="stock_id" label="股票代码"></el-table-column>
          <el-table-column prop="stock_name" label="股票名称"></el-table-column>
          <el-table-column prop="type" label="买卖"></el-table-column>
          <el-table-column prop="number" label="委托数量"></el-table-column>
          <el-table-column prop="dealMount" label="成交数量">
            0
            <!--成交数量进行判断，如果该委托没有成交，则委托数量为0-->
          </el-table-column>
          <el-table-column prop="averagePrice" label="成交均价">无</el-table-column>
          <el-table-column prop="entrust_id" label="交易编号">
            <!--entrust_id为挂单表交易编号
            trade_id为交易表编号-->
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="当日成交">
        <el-table :data="priceToday" style="width: 100%">
          <el-table-column prop="time" label="成交时间"></el-table-column>
          <el-table-column prop="stock_id" label="股票代码"></el-table-column>
          <el-table-column prop="stock_name" label="股票名称"></el-table-column>
          <el-table-column prop="type" label="买卖"></el-table-column>
          <el-table-column prop="number" label="成交数量"></el-table-column>
          <el-table-column prop="dealPrice" label="成交价格"></el-table-column>
          <el-table-column prop="dealTotalPrice" label="成交金额"></el-table-column>
          <el-table-column prop="entrust_id" label="交易编号"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      entryOrders: [], //挂单
      delegate: [], //当日委托
      priceToday: [], //当日成交
      positionInformation: [], //持仓信息
      stock_id: "",
      stock_name: ""
    };
  },
  created() {
    this.stock_id = this.$route.params.id;
    //查询股票名称
    let stockNameUrl = `http://www.xml626.cn:8081/getStockName?stockCode=${this.stock_id}`;
    Axios.get(stockNameUrl)
      .then(res => {
        this.stock_name = res.data;
        console.log(this.stock_name);
      })
      .catch();

    //挂单
    let entryOrdersUrl = `http://www.xml626.cn:8081/queryResting?phone=${this.phone}`;
    Axios.get(entryOrdersUrl)
      .then(res => {
        this.entryOrders = res.data.slice(0, res.data.length - 1);
        var localStock = this.entryOrders.map((item, index) => {
          return Object.assign(item, { stock_name: this.stock_name });
        });
        this.entryOrders = localStock;
      })
      .catch(err => {
        console.log(err);
      });
    //当日委托
    let delegateUrl = `http://www.xml626.cn:8081/queryEntrust?phone=${this.phone}`;
    Axios.get(delegateUrl)
      .then(res => {
        this.delegate = res.data.slice(0, res.data.length - 1);
        console.log(this.delegate);
        var localStock = this.delegate.map((item, index) => {
          return Object.assign(item, { stock_name: this.stock_name });
        });
        this.delegate = localStock;
      })
      .catch(err => {
        console.log(err);
      });
    //当日成交
    let priceTodayUrl = `http://www.xml626.cn:8081/queryPurchase?phone=${this.phone}`;
    Axios.get(priceTodayUrl)
      .then(res => {
        this.priceToday = res.data;
        // console.log(this.priceToday);
      })
      .catch(err => {
        console.log(err);
      });
    //持仓信息
    let positionInformationUrl = `http://www.xml626.cn:8081/queryHoldShares?phone=${this.phone}`;
    Axios.get(positionInformationUrl)
      .then(res => {
        this.positionInformation = res.data;
        // console.log(this.positionInformation);
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState(["phone"])
  },
  methods: {
    //撤单
    revoke(entrust_id) {
      console.log(entrust_id);
      let revokeUrl = `http://www.xml626.cn:8081/cancellation?entrustId=${entrust_id}`;
      Axios.get(revokeUrl)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("撤单成功!");
            this.$router.go(0);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
