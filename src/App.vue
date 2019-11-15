<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <keep-alive :include="keepAlive"> -->
      <router-view class="Router"></router-view>
      <!-- </keep-alive> -->
    </transition>
    <tabbar class="footer-mTabbar" v-if="isShowFooter"></tabbar>
  </div>
</template>

<script>
  import Tabbar from "@/components/tabbar/index";
  // 软键盘关闭事件
  document.body.addEventListener("focusout", () => {
    // 回到原点  \
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  export default {
    name: "app",
    components: { Tabbar },
    data() {
      return {
        keepAlive: "main-keep-alive", //需要缓存的页面 例如首页
        transitionName: "slide-left", //初始过渡动画方向
        isShowFooter: true //是否显示底部导航
      };
    },
    watch: {
      $route(to, from) {
        // 切换动画
        let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = "slide-right";
        } else {
          this.transitionName = "slide-left";
        }
        this.$router.isBack = false;
        this.isShowFooter = to.meta.isShowFooter || false;
      }
    },
    mounted() {}
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    // min-height: 100%;
    margin: auto;
    position: relative;

    .Router {
      position: absolute; //解决滑动出现白屏的问题
      width: 100%;
      height: auto;
      // height: calc(1334px - 102px);
      top: 0;
      transition: all 0.35s ease;
      will-change: transform;
      // backface-visibility: hidden;
      // perspective: 1000;
    }
    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 1;
      transform: translate3d(-100%, 0, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .footer-mTabbar {
      position: fixed;
      bottom: 0;
    }
  }
</style>
