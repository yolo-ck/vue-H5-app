<template>
  <div class="page">
    <mt-header title="商铺信息">
      <router-link to="/ownerHome/information/shop" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <cube-form
      :immediate-validate="false"
      :model="stayModel"
      :schema="staySchema"
      :options="options"
      @validate="stayValidateHandler"
    ></cube-form>

    <div class="content">
      <div id="personPhoto">
        <div class="people">
          <div class="peoplePhoto" @click="showPickerStyle(3)">
            <img src="../../../img/take_pic.png" id="myImage3" alt />
            <!-- <cube-upload
              ref="upload1"
              v-model="files1"
              :action="action"
              @files-added="addedHandler1"
              @file-error="errHandler1"
              @file-success="successerrHandler1" >
              <div class="clear-fix">
                <cube-upload-file v-for="(file, i) in files1" :file="file" :key="i"></cube-upload-file>
                <cube-upload-btn :multiple="false">
                  <div>
                    <i class="iconfont creame">&#xe60c;</i>
                  </div>
            </cube-upload-btn>-->
            <!-- </div>
            </cube-upload>-->
          </div>
          <div class="desc">
            <span style="color:red">*</span>店铺照片
          </div>
        </div>
        <div class="papers">
          <div class="papersPhoto" @click="showPickerStyle(4)">
            <img src="../../../img/take_pic.png" id="myImage4" alt />
            <!-- <cube-upload
              ref="upload"
              v-model="files"
              :action="action"
              @files-added="addedHandler"
              @file-error="errHandler"
              @file-success="successerrHandler">
              <div class="clear-fix">
                <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                <cube-upload-btn :multiple="false">
                  <div>
                    <i class="iconfont creame">&#xe60c;</i>
                  </div>
                </cube-upload-btn>
              </div>
            </cube-upload>-->
          </div>
          <div class="desc">经营许可证照片</div>
        </div>
      </div>
    </div>
    <div style="width:120px;    height: 40px;padding-top:5px;">
      <i class="iconfont">&#xe7b0;</i>选择地址
    </div>
    <address-list first="true" addshop="true" ref="addressComp" />
    <button class="btn" @click="submitHandler">提交</button>
  </div>
</template>
<script>
import { BASE_PATH, HOST } from "../../../data/data.js";
import AddressList from "@/components/addressList";
import { Toast } from "vant";

