<template>
  <div class="nav-main">
    <div v-for="(item,index) in navConfig" class="item" @click="pathTo(item)" :class="{'full':item.full}">
      <img :src="item.icon" alt width="36px" height="36px">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-nav',
    data: () => {
      return {
        navConfig: [{
          name: '申请绑定',
          icon: require('../../img/申请绑定.png'),
          path: 'applyForBinding',
          action: '',
        }, {
          name: '审核结果',
          icon: require('../../img/审核结果.png'),
          path: 'auditResult',
          action: '',
        }, {
          name: '使用流程',
          icon: require('../../img/使用流程图标.png'),
          path: 'useStep',
          action: '',
        }, {
          name: '我的信息',
          icon: require('../../img/我的信息.png'),
          path: 'personalCenter',
          action: '',
        }, {
          name: '我要反馈',
          icon: require('../../img/我要反馈.png'),
          path: 'question',
          action: '',
          full: true,
        }],
      };
    },
    methods: {
      change() {
        this.data.b = 3;
      },
      pathTo(item) {
        this.$router.push({name: item.path});
      },
    },
  };
</script>

<style scoped>
  .nav-main {
    overflow: hidden;
    background-color: #fff;
  }

  .item {
    float: left;
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #eee;
    /*margin: 10px 20px;*/
    text-align: center;
  }

  .item > img {
    margin: 5px;
  }

  .full {
    width: 100% !important;
  }
</style>
