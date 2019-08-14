<template>
  <div class="changePage">
    <mt-header title="更改工作单位">
      <router-link to="/ownerHome/information" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <van-cell-group>
      <van-field
        v-model="workUnit"
        label="工作单位"
        type="textarea"
        placeholder="请输入工作单位"
        rows="1"
        autosize
      />
    </van-cell-group>
    <mt-button class="submit" type="primary" @click="submit">提交</mt-button>
  </div>
</template>
<script>
import { HOST } from "../../../data/data.js";
export default {
  name: "workAddress",
  data() {
    return {
      workUnit: "",
      param: ""
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  mounted() {
    this.workUnit = this.$route.params.phone;
  },
  methods: {
    submit() {
      if (this.workUnit == "") {
        this.$createToast({
          type: "提示",
          txt: "不能为空",
          time: 1000
        }).show();

        return;
      }
      this.param = {
        userId: this.userId,
        code: "4",
        parameter: this.workUnit
      };
      const url = HOST + "/a/mobile/user/register/ownerUpdate";
      this.$http({
        method: "post",
        url: url,
        data: {
          param: JSON.stringify(this.param)
        }
      });

      this.$createToast({
        type: "提示",
        txt: "已提交",
        time: 1000
      }).show();
      setTimeout(() => {
        this.$router.push({ name: "information" });
      }, 1000);

      // ,params:{phoneValue:this.phoneValue}
    },
    cancelHandle() {}
  }
};
</script>
<style scoped>
.submit {
  width: 98%;
  margin-left: 1%;
}
</style>