export default {
  name: "addShop",
  data() {
    return {
      shopMessage: {},
      community: "",
      building: "",
      room: "",
      name: "",
      businessScope: "", //经营范围
      shopsPic: "", //商铺照片
      businessLicensePic: "", //营业许可证照片
      stayModel: {
        shopName: "",
        shopScope: "",
        shopPic: "",
        shopIcard: ""
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      },
      stayValidity: {},
      stayValid: undefined
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    },
    staySchema: function() {
      return {
        groups: [
          {
            fields: [
              {
                type: "input",
                modelKey: "shopName",
                label: "名称",
                props: {
                  placeholder: "请输入"
                },
                rules: {
                  required: true
                },
                // validating when blur
                trigger: "blur",
                events: {}
              }
              // ,

              // {
              //   type: "upload",
              //   modelKey: "shopPic",
              //   label: "店铺照片",
              //   props: {
              //     action: {
              //       target: HOST + "/OpenDoor/uploadImage"
              //     },
              //     max: 1
              //   },
              //   events: {
              //     "file-removed": (...args) => {
              //       console.log("file removed", args);
              //     }
              //   },
              //   rules: {
              //     required: true
              //   },
              //   messages: {
              //     uploaded: "上传失败"
              //   }
              // },
              // {
              //   type: "upload",
              //   modelKey: "shopIcard",
              //   label: "经营许可证照片",
              //   props: {
              //     action: {
              //       target: HOST + "/OpenDoor/uploadImage"
              //     },
              //     max: 1
              //   },
              //   events: {
              //     "file-removed": (...args) => {
              //       console.log("file removed", args);
              //     }
              //   },

              //   messages: {
              //     uploaded: "上传失败"
              //   }
              // }
            ]
          }
        ]
      };
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path.indexOf("selectRoom") > -1) {
        vm.$store.commit("SET_KEEP_ALIVE", ["addShop"]);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("selectRoom") > -1) {
      this.$store.commit("SET_KEEP_ALIVE", ["B", "C"]);
    } else if (to.path.indexOf("shop") > -1) {
      this.$store.commit("SET_KEEP_ALIVE", []);
    }
    next();
  },
  activated() {
    this.$store.commit("setUserType", "ownerAddShop");
  },
  mounted() {
    this.$store.commit("setUserType", "ownerAddShop");
  },
  methods: {
    showPickerStyle(tag) {
      this.$createActionSheet({
        title: "上传照片",
        pickerStyle: true,
        data: [
          {
            content: "拍照上传"
          },
          {
            content: "相册上传"
          }
        ],
        onSelect: (item, index) => {
          if (item.content == "拍照上传") {
            console.log("拍照");
            // this.sourceType = "";
            this.sourceType = Camera.PictureSourceType.CAMERA;
            this.takePhoto(tag);
          } else {
            console.log("相册");
            this.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            this.takePhoto(tag);
          }
        },
        onCancel: () => {
          this.$createToast({
            txt: `取消上传`,
            type: "warn",
            time: 1000
          }).show();
        }
      }).show();
    },
    //拍照
    takePhoto(tag) {
      var that = this;
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        // destinationType: Camera.DestinationType.DATA_URL,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: this.sourceType
      });

      function onSuccess(imageData) {
        // var image = document.getElementById("myImage"+tag);
        // image.src = "data:image/jpeg;base64," + imageData;
        // image.src = imageData;
        that.uploadFile(imageData, tag);
      }

      function onFail(message) {
        alert("Failed because: " + message);
      }
    },
    uploadFile(fileURL, tag) {
      var that = this;

      var uri = encodeURI(HOST + "/OpenDoor/uploadImage");

      var options = new FileUploadOptions();
      options.fileKey = "file";
      // options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.fileName = "image.jpg";
      options.mimeType = "image/jpeg";

      // var headers={'headerParam':'headerValue', 'headerParam2':'headerValue2'};

      // options.headers = headers;

      var params = {};
      params.userId = this.userId;

      options.params = params;

      var ft = new FileTransfer();
      ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
          // loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
          //console.log("=====" + progressEvent.loaded / progressEvent.total)
        } else {
          // loadingStatus.increment();
          //console.log("++++++++++++");
        }
      };

      function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);

        toast.hide();

        var res = JSON.parse(r.response);
        var data = res.body.data;
        var imageUrl = BASE_PATH + data.src + data.name;
        var imageRelativeUrl = data.src + data.name;

        console.log(imageUrl);
        // if(tag ==1){

        //   console.log("证件照");
        //   that.papersPhoto=imageRelativeUrl
        // }else if(tag ==2){
        //    console.log("人像照");
        //    that.hochFormat=imageRelativeUrl
        // } else
        if (tag == 3) {
          console.log("店铺照片");
          that.stayModel.shopPic = imageRelativeUrl;
        } else if (tag == 4) {
          console.log("经营许可证照片");
          that.stayModel.shopIcard = imageRelativeUrl;
        }

        var image = document.getElementById("myImage" + tag);
        image.src = imageUrl;
      }

      function fail(error) {
        alert("An error has occurred: Code = " + error);
        //console.log("upload error source " + error.source);
        //console.log("upload error target " + error.target);
        toast.hide();
        Toast("上传失败");
      }

      ft.upload(fileURL, uri, win, fail, options);

      const toast = this.$createToast({
        txt: "上传照片中...",
        time: 0,
        mask: true
      });
      toast.show();
    },

    stayValidateHandler(result) {
      this.stayValidity = result.validity;
      this.stayValid = result.valid;
    },
    submitHandler() {
      var addresses = this.$refs.addressComp.addresses;

      var shopAddresses = [];

      for (var idx in addresses) {
        var item = addresses[idx];
        if (item.room && item.room.length > 0) {
          shopAddresses.push(item);
        }
      }

      if (this.stayModel.shopName == "") {
        Toast("请输入店铺名称");
        return;
      }

      if (!(this.stayModel.shopPic.length > 0)) {
        Toast("请上传店铺图片");
        return;
      }

      if (!(shopAddresses.length > 0)) {
        Toast("请选择绑定地址");
        return;
      }
      if (shopAddresses.length > 1) {
        Toast("不可选择多个地址");
        return;
      }
      //地址
      this.community = shopAddresses[0].community;
      this.building = shopAddresses[0].building;
      this.room = shopAddresses[0].room;
      //名字
      this.name = this.stayModel.shopName;

      this.businessScope = this.stayModel.shopScope;
      //商铺照片
      this.shopsPic = this.stayModel.shopPic;
      //营业许可证照片
      if (this.stayModel.shopIcard.length == 0) {
        this.businessLicensePic = "";
      } else {
        this.businessLicensePic = this.stayModel.shopIcard;
      }

      this.$set(this.shopMessage, "userId", this.userId);
      this.$set(this.shopMessage, "community", this.community);
      this.$set(this.shopMessage, "building", this.building);
      this.$set(this.shopMessage, "room", this.room);
      this.$set(this.shopMessage, "name", this.name);
      this.$set(this.shopMessage, "businessScope", this.businessScope);
      this.$set(this.shopMessage, "shopsPic", this.shopsPic);
      this.$set(
        this.shopMessage,
        "businessLicensePic",
        this.businessLicensePic
      );
      console.log(this.shopMessage);
      const toastShop = this.$createToast({
        txt: "提交商铺...",
        time: 0,
        mask: true
      });
      toastShop.show();

      const url = HOST + "/a/shops/lgtShops/updateShop";

      this.$http({
        method: "post",
        url: url,
        data: {
          params: JSON.stringify(this.shopMessage)
        }
      }).then(data => {
        console.log(data);
        if (data.data.success) {
          toastShop.hide();
          this.$createToast({
            type: "提示",
            txt: "添加成功",
            time: 1000
          }).show();
          this.stayModel.shopName = "";
          this.stayModel.shopIcard = "";
          this.stayModel.shopPic = "";
          this.$router.push({
            name: "shop"
          });
        } else {
          toastShop.hide();
          this.$createToast({
            type: "提示",
            txt: "添加失败",
            time: 1000
          }).show();
        }
      });
    }
  },
  components: {
    "address-list": AddressList
  }
};
</script>
<style scoped>
.btn {
  margin: 0 auto;
  display: block;
  margin-top: 10px;
  padding: 17px 16px;
  width: 95%;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: #fff;
  background: #4a4c5b;
  outline: none;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  color: red;
  font-style: normal;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.papers,
.people {
  width: 31%;
  height: 82%;
  float: left;
  border: 1px solid;
  border-radius: 18px;
  text-align: center;
  color: white;
  font-size: 12px;
}

.papersPhoto,
.peoplePhoto {
  width: 100%;
  height: 74%;
  /* border: 1px solid red; */
  margin-top: 13%;
  background: white;
}

.papers .desc {
  padding-top: 5px;
}

.people .desc {
  padding-top: 5px;
}

.papers {
  margin-left: 15%;
  margin-top: 3%;
  background: rgb(220, 112, 76);
}

.people {
  background: rgb(71, 158, 227);
  margin-left: 6%;
  margin-top: 3%;
}

#personPhoto {
  width: 100%;
  height: 10rem;
  background: rgb(238, 238, 238);
}

#myImage {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 20;
}

#myImage3 {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 20;
}

#myImage4 {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 20;
}
</style>


