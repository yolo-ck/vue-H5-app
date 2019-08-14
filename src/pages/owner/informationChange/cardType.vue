<template>
  <div class="changePage">
    <mt-header title="更改办证类型">
      <router-link to="/ownerHome/information" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <van-cell-group @click.native="showPicker">
      <van-cell v-model="cardName" title="办证类型" :value="cardName"/>
      <!-- <van-field
    
        label="办证类型"
        type="textarea"
        placeholder="请选择办证类型"
        rows="1"
        autosize
      />-->
    </van-cell-group>
    <mt-button class="submit" type="primary" @click="submit">提交</mt-button>
  </div>
</template>
<script>
import { HOST } from "../../../data/data.js";
export default {
  name: "cardType",
  data() {
    return {
      cardName: "请选择要更改的办证类型",
      cardValue: "",
      param: "",

      typeArr: [{ text: "居住证" }, { text: "其他" }, { text: "未办" }]
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  mounted() {
    this.cardName = this.$route.params.phone;
  },
  methods: {
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "办证类型",
          data: [this.typeArr],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.picker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.cardName = selectedText.join(" ");
      if (this.cardName == "居住证") {
        this.cardValue = "01";
      }
      if (this.cardName == "其他") {
        this.cardValue = "99";
      }
      if (this.cardName == "未办") {
        this.cardValue = "100";
      }
    },
    submit() {
      if (this.cardName == "") {
        this.$createToast({
          type: "提示",
          txt: "不能为空",
          time: 1000
        }).show();

        return;
      }

      this.param = {
        userId: this.userId,
        code: "3",
        parameter: this.cardValue
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

