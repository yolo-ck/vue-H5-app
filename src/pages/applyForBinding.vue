<template>
  <div class="page">
    <mt-header title="申请绑定">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <user-info />
    <div>
      <mt-cell title="申请更改或增加位置">
        <img slot="icon" src="../img/change.png" width="24" height="24" />
      </mt-cell>
    </div>
    <address-list ref="addressComp" />
    <div class="btnDiv">
      <mt-button type="primary" @click="submitAction" size="large">提交</mt-button>
    </div>
  </div>
</template>
<script>
import { HOST } from "../data/data.js";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import UserInfo from "@/components/userInfo";
import AddressList from "@/components/addressList";

export default {
  name: "applyForBinding",
  data() {
    return {
      initSize: ""
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  activated() {
    this.$store.commit("setUserType", "staffAdress");
  },
  mounted() {
    this.$store.commit("setUserType", "staffAdress");
    this.loadDefaultAddresses();
  },
  methods: {
    loadDefaultAddresses() {
      const url1 = HOST + "/OpenDoor/getBindingAddress";
      this.$http({
        method: "post",
        url: url1,
        data: {
          userId: this.userId
        }
      }).then(result => {
        var data = result.data.data;

        // this.addresses = [];
        this.initSize = data.length;
      });
    },
    submitAction() {
      var addresses = this.$refs.addressComp.addresses;

      var total = this.$store.getters.getUserInfo.total - this.initSize;
      console.log(total);
      // if(total){}
      if (addresses.length > 3 - total) {
        Toast({
          message: "每人最多只能提交绑定3个地址！(包含正在审核的)",
          position: "bottom",
          duration: 3000
        });

        return;
      }

      var filtedAddresses = [];

      for (var idx in addresses) {
        var item = addresses[idx];
        if (item.room && item.room.length > 0) {
          filtedAddresses.push(item);
        }
      }

      MessageBox.confirm("确认要提交更改吗?").then(action => {
        if (action === "confirm") {
          // this.$router.push({name:""})
          // alert(JSON.stringify(this.addresses));
          Indicator.open({
            text: "提交中...",
            spinnerType: "fading-circle"
          });

          const url = HOST + "/OpenDoor/applicationBinding";
          this.$http({
            method: "post",
            url: url,
            data: {
              userId: this.userId,
              addressData: JSON.stringify(filtedAddresses)
            }
          })
            .then(result => {
              Indicator.close();
              console.log(result.data.data);
              // console.log(1);
              var code = result.data.code;
              if (code == 0) {
                Toast({
                  message: "提交成功",
                  iconClass: "icon icon-success"
                });

                this.$router.replace({ name: "auditResult" });
              } else {
                Toast({
                  message: "提交失败",
                  iconClass: "icon icon-failure"
                });
              }
            })
            .catch(error => {
              Indicator.close();
              console.log(error);
            });
        }
      });
    }
  },

  components: {
    "user-info": UserInfo,
    "address-list": AddressList
  }
};
</script>
<style scoped>
#applyForBinding {
  height: 100%;
}
.mint-cell-flag {
  width: 40px;
  /* height: 40px; */
}
.btnDiv {
  padding: 20px 15px;
}
</style>


