<!--热门股票-->
<template>
  <div class="stock">
    <div class="stock-header">热门股票</div>
    <div class="stock-content">
      <div class="stock-content-left">
        <ul class="stock-content-left-header">
          <li style="border-right: 1px solid #000">股票号</li>
          <li style="border-right: 1px solid #000">股票名称</li>
          <li style="border-right: 1px solid #000">收盘价</li>
          <li style="border-right: 1px solid #000">涨跌幅</li>
          <li>添加自选</li>
        </ul>
        <ul
          @click="detail(item.stock_id,item.stock_name)"
          class="stock-content-left-content"
          v-for="(item,index) in showStock"
          :key="index"
        >
          <li style="color: red">{{item.stock_id}}</li>
          <li>{{item.stock_name}}</li>
          <li style="color: orange">{{item.closing_price_n}}</li>
          <li style="color: green">{{item.chang_extent}}%</li>
          <li>
            <el-button
              type="danger"
              @click.stop="addStock(item.stock_id,item.isClick,item.stock_name)"
              size="mini"
            >{{item.isClick?'已添加':'添加'}}</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  inject: ["reload"],
  name: "Stock",
  data() {
    return {
      isAdd: false,
      stock: [], //从数据库读取的数据
      showStock: [] //保存在本地--->修改后的数据
    };
  },
  created() {
    let url1 = "http://www.xml626.cn:8081/getInitialization";
    axios
      .get(url1)
      .then(res => {
        this.stock = res.data.reverse();
        let newArr = this.stock.map((item, index) => {
          return Object.assign(item, { isClick: false });
        });
        this.stock = newArr;
        if (JSON.parse(localStorage.getItem("myStock")) == null) {
          this.showStock = this.stock;
        } else if (
          JSON.parse(localStorage.getItem("myStock"))[0].phone == this.phone
        ) {
          this.showStock = JSON.parse(localStorage.getItem("myStock"));
          this.stock = this.showStock;
        } else if (
          JSON.parse(localStorage.getItem("myStock"))[0].phone == null
        ) {
          this.showStock = this.stock;
        } else {
          this.showStock = this.stock;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState(["phone"])
  },
  methods: {
    addStock(id, isClick, name) {
      if (this.phone != "未登录") {
        //给每个数组-->对象元素添加一个phone属性
        var localStock = this.stock.map((item, index) => {
          return Object.assign(item, { phone: this.phone });
        });
        this.stock = localStock;
        for (var i = 0; i < this.stock.length; i++) {
          //选中处理
          if (!this.stock[i].isClick && this.stock[i].stock_id == id) {
            this.stock[i].isClick = !this.stock[i].isClick;
            axios({
              //添加到自选股
              url: `http://www.xml626.cn:8081/addOptionalStock?phone=${this.phone}&stock_name=${name}&stock_id=${id}`,
              method: "post",
              data: {
                phone: this.phone, //电话号码
                stock_name: name, //股票id
                stock_id: id //股票名字
              }
            })
              .then(res => {
                if (res.status == 200) {
                  alert("添加成功！");
                }
              })
              .catch(err => {
                console.log(err);
              });
            break;
            //取消自选股
          } else if (this.stock[i].isClick && this.stock[i].stock_id == id) {
            this.stock[i].isClick = !this.stock[i].isClick;
            // this.$forceUpdate();
            axios({
              url: `http://www.xml626.cn:8081/delOptionalStock?phone=${this.phone}&stock_id=${id}`,
              method: "post",
              data: {
                phone: this.phone, //电话号码
                stock_name: name, //股票id
                stock_id: id //股票名字
              }
            })
              .then(res => {
                alert("取消成功！");
              })
              .catch(err => {
                console.log(err);
              });
            break;
          }
        }
        localStorage.setItem("myStock", JSON.stringify(this.stock));
        this.showStock = JSON.parse(localStorage.getItem("myStock"));
        this.reload();
       // this.$router.push("/");
      } else {
        alert("请先登录！");
      }
    },
    detail(id, name) {
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
.stock {
  margin-top: 16px;
  height: 30rem;
  &-header {
    height: 8%;
    line-height: 30px;
    font-size: 16px;
    padding-left: 10px;
    color: red;
  }
  &-content {
    height: 92%;
    &-left {
      width: 100%;
      height: 100%;
      float: left;
      border: 1px solid #c0c0c0;
      background-color: #ffffff;

      &-header {
        display: flex;
        li {
          flex: 1;
          height: 3rem;
          text-align: center;
          line-height: 3rem;
          border-bottom: 1px solid #808080;
          border-right: 1px solid #808080;
          font-size: 16px;
        }
      }
      &-content {
        display: flex;
        li {
          flex: 1;
          height: 3rem;
          text-align: center;
          line-height: 3rem;
          border-bottom: 1px dashed #ccc;
        }
      }
    }
  }
}
</style>
