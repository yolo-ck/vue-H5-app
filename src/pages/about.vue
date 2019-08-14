<template>
  <div class="page">
    <mt-header title="当前版本">
      <mt-button icon="back" slot="left" @click="goBack()"></mt-button>
    </mt-header>

    <img src="../img/qrcode.png" class="qrcode">
    <p class="edition">软件版本：{{version}}</p>
    <p class="theme">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      title: "家在织里",
      version: "1.0.0"
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    if (typeof cordova != "undefined") {
      var that = this;
      cordova.getAppVersion.getVersionNumber().then(function(localVersion) {
        console.log("localVersion:" + localVersion);
        that.version = localVersion;
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul,
ol,
li {
  list-style: none;
}
div {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: black;
}
.body {
  position: absolute;
  width: 100%;
  background-color: white;
}
.qrcode {
  width: 50%;
  position: absolute;
  top: 20%;
  right: 25.5%;
}
.edition {
  color: #ccc;
  font-size: 16px;
  text-align: center;
  margin-top: 82%;
}
.theme {
  color: black;
  font-size: 20px;
  text-align: center;
  margin-top: 40%;
}
.return {
  position: fixed;
  top: 2.8em;
  left: 1em;
  z-index: 99;
}
</style>
