import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userId: localStorage.getItem("userId") || "",
    binded: localStorage.getItem("binded") || "",
    haveAddress: localStorage.getItem("haveAddress") || "",

    longitude: localStorage.getItem("longitude") || "",
    latitude: localStorage.getItem("latitude") || "",
    uuid: localStorage.getItem("uuid") || "",
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    userType: localStorage.getItem("userType") || "",
    keepAlive: [],
    deviceInfo: JSON.parse(localStorage.getItem("deviceInfo")) || {},
    staffId: localStorage.getItem("staffId") || ""
  },
  getters: {
    keepAlive: state => state.keepAlive,
    getStaffId(state) {
      return state.staffId;
    },
    getBinded(state) {
      return state.binded;
    },
    getUserId(state) {
      return state.userId;
    },
    getHaveAddress(state) {
      return state.haveAddress;
    },
    getLocation(state) {
      return {
        longitude: state.longitude,
        latitude: state.latitude
      };
    },
    getUUID(state) {
      return state.uuid;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getDeviceInfo(state) {
      return state.deviceInfo;
    },

    getUserType(state) {
      return state.userType;
    }
  },
  mutations: {
    SET_KEEP_ALIVE: (state, keepAlive) => {
      state.keepAlive = keepAlive;
    },

    setStaffId(state, value) {
      localStorage.setItem("staffId", value);
      state.staffId = value;
    },
    setUserId(state, value) {
      localStorage.setItem("userId", value);
      state.userId = value;
    },

    setUserInfo(state, value) {
      localStorage.setItem("userInfo", JSON.stringify(value));
      state.userInfo = value;
    },

    setDeviceInfo(state, value) {
      localStorage.setItem("deviceInfo", JSON.stringify(value));
      state.deviceInfo = value;
    },

    setBinded(state, value) {
      localStorage.setItem("binded", value);
      state.binded = "" + value;
    },

    setHaveAddress(state, value) {
      localStorage.setItem("haveAddress", value);
      state.haveAddress = "" + value;
    },
    setUUID(state, value) {
      localStorage.setItem("uuid", value);
      state.uuid = value;
    },
    setLocation(state, value) {
      localStorage.setItem("longitude", value.longitude);
      localStorage.setItem("latitude", value.latitude);
      state.longitude = value.longitude;
      state.latitude = value.latitude;
    },
    setUserType(state, value) {
      localStorage.setItem("userType", value);
      state.userType = value;
    }
  }
});
