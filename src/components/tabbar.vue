<template>
  <div class="warp">
    <Item
      :data="item"
      @changePage="getVal"
      v-for="item in tabbarDes"
      :key="item.id"
      :sel="selected"
    >
      <img :src="item.normal" slot="normalImg" />
      <img :src="item.active" slot="activeImg" />
    </Item>
  </div>
</template>
<script type="text/javascript">
  import Item from "./tabbaritem.vue";
  export default {
    name: "tabber",
    components: {
      Item
    },
    data: function() {
      return {
        selected: 1,
        tabbarDes: [
          {
            id: 1,
            path: "/home",
            title: "首页",
            icon: "wap-home",
            normal: require("@i/tab-home.png"),
            active: require("@i/tab-home-current.png")
          },
          {
            id: 2,
            path: "/goodsDetails",
            title: "分类",
            icon: "shop",
            normal: require("@i/tab-cate.png"),
            active: require("@i/tab-cate-current.png")
          },
          {
            id: 3,
            path: "/shoppingCart",
            title: "购物车",
            icon: "shopping-cart",
            normal: require("@i/tab-cart.png"),
            active: require("@i/tab-cart-current.png")
          },
          {
            id: 4,
            path: "/user",
            title: "我的",
            icon: "friends",
            normal: require("@i/tab-my.png"),
            active: require("@i/tab-my-current.png")
          }
        ]
      };
    },
    watch: {
      $route: "getPath"
    },
    created() {
      this.selected = this.$route.meta.id; //解决页面刷新，底部Tab高亮不对的问题
    },
    methods: {
      getVal(id) {
        this.selected = id;
      },
      getPath() {
        console.dir(this.$route.meta);
        this.selected = this.$route.meta.id; //解决页面返回，底部Tab高亮不对的问题
      }
    }
  };
</script>
<style scoped lang="scss">
  .warp {
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0;
  }

  .warp img {
    width: 54px;
    height: 54px;
  }
</style>
