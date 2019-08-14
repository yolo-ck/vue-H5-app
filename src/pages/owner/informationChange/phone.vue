<template>
  <div class="changePage">
    <mt-header title="更改联系方式">
      <router-link to="/ownerHome/information" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <van-cell-group>
      <van-field
        v-model="phoneValue"
        label="手机号"
        type="textarea"
        placeholder="请输入要修改的联系方式"
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
  name: "phone",
  data() {
    return {
      phoneValue: "",
      param: ""
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  methods: {
    submit() {
      if (!/^1[34578]\d{9}$/.test(this.phoneValue)) {
        this.$createToast({
          type: "提示",
          txt: "请输入正确的手机号",
          time: 1000
        }).show();

        return;
      }
      const url = HOST + "/a/mobile/user/register/ownerUpdate";
      this.param = {
        userId: this.userId,
        code: "1",
        parameter: this.phoneValue
      };
      this.$http({
        method: "post",
        url: url,
        data: {
          param: JSON.stringify(this.param)
        }
      }).then(data => {
        this.$createToast({
          type: "提示",
          txt: "已提交",
          time: 1000
        }).show();
      });

      setTimeout(() => {
        this.$router.push({ name: "information" });
      }, 1000);
    }
  },
  mounted() {
    this.phoneValue = this.$route.params.phone;
    console.log(this.phoneValue);
  }
};
</script>
<style scoped>
.submit {
  width: 98%;
  margin-left: 1%;
}
</style>

