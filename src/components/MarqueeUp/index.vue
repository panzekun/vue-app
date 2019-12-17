<template>
  <!-- 无缝滚动效果 -->
  <div class="marquee-wrap">
    <ul class="marquee-list" :class="{'animate-up': animateUp}">
      <li v-for="(item, index) in listData" :key="index">{{item}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "marquee-up",
    data() {
      return {
        animateUp: false,
        listData: [
          "12***ve 成功邀请12人 已获奖金60元",
          "l***e 成功邀请5人 已获奖金40元",
          "l***e 成功邀请1人 已获奖金5元"
        ],
        timer: null
      };
    },
    mounted() {
      this.timer = setInterval(this.scrollAnimate, 1500);
    },
    methods: {
      scrollAnimate() {
        this.animateUp = true;
        setTimeout(() => {
          this.listData.push(this.listData[0]);
          this.listData.shift();
          this.animateUp = false;
        }, 500);
      }
    },
    destroyed() {
      clearInterval(this.timer);
    }
  };
</script>
<style lang="scss" scoped>
  .marquee-wrap {
    width: 80%;
    height: 40px;
    border-radius: 20px;
    margin: 0 auto;
    overflow: hidden;
    .marquee-list {
      li {
        width: 100%;
        height: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 0 20px;
        list-style: none;
        line-height: 40px;
        text-align: center;
        color: red;
        font-size: 18px;
        font-weight: 400;
      }
    }
    .animate-up {
      transition: all 0.5s ease-in-out;
      transform: translateY(-40px);
    }
  }
</style>
