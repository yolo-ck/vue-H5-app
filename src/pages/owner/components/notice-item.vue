<template>
  <div class="notice-item page">
    <mt-header title="通知详情">
      <router-link to="/ownerHome/noticeList" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>

    </mt-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="row">
          <div class="title">标&nbsp;&nbsp;&nbsp;题：</div>
          <div class="text">{{data.noticeTheme}}</div>
        </div>
        <div class="row">
          <div class="title">时&nbsp;&nbsp;&nbsp;间：</div>
          <div class="text">{{data.updateDate}}</div>
        </div>
        <div class="row">
          <div class="title">发布人：</div>
          <div class="text">{{data.creater}}</div>
        </div>
        <div class="row">
          <div class="title">内&nbsp;&nbsp;&nbsp;容：</div>
          <div class="text">
            {{data.noticeContent}}
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notice-item',
    data: () => {
      return {
        data: {},
      };
    },
    mounted() {
      this.data = this.$route.params.data;
    },
    methods: {},
  };
</script>

<style scoped>
  .scroll-list-wrap {
    height: calc(100% - 44px);
    width: 100%;
  }

  .notice-item {
    width: 100%;
    height: 100%;
  }

  .row {
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }

  .title {
    width: 80px;
    line-height: 30px;
    text-align: right;
    float: left;
  }

  .text {
    line-height: 30px;
    float: left;
    width: calc(100% - 80px);
  }
</style>
