<template>
  <div class="Router">
    <div class="goodsDetails">
      <header>
        <div class="before" @click="goToback">
          <van-icon name="arrow-left" />
        </div>
        <div class="after">
          <van-icon name="more-o" />
          <van-icon name="shopping-cart-o" @click="goTocart" />
        </div>
      </header>
      <!-- 轮播图 -->
      <div class="swiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="swiper in swiperList" :key="swiper.id">
            <img :src="swiper.img" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 标题 价格 -->
      <div class="goods-info">
        <div class="price">￥{{goodsData.price}}</div>
        <div class="title ellipsis">{{goodsData.name}}</div>
      </div>
      <!-- 服务-规则选择 -->
      <div class="specBox">
        <div class="row" @click="showService">
          <div class="text">服务</div>
          <div class="content">
            <div
              class="serviceitem"
              v-for="(item,index) in goodsData.service"
              :key="index"
            >{{item.name}}</div>
          </div>
          <div class="arrow">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="row" @click="showSpec(false)">
          <div class="text">规格</div>
          <div class="content">
            <div class="sp">
              <div
                v-for="(item,index) in goodsData.spec"
                :key="index"
                :class="[index==selectSpec?'on':'']"
              >{{item}}</div>
            </div>
          </div>
          <div class="arrow">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <!-- 评价 -->
      <div class="comments">
        <div class="row">
          <div class="text">商品评价({{goodsData.comment.number}})</div>
          <div class="arrow">
            <div class="show" @click="showComments">
              查看全部
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="comment" @click="toRatings(goodsData.comment.number)">
          <div class="user-info">
            <div class="face">
              <img :src="goodsData.comment.userface" />
            </div>
            <div class="username">{{goodsData.comment.username}}</div>
          </div>
          <div class="content">{{goodsData.comment.content}}</div>
        </div>
      </div>
      <!-- 详情图片楼层 -->
      <div class="description">
        <div class="title">
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">商品详情</van-divider>
        </div>
        <div class="content">
          <p v-html="descriptionStr"></p>
        </div>
      </div>
    </div>

    <!-- 服务-模态层弹窗 -->
    <popup :popupClass="serviceClass" @touchmove.prevent>
      <div class="ervice-content">
        <div class="row" v-for="(item,index) in goodsData.service" :key="index">
          <div class="title">{{item.name}}</div>
          <div class="description">{{item.description}}</div>
        </div>
      </div>
      <div class="ervice-btn">
        <div class="button" @click="hideService">完成</div>
      </div>
    </popup>

    <!-- 规格-模态层弹窗 -->
    <popup :popupClass="specClass" @touchmove.prevent>
      <div class="spec-content">
        <div class="title">选择规格：</div>
        <div class="sp">
          <div
            v-for="(item,index) in goodsData.spec"
            :class="[index==selectSpec?'on':'']"
            @click="setSelectSpec(index)"
            :key="index"
          >{{item}}</div>
        </div>
        <div class="length" v-if="selectSpec!=null">
          <div class="text">数量</div>
          <div class="number">
            <van-stepper v-model="goodsData.number" @change="handleNumber" />
          </div>
        </div>
      </div>
      <div class="ervice-btn">
        <div class="button" @click="hideSpec">完成</div>
      </div>
    </popup>
    <footer>
      <van-goods-action :safe-area-inset-bottom="true">
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
        <van-goods-action-icon icon="shop-o" text="店铺" info="12" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
  import popup from "@c/popup/index";
  export default {
    name: "goodsDetails",
    components: {
      popup
    },
    data() {
      return {
        //轮播主图数据
        swiperList: [
          {
            id: 1,
            img: "https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg"
          },
          {
            id: 2,
            img: "https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg"
          },
          {
            id: 3,
            img: "https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg"
          },
          {
            id: 4,
            img: "https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg"
          }
        ],
        // 商品信息
        goodsData: {
          id: 1,
          name:
            "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
          price: "127.00",
          number: 1,
          service: [
            { name: "正品保证", description: "此商品官方保证为正品" },
            { name: "极速退款", description: "此商品享受退货极速退款服务" },
            { name: "7天退换", description: "此商品享受7天无理由退换服务" }
          ],
          spec: ["XS", "S", "M", "L", "XL", "XXL"],
          comment: {
            number: 102,
            userface: require("@/assets/img/face.jpg"),
            username: "大黑哥",
            content:
              "很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！"
          }
        },
        selectSpec: "0", //选中规格
        serviceClass: "", //服务弹窗css类名
        specClass: "", //规格弹窗css类名
        descriptionStr:
          '<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>'
      };
    },
    created() {
      document.title = "xxxx商品";
    },
    mounted() {},
    methods: {
      goTocart() {
        this.$router.push('/cart');
      },
      goToback() {
        this.$router.go(-1);
      },
      //跳转评论列表
      showComments() {
        this.$toast("跳转评论列表");
      },
      //商品评论
      toRatings(commentNum) {
        this.$toast(`跳转商品评论第${commentNum}条`);
      },
      //商品数量
      handleNumber(value) {
        this.goodsData.number = value;
      },
      //选择规格
      setSelectSpec(index) {
        this.selectSpec = index;
      },
      //关闭规格弹窗
      hideSpec() {
        this.specClass = "hide";
        setTimeout(() => {
          this.specClass = "none";
        }, 200);
      },
      //规格弹窗
      showSpec(flag) {
        this.specClass = "show";
        this.specCallback = flag;
      },
      //关闭服务弹窗
      hideService() {
        this.serviceClass = "hide";
        setTimeout(() => {
          this.serviceClass = "none";
        }, 200);
      },
      // 服务弹窗
      showService() {
        this.serviceClass = "show";
      }
    }
  };
</script>
<style lang='scss' scoped>
  .Router {
    height: 100vh !important;
    overflow: hidden;
    .goodsDetails {
      position: absolute;
      width: 100%;
      height: calc(100% - 106px);
      overflow-x: scroll;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; //ios允许独立的滚动区域和触摸回弹
      background-color: #eee;
      header {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 15px;
        z-index: 999;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.2);
          font-size: 46px;
          color: #fff;
        }
        .after {
          width: 140px;
          display: flex;
          justify-content: space-between;
          > i {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 66px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.2);
            font-size: 46px;
            color: #fff;
          }
        }
      }
      .swiper {
        position: relative;
        width: 100%;
        height: 750px;
        .van-swipe {
          height: 100%;
          img {
            height: 100%;
          }
        }
        // .indicator {
        //   position: absolute;
        //   bottom: 20px;
        //   left: 20px;
        //   background-color: rgba(255, 255, 255, 0.4);
        //   width: 150px;
        //   height: 5px;
        //   border-radius: 3px;
        //   overflow: hidden;
        //   display: flex;
        //   .dots {
        //     width: 0;
        //     background-color: rgb(235, 90, 6, 1);
        //     transition: all 0.3s ease-out;
        //     &.on {
        //       width: (100%/3);
        //     }
        //   }
        // }
        // &::after {
        //   position: absolute;
        //   bottom: -10px;
        //   left: 0;
        //   right: 0;
        //   content: "";
        //   z-index: 1;
        //   height: 20px;
        //   width: 100%;
        //   border-radius: 0 0 50% 50%;
        //   // background: linear-gradient(to right, red, yellow, red);
        //   background: linear-gradient(
        //       135deg,
        //       rgb(238, 5, 5),
        //       #f90,
        //       #3c9,
        //       #09f,
        //       rgb(240, 6, 162)
        //     )
        //     left center/400% 400%;
        //   animation: move 10s infinite;
        // }
        // @keyframes move {
        //   0%,
        //   100% {
        //     background-position-x: left;
        //   }
        //   50% {
        //     background-position-x: right;
        //   }
        // }
      }
      .goods-info {
        width: 100%;
        padding: 20px 4%;
        background-color: #fff;
        .price {
          font-size: 46px;
          font-weight: 600;
          color: #f47925;
        }
        .title {
          font-size: 30px;
        }
      }
      .specBox {
        padding: 20px 0;
        .row {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 20px;
          // margin-bottom: 20px;
          background-color: #fff;
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
          .text {
            font-size: 24px;
            color: #a2a2a2;
            margin-right: 20px;
          }
          .content {
            font-size: 28px;
            display: flex;
            // flex-wrap: wrap;
            .serviceitem {
              margin-right: 10px;
            }
            .sp {
              width: 100%;
              display: flex;
              div {
                background-color: #f6f6f6;
                padding: 5px 10px;
                color: #999;
                margin-right: 10px;
                font-size: 20px;
                border-radius: 5px;
                &.on {
                  border: solid 1px #f47952;
                  padding: 4px 8px;
                }
              }
            }
          }
          .arrow {
            position: absolute;
            right: 4%;
            .icon {
              color: #ccc;
            }
          }
        }
      }
      .comments {
        width: 100%;
        padding: 20px 4%;
        background-color: #fff;
        margin-bottom: 20px;
        .row {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          margin: 0 0 30px 0;
          .text {
            font-size: 30px;
          }
          .arrow {
            font-size: 28px;
            position: absolute;
            right: 4%;
            color: #17e6a1;
            .show {
              display: flex;
              align-items: center;
              .icon {
                color: #17e6a1;
              }
            }
          }
        }
        .comment {
          width: 100%;
          .user-info {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            .face {
              width: 40px;
              height: 40px;
              margin-right: 8px;
              img {
                width: 40px;
                height: 40px;
                border-radius: 100%;
              }
            }
            .username {
              font-size: 24px;
              color: #999;
            }
          }
          .content {
            margin-top: 10px;
            font-size: 26px;
          }
        }
      }
    }
    .ervice-content {
      width: 100%;
      padding: 20px 0;
      .row {
        margin: 30px 0;
        .title {
          font-size: 30px;
          margin: 10px 0;
        }
        .description {
          font-size: 28px;
          color: #999;
        }
      }
    }
    .ervice-btn {
      width: 100%;
      height: 100px;
      .button {
        width: 100%;
        height: 80px;
        border-radius: 40px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f47952;
        font-size: 28px;
      }
    }
    .spec-content {
      width: 100%;
      .title {
        font-size: 30px;
        margin: 30px 0;
      }
      .sp {
        display: flex;
        div {
          font-size: 28px;
          padding: 5px 20px;
          border-radius: 8px;
          margin: 0 30px 20px 0;
          background-color: #f6f6f6;
          &.on {
            padding: 3px 18px;
            border: solid 1px #f47925;
          }
        }
      }
      .length {
        margin-top: 30px;
        border-top: solid 1px #aaa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        .text {
          font-size: 30px;
        }
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          .input {
            width: 80px;
            height: 60px;
            margin: 0 10px;
            background-color: #f3f3f3;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            input {
              width: 80px;
              height: 60px;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              font-size: 26px;
            }
          }

          .sub,
          .add {
            width: 60px;
            height: 60px;
            background-color: #f3f3f3;
            border-radius: 5px;
            .icon {
              font-size: 30px;
              width: 60px;
              height: 60px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
    footer {
      position: absolute;
      width: 100%;
      height: 100px;
      bottom: 0;
      .van-goods-action {
        position: absolute;
        bottom: 0;
        padding: 0 5px;
      }
    }
  }
</style>