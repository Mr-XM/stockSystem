<!--主页-->
<template>
  <div class="home">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item,index) in Img" :key="index">
        <h3>
          <img id="img" :src="item.url" alt />
        </h3>
      </el-carousel-item>
    </el-carousel>
    <div class="home-count">
      <span @click="check">
        <img src="../assets/img/20190624094859.gif" alt />
      </span>
    </div>
    <div class="home-pic">
      <MyInfo></MyInfo>
      <!--自选股-->
      <Market></Market>
      <!--行情报价-->
      <div class="home-pic-trendPic1">
        <img style="height:100%;width:100%" src="../assets/img/12.jpg" alt />
      </div>
      <Event></Event>
      <!--大事提醒-->
      <div class="home-pic-trendPic2">
        <img style="height:100%;width:100%" src="../assets/img/34.jpg" alt />
      </div>
    </div>
    <div class="home-stock">
      <Stock></Stock>
      <!--热门股票-->
    </div>
    <div class="home-footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import MyInfo from "../views/MyInfo";
import Market from "../views/Market";
import Event from "../views/Event";
import Stock from "../views/Stock";
import Footer from "../components/Footer";
import Top from "../components/Top";
import lb1 from "../assets/img/1.jpg";
import lb2 from "../assets/img/2.jpg";
import lb3 from "../assets/img/3.jpg";
import lb4 from "../assets/img/4.jpg";
import { mapState } from "vuex";
export default {
  name: "home",
  components: {
    MyInfo,
    Market,
    Event,
    Stock,
    Footer,
    Top
  },
  data() {
    return {
      Img: [
        {
          url: lb1
        },
        {
          url: lb2
        },
        {
          url: lb3
        },
        {
          url: lb4
        }
      ]
    };
  },
  computed: {
    ...mapState(["phone"])
  },
  methods: {
    check() {
      if (this.phone != "未登录") {
        this.$router.push("/count");
      } else {
        alert("请先登录！");
      }
    }
  }
};
</script>
<style lang="scss">
.home-pic {
  background-color: #fff;
}
#img {
  width: 1000px;
}
.el-carousel {
  margin-top: 50px;
}
.home {
  margin: 36px auto;
  width: 1000px;
  position: relative;
  &-count {
    height: 6rem;
    border: 1px solid #ffffff;
    img {
      height: 100%;
      width: 100%;
    }
  }
  &-pic {
    height: 44rem;
    margin-top: 10px;
    position: relative;
    &-trendPic1 {
      height: 49%;
      width: 60%;
      position: absolute;
      top: 0;
      left: 20.5%;
    }
    &-trendPic2 {
      height: 49%;
      width: 60%;
      position: absolute;
      top: 50.8%;
      left: 20.5%;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
