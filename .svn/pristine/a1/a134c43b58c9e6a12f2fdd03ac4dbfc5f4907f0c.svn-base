<template>
  <div class="page_transparent">
    <mt-header title="扫码开门">
      <!-- <router-link to="/home" slot="left"> -->
      <mt-button slot="left" @click="handleBack" icon="back">返回</mt-button>
      <!-- <mt-button @click="handleClose">关闭</mt-button> -->
      <!-- <mt-button slot="right" @click="handleTest">测试</mt-button> -->
      <!-- </router-link> -->
    </mt-header>

    <div class="rect">
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QRcode",
  data() {
    return {};
  },
  methods: {
    handleBack() {
      if (typeof QRScanner != "undefined") {
        QRScanner.destroy(status => {
          console.log(status);
          this.$router.go(-1);
        });
      } else {
        this.$router.go(-1);
      }
    },
    handleTest() {
      this.openDoor("communityId:9c51e7d5-fba9-45a9-be74-653a378092f6,communityName:河西新村,buildingId:1cf2dfe2-7ab7-4863-a6dc-ee9377620d75,buildingName:2幢东,longitude:120.257476,latitude:30.846256,deviceCode:1408");
    },
    openDoor(code) {
      if (typeof QRScanner != "undefined") {
        QRScanner.destroy(status => {
          console.log(status);
          // this.$router.go(-1);
          this.$router.replace({ name: "openDoor", params: { code: code } });
        });
      } else {
        this.$router.replace({ name: "openDoor", params: { code: code } });
      }
    }
  },
  mounted() {
    if (typeof QRScanner != "undefined") {
      QRScanner.prepare(onDone); // show the prompt

      function onDone(err, status) {
        if (err) {
          // here we can handle errors and clean up any loose ends.
          console.error(err);
        }
        if (status.authorized) {
          // W00t, you have camera access and the scanner is initialized.
          // QRscanner.show() should feel very fast.
        } else if (status.denied) {
          // The video preview will remain black, and scanning is disabled. We can
          // try to ask the user to change their mind, but we'll have to send them
          // to their device settings with `QRScanner.openSettings()`.
          QRScanner.openSettings();
        } else {
          // we didn't get permission, but we didn't get permanently denied. (On
          // Android, a denial isn't permanent unless the user checks the "Don't
          // ask again" box.) We can ask again at the next relevant opportunity.
        }
      }
      // // Start a scan. Scanning will continue until something is detected or
      // // `QRScanner.cancelScan()` is called.

      var displayContents = (err, text) => {
        if (err) {
          // an error occurred, or the scan was canceled (error code `6`)
        } else {
          // The scan completed, display the contents of the QR code:
          // alert(text);
          QRScanner.cancelScan();
          this.openDoor(text);
        }
      };
      QRScanner.scan(displayContents);

      // // Make the webview transparent so the video preview is visible behind it.
      QRScanner.show();
      // // Be sure to make any opaque HTML elements transparent here to avoid
      // // covering the video.
    }
  }
};
</script>
<style scoped>
#QRcode {
  width: 100%;
  height: 100%;
}
.rect {
  position: absolute;
  left: 17%;
  top: 21%;
  width: 250px;
  height: 250px;
  background: linear-gradient(to left, #f00, #f00) left top no-repeat,
    linear-gradient(to bottom, #f00, #f00) left top no-repeat,
    linear-gradient(to left, #f00, #f00) right top no-repeat,
    linear-gradient(to bottom, #f00, #f00) right top no-repeat,
    linear-gradient(to left, #f00, #f00) left bottom no-repeat,
    linear-gradient(to bottom, #f00, #f00) left bottom no-repeat,
    linear-gradient(to left, #f00, #f00) right bottom no-repeat,
    linear-gradient(to left, #f00, #f00) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
}
.line {
  position: absolute;
  left: 0px;
  height: 2px;
  width: 250px;
  background: red;
  /* -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -ms-filter: blur(2px); */
  /* filter: blur(2px); */
  animation: myScan 2s infinite alternate;
  -webkit-animation: myScan 2s infinite alternate;
}
@keyframes myScan {
  from {
    top: 0px;
  }
  to {
    top: 250px;
  }
}
@-webkit-keyframes myScan {
  from {
    top: 0px;
  }
  to {
    top: 250px;
  }
}
</style>

