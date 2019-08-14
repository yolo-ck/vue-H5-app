
<template>
  <div class="page">
    <mt-header :title="title">
      <mt-button slot="left" icon="back" @click="goback"></mt-button>
      <mt-button @click="submit" slot="right">提交</mt-button>
    </mt-header>

    <van-search v-model="value" placeholder="搜索" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :options="options">
        <div
          v-for="(item,index) in list"
          :key="index"
          :id="item.id"
          data-v-25816a29
          class="van-cell"
          @click="select(item,index)"
        >
          <i v-if="item.isSelect" class="cubeic-right icon"></i>
          <div class="van-cell__title" style="    text-align: center;">
            <span>{{item.name}}</span>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { HOST } from "../../data/data.js";

export default {
  name: "selectRoom",
  data() {
    return {
      dataList: [],
      value: "",
      list: [],
      buildingId: "",
      buildingName: "",
      communityId: "",
      communityName: "",
      roomId: "",
      roomName: "",
      title: "请选择房间",
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      },
      addressData: "",
      other: [],
      flag: true
    };
  },
  created() {
    this.buildingId = this.$route.params.id;
    this.buildingName = this.$route.params.buildingName;
    this.communityId = this.$route.params.communityId;
    this.communityName = this.$route.params.communityName;
    this.addressData = this.$route.params.addressData;
    this.$http({
      method: "post",
      url: HOST + "/OpenDoor/getAddressJson",
      data: {
        addressId: this.$route.params.id
      }
    }).then(data => {
      var data = data.data.data;
      for (var i = 0; i < data.length; i++) {
        this.dataList.push({
          name: data[i].name,
          id: data[i].id,
          isSelect: false
        });
      }

      this.list = this.dataList;
    });
  },
  computed: {
    userType() {
      return this.$store.getters.getUserType;
    }
  },
  mounted() {},
  methods: {
    onSearch() {
      this.list = [];
      for (var i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].name.indexOf(this.value) >= 0) {
          this.list.push(this.dataList[i]);
        }
      }
      if (this.list.length == 0) {
        Toast({
          message: "请输入正确地址",
          position: "middle",
          duration: 2000
        });
      }
    },
    goback() {
      this.$router.push({
        name: "selectBuilding",
        params: {
          id: this.communityId,
          communityName: this.communityName,
          addressData: this.addressData
        }
      });
    },
    select(item, index) {
      item.isSelect = !item.isSelect;
    },
    submit() {
      var id = this.addressData.data[this.addressData.index].id;
      if (id) {
        // var replace = {
        //   community: this.communityId,
        //   communityName: this.communityName,
        //   building: this.buildingId,
        //   buildingName: this.buildingName,
        //   room: this.list[0].id,
        //   roomName: this.list[0].name,
        //   id: id
        // };
        // this.addressData.data.splice(0, this.addressData.index, replace);
        // for (var i = 1; i < this.list.length; i++) {

        // }
        this.list.forEach(ele => {
          if (ele.isSelect) {
            if (this.flag) {
              var replace = {
                community: this.communityId,
                communityName: this.communityName,
                building: this.buildingId,
                buildingName: this.buildingName,
                room: ele.id,
                roomName: ele.name,
                id: id
              };
              this.addressData.data.splice(this.addressData.index, 1, replace);
            } else {
              var item = {
                community: this.communityId,
                communityName: this.communityName,
                building: this.buildingId,
                buildingName: this.buildingName,
                room: ele.id,
                roomName: ele.name,
                id: ""
              };
              this.addressData.data.push(item);
            }
            this.flag = false;
          }
        });
      } else {
        this.list.forEach(ele => {
          if (ele.isSelect) {
            var item = {
              community: this.communityId,
              communityName: this.communityName,
              building: this.buildingId,
              buildingName: this.buildingName,
              room: ele.id,
              roomName: ele.name,
              id: id
            };
            this.addressData.data[this.addressData.index] = item;
            this.addressData.index++;
          }
        });
      }

      // return;
      // this.roomId = this.list[index].id;
      // this.roomName = this.list[index].name;

      // var item = {
      //   community: this.communityId,
      //   communityName: this.communityName,
      //   building: this.buildingId,
      //   buildingName: this.buildingName,
      //   room: this.roomId,
      //   roomName: this.roomName,
      //   id: this.addressData.data[this.addressData.index].id
      // };
      // item.id = this.addressData.data[this.addressData.index].id;

      // this.addressData.data[this.addressData.index] = item;

      console.log(this.addressData.data);
      // debugger;
      // console.log(this.userType);

      if (this.userType == "ownerAdress") {
        this.$router.push({
          name: "rentAddress",
          params: { data: this.addressData.data }
        });
      } else if (this.userType == "staffAdress") {
        this.$router.push({
          name: "applyForBinding",
          params: { data: this.addressData.data }
        });
      } else if (this.userType == "firstBinding") {
        this.$router.push({
          name: "firstBinding",
          params: { data: this.addressData.data }
        });
      } else if (this.userType == "ownerAddShop") {
        this.$router.push({
          name: "addShop",
          params: { data: this.addressData.data }
        });
      } else if (this.userType == "ownerAlterShop") {
        this.$router.push({
          name: "alterShop",
          params: { data: this.addressData.data }
        });
      } else if (this.userType == "messageChange") {
        this.$router.push({
          name: "messageChange",
          params: { data: this.addressData.data }
        });
      }
    }
  },
  watch: {}
};
</script>
<style scoped>
ul {
  position: fixed;
  z-index: 2;
  width: 100%;
}
li {
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.icon {
  left: 35px;
  position: fixed;

  /* background: rgb(38, 126, 255); */
}
.scroll-list-wrap {
  height: calc(100% - 90px);
}
</style>
