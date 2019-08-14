<template>
  <div class="page">
    <mt-header title="我的审核">
      <router-link to="/ownerHome" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp"
        >
          <div class="stateMessage">
            <ul class="list">
              <li v-for="(item,index) in dataList" :key="index" @click="toauditDetail(index)">
                <div class="liLeft">
                  <div class="adressImg">
                    <div
                      style="height:60px;width:60px;color:rgb(80, 134, 167);  text-align: center;   font-size: 15px; "
                    >{{item.applicationType}}</div>
                  </div>
                </div>
                <div class="liRight">
                  <div style="padding-top:10px">
                    <p class="adress">{{item.userName}}</p>
                    <p class="updateTime">{{item.applyTime}}</p>
                  </div>
                </div>
                <!-- <div class="arrows">></div> -->
                <i class="van-icon van-icon-arrow van-cell__right-icon"></i>

                <div class="clear"></div>
              </li>
            </ul>
          </div>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { HOST } from "../../data/data.js";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import UserInfo from "@/components/userInfo";

export default {
  name: "ownerAudit",
  components: {
    UserInfo
  },
  data() {
    return {
      // flag: true,
      dataList: [],
      nextPageIndex: 1,
      options: {
        scrollToInvalidField: true,
        layout: "standard", // classic fresh
        pullDownRefresh: {
          threshold: 40,
          stop: 40,
          txt: "更新成功"
        },
        pullUpLoad: {
          threshold: 80,
          txt: {
            more: "上拉加载更多"
            // noMore: "没有更多内容 ~_~"
          },
          scrollbar: true
        }
      }
    };
  },

  computed: {
    userId() {
      return this.$store.getters.getUserId;
    },
    deviceId() {
      return this.$store.getters.getUUID;
    },
    binded() {
      return this.$store.getters.getBinded;
    },
    haveAddress() {
      return this.$store.getters.getHaveAddress;
    }
  },
  methods: {
    //点击列表进入详情

    toauditDetail(index) {
      // console.log(index);
      this.$router.push({
        name: "auditDetail",
        params: { personMessage: this.dataList[index] }
      });
    },

    onPullingDown() {
      // 模拟更新数据
      this.loadDateAtPage(1).then(result => {
        var returnList = result.data.data;

        if (returnList) {
          this.processList(returnList);
          this.dataList = returnList;
          this.nextPageIndex = 2;
        }
        this.$refs.scroll.forceUpdate(true);
      });
    },
    onPullingUp() {
      // 模拟更新数据
      console.log("get:" + this.nextPageIndex);
      this.loadDateAtPage(this.nextPageIndex).then(result => {
        var returnList = result.data.data;
        if (returnList) {
          this.processList(returnList);
          this.dataList = this.dataList.concat(returnList);
          this.nextPageIndex++;
          this.$refs.scroll.forceUpdate(true);
        } else {
          this.$refs.scroll.forceUpdate(false);
        }
      });
    },

    loadDateAtPage(pageNo) {
      const url = HOST + "/a/mobile/user/register/auditList";

      return this.$http({
        method: "post",
        url: url,
        data: {
          userId: this.userId,
          pageSize: 10,
          pageNo: pageNo
        }
      });
    },
    processList(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].applicationType == "1") {
          data[i].applicationType = "首次申请";
        }

        if (data[i].applicationType == "2") {
          data[i].applicationType = "变更地址";
        }

        if (data[i].applicationType == "3") {
          data[i].applicationType = "新增地址";
        }

        if (data[i].applicationType == "4") {
          data[i].applicationType = "手机变更";
        }
      }
    },
    loadAuditList() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });

      this.loadDateAtPage(1)
        .then(result => {
          Indicator.close();
          console.log(result);
          var data = result.data.rows;
          this.processList(data);
          console.log(data);
          this.dataList = data;
          this.nextPageIndex = 2;
        })
        .catch(error => {
          Indicator.close();
          console.log(error);
        });
    }
  },
  mounted() {
    this.loadAuditList();
  }
};
</script>
<style scoped>
.van-cell__right-icon {
  margin-top: 17px;
}
.content {
  position: absolute;
  top:44px;
  top:calc(44px + env(safe-area-inset-top));
  bottom: 0px;
  width: 100%;
}
.scroll-list-wrap {
  height: 100%;
}
.list > li:first-child {
  border-top: 1px solid rgb(164, 162, 162);
}
#auditResult {
  height: 100%;
}
#personMessage {
  margin: 2%;
  width: 100%;
  height: 5rem;
}
.img {
  float: left;
  width: 20%;
  height: 100%;
  background: url(../../img/binding.png) no-repeat;
  background-size: 100% 100%;
}
.imgright {
  float: left;
  margin-top: 2%;
  margin-left: 6%;
}
.line {
  width: 100%;
  height: 0.3rem;
  background: rgb(89, 180, 239);
}
#personName {
  padding-top: 5%;
  font-weight: bold;
}
#binding {
  margin-top: 37%;
  font-size: 0.7rem;
  display: block;
  border: 1px solid red;
  border-radius: 5px;
  line-height: 0.7rem;
  padding: 3px;
  color: red;
}

.stateMessage ul {
  margin-top: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  /* padding-top: 5%; */
}
.stateMessage ul li {
  padding: 7px 7px;
  padding-right: 0px;
  /* box-shadow: 5px 6px 4px #bfbfbf; */
  border-bottom: 1px solid #ddd;
  /* width: 93%; */
}
.clear {
  clear: both;
}
.liLeft,
.liRight,
.arrows {
  float: left;
}
.liRight {
  width: 60%;
}
.arrows {
  width: 11%;
}
.liLeft {
  margin-right: 10px;
  width: 20%;
  height: 60px;
}

.liBottom {
  margin-top: 10px;
}
.liLeft p {
  padding-top: 12%;
}
.stateMessage p {
  margin: 0;
  font-size: 14px;
}
.adressImg {
  width: 60px;
  height: 60px;
  border: 2px solid rgb(80, 134, 167);
  border-radius: 40px;
  line-height: 60px;
}
.adress {
  font-size: 16px !important;
  font-weight: 400;
  color: rgb(169, 166, 166);
}
.updateTime {
  color: rgb(169, 166, 166);
  font-size: 15px;
  font-weight: 300;
  padding-top: 10px;
}
.result {
  margin-top: 3%;
  /* display: block; */
  border: 1px solid rgb(169, 166, 166);
  width: 40%;
  text-align: center;
  background: rgb(182, 239, 147);
  font-size: 14px;
  line-height: 20px;
}
.active {
  background: rgb(250, 230, 206);
  color: rgb(231, 174, 129);
}
</style>
