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
  name: "selectBuilding1",
  data() {
    return {
      dataList: [],
      value: "",
      list: [],
      buildingName: "",
      title: "请选择楼宇",
      communityId: "",
      communityName: "",
      addressData: "",
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      },
      other: []
    };
  },
  created() {
    this.communityId = this.$route.params.id;
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
  mounted() {},
  methods: {
    goback() {
      this.$router.push({
        name: "selectCommunity1",
        params: { data: this.addressData.data, index: this.addressData.index }
      });
    },
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
    select(index) {
      this.buildingName = this.list[index].name;
      this.$router.push({
        name: "selectRoom1",
        params: {
          id: this.list[index].id,
          buildingName: this.buildingName,
          communityId: this.communityId,
          communityName: this.communityName,
          addressData: this.addressData
        }
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


