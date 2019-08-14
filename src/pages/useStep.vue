<template>
  <div class="page">
    <mt-header title="使用流程">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div>
          <img class="help" src="../img/help.jpg">
        </div>
      </cube-scroll>
    </div>
  </div></div>
</template>
<script>
export default {
  name: "useStep",

  mounted(){

    this.$nextTick(()=>{
        this.reloadScroll();
    });

  },

  methods:{
     reloadScroll:function(){
         var bscroll = this.$refs.scroll.scroll;
        clearTimeout(bscroll.resizeTimeout);
        bscroll.resizeTimeout = setTimeout(function() {
          bscroll.refresh();
        }, 600);
        //
     }
  }
};
</script>
<style scoped>
.content{
  position: absolute;
  top:44px;
  top:calc(44px + env(safe-area-inset-top));
  bottom: 0px;
  width: 100%;
}
.scroll-list-wrap {
  width: 100%;
  height: 100%;
}
.help {
  width: 100%;
}
</style>

