<!--日K图-->

<template>
  <div id="main">
    <div id="myChart" ref="myChart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import axios from "axios";
require("echarts/extension/bmap/bmap");
require("./../../node_modules/echarts/lib/component/legend");
export default {
  name: "echarts",
  data() {
    return {
      stockName: "",
      stockID: "",
      stockData: "",
      resData: "",
      echartsOption: {
        title: {
          text: "",
          left: 0
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"]
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          data: [],
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: "dataMin",
          max: "dataMax"
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 30,
            end: 70
          },
          {
            show: true,
            type: "slider",
            y: "90%",
            start: 0,
            end: 75
          }
        ],
        series: [
          {
            name: "日K",
            type: "k",
            data: [],
            itemStyle: {
              normal: {
                color: "#ec0000",
                color0: "#00da3c",
                borderColor: "#8A0000",
                borderColor0: "#008F28"
              }
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function(param) {
                    return param != null ? Math.round(param.value) : "";
                  }
                }
              },
              data: [
                {
                  name: "highest value",
                  type: "max",
                  valueDim: "highest"
                },
                {
                  name: "lowest value",
                  type: "min",
                  valueDim: "lowest"
                },
                {
                  name: "average value on close",
                  type: "average",
                  valueDim: "close"
                }
              ],
              tooltip: {
                formatter: function(param) {
                  return param.name + "<br>" + (param.data.coord || "");
                }
              }
            },
            markLine: {
              symbol: ["none", "none"],
              data: [
                [
                  {
                    name: "from lowest to highest",
                    type: "min",
                    valueDim: "lowest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  },
                  {
                    type: "max",
                    valueDim: "highest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  }
                ]
              ]
            }
          }
        ]
      }
    };
  },
  created() {
   
    this.stockID = this.$route.params.id;
   
    this.getStockData();
  },

  mounted() {
    // this.setEchartOption()
    //this.myChart = echarts.init(document.getElementById('myChart'))
    //this.myChart.setOption(this.echartsOption)
  },
  watch: {
    stockData: function() {
      var _this = this;
      _this.$nextTick(function() {
        this.setEchartOption();
        this.myChart = echarts.init(document.getElementById("myChart"));
        this.myChart.setOption(this.echartsOption);
      });
    }
  },
  methods: {
    getStockName() {
      axios
        .get(`http://www.xml626.cn:8081/getStockData?stockCode=${this.stockID}`)
        .then(response => {
          console.log("请求数据成功");
          console.log(response.data);
          this.stockData = response.data;
        })
        .catch(error => {
          console.log(error);

          alert("网络错误，不能访问");
        });
    },
    getArrary(str) {
      var a = [];
      var b = [];
      var temp = [];
      //alert(str);
      a = str.split(";");
      b = new Array(a.length);
      for (var i = 0; i < a.length; i++) {
        temp = a[i]
          .toString()
          .substr(1, a[i].length - 2)
          .split(",");
        b[i] = new Array(temp.length);
        for (var j = 0; j < temp.length; j++) {
          b[i][j] = temp[j];
        }
      }
      return b;
    },
    getStockData() {
      //请求服务器的api获取到品牌的数据列表
      axios
        .get(`http://www.xml626.cn:8081/getStockData?stockCode=${this.stockID}`)

        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          this.stockData = response.data;
        })
        //获取失败
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    },
    setEchartOption() {
    
      // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      this.resData = splitData(this.getArrary(this.stockData.toString()));
      this.echartsOption.xAxis.data = this.resData.categoryData;
      this.echartsOption.series[0].data = this.resData.values;
      function splitData(rawData) {
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0]);
          values.push(rawData[i]);
        }
        return {
          categoryData: categoryData,
          values: values
        };
      }
    }
  }
};
</script>
<style scoped>
.main {
  background-color: #fff;
}
#myChart {
  width: 70%;
  height: 500px;
  background-color: #fff;
  margin-left: 80px;
  margin-top: 10px;
}
</style>
