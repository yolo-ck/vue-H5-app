<template>
  <div class="page">
    <mt-header title="问题反馈">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :options="options">
        <div class="content">
          <cube-form
            :immediate-validate="false"
            :model="addModel"
            :schema="addSchema"
            :options="options"
            @validate="addValidateHandler"
          ></cube-form>
          <div class="people">
            <div class="peoplePhoto" @click="showPickerStyle()">
              <img src="../../img/take_pic.png" id="myImage" alt>
              <i class="iconfont creame">&#xe60c;</i>
            </div>
            <div class="desc">上传附件</div>
          </div>
        </div>
        <button class="addBtn" @click="submitHandler">提交</button>

      </cube-scroll>
    </div>
  </div>
</template>

<script>

  import {BASE_PATH, HOST} from '../../data/data';
  import {Toast} from 'vant';

  export default {
    name: 'question',
    data: () => {
      return {
        addModel: {
          theme: '',
          content: '',
        },
        options: {
          // scrollToInvalidField: true,
          // layout: "standard" // classic fresh
        },
        sourceType: '',
        //图片路径
        imgurl: '',
      };
    },
    computed: {
      addSchema: function () {
        return {
          groups: [
            {
              fields: [
                {
                  type: 'input',
                  modelKey: 'theme',
                  label: '反馈主题',
                  props: {
                    placeholder: '请输入',
                  },
                  rules: {
                    required: true,
                  },
                  trigger: 'blur',
                  events: {
                    focus: e => {
                      this.handleInput(e);
                    },
                  },
                },
                {
                  type: 'textarea',
                  modelKey: 'content',
                  label: '反馈内容',
                  props: {
                    placeholder: '请输入',
                  },
                  rules: {
                    required: true,
                  },
                  trigger: 'blur',
                  events: {
                    focus: e => {
                      this.handleInput(e);
                    },
                  },
                },
                {
                  type: '',
                  modelKey: 'Idnumber',
                  label: '反馈附件',
                  disabled: true,
                  rules: {
                    required: false,
                  },
                  events: {
                    focus: e => {
                      this.handleInput(e);
                    },
                  },
                },
              ],
            },
          ],
        };
      },
      userId() {
        return this.$store.getters.getUserId;
      },
    },
    methods: {

      back() {
        this.$router.back();
      },
      submitHandler() {
        this.$http({
          method: 'post',
          url: HOST + '/a/feedBack/androidSave',
          data: {
            theme: this.addModel.theme,
            content: this.addModel.content,
            user: this.userId,
            picture: this.imgurl,
          },
        }).then(response => {
          console.log(response);
          if (response.data.success) {
            Toast('提交成功');
            this.back();
          } else {
            Toast('提交失败');
          }

        });
      },
      addValidateHandler(result) {
        this.addValidity = result.validity;
        this.addValid = result.valid;
      },
      handleInput(event) {
        // debugger;
        let ele = event.target;

        let top = this.getTop(ele);
        // alert(top);
        console.log(top);
        // debugger;
        let contentHeight = document.body.clientHeight - this.keyboardHeight;

        if (top > contentHeight) {
          this.scrollTo(contentHeight - top - ele.offsetHeight - 44);
        }
      },
      getTop(e) {
        var offset = e.offsetTop;
        // debugger;
        // cube-scroll-wrapper
        if (
          e.offsetParent != null &&
          e.offsetParent.className != 'scroll-list-wrap'
        ) {
          offset += this.getTop(e.offsetParent);
        }
        return offset;
      },
      scrollTo(posY) {
        console.log(posY);
        this.$refs.scroll.scrollTo(0, posY);
      },
      showPickerStyle() {
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
              this.takePhoto();
            } else {
              console.log("相册");
              this.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
              this.takePhoto();
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
      takePhoto() {
        var that = this;
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          // destinationType: Camera.DestinationType.DATA_URL,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: this.sourceType,
        });

        function onSuccess(imageData) {
          // var image = document.getElementById("myImage"+tag);
          // image.src = "data:image/jpeg;base64," + imageData;
          // image.src = imageData;
          that.uploadFile(imageData);
        }

        function onFail(message) {
          alert('Failed because: ' + message);
        }
      },
      uploadFile(fileURL) {

        let that = this;

        let uri = encodeURI(HOST + '/OpenDoor/uploadImage');


        let options = new FileUploadOptions();
        options.fileKey = 'file';
        // options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.fileName = 'image.jpg';
        options.mimeType = 'image/jpeg';

        // var headers={'headerParam':'headerValue', 'headerParam2':'headerValue2'};

        // options.headers = headers;

        let params = {};
        params.userId = this.userId;


        options.params = params;

        let ft = new FileTransfer();
        ft.onprogress = function (progressEvent) {
          if (progressEvent.lengthComputable) {
            // loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
            //console.log("=====" + progressEvent.loaded / progressEvent.total)
          } else {
            // loadingStatus.increment();
            //console.log("++++++++++++");
          }
        };


        function win(r) {

          console.log('Code = ' + r.responseCode);
          console.log('Response = ' + r.response);
          console.log('Sent = ' + r.bytesSent);

          // Indicator.close();
          toast.hide();

          var res = JSON.parse(r.response);
          var data = res.body.data;
          var imageUrl = BASE_PATH + data.src + data.name;
          var imageRelativeUrl = data.src + data.name;

          console.log(imageUrl);
          var success = res.success;
          if (success) {

            var image = document.getElementById('myImage');
            image.src = imageUrl;
            that.imgurl = imageUrl;
          } else {
            Toast(res.msg);
          }

        }

        function fail(error) {
          alert('An error has occurred: Code = ' + error);
          //console.log("upload error source " + error.source);
          //console.log("upload error target " + error.target);
          //  Indicator.close();
          toast.hide();
          Toast('上传失败');
        }


        ft.upload(fileURL, uri, win, fail, options);


        const toast = this.$createToast({
          txt: '上传照片中...',
          time: 0,
          mask: true,
        });
        toast.show();

      },

    },
  };
</script>

<style scoped>
  .people {
    width: 38.2%;
    margin: 0 auto;
    border: 1px solid;
    border-radius: 18px;
    text-align: center;
    color: white;
    background: rgb(71, 158, 227);
    font-size: 12px;
  }

  .peoplePhoto {
    width: 100%;
    height: 74%;
    /* border: 1px solid red; */
    margin-top: 13%;
    background: white;
    position: relative;
  }

  .papers .desc {
    padding-top: 5px;
  }

  .people .desc {
    padding-top: 5px;
  }

  #myImage {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .addBtn {
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


</style>
<style>
  .cube-form_standard .cube-textarea-wrapper {
    min-height: 90px !important;
  }
</style>
