<template>
  <div class="page">
    <mt-header title="人员详情修改">
      <mt-button @click="back" icon="back" slot="left"></mt-button>
    </mt-header>

    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <div class="img">
            <img :src="hochFormat" width="100%" height="100%" alt />
          </div>
          <van-field
            v-model="dataList.userName"
            label="姓名："
            type="textarea"
            placeholder="可修改"
            rows="1"
            autosize
          />
          <div class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>性别：{{dataList.sex}}</span>
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
              <span>联系方式：{{phone}}</span>
            </div>
          </div>
          <van-field
            v-model="dataList.censusRegister"
            label="籍贯:"
            type="textarea"
            placeholder="可修改"
            rows="1"
            autosize
          />

          <div class="van-cell van-coupon-cell" @click="showShop">
            <div class="van-cell__title">
              <span>工作单位：&emsp;&emsp;{{jobAddress}}</span>
            </div>
          </div>
          <div class="van-cell van-coupon-cell">
            <div class="van-cell__title">
              <span>居住地址:</span>
            </div>
          </div>
          <!-- <address-list ref="addressComp" /> -->
          <address-list :first="falg" ref="addressComp" :data="resubmitAddress" />
          <mt-button class="submit" type="primary" @click="submit">提交</mt-button>
          <div style="height:40px;"></div>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import { HOST, HOST_SRC, BASE_PATH } from "../../data/data.js";
import { MessageBox } from "mint-ui";
// import AddressList from "@/components/addressList";
import addPersonAddress from "@/components/addPersonAddress";

import { Toast } from "vant";
// shops/lgtShops/getShopsByUserId
export default {
  name: "messageChange",
  data() {
    return {
      phone: "",
      job: "",
      jobAddressArr: [],
      jobAddress: "",
      cardType: "",
      dataList: [],
      staffuserId: "",
      address: [],
      param: "",
      addressData: [],
      shopAddresssId: "",
      hochFormat: "",
      // censusRegister: "",
      // userName: "",

      //绑定的住址
      userRent: {},
      resubmitAddress: [],
      addresses: [],
      filtedAddresses: [],
      buildingList: "",
      falg: true
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path.indexOf("selectRoom") > -1) {
        vm.$store.commit("SET_KEEP_ALIVE", ["messageChange"]);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("selectRoom") > -1) {
      this.$store.commit("SET_KEEP_ALIVE", ["B", "C"]);
    } else if (to.path.indexOf("peopleManage") > -1) {
      this.$store.commit("SET_KEEP_ALIVE", []);
    }
    next();
  },
  created() {
    this.$route.params.personMessage.userRents.forEach(ele => {
      this.resubmitAddress.push(ele.room);
    });
    // this.resubmitAddress = this.$route.params.personMessage.userRents[0].room;
  },
  mounted() {
    this.$store.commit("setUserType", "messageChange");
    this.dataList = this.$route.params.personMessage;
    console.log(this.dataList);
    this.staffuserId = this.dataList.userId;
    this.$refs.addressComp.staffId = this.staffuserId;
    this.phone = this.dataList.telephone;
    this.jobAddress = this.dataList.workAddress;
    this.hochFormat = HOST_SRC + this.dataList.hochFormat;
    this.shopAddresssId = this.dataList.workUnit;
    // this.userName = this.dataList.userName;
    // this.censusRegister = this.dataList.censusRegister;

    // this.$refs.addressComp.addresses = this.dataList.userRents;
    // this.addresses = this.$refs.addressComp.addresses;
    // console.log(this.userId, this.staffuserId);
    this.addresses = this.$refs.addressComp.addresses;
    this.getShop();
  },
  methods: {
    back() {
      this.$store.commit("setStaffId", "");
      this.$router.push({ name: "peopleManage" });
    },

    //获取所有商铺
    getShop() {
      const url = HOST + "/a/shops/lgtShops/getShopsByUserId";
      this.$http({
        method: "post",
        url: url,
        data: {
          userId: this.userId
        }
      }).then(data => {
        this.addressData = data.data.data;
        for (var i = 0; i < this.addressData.length; i++) {
          this.jobAddressArr.push({ text: this.addressData[i].name });
        }
      });
    },
    showShop() {
      if (!this.shopPicker) {
        this.shopPicker = this.$createPicker({
          title: "工作单位",
          data: [this.jobAddressArr],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.shopPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.jobAddress = selectedText.join(" ");
      this.shopAddresssId = this.addressData[selectedIndex].id;
    },
    cancelHandle() {},
    submit() {
      MessageBox.confirm("", {
        message: "是否确认修改",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(action => {
        var that = this;
        if (action == "confirm") {
          //确认的回调

          if (!this.phone) {
            Toast("电话号码不可为空");
            return;
          }

          this.param = {
            userId: this.staffuserId,
            shopId: this.shopAddresssId,
            phone: this.phone,
            addressData: that.filtedAddresses,
            censusRegister: this.dataList.censusRegister,
            userName: this.dataList.userName
          };

          const toast = this.$createToast({
            txt: "提交中...",
            time: 0,
            mask: true
          });
          toast.show();

          const submitUrl =
            HOST + "/a/mobile/user/register/ownerUpdateEmployee";
          this.$http({
            method: "post",
            url: submitUrl,
            data: {
              param: JSON.stringify(this.param)
            }
          }).then(data => {
            console.log(data);
            toast.hide();
            this.$store.commit("setStaffId", "");
            this.$router.push({ name: "peopleManage" });
          });
        }
      });
    }
  },

  components: {
    // "address-list": AddressList
    "address-list": addPersonAddress
  },
  watch: {
    addresses: {
      deep: true,
      handler() {
        // console.log(this.addresses);

        this.$http({
          method: "post",
          url: HOST + "/OpenDoor/getBindingAddress",

          data: {
            userId: this.userId
          }
        }).then(data => {
          this.buildingList = data.data.data;
          this.filtedAddresses = [];

          for (let i = 0; i < this.addresses.length; i++) {
            if (this.addresses[i].name != "请选择地址") {
              this.filtedAddresses.push(
                this.buildingList[this.addresses[i].value]
              );
            }
          }
        });
      }
    }
  }
};
</script>
<style scoped>
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

.img {
  width: 100%;
  height: 240px;
}

.submit {
  width: 98%;
  margin-left: 1%;
}
</style>
<style >
.address .mint-cell-value {
  display: none !important;
}

.address .mint-cell {
  min-height: 24px !important;
}
</style>



