<!--自选股-->
<template>
  <div class="myInfo">
    <div class="myInfo-header">
      <div :class="{true:isTrue}" class="myInfo-header-left" @click="toSim(1)">
        <span>我的自选股</span>
      </div>
    </div>
    <div class="myInfo-content">
      <component :is="tabView"></component>
    </div>
  </div>
</template>
<script>
import Simple1 from "./Simple1";
export default {
  name: "MyInfo",
  components: {
    Simple1
  },
  data() {
    return {
      tabView: "Simple1",
      isTrue: false, //自选股
      isFalse: true
    };
  },
  methods: {
    toSim(index) {
      this.tabView = `Simple${index}`;
      this.isTrue = !this.isTrue;
      this.isFalse = !this.isFalse;
    },
    checkedItem(index) {
      this.isActive = index;
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
.myInfo {
  width: 20%;
  height: 49%;
  border: 1px solid #c0c0c0;
  &-header {
    height: 14%;
    width: 100%;
    float: left;
    &-left {
      width: 100%;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      border-bottom: 1px dashed #000;
    }
  }
}
</style>
