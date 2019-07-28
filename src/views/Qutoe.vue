<!--每只股票对应的数据信息-->
<template>
  <div class="qutoe">
    <div class="qutoe-stock">最新报价:{{stockInfo[2]}}</div>
    <ul class="buyRise-table">
      <li>
        <span class="buyBtn">
          <el-button @click="buyStock()" class="buyButton" type="primary" size="small" plain>买入</el-button>
        </span>
      </li>
      <li>
        <span>涨停</span>
        <span>{{stockInfo[1]*1.1}}</span>
      </li>

      <li>
        <span>卖四</span>
        <span id="num">{{stockInfo[26]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[27]}}</span>
      </li>
      <li>
        <span>卖三</span>
        <span>{{stockInfo[24]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[25]}}</span>
      </li>
      <li>
        <span>卖二</span>
        <span>{{stockInfo[22]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[23]}}</span>
      </li>
      <li>
        <span>卖一</span>
        <span>{{stockInfo[20]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[21]}}</span>
      </li>
    </ul>
    <ul class="buyFall-table">
      <li>
        <span>买一</span>
        <span>{{stockInfo[10]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[9]}}</span>
      </li>
      <li>
        <span>买二</span>
        <span>{{stockInfo[12]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[11]}}</span>
      </li>
      <li>
        <span>买三</span>
        <span>{{stockInfo[14]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[13]}}</span>
      </li>
      <li>
        <span>买四</span>
        <span>{{stockInfo[16]}}</span>
        <span>成交量</span>
        <span>{{stockInfo[15]}}</span>
      </li>
      <li>
        <span>跌停</span>
        <span>{{stockInfo[1]*0.9}}</span>
      </li>
      <li>
        <span class="sellBtn">
          <el-button @click="buyStock()" class="buyButton" type="primary" size="small" plain>卖出</el-button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import axios from "axios";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["phone"])
  },
  props: ["id"],
  data() {
    return {
      stock_id: "",
      stock_type: "",
      stock_name: "",
      stockInfo: []
    };
  },
  created() {
    this.stock_id = this.$route.params.id;
    let url1 = `http://www.xml626.cn:8081/getStockInfoByStockCode?stockCode=${this.stock_id}`;
    axios
      .get(url1) //请求股票类型
      .then(res => {
        this.stock_name = res.data.stock_name;
        this.stock_type = res.data.stock_type;
        let url2 = `https://bird.ioliu.cn/v2?url=http://hq.sinajs.cn/list=${this.stock_type}${this.stock_id}`;
        axios
          .post(url2)
          .then(res => {
            var extract = res.data.split(",").slice(1, 30);
            //昨日收盘价到卖四
          //  console.log(extract);
            this.stockInfo = extract;
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    buyStock() {
      if (this.phone == "未登录") {
        alert("请先登录！");
      } else {
        this.$router.push(`/stockdeal/${this.stock_id}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.qutoe {
  width: 250px;
  height: 330px;
  background-color: #ffffff;
  position: absolute;
  right: 100px;
  top: 315px;
  color: #ff0000;
  font-size: 12px;
  &-stock {
    background-color: #ffffff;
    color: #4acaff;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
}
.buyButton {
  margin-top: 10px;
}
.buyRise-table > li > span:first-child,
.buyFall-table > li > span:first-child {
  margin-right: 20px;
  margin-left: 10px;
  color: #003398;
}
.buyRise-table > li > span:nth-child(3),
.buyFall-table > li > span:nth-child(3) {
  margin: 20px;
  color: #003398;
}
span.sellBtn,
span.buyBtn {
  margin-left: 100px !important;
}
</style>
