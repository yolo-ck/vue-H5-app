<template>
  <div class="page">
    <mt-header title="人员管理">
      <router-link to="/ownerHome" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/ownerHome/addPerson" slot="right">
        新增
        <img
          width="25"
          height="25"
          src="../../img/addPerson.png"
          style="vertical-align:middle"
          alt
        />
      </router-link>
    </mt-header>

    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </form>

    <div class="peopleList">
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp"
        >
          <ul>
            <li
              class="peopleMessage"
              v-for="(item,index) in dataList"
              :key="index"
              @click="topersonDetail(index)"
            >
              <div class="room">
                <div style="  text-align: center; font-weight:bold; width:25%">{{item.userName}}</div>
                <div style="  text-align: center; font-weight:bold; width:60%">{{item.address}}</div>

                <!-- {{  (item.userRents&&item.userRents.length >0) ?item.userRents[0].address:"待公安审核"}} -->
              </div>
              <img v-show="!item.workAddress" class="work" src="../../img/noWork.png" alt />

              <div class="message">
                <div class="sex">
                  <img v-if="item.sex=='男' " src="../../img/man.png" alt width="45px" height="30px" />
                  <img v-else src="../../img/woman.png" alt width="45px" height="30px" />
                </div>
                <div class="phone">
                  <div>
                    <img class="phonePic" src="../../img/phone.png" alt />
                    <span>联系方式</span>
                  </div>
                  <p>{{item.telephone}}</p>
                </div>
                <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                <div style="clear:both"></div>
              </div>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import { HOST } from "../../data/data.js";
import { Indicator } from "mint-ui";

export default {
  name: "peopleManage",
  data() {
    return {
      dataList: [],
      nationalList: [],
      nextPageIndex: 1,
      value: "",
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
            // more: "上拉加载更多"
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
    }
  },
  mounted() {
    this.loadAuditList();
  },
  methods: {
    onPullingDown() {
      // 模拟更新数据
      this.loadDateAtPage(1).then(result => {
        var returnList = result.data.rows;

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
        var returnList = result.data.rows;
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
      const url = HOST + "/a/mobile/user/register/ownerPersonManagement";

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
      // for (var i = 0; i < data.length; i++) {
      data.forEach(ele => {
        if (ele.sex == "1") {
          ele.sex = "男";
        } else {
          ele.sex = "女";
        }
        if (!ele.userRents) {
          if (ele.addressStatus == "0" || ele.addressStatus == "3") {
            ele.address = "暂无居住地址信息";
          } else if (ele.addressStatus == "1") {
            ele.address = "审核未通过";
          } else if (ele.addressStatus == "4") {
            ele.address = "待公安审核";
          } else if (ele.addressStatus == "5") {
            ele.address = "已撤回申请";
          } else if (ele.addressStatus == "2") {
            ele.address = "待审核";
          }
        } else {
          ele.address = ele.userRents[0].address;
          // ele.userRents.forEach(item => {
          //   // console.log(item.address);
          //   // ele.address += item.address;
          // });
        }
      });

      // }

      data.forEach(ele => {
        this.GLOBAL.nation.forEach(element => {
          if (element.value == ele.national) {
            ele.national = element.name;
          }
        });
      });
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
    },

    onSearch(e) {
      const url1 = HOST + "/a/mobile/user/register/ownerPersonManagement";

      this.$http({
        method: "post",
        url: url1,
        data: {
          userId: this.userId,
          search: this.value
        }
      }).then(result => {
        console.log(result);
        var data = result.data.rows;
        this.processList(data);
        this.dataList = data;
      });
    },
    topersonDetail(index) {
      this.$router.push({
        name: "personDetail",
        params: { personMessage: this.dataList[index] }
      });

      // debugger;
    }
  }
};
</script>
<style scoped>
.scroll-list-wrap {
  height: 100%;
}
.peopleList {
  position: absolute;
  top: 88px;
  top: calc(88px + env(safe-area-inset-top));
  bottom: 0px;
  width: 100%;
  padding: 0 10px;
  /* padding-top: 10px; */
}
.peopleMessage {
  height: 95px;
  padding: 15px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 5px;
  margin-top: 10px;
  position: relative;
}
.message {
  padding-top: 15px;
}
.room {
  font-weight: bold;
  display: flex;
}
.sex,
.phone {
  float: left;
  height: 60px;
}
.sex {
  width: 25%;
  border-right: 1px solid rgb(187, 187, 187);
  line-height: 80px;
}
.phone {
  width: 60%;
  padding-left: 20px;
}
.phone > div {
  height: 30px;
  line-height: 30px;
  padding-bottom: 10px;
  padding-left: 5px;
  font-size: 14px;
}
.phone > div span {
  line-height: 30px;
}
.phone p {
  font-weight: bold;
}
.phonePic {
  width: 20px;
  height: 20px;
  position: relative;
  top: 5px;
}
.work {
  position: absolute;
  top: 0;
  left: 50px;
  z-index: 20;
}
</style>
