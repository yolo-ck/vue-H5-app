<template>
  <div class="page">
    <mt-header :title="title">
      <mt-button slot="left" icon="back" @click="goback"></mt-button>
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
          @click="select(index)"
        >
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
  name: "selectRoom1",
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
      other: []
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
        this.dataList.push({ name: data[i].name, id: data[i].id });
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
        name: "selectBuilding1",
        params: {
          id: this.communityId,
          communityName: this.communityName,
          addressData: this.addressData
        }
      });
    },
    select(index) {
      this.roomId = this.list[index].id;
      this.roomName = this.list[index].name;

      var item = {
        community: this.communityId,
        communityName: this.communityName,
        building: this.buildingId,
        buildingName: this.buildingName,
        room: this.roomId,
        roomName: this.roomName,
        id: ""
      };

      item.id = this.addressData.data[this.addressData.index].id;

      this.addressData.data[this.addressData.index] = item;

      var num = 10;
      // console.log(this.addressData.data);
      // console.log(this.userType);

      this.$router.push({
        name: "firstBinding",
        params: { shopData: this.addressData.data }
      });
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
.scroll-list-wrap {
  height: calc(100% - 90px);
}
</style>


