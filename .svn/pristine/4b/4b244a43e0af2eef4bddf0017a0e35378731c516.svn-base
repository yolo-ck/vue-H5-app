<template>
  <div class="notice-scroll" @click="pathTo">
    <van-notice-bar
      :text="data.noticeTheme"
      background="#fff"
      left-icon="volume-o"
    />
  </div>
</template>

<script>
  import {HOST} from '../../../data/data';
  import { NoticeBar } from 'vant';
  export default {
    name: 'notice',
    data: () => {
      return {
        data: {},
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      pathTo() {
        this.$router.push({name: 'noticeList'});
      },
      getData() {
        this.$http({
          method: 'post',
          // url: 'http://192.168.50.175:8082/lgt/a/notice/lgtNotice/data/getList',
          url: HOST + '/a/notice/lgtNotice/data/getList',
          data: {
            pageNo: 1,
            pageSize: 1,
          },
        }).then(response => {
          console.log(response.data);
          this.data = response.data.rows[0];
        });
      },
    },
  };
</script>

<style scoped>
  .notice-scroll {
    width: 100%;
    /*height: 30px;*/
    line-height: 30px;
    background-color: #fff;
  }

  /*.notice-scroll > img {*/
  /*  vertical-align: middle;*/
  /*  width: 26px;*/
  /*  height: 26px;*/
  /*}*/
</style>
