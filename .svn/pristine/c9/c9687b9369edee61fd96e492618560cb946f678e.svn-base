<template>
  <div class="teach page">
    <mt-header title="帮助">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="scroll-list-wrap" :options="{}">
      <cube-scroll ref="scroll">
        <img @onload="load" :src="teach" alt class="bg-img">
        <button class="addBtn" @click="goTo">确定</button>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'teachPage',
    data: () => {
      return {
        teach: '',
        scroll: {},
      };
    },
    mounted() {

      localStorage.setItem('taught', '1');
      this.scroll = this.$refs.scroll;
      let newImg = new Image();
      newImg.src = this.src;
      newImg.onerror = () => { // 图片加载错误时的替换图片
        newImg.src = require('../../img/使用说明流程.png');
      };
      newImg.onload = () => { // 图片加载成功后把地址给原来的img
        this.scroll.refresh();
        this.teach = newImg.src;
      };
    },
    methods: {
      back() {
        this.$router.back();
      },
      load() {
        console.log('onload');
      },
      goTo() {
        console.log();
        this.$router.replace({
          name: 'addPerson',
        });
      },
    },
  };
</script>

<style scoped>
  .teach {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .scroll-list-wrap {
    height: calc(100% - 88px);
    width: 100%;
    /* padding-top:40px; */
  }


  .bg-img {
    width: 100%;
    display: block;
    /*height 800px;
    /*height 100%;*/
  }

  .addBtn {
    margin: 0 auto;
    display: block;
    margin-top: 10px;
    padding: 17px 16px;
    width: 95%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: #fff;
    background: #4a4c5b;
    outline: none;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
</style>
