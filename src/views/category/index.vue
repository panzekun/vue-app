<template>
  <div>
    <div class="category">
      <van-tree-select :items="categoryList" :main-active-index.sync="activeIndex">
        <template slot="content">
          <!-- <van-image v-if="activeIndex === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <van-image v-if="activeIndex === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />-->
          <div
            class="category-item"
            v-for="(category,index) in categoryList"
            :key="category.id"
            v-if="activeIndex === index"
          >
            <img :src="category.banner" alt />
            <ul>
              <li v-for="(item,index) in category.children" @click="toCategory(item)">
                <img :src="item.img" alt />
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
  export default {
    name: "name",
    data() {
      return {
        activeIndex: 0,
        categoryList: [
          {
            id: 1,
            text: "家用电器",
            banner: require("@/assets/img/category/banner.jpg"),
            children: [
              { name: "冰箱", img: require("@/assets/img/category/list/1.jpg") },
              { name: "电视", img: require("@/assets/img/category/list/2.jpg") },
              { name: "空调", img: require("@/assets/img/category/list/3.jpg") },
              {
                name: "洗衣机",
                img: require("@/assets/img/category/list/4.jpg")
              },
              { name: "风扇", img: require("@/assets/img/category/list/5.jpg") },
              {
                name: "燃气灶",
                img: require("@/assets/img/category/list/6.jpg")
              },
              {
                name: "热水器",
                img: require("@/assets/img/category/list/7.jpg")
              },
              {
                name: "电吹风",
                img: require("@/assets/img/category/list/8.jpg")
              },
              { name: "电饭煲", img: require("@/assets/img/category/list/9.jpg") }
            ]
          },
          {
            id: 2,
            text: "办公用品",
            banner: require("@/assets/img/3.jpg"),
            children: [
              {
                name: "打印机",
                img: require("@/assets/img/category/list/1.jpg")
              },
              {
                name: "路由器",
                img: require("@/assets/img/category/list/2.jpg")
              },
              {
                name: "扫描仪",
                img: require("@/assets/img/category/list/3.jpg")
              },
              {
                name: "投影仪",
                img: require("@/assets/img/category/list/4.jpg")
              },
              { name: "墨盒", img: require("@/assets/img/category/list/5.jpg") },
              { name: "纸类", img: require("@/assets/img/category/list/6.jpg") }
            ]
          },
          {
            id: 3,
            text: "日常用品",
            banner: require("@/assets/img/2.jpg"),
            children: [
              { name: "茶具", img: require("@/assets/img/category/list/1.jpg") },
              { name: "花瓶", img: require("@/assets/img/category/list/2.jpg") },
              { name: "纸巾", img: require("@/assets/img/category/list/3.jpg") },
              { name: "毛巾", img: require("@/assets/img/category/list/4.jpg") },
              { name: "牙膏", img: require("@/assets/img/category/list/5.jpg") },
              {
                name: "保鲜膜",
                img: require("@/assets/img/category/list/6.jpg")
              },
              { name: "保鲜袋", img: require("@/assets/img/category/list/7.jpg") }
            ]
          },
          {
            id: 4,
            text: "蔬菜水果",
            banner: require("@/assets/img/1.jpg"),
            children: [
              { name: "苹果", img: require("@/assets/img/category/list/1.jpg") },
              { name: "芒果", img: require("@/assets/img/category/list/2.jpg") },
              { name: "椰子", img: require("@/assets/img/category/list/3.jpg") },
              { name: "橙子", img: require("@/assets/img/category/list/4.jpg") },
              {
                name: "奇异果",
                img: require("@/assets/img/category/list/5.jpg")
              },
              { name: "玉米", img: require("@/assets/img/category/list/6.jpg") },
              { name: "百香果", img: require("@/assets/img/category/list/7.jpg") }
            ]
          }
        ]
      };
    },
    created() {},
    mounted() {},
    methods: {
      toCategory(row) {
        this.$toast(`点击了${row.name}`);
      }
    }
  };
</script>
<style lang='scss' scoped>
  .van-sidebar-item {
    font-size: 15px;
  }
  .category {
    width: 100%;
    height: 100%;
    .van-tree-select {
      height: 100% !important;
      .van-tree-select__nav {
        flex: none;
      }
    }
    .category-item {
      padding: 10px 3%;
      img {
        width: 100%;
      }
      > ul {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        > li {
          width: 32%;
          margin-bottom: 30px;
          // display: flex;
          // flex-wrap: wrap;
          // align-items: center;
          text-align: center;
          > img {
            width: 60%;
            display: block;
            margin: 0 auto;
          }
          > p {
            margin-top: 4px;
            width: 100%;
            font-size: 26px;
          }
        }
      }
    }
  }
</style>