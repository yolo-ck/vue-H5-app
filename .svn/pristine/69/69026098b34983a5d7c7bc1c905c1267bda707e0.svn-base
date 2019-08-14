<template>
  <div class="page">
    <div id="ownerPersonCenter">
      <div id="photo">
        <mt-header title="个人信息">
          <router-link to="/ownerHome" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <!-- <div id="personPhoto"></div> -->
      </div>
      <p id="personName">{{userInfo.userName}}</p>
      <router-link to="/home/changePWD" slot="left">
        <div id="changePassword">
          <div>
            <!-- <i class="iconfont">&#xe61f;</i> -->
            <img class="tubiao" src="../../img/suo.png" alt>
            <span style="margin-left:2%;">修改密码</span>
            <i class="iconfont righticon">&#xe666;</i>
          </div>
        </div>
      </router-link>
      <router-link to="/home/about" slot="left">
        <div id="version">
          <div>
            <!-- <i class="iconfont">&#xe620;</i> -->
            <img class="tubiao" src="../../img/banbenhao.png" alt>
            <span style="margin-left:2%;">查看当前版本</span>
            <i class="iconfont righticon">&#xe666;</i>
          </div>
        </div>
      </router-link>

      <router-link to="/ownerHome/information" slot="left">
        <div id="information">
          <div>
            <!-- <i class="iconfont">&#xe620;</i> -->
            <img class="tubiao" src="../../img/xinxi.png" alt>
            <span style="margin-left:2%;">信息管理</span>
            <i class="iconfont righticon">&#xe666;</i>
          </div>
        </div>
      </router-link>
      <router-link to="/ownerHome/ownerAuditResult" slot="left">
        <div id="information">
          <div>
            <!-- <i class="iconfont">&#xe620;</i> -->
            <img class="tubiao" src="../../img/aduit.png" alt>
            <span style="margin-left:2%;">我的审核</span>
            <i class="iconfont righticon">&#xe666;</i>
          </div>
        </div>
      </router-link>
      <router-link to="/" slot="left">
        <button class="btn1">退出登录</button>
      </router-link>
      <!-- <div id="bottom"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "ownerPersonCenter",
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    },
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  }
};
</script>
<style scoped>
.tubiao {
  vertical-align: middle;
}
#ownerPersonCenter {
  background: rgb(238, 245, 255);
  height: 100%;
  /* height: 10rem; */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  color: rgb(70, 169, 250);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.mint-header {
  background-color: var(--main-color);
}
#photo {
  width: 100%;
  height: 14rem;
  background: url(../../img/photo.png) no-repeat;
  background-size: 100% 100%;
}
#personPhoto {
  width: 35%;
  height: 54%;
  background: #000;
  margin: 45px auto;
  border-radius: 69px;
}
#personName {
  width: 100%;
  text-align: center;
  height: 36px;
  padding-top: 20px;
}
#changePassword,
#version,
#information {
  background: white;
  width: 100%;
  /* height: 3rem; */
  line-height: 3rem;
}
#changePassword div,
#version div,
#information div {
  margin-left: 4%;
  border-bottom: 1px solid #eee;
}
.righticon {
  color: #cccccc;
  font-size: 30px;
  float: right;
  line-height: 3rem;
  margin-right: 2%;
}
.btn1 {
  height: 3rem;
  margin-top: 14%;
  width: 86%;
  border-radius: 20px;
  background: white;
  font-size: 18px;
  margin-left: 7%;
  border: none;
  outline: none;
  margin-bottom: 9rem;
}
#bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: red;
}
</style>

