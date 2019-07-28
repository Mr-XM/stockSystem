<template>
  <div>
    <div class="timeSharingChart" ref="chartMin" style="width:540px;height:400px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { setInterval } from "timers";

export default {
  name: "minchart",
  data() {
    return {
      a: "",
      data1: [],
      data2: [],
      data3: []
    };
  },
  methods: {
    getChart() {
      this.code = this.a.slice(2);
      if (this.code[0] == 6) {
        this.type = "sse";
      } else {
        this.type = "szse";
      }
      // 第三方接口，需要实时刷新用的定时器，并未做websocket的处理，有需要可以自己加
      // this.timer = setInterval(() => {
      // vue项目中为了规范，跨域请求封装了jsonp的方法
      this.$jsonp(
        "http://webstock.quote.hermes.hexun.com/a/minute?code=" +
          this.type +
          this.code +
          "&start=20181026000000&number=500"
      ).then(res => {
        //  console.log(res);
        const total = res.Data[0];
        for (const j of Object.keys(total)) {
          const time = total[j][0] + "";
          const year = time.slice(0, 4);
          const month = time.slice(4, 6);
          const day = time.slice(6, 8);
          const hour = time.slice(8, 10);
          const minute = time.slice(10, 12);
          const second = time.slice(12, 14);
          const yeartwo = year + "-" + month + "-" + day;
          const timetwo = hour + ":" + minute + ":" + second;
          this.data1.push(timetwo);
          const chartprice = total[j][1] / 100;
          this.data2.push(chartprice);
          //昨收价是从另一个接口获取的
          const chg = parseFloat(
            Number(((chartprice - this.yes) / this.yes) * 100)
          ).toFixed(2);
          this.data3.push(chg);
        }

        this.chart.setOption({
          // 图相对于容器的位置
          grid: {
            left: "10%",
            right: "10%",
            bottom: "10%"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              animation: false,
              label: {
                backgroundColor: "#505765"
              }
            }
          },
          // 下方滑块
          // dataZoom: [
          //     {
          //         show: true,
          //         realtime: true,
          //     },
          //     {
          //         type: 'inside',
          //         realtime: true,
          //     },
          // ],
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisLine: { onZero: false },
              data: this.data1.map(str => {
                return str.replace(" ", "\n");
              })
            }
          ],
          yAxis: [
            {
              name: "价格",
              type: "value",
              scale: true,
              splitNumber: 4
            },
            {
              name: "涨跌幅(%)",
              type: "value",
              scale: true,
              splitNumber: 4,
              splitLine: false
            }
          ],
          series: [
            {
              name: "价格",
              type: "line",
              animation: false,
              symbol: "none",
              lineStyle: {
                width: 1
              },
              data: this.data2
            },
            {
              name: "涨跌幅",
              type: "line",
              yAxisIndex: 1,
              animation: false,
              symbol: "none",
              lineStyle: {
                width: 1,
                color: "transparent"
              },
              markLine: {
                silent: true,
                // 去掉箭头
                symbol: "none",
                data: [
                  {
                    yAxis: 0
                  }
                ],
                lineStyle: {
                  normal: {
                    type: "dashed",
                    color: "red"
                  }
                },
                label: {
                  formatter: ""
                }
              },
              data: this.data3
            }
          ]
        });
      });
      // },3000);
    },
    initchart() {
      this.chart = echarts.init(this.$refs.chartMin);
      this.getChart();
    }
  },
  mounted() {
    this.a = "sh" + this.$route.params.id;
    window.addEventListener("resize", this.initchart, 20);
    setInterval(() => {
      this.initchart();
    }, 9000);
  },
  destroyed() {
    window.removeEventListener("resize", this.initchart, 20);
  }
};
</script>

<style scoped>
.timeSharingChart {
  padding-top: 50px;
  background-color: #fff;
  width: 888px !important;
}
</style>
