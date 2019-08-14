<template>
  <div class="nav-main">
    <div v-for="(item,index) in navConfig" class="item" @click="pathTo(item)">
      <img :src="item.icon" alt width="36px" height="36px">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'a-nav',
    data: () => {
      return {
        navConfig: [{
          name: '人员登记',
          icon: require('../../../img/人员登记.png'),
          path: 'addPerson',
          path2: 'teachPage',
          action: '',
        }, {
          name: '人员注销',
          icon: require('../../../img/人员注销.png'),
          path: 'peopleManage',
          action: '',
        }, {
          name: '扫码开门',
          icon: require('../../../img/扫码开门.png'),
          path: 'QRcode',
          action: 'valid',
        }, {
          name: '我的审核',
          icon: require('../../../img/我的审核.png'),
          path: 'ownerAudit',
          action: '',
        }, {
          name: '我的信息',
          icon: require('../../../img/我的信息.png'),
          path: 'ownerPersonCenter',
          action: '',
        }, {
          name: '我要咨询',
          icon: require('../../../img/我要咨询.png'),
          path: 'question',
          action: '',
        }],
      };
    },
    props: {
      deviceValid: {
        type: Function,
      },
    },
    methods: {
      pathTo(item) {
        console.log(item);
        if (item.action == 'valid') {
          this.$emit('deviceValid',item.path );
        } else {
          if (item.path2) {
            // localStorage.setItem("teached", "Smith");
            let taught = localStorage.getItem('taught');
            console.log(taught);
            if (taught) {
              this.routerTo(item.path);
            } else {
              console.log('to teach');
              this.routerTo(item.path2);
            }
          } else {
            this.routerTo(item.path);
          }
        }

      },
      routerTo(path) {
        this.$router.push({name: path});
      },
    },
  };
</script>

<style scoped>
  .nav-main {
    overflow: hidden;
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
</style>
