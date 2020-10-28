<template>
  <div class="login">
    <img class="image" src="~@/assets/images/mayun.jpg" alt />
    <content class="content">
      <div class="login-input">
        <div class="login-wrap">
          <div class="text">用户名</div>
          <input type="text" value placeholder="请输入手机号" maxlength="11" />
        </div>
        <div class="login-wrap">
          <div class="text">密&emsp;码</div>
          <input
            type="password"
            value
            placeholder="请输正确的密码"
            maxlength="11"
          />
        </div>
      </div>
      <!-- <div class="loginBtn"
           @click="handleSubmit">
        <button>登录</button>
      </div> -->
      <cg-slider @successful="successful" :verifyRes="verifyRes"></cg-slider>
    </content>
  </div>
</template>

<script>
import API from '@/api/login'
import cgSlider from '@c/cg-slider/index'
export default {
  name: 'login',
  components: {
    cgSlider,
  },
  data() {
    return {
      value1: '',
      userName: '',
      verifyRes: null,
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSubmit() {
      API.getSwierList().then((res) => {
        console.log(res)
      })
    },
    successful() {
      setTimeout(() => {
        this.verifyRes = false
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4);

  .image {
    display: block;
    width: 200px;
    height: 200px;
    margin: 120px auto;
    border-radius: 50%;
  }

  .content {
    width: 85%;
    height: 500px;
    background-color: #ffffff;
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 10px 15px 35px rgba(0, 0, 0, 0.5);

    .login-input {
      width: 100%;

      .login-wrap {
        display: flex;
        align-items: center;
        height: 80px;
        @include thinBorder($color: #efefef);
        margin-top: 50px;

        .text {
          margin: 0 20px;
          font-size: 40px;
        }

        input {
          font-size: 30px;
        }
      }
    }

    .loginBtn {
      width: 80%;
      padding: 20px 0;
      text-align: center;
      font-size: 40px;
      color: #ffffff;
      font-weight: 700;
      box-shadow: 5px 5px 15px #888888;
      border-radius: 30px;
      background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
    }
  }
}

.van-cell-group {
  width: 100%;
}

::v-deep .van-field__body {
  margin-left: 15px;
}
</style>
