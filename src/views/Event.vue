<!--大事提醒-->
<template>
  <div class="event">
    <div class="event-header">大事提醒</div>
    <div class="event-content">
      <ul v-for="(item,index) in  greatEvent " :key="index">
        <li class="EventItem">
          <a :href="item.href" target="_black" :title="item.title">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Event",
  data() {
    return {
      greatEvent: [
        {
          title: "央行：适时适度实施逆周期调节",
          href: "http://finance.eastmoney.com/a/201906281163428795.html"
        },
        {
          title: "基金今年来最高涨幅超73%",
          href:
            "http://fund.eastmoney.com/trade/yzzq.html?spm=100015.1.mw#zwf_,sc_jn,st_desc"
        },
        {
          title: "华为有军方背景？华为和国防部都回应了！ 热议",
          href: "http://finance.eastmoney.com/a/201906281163428795.html"
        },
        {
          title: "人民日报：加征关税无用 中国有能力奉陪到底",
          href: "http://finance.eastmoney.com/a/201906281163485420.html"
        },
        {
          title: "茅台股价破千 能成A股老大吗 ",
          href: "http://finance.eastmoney.com/a/201906281163369281.html"
        },
        {
          title: " 这些股爆发潜力值爆棚",
          href:
            "http://gubatopic.eastmoney.com/topic.html?htid=127&gbtopic=hsgs3"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.event {
  width: 20%;
  height: 49%;
  border: 1px solid #c0c0c0;
  margin-top: 7px;
  &-header {
    height: 13%;
    width: 100%;
    border-bottom: 1px solid #c0c0c0;
    text-align: center;
    line-height: 3rem;
    letter-spacing: 10px;
    font-size: 16px;
  }
  &-content {
    a {
      color: blue;
    }
    li {
      height: 3rem;
      border-bottom: 1px dashed #ccc;
      line-height: 3rem;
      padding-left: 5px;
      span {
        margin-left: 40px;
        color: orange;
      }
    }
  }
}
.EventItem {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
