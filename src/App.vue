<template>
  <div id="app">
    <router-view v-if="show" name="top"></router-view>
    <router-view v-if="show" name="news"></router-view>
    <router-view v-if="show" class="text" name="text"></router-view>
    <router-view v-if="show"/>
  </div>
</template>

<script>
export default {
  components: {
    // Top,News,HotText
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    reload() {
      this.show = false;
      this.$nextTick(function() {
        this.show = true;
      });
    }
  },
  provide() {
    return {
      reload: this.reload
    };
  }
};
</script>

<style lang="scss">
#app {
  overflow: hidden;
  position: relative;
  .news {
    margin-top: 36px;
    position: absolute;
    right: 0;
  }
  .text {
    position: absolute;
    top: 350px;
    right: 0;
    margin-top: 36px;
  }
}
</style>
