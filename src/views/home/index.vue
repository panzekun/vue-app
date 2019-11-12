<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" loading-text="刷新中" @refresh="onRefresh">
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        direction="up"
        :immediate-check="false"
        @load="onLoad"
        :offset="offset"
      >
        <div class="content">
          <ul>
            <li v-for="(item, index) in datacontent" :key="index">{{item}}</li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { PullRefresh, List } from "vant";
  import scroll from "@c/better-scroll/index";
  export default {
    name: "home",
    components: {
      scroll,
      [PullRefresh.name]: PullRefresh,
      [List.name]: List
    },
    data() {
      return {
        data: [3, 4, 6, 8, 6, 9, 7, 48, 56, 15,3, 4, 6, 8, 6, 9, 7, 48, 56, 15,3, 4, 6, 8, 6, 9, 7, 48, 56, 15,3, 4, 6, 8, 6, 9, 7, 48, 56, 15,3, 4, 6, 8, 6, 9, 7, 48, 56, 15,3, 4, 6, 8, 6, 9, 7, 48, 56, 15],
        pulldown: false,
        datacontent: [], //空数组，用来储存循环出来的内容，
        isLoading: false, //下拉刷新
        isUpLoading: false, //上拉加载
        upFinished: false, //上拉加载完毕
        offset: 50 //滚动条与底部距离小于 offset 时触发load事件
      };
    },
    created() {
      // this.loadData();
    },
    mounted() {
      for (var i = 0; i < 5; i++) {
        this.datacontent.push(this.data[i]); //页面一加载我就循环出来五条放进去
      }
    },
    methods: {
      loadData() {
        setTimeout(() => {
          let res = [8, 9, 46, 654654];
          this.data = res.concat(this.data);
          console.log("刷新");
        }, 600);
      },
      onRefresh() {
        // 下拉调用此函数
        setTimeout(() => {
          console.log("刷新成功");
          this.isLoading = false;
        }, 500);
      },
      onLoad() {
        // 上拉调用此函数
        setTimeout(() => {
          console.dir("加载成功");
          for (var i = 0; i < 3; i++) {
            this.datacontent.push(this.data[i]); // 上拉时循环出来这个数组的三条内容，放入datacontent这个数组里，那样就一直拉一直加
            this.upFinished = false;
          }
        }, 500);
      }
    }
  };
</script>
<style lang='scss' scoped>
  .home {
    .wrapper {
      height: 100%;
    }
  }
</style>