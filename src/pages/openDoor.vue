<template>
  <div class="page">
    <mt-header title="开门">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="content">
      <!-- <van-circle v-model="currentRate" :rate="30" :speed="100" :text="text"/> -->
      <van-circle
        v-model="currentRate"
        color="#07c160"
        fill="#fff"
        size="180px"
        layer-color="#ebedf0"
        :text="text"
        :rate="rate"
        :speed="20"
        :stroke-width="60"
      />
      <div class="tips" v-if="opening">
        <span>正在开门中，请稍后...</span>
      </div>
      <div class="tips" v-else>
        <span>{{time}}秒后页面退出</span>
      </div>
      <div class="buttons" v-if="!opening">
        <mt-button @click="retryAction" type="primary">&nbsp;&nbsp;&nbsp;重&nbsp;试&nbsp;&nbsp;&nbsp;</mt-button>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <mt-button @click="goBackAction" type="default">&nbsp;&nbsp;门已开&nbsp;&nbsp;</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { HOST } from "../data/data.js";
import { Toast } from 'vant';

export default {
  data() {
    return {
      currentRate: 0,
      rate:100,
      opening: true,
      time: 5,
      code: "",
      // interval:null
    };
  },
  created() {
    this.code = this.$route.params.code;
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
    userId() {
      return this.$store.getters.getUserId;
    },
    uuid() {
      return this.$store.getters.getUUID;
    },
    location() {
      return this.$store.getters.getLocation;
    }
  },
  mounted() {

    this.$nextTick( function () {
      this.openDoorAction();
    })
  },
  destroyed(){
    if(this.closeTimer){
      clearInterval(this.closeTimer);
    }
  },
  methods: {
    beginTimer() {
      this.closeTimer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(this.closeTimer);

          this.$router.go(-1);
        }
      }, 1000);
    },
    retryAction() {

      clearInterval(this.closeTimer);

      this.currentRate =0;
      this.rate = this.rate + 100;

      this.time = 5;

      this.opening = true;
      this.openDoorAction();
    },
    goBackAction() {
      this.$router.go(-1);
    },
    openDoorAction() {
      // alert(this.code);
      //        * @param userId
      //  * @param longitude
      //  * @param latitude
      //  * @param MacAddress
      //  * @param qrCodeData

      // var location = this.getLocation();

      var data = {
        userId: this.userId,
        qrCodeData: this.code,
        MacAddress: this.uuid,
        longitude: this.location.longitude,
        latitude: this.location.latitude
      };
      const url = HOST + "/OpenDoor/toOpenDoor";
      this.$http({
        method: "post",
        url: url,
        data: data
      })
        .then((result) => {
          var data = result.data;
          var code = data.code;
          var message = data.message;
          console.log(JSON.stringify(data));
          if(data.code == 0){

                console.log("开门请求发送成功")

          }else{
              // alert(message);

              Toast({"message":message,"position":"bottom"});


              // debugger;

              if(this.closeTimer){
                  clearInterval(this.closeTimer);
              }

              this.rate = this.currentRate =0;

              this.goBackAction();

          }

        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    currentRate(val) {
      if (val == 100) {
        this.opening = false;
        this.beginTimer();
      }
    }
  }
};
</script>
<style scoped>
.content {
  text-align: center;
  padding-top: 50px;
}
.content .tips {
  margin-top: 50px;
}
.content .tips span {
  font-size: 22px;
  color: #07c160;
}
.content .buttons {
  margin-top: 50px;
}
</style>

