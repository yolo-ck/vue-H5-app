<template>
  <div class="page">
    <mt-header title="人员详情">
      <router-link to="/ownerHome/peopleManage" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <div class="img">
            <img :src="img" width="100%" height="100%" alt />
          </div>

          <div class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>姓名：{{dataList.userName}}</span>
            </div>
            <div class="van-cell__title">
              <span>性别：{{dataList.sex}}</span>
            </div>
          </div>
          <div class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>联系方式：{{dataList.telephone}}</span>
            </div>
            <div class="van-cell__title">
              <span>民族：{{dataList.national}}</span>
            </div>
          </div>

          <div class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>身份证号码：{{dataList.idCard}}</span>
            </div>
          </div>
          <div class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>籍贯：{{dataList.censusRegister}}</span>
            </div>
          </div>
          <div class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>
                工作单位：
                <span v-if="dataList.workAddress">{{dataList.workAddress}}</span>
                <span style="color:blue"  v-else>请绑定店/铺住房信息</span>
              </span>
            </div>
          </div>
          <div v-if="dataList.userRents" class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>
                租赁位置：
                <span
                  v-for="(ele,index)  in dataList.userRents"
                  :key="index"
                >{{ele.address}}&emsp;</span>
              </span>
            </div>
          </div>

          <div v-else class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>
                租赁位置：
                <span>{{dataList.address}}&emsp;</span>
              </span>
            </div>
          </div>

          <mt-button
            v-if="canRemove&&!repeal&&!resubmit"
            class="remove"
            size="normal"
            type="primary"
            @click="toremove"
          >人员注销</mt-button>
          <mt-button
            v-if="canRemove&&!repeal&&!resubmit"
            class="revamp"
            size="normal"
            type="primary"
            @click="toChange"
          >信息修改</mt-button>
          <mt-button
            v-if="!canRemove&&!repeal&&!resubmit"
            class="revampfull"
            size="normal"
            type="primary"
            @click="resubmitClick"
          >信息修改</mt-button>
          <mt-button
            v-if="repeal&&!canRemove&&!resubmit"
            @click="repealClick"
            class="revampfull"
            size="normal"
            type="primary"
          >撤销申请</mt-button>
          <mt-button
            v-if="resubmit&&!repeal&&!canRemove"
            @click="resubmitClick"
            class="revampfull"
            size="normal"
            type="primary"
          >重新申请</mt-button>

          <div style="height:40px;"></div>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import { HOST, HOST_SRC } from "../../data/data.js";
import { MessageBox } from "mint-ui";
import { Toast } from "vant";

export default {
  name: "personDetail",
  data() {
    return {
      dataList: [],
      staffuserId: "",
      img: "",
      canRemove: false,
      repeal: false, //撤销申请
      resubmit: false //重新申请
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  methods: {
    toremove() {
      MessageBox.confirm("", {
        message: "是否确认注销该人员信息？",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            const url = HOST + "/a/mobile/user/register/ownerCancellationById";
            const toast1 = this.$createToast({
              txt: "注销人员中...",
              time: 0,
              mask: true
            });
            toast1.show();
            this.$http({
              method: "post",
              url: url,
              data: {
                userId: this.staffuserId
              }
            }).then(data => {
              toast1.hide();
              this.$router.push({ name: "peopleManage" });
            });
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    toChange() {
      this.$store.commit("setStaffId", this.dataList.userId);
      this.$store.commit("SET_KEEP_ALIVE", ["messageChange"]);
      this.$router.push({
        name: "messageChange",
        params: { personMessage: this.dataList }
      });
    },
    repealClick() {
      var that = this;
      MessageBox.confirm("", {
        message: "是否确认撤销该人员信息？",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            const toast = this.$createToast({
              txt: "撤销申请中...",
              time: 0,
              mask: true
            });
            toast.show();
            this.$http({
              method: "post",
              url: HOST + "/a/user/audit/revokeAudit",
              data: {
                id: that.dataList.userId
              }
            }).then(data => {
              console.log(data);
              toast.hide();
              Toast(data.data.msg);
              that.$router.go(-1);
            });
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    resubmitClick() {
      const toast2 = this.$createToast({
        txt: "正在加载...",
        time: 0,
        mask: true
      });
      toast2.show();
      this.$http({
        method: "post",
        url: HOST + "/a/user/audit/getUserRegistrationByUserId",
        data: {
          id: this.dataList.userId
        }
      }).then(data => {
        toast2.hide();
        if (data.data.success) {
          var data = data.data.data;
          this.$set(data, "userId", this.dataList.userId);
          this.$set(data, "addressStatus", this.dataList.addressStatus);

          this.$router.push({ name: "addPerson", params: data });
          console.log(data);
        }
      });
    }
  },
  mounted() {
    if (this.$route.params.personMessage.remarks) {
      MessageBox("未通过审核原因", this.$route.params.personMessage.remarks);
    }
    this.dataList = this.$route.params.personMessage;
    this.img = HOST_SRC + this.dataList.hochFormat;
    // if(this.dataList.userRents){

    // }
    console.log(this.dataList);
    this.staffuserId = this.dataList.userId;
    if (
      this.dataList.addressStatus == "-1" ||
      this.dataList.addressStatus == "0" ||
      this.dataList.addressStatus == "3"
    ) {
      this.canRemove = true;
    } else if (this.dataList.addressStatus == "4") {
      this.repeal = true;
    } else if (this.dataList.addressStatus == "5") {
      this.resubmit = true;
    }
    //     0:无地址，不可撤回，不可修改  正常流程
    // 1：未通过，不可撤回，可修改
    // 3：无地址，不可撤回，不可修改  正常流程
    // 4：待公安审核，可撤回
    // 5：已撤回，可修改
  },
  components: {}
};
</script>
<style scoped>
.img {
  width: 100%;
  height: 100px;
}
.page {
  /* background: rgb(237, 237, 237); */
}

.content {
  position: absolute;
  top: 44px;
  top: calc(44px + env(safe-area-inset-top));
  bottom: 0px;
  width: 100%;
}
.scroll-list-wrap {
  height: 100%;
}

.remove {
  margin-top: 20px;
  /* margin-left: 7%; */
  width: 49%;
  /* border-radius: 24px; */
}
.revamp {
  width: 49%;
  /* border-radius: 24px; */
  /* margin-left: 26px; */
}
.revampfull {
  margin-left: 5%;
  width: 90%;
}
.img {
  width: 100%;
  height: 240px;
}
</style>


