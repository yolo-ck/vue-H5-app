<template>
  <div class="page">
    <mt-header title="信息管理">
      <router-link to="/ownerHome/ownerPersonCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div style="background:white">
      <user-info/>
    </div>
    <div class="van-cell van-cell--clickable van-coupon-cell" @click="tochangePhone">
      <div class="van-cell__title">
        <span>联系方式：</span>
      </div>
      <div class="van-cell__value">
        <span>{{dataList.telephone}}</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <div class="van-cell van-cell--clickable van-coupon-cell" @click="tochangeJob">
      <div class="van-cell__title">
        <span>从事职业：</span>
      </div>
      <div class="van-cell__value">
        <span>{{dataList.professional}}</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <div class="van-cell van-cell--clickable van-coupon-cell" @click="tochangeCard">
      <div class="van-cell__title">
        <span>办证类型：</span>
      </div>
      <div class="van-cell__value">
        <span>{{dataList.papersType}}</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <div class="van-cell van-cell--clickable van-coupon-cell" @click="tochangeworkAddress">
      <div class="van-cell__title">
        <span>工作单位:</span>
      </div>
      <div class="van-cell__value">
        <span>{{dataList.workUnit}}</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <div
      class="van-cell van-cell--clickable van-coupon-cell"
      style="margin-top:10px;"
      @click="torentAddress"
    >
      <div class="van-cell__title">
        <span style="font-weight:bold">租赁位置</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <div class="van-cell van-cell--clickable van-coupon-cell" @click="toshop">
      <div class="van-cell__title">
        <span style="font-weight:bold">商铺情况</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { HOST } from "../../data/data.js";
import UserInfo from "@/components/userInfo";

export default {
  name: "information",
  data() {
    return {
      transitionName: "slide-left",
      dataList: ""
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  mounted() {
    const url = HOST + "/a/mobile/user/register/getUserInfoByUserId";
    this.$http({
      method: "post",
      url: url,
      data: {
        userId: this.userId
      }
    }).then(data => {
      this.dataList = data.data;

      if (this.dataList.papersType == "01") {
        this.dataList.papersType = "居住证";
      }
      if (this.dataList.papersType == "99") {
        this.dataList.papersType = "其他";
      }
      if (this.dataList.papersType == "100") {
        this.dataList.papersType = "未办";
      }
      console.log(this.dataList);
    });
  },
  methods: {
    tochangePhone() {
      this.$router.push({
        name: "phone",
        params: { phone: this.dataList.telephone }
      });
    },
    tochangeJob() {
      this.$router.push({
        name: "job",
        params: { phone: this.dataList.professional }
      });
    },
    tochangeCard() {
      if (this.dataList.papersType == "01") {
        this.dataList.papersType = "居住证";
      }
      if (this.dataList.papersType == "99") {
        this.dataList.papersType = "其他";
      }
      if (this.dataList.papersType == "100") {
        this.dataList.papersType = "未办";
      }
      this.$router.push({
        name: "cardType",
        params: { phone: this.dataList.papersType }
      });
    },
    tochangeworkAddress() {
      this.$router.push({
        name: "workAddress",
        params: { phone: this.dataList.workUnit }
      });
    },
    torentAddress() {
      this.$router.push({ name: "rentAddress" });
    },
    toshop() {
      this.$router.push({
        name: "shop",
        parmas: { id: this.dataList }
      });
    }
  },

  // watch: {
  //   $route(to, from) {
  //     //    console.log('现在路由:',to.path.split('/')[1],'来自路由:',from.path.split('/')[1],'现在的动画:',this.transitionName)
  //     const toDepth = to.path.split("/").length;
  //     const fromDepth = from.path.split("/").length;

  //     if (toDepth == fromDepth) {
  //       if (to.name == "login" || to.name == "personalCenter") {
  //         this.transitionName = "slide-right";

  //         return;
  //       }

  //       this.transitionName = "slide-left";

  //       return;
  //     }

  //     this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";

  //     const url = HOST + "/a/mobile/user/register/getUserInfoByUserId";
  //     this.$http({
  //       method: "post",
  //       url: url,
  //       data: {
  //         userId: this.userId
  //       }
  //     }).then(data => {
  //       console.log(data);

  //       this.dataList = data.data;

  //       if (this.dataList.papersType == "01") {
  //         this.dataList.papersType = "居住证";
  //       }
  //       if (this.dataList.papersType == "99") {
  //         this.dataList.papersType = "其他";
  //       }
  //       if (this.dataList.papersType == "100") {
  //         this.dataList.papersType = "未办";
  //       }
  //     });
  //   }
  // },
  components: {
    "user-info": UserInfo
  }
};
</script>
<style scoped>
.page {
  background: rgb(237, 237, 237);
}
.line {
  display: none;
}
</style>



