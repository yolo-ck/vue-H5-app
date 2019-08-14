<template>
  <div class="notice-list page">
    <mt-header title="通知列表">
      <router-link to="/ownerHome" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>

    </mt-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="van-cell van-cell--clickable van-coupon-cell" v-for="(item,index) in data" @click="toItem(item)">
          <div class="van-cell__title">
            <!-- <img src alt width="35px" height="35px"> -->
            <span style="font-weight:bold"> {{item.noticeTheme}}【{{item.createDate}}】</span>
          </div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>

  import {HOST} from '../../../data/data';

  export default {
    name: 'notice-list',
    data: () => {
      return {
        data: [],
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      back() {
        this.$router.back();
      },
      toItem(item) {
        this.$router.push({name: 'noticeItem', params: {data: item}});
      },
      getData() {
        this.$http({
          method: 'post',
          // url: 'http://192.168.50.175:8082/lgt/a/notice/lgtNotice/data/getList',
          url: HOST + '/a/notice/lgtNotice/data/getList',
          data: {
            pageNo: 1,
            pageSize: -1,
          },
        }).then(response => {
          console.log(response.data);
          this.data = response.data.rows;
        });
      },
    },
  };
</script>

<style scoped>
  .scroll-list-wrap {
    height: calc(100% - 44px);
    width: 100%;
  }

  .notice-list {
    width: 100%;
    height: 100%;
  }

  .item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    text-indent: 20px;
  }

  .theme {
    height: 100%;
  }

  .btn {
    height: 100%;
    width: ;
  }
</style>
