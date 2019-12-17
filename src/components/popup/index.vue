<template>
  <div class="popup" :class="popupClass">
    <!-- 遮罩层 -->
    <div class="mask" @touchumove.prevent></div>
    <div class="layer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "popup",
    props: {
      popupClass: {
        type: String,
        default: ""
      }
    },
    data() {
      return {};
    },
    created() {},
    methods: {}
  };
</script>
<style lang='scss' scoped>
  .popup {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: none;
    .mask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 21;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .layer {
      position: absolute;
      z-index: 22;
      bottom: -65%;
      width: 100%;
      padding: 0 4%;
      height: 65%;
      border-radius: 20px 20px 0 0;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      // box-sizing: border-box;
    }

    &.show {
      display: block;
      .mask {
        animation: showPopup 0.2s linear both;
      }
      .layer {
        animation: showLayer 0.2s linear both;
      }
    }
    &.hide {
      display: block;
      .mask {
        animation: hidePopup 0.2s linear both;
      }

      .layer {
        animation: hideLayer 0.2s linear both;
      }
    }
    &.none {
      display: none;
    }
  }
</style>