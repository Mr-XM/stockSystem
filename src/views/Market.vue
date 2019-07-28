<!--行情报价-->
<template>
  <div class="market">
    <div class="market-header">
      <div class="true market-header-left">
        <span>行情报价</span>
      </div>
    </div>
    <div class="market-content">
      <div class="myStock">
        <ul
          @click="detail(item.stock_id,item.stock_name)"
          v-for="(item,index) in  stock"
          :key="index"
        >
          <li>
            <div class="myStock-info">
              <router-link to>{{item.stock_name}}{{item.stock_id}}</router-link>
            </div>
            <div class="myStock-data">
              {{item.closing_price_n}}
              <br>
              {{item.chang_extent}}%
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";
export default {
  name: "Market",
  created() {
    let url1 = "http://www.xml626.cn:8081/getInitialization";
    axios
      .get(url1)
      .then(res => {
        this.stock = res.data.reverse();
        console.log(this.stock);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      stock: []
    };
  },
  methods: {
    detail(id, name) {
      console.log(id, name);
      let stockInfo = {
        stock_name: id,
        stock_id: name
      };
      this.$store.commit("checkStock", stockInfo);
      setTimeout(() => {
        this.$router.push("/stockdetails/" + id);
      }, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.true {
  border-bottom: 1px solid #c0c0c0;
}
.false {
  border-bottom: 1px solid #c0c0c0;
}
.market {
  width: 19%;
  height: 100%;
  margin-right: 0;
  margin-top: -26.2%;
  float: right;
  border: 1px solid #c0c0c0;
  &-header {
    height: 7%;
    display: flex;
    &-left {
      flex: 1;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
    }
  }
}
.myStock {
  li {
    border-bottom: 1px dashed #ccc;
  }
  &-info {
    width: 30%;
    float: left;
    padding-left: 10px;
    a {
      color: blue;
    }
  }
  &-data {
    width: 65%;
    text-align: right;
    margin-left: 30%;
    color: green;
  }
}
</style>
