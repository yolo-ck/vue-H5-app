<template>
  <div class="page">
    <mt-header title="修改密码">
      <!-- <router-link @click="$router.back(-1)" slot="left"> -->
      <mt-button icon="back" slot="left" @click="back()"></mt-button>
      <!-- </router-link> -->
    </mt-header>
    <div class="inputBox">
      <mt-field label="原密码" placeholder="原密码" v-model="oldpsd"></mt-field>
      <mt-field label="新密码" placeholder="新密码" type="password" v-model="newpsd"></mt-field>
      <mt-field label="新密码" placeholder="重新输入新密码" type="password" v-model="repeatnewpsd"></mt-field>
    </div>
    <div class="btn1">
      <mt-button type="primary" size="large" @click="changePwd()">提交</mt-button>
    </div>
  </div>
</template>

<script>
import { Button } from "mint-ui";
import { Field } from "mint-ui";
import { Toast } from "mint-ui";
import { HOST } from "../data/data.js";
export default {
  name: "changePWD",
  data() {
    return {
      newpsd: "",
      oldpsd: "",
      repeatnewpsd: ""
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changePwd() {
      if (this.newpsd != this.repeatnewpsd) {
        Toast({
          message: "两次输入的新密码不同",
          position: "middle",
          duration: 2000
        });
        return;
      }
      var that = this;
      const url = HOST + "/OpenDoor/updatePwd";

      that
        .$http({
          method: "post",
          url: url,
          data: {
            userId: that.userId,
            oldPwd: that.oldpsd,
            newPwd: that.newpsd
          }
        })
        .then(function(data) {
          // console.log(data.data);
          Toast({
            message: data.data.message,
            position: "middle",
            duration: 2000
          });
          if (data.data.code == "0") {
            that.$router.go(-1);
          }
        });
    }
  },
  mounted() {}
};
</script>
<style scoped>
#changePWD {
  background: white;
  width: 100%;
  height: 100%;
}
.inputBox {
  margin-top: 15px;
}
.btn1 {
  padding: 20px 15px;
}
</style>
