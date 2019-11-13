<template>
  <div ref="scroll">
    <div class="home">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 头部搜素 -->
        <header>
          <van-row type="flex" justify="space-around" align="center">
            <van-icon name="scan" />
            <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
            <van-icon name="chat-o" />
          </van-row>
        </header>
        <!-- 轮播图 -->
        <div class="swipe">
          <van-swipe class="goods-swipe" :autoplay="3000" @change="onChange">
            <van-swipe-item v-for="swiper in swiperList" :key="swiper.id">
              <img :src="swiper.img" />
            </van-swipe-item>
            <div class="indicator" slot="indicator">
              <div
                class="dots"
                v-for="(swiper, index) in swiperList"
                :class="[current >= index ? 'on' : '']"
                :key="index"
              ></div>
            </div>
          </van-swipe>
        </div>
        <!-- 分类列表 -->
        <div class="category-list">
          <div
            class="category"
            v-for="(row, index) in categoryList"
            :key="index"
            @click="toCategory(row)"
          >
            <div class="img">
              <img :src="row.img" alt />
            </div>
            <div class="text">{{ row.name }}</div>
          </div>
        </div>
        <!-- 广告图 -->
        <div class="banner">
          <img src="@/assets/img/banner.jpg" />
        </div>
        <!-- 活动区 -->
        <div class="promotion">
          <div class="text">优惠专区</div>
          <div class="list">
            <div
              class="column"
              v-for="(row, index) in Promotion"
              @click="toPromotion(row)"
              :key="index"
            >
              <div class="top">
                <div class="title">{{ row.title }}</div>
                <div class="countdown" v-if="row.countdown">
                  <div>{{ row.countdown.h }}</div>:
                  <div>{{ row.countdown.m }}</div>:
                  <div>{{ row.countdown.s }}</div>
                </div>
              </div>
              <div class="left">
                <div class="ad">{{ row.ad }}</div>
                <div class="into">点击进入</div>
              </div>
              <div class="right">
                <img :src="row.img" />
              </div>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
          <div class="title">
            <img src="@/assets/img/hua.png" />
            猜你喜欢
            <img src="@/assets/img/hua.png" />
          </div>
          <div class="product-list">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="product"
                  v-for="(product,index) in productList"
                  :key="index"
                  @click="toGoods(product)"
                >
                  <img mode="widthFix" :src="product.img" />
                  <div class="name">{{ product.name }}</div>
                  <div class="info">
                    <div class="price">{{ product.price }}</div>
                    <div class="slogan">{{ product.slogan }}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
          <div class="loading-text" v-if="finished">没有更多数据了</div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
  import { getRandomNumberByRange } from "@/utils/commonfn";
  export default {
    name: "home",
    components: {},
    data() {
      return {
        searchValue: "",
        // 轮播图片
        swiperList: [
          { id: 1, src: "url1", img: require("@/assets/img/1.jpg") },
          { id: 2, src: "url2", img: require("@/assets/img/2.jpg") },
          { id: 3, src: "url3", img: require("@/assets/img/3.jpg") }
        ],
        // 分类菜单
        categoryList: [
          { id: 1, name: "办公", img: require("@/assets/img/category/1.png") },
          { id: 2, name: "家电", img: require("@/assets/img/category/2.png") },
          { id: 3, name: "服饰", img: require("@/assets/img/category/3.png") },
          { id: 4, name: "日用", img: require("@/assets/img/category/4.png") },
          { id: 5, name: "蔬果", img: require("@/assets/img/category/5.png") },
          { id: 6, name: "运动", img: require("@/assets/img/category/6.png") },
          { id: 7, name: "书籍", img: require("@/assets/img/category/7.png") },
          { id: 8, name: "文具", img: require("@/assets/img/category/8.png") }
        ],
        current: 0,
        // 活动专区
        Promotion: [],
        //猜你喜欢列表
        productList: [
          {
            goods_id: 0,
            img: require("@/assets/img/goods/p1.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 1,
            img: require("@/assets/img/goods/p2.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 2,
            img: require("@/assets/img/goods/p3.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 3,
            img: require("@/assets/img/goods/p4.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 4,
            img: require("@/assets/img/goods/p5.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 5,
            img: require("@/assets/img/goods/p6.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 6,
            img: require("@/assets/img/goods/p7.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 7,
            img: require("@/assets/img/goods/p8.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 8,
            img: require("@/assets/img/goods/p9.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          },
          {
            goods_id: 9,
            img: require("@/assets/img/goods/p10.jpg"),
            name: "商品名称商品名称商品名称商品名称商品名称",
            price: "￥168",
            slogan: "1235人付款"
          }
        ],
        loadingText: "正在加载",
        loading: false, //是否处于加载状态
        finished: false, //是否已加载完所有数据
        isLoading: false //是否处于下拉刷新状态
      };
    },
    created() {
      //开启定时器
      this.Timer();
      this.loadPromotion();
    },
    mounted() {
      // 监听页面滚动
      this.$refs.scroll.addEventListener("scroll", this.handleScroll);
    },
    methods: {
      //上拉加载
      onLoad() {
        setTimeout(() => {
          this.loading = true;
          for (let i = 0; i < 5; i++) {
            this.productList.push(
              this.productList[getRandomNumberByRange(0, 10)]
            );
          }
          this.$toast("加载成功");
          // 加载状态结束
          this.loading = false;

          if (this.productList.length >= 20) {
            // 数据全部加载完成
            this.finished = true;
          }
        }, 500);
      },
      onRefresh() {
        setTimeout(() => {
          this.$toast("刷新成功");
          this.isLoading = false;
        }, 800);
      },
      handleScroll() {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;

        // if (
        //   !!scrollTop &&
        //   scrollTop > 200
        // ) {
        //   console.log("页面高度大于200执行操作");
        // } else {
        //   console.log(scrollTop);
        // }
      },
      //商品跳转
      toGoods(row) {},
      loadPromotion() {
        let cutTime = new Date();
        let yy = cutTime.getFullYear(),
          mm = cutTime.getMonth() + 1,
          dd = cutTime.getDate();
        let tmpcountdown = yy + "/" + mm + "/" + dd + " 23:59:59";
        let tmpPromotion = [
          {
            title: "整点秒杀",
            ad: "整天秒杀专区",
            img: require("@/assets/img/s1.jpg"),
            countdown: false
          },
          {
            title: "限时抢购",
            ad: "每天23点上线",
            img: require("@/assets/img/s2.jpg"),
            countdown: tmpcountdown
          } //countdown为目标时间，程序会获取当前时间倒数
        ];
        //检查倒计时
        for (let i = 0; i < tmpPromotion.length; i++) {
          let row = tmpPromotion[i];
          if (row.countdown) {
            let h = "00",
              m = "00",
              s = "00";
            let currentTime = new Date();
            let cutoffTime = new Date(tmpcountdown);
            if (!(currentTime >= cutoffTime)) {
              let countTime = parseInt(
                (cutoffTime.getTime() - currentTime.getTime()) / 1000
              );
              h = parseInt(countTime / 3600);
              m = parseInt((countTime % 3600) / 60);
              s = countTime % 60;
              h = h < 10 ? "0" + h : h;
              m = m < 10 ? "0" + m : m;
              s = s < 10 ? "0" + s : s;
            }
            tmpPromotion[i].countdown = { h: h, m: m, s: s };
          }
        }
        this.Promotion = tmpPromotion;
      },
      //定时器
      Timer() {
        setInterval(() => {
          if (this.Promotion.length > 0) {
            for (let i = 0; i < this.Promotion.length; i++) {
              let row = this.Promotion[i];
              if (row.countdown) {
                if (
                  !(
                    row.countdown.h == 0 &&
                    row.countdown.m == 0 &&
                    row.countdown.s == 0
                  )
                ) {
                  if (row.countdown.s > 0) {
                    row.countdown.s--;
                    row.countdown.s =
                      row.countdown.s < 10
                        ? "0" + row.countdown.s
                        : row.countdown.s;
                  } else if (row.countdown.m > 0) {
                    row.countdown.m--;
                    row.countdown.m =
                      row.countdown.m < 10
                        ? "0" + row.countdown.m
                        : row.countdown.m;
                    row.countdown.s = 59;
                  } else if (row.countdown.h > 0) {
                    row.countdown.h--;
                    row.countdown.h =
                      row.countdown.h < 10
                        ? "0" + row.countdown.h
                        : row.countdown.h;
                    row.countdown.m = 59;
                    row.countdown.s = 59;
                  }
                  this.Promotion[i].countdown = row.countdown;
                }
              }
            }
          }
        }, 1000);
      },
      toPromotion(row) {},
      toCategory(row) {
          this.$toast(`点击了${row.name}`);
      },
      onChange(index) {
        this.current = index;
      }
    }
  };
</script>
<style lang='scss' scoped>
  .home {
    header {
      padding: 0 20px;
      .van-search__content {
        border-radius: 17px;
      }
      .van-search {
        flex: 1;
      }
      .van-icon {
        font-size: 20px;
      }
    }
    .swipe {
      position: relative;
      width: 100%;
      .van-swipe {
        height: 100%;
        img {
          width: 100%;
        }
      }
      .indicator {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background-color: rgba(255, 255, 255, 0.4);
        width: 150px;
        height: 5px;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        .dots {
          width: 0;
          background-color: rgb(235, 90, 6, 1);
          transition: all 0.3s ease-out;
          &.on {
            width: (100%/3);
          }
        }
      }
      &::after {
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        content: "";
        z-index: 1;
        height: 20px;
        width: 100%;
        border-radius: 0 0 50% 50%;
        // background: linear-gradient(to right, red, yellow, red);
        background: linear-gradient(
            135deg,
            rgb(238, 5, 5),
            #f90,
            #3c9,
            #09f,
            rgb(240, 6, 162)
          )
          left center/400% 400%;
        animation: move 10s infinite;
      }
      @keyframes move {
        0%,
        100% {
          background-position-x: left;
        }
        50% {
          background-position-x: right;
        }
      }
    }
    .category-list {
      position: relative;
      width: 92%;
      margin: 0 4%;
      padding: 0 0 30px 0;
      border-bottom: solid 2px #f6f6f6;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .category {
        width: 25%;
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        .img {
          width: 100%;
          display: flex;
          justify-content: center;
          img {
            width: 9vw;
            height: 9vw;
          }
        }
        .text {
          margin-top: 16px;
          width: 100%;
          display: flex;
          justify-content: center;
          font-size: 24px;
          color: #3c3c3c;
        }
      }
    }
    .banner {
      width: 92%;
      margin: 40px 4%;
      img {
        width: 100%;
        height: 20vw;
        border-radius: 10vw;
        box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.3);
      }
    }
    .promotion {
      width: 92%;
      margin: 0 4%;
      .text {
        width: 100%;
        height: 60px;
        font-size: 34px;
        font-weight: 600;
        margin-top: -10px;
      }
      .list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .column {
          width: 48%;
          padding: 15px 3%;
          background-color: #ebf9f9;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .top {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            .title {
              font-size: 30px;
            }
            .countdown {
              margin-left: 20px;
              display: flex;
              height: 40px;
              display: flex;
              align-items: center;
              font-size: 20px;
              div {
                height: 30px;
                background-color: #f06c7a;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                border-radius: 4px;
                margin: 0 4px;
                padding: 0 2px;
              }
            }
          }
          .left {
            width: 50%;
            height: 18.86vw;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            .ad {
              margin-top: 5px;
              width: 100%;
              font-size: 22px;
              color: #acb0b0;
            }
            .into {
              width: 100%;
              font-size: 24px;
              color: #aaa;
              margin-bottom: 5px;
            }
          }
          .right {
            width: 18.86vw;
            height: 18.86vw;
            img {
              width: 18.86vw;
              height: 18.86vw;
            }
          }
        }
      }
    }
    .goods-list {
      // background-color: #f4f4f4;
      .title {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        color: #f47825;
        font-size: 30px;
        margin-top: 10px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .loading-text {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        color: #979797;
        font-size: 24px;
      }
      .product-list {
        width: 100%;
        padding: 0 4% 3vw 4%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .product {
          width: 47%;
          border-radius: 20px;
          background-color: #fff;
          margin: 0 0 15px 0;
          box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
          img {
            width: 100%;
            border-radius: 20px 20px 0 0;
          }
          .name {
            width: 92%;
            padding: 10px 4%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-align: justify;
            overflow: hidden;
            font-size: 30px;
          }
          .info {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 92%;
            padding: 10px 4% 10px 4%;

            .price {
              color: #e65339;
              font-size: 30px;
              font-weight: 600;
            }
            .slogan {
              color: #807c87;
              font-size: 24px;
            }
          }
        }
        .van-pull-refresh {
          width: 100%;
          .van-list {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
        }
      }
    }
  }
</style>