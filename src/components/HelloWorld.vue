<template>
  <div class="box">
    <!-- <van-button type="default">默认按钮</van-button> -->

    <div>字</div>
    <div>
      <a href>大师都说多多</a>
    </div>
  </div>
</template>

<script>
  import login from "@/api/login";
  export default {
    name: "boxWorld",
    data() {
      return {
        images: [
          "https://img.yzcdn.cn/vant/apple-1.jpg",
          "https://img.yzcdn.cn/vant/apple-2.jpg"
        ]
      };
    },
    created() {
      let data = {}; //请求参数
      // login
      login(data)
        .then(res => {
          //请求成功
        })
        .catch(err => {
          //请求失败
        });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .box {
    width: 200px;
    height: 500px;
    box-sizing: border-box;
    background-color: red;
    font-size: 10px;
  }
</style>
