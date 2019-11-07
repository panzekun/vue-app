<template>
  <div class="home">
    <scroll class="wrapper" :data="data" :pulldown="pulldown" @pulldown="loadData">
      <ul class="content">
        <li v-for="item in data">{{item}}</li>
      </ul>
      <div class="loading-wrapper"></div>
    </scroll>
  </div>
</template>

<script>
  import scroll from "@c/better-scroll/index";
  export default {
    name: "home",
    components: {
      scroll
    },
    data() {
      return {
        data: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          15,
          16,
          18,
          18,
          1,
          13,
          16,
          1,
          3,
          11,
          16,
          132,
          13,
          31,
          21,
          1,
          32,
          21,
          2,
          121,
          2,
          2,
          2,
          2,
          1,
          2,
          21,
          21,
          5615,
          15,
          1
        ],
        pulldown: true
      };
    },
    created() {
      // this.loadData();
    },
    mounted() {},
    methods: {
      loadData() {
        setTimeout(() => {
          let res=[8,9,46,654654]
          this.data = res.concat(this.data);
          console.log("刷新");
        }, 600);
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