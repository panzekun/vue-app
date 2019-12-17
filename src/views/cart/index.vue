<template>
  <div class="Router">
    <div class="cart">
      <delete-slider
        v-for="(item,index) in goodsList"
        class="cart-item"
        :key="index"
        @delete-cell="handleDelete(item)"
      >
        <div class="goods-info">
          <input
            name="checkbox"
            type="checkbox"
            class="zk-checkbox"
            v-model="item.selected"
            @change="handleSelected(item.selected)"
          />
          <img class="list-img" :src="item.img" alt />
          <div class="list-content">
            <p class="title ellipsis">{{item.name}}</p>
            <span class="tips">{{item.spec }}</span>
            <p class="price">
              ￥{{item.price |FormatMoney}}
              <van-stepper v-model="item.number" />
            </p>
          </div>
        </div>
      </delete-slider>
    </div>
    <footer>
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checkedAll" @click="handleCheckedAll">全选</van-checkbox>
        <!-- <span slot="tip">
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </span>-->
      </van-submit-bar>
    </footer>
  </div>
</template>

<script>
  import deleteSlider from "@/components/deleteSlider/index";
  export default {
    name: "cart",
    components: {
      deleteSlider
    },
    data() {
      return {
        goodsList: [
          {
            id: 1,
            img: require("@/assets/img/goods/p1.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 1000,
            number: 16,
            selected: false
          },
          {
            id: 2,
            img: require("@/assets/img/goods/p2.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 7575,
            number: 1,
            selected: false
          },
          {
            id: 3,
            img: require("@/assets/img/goods/p3.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 5738,
            number: 1,
            selected: false
          },
          {
            id: 4,
            img: require("@/assets/img/goods/p4.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price:2524,
            number: 1,
            selected: false
          },
          {
            id: 5,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 2553,
            number: 10,
            selected: false
          },
          {
            id: 5,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 1257,
            number: 1,
            selected: false
          },
          {
            id: 6,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 5758,
            number: 1,
            selected: false
          },
          {
            id: 7,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 1275,
            number: 1,
            selected: false
          },
          {
            id: 8,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 13456,
            number: 1,
            selected: false
          },
          {
            id: 9,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 456,
            number: 1,
            selected: false
          },
          {
            id: 10,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 1275,
            number: 1,
            selected: false
          },
          {
            id: 11,
            img: require("@/assets/img/goods/p5.jpg"),
            name:
              "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
            spec: "规格:S码",
            price: 1479,
            number: 1,
            selected: false
          }
        ],
        checkedAll: false,
        // 合计价格
        totalPrice: 0
      };
    },
    created() {},
    mounted() {},
    methods: {
      // 单选
      handleSelected(selected) {
        let flag = true;
        this.goodsList.some(item => {
          if (!item.selected) {
            return (flag = false);
          }
        });
        // console.log(flag);
        flag ? (this.checkedAll = true) : (this.checkedAll = false);
        this.getTotalPrice();
      },
      // 多选
      handleCheckedAll() {
        this.goodsList.map(item => {
          item.selected = !this.checkedAll;
        });
        this.getTotalPrice();
      },
      // 计算价格
      getTotalPrice() {
        this.totalPrice = 0;
        this.goodsList.map(item => {
          if (item.selected) {
            this.totalPrice += item.price * item.number;
          }
        });
        console.log(this.totalPrice)
      },
      handleDelete(row) {
        this.$toast("删除第" + row.id + "个商品");
      },
      // 提交
      onSubmit() {
        this.$toast("提交订单");
      }
    }
  };
</script>
<style lang='scss' scoped>
  .Router {
    height: 100vh !important;
    overflow: hidden;
    .cart {
      position: absolute;
      width: 100%;
      height: calc(100% - 206px);
      overflow-x: scroll;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; //ios允许独立的滚动区域和触摸回弹
      background-color: #eee;
      .cart-item {
        margin-bottom: 15px;
      }
      .goods-info {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 15px;
        .list-img {
          width: 180px;
          height: 180px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          margin-right: 10px;
          img {
            width: 100%;
          }
        }
        .list-content {
          flex: 1;
          font-size: 28px;
          .title {
            font-weight: 600;
            margin-bottom: 15px;
          }
          .tips {
            padding: 10px;
            border-radius: 32px;
            background-color: #eee;
          }
          .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
          }
        }
      }
    }
    footer {
      position: absolute;
      width: 100%;
      bottom: 106px;
      .van-submit-bar {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 5px;
        .van-submit-bar__bar {
          width: 100%;
          padding-left: 9px;
        }
      }
    }
  }
</style>