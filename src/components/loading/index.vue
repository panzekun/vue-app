<template>
  <div v-if="show" class="lds-spinner">
    <!-- <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>-->
    <div class="bruce flex-ct-x">
      <ul class="reflect-loading">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Loading",
    props: {
      show: Boolean
    },
    data() {
      return {};
    }
  };
</script>
<style lang="scss" scoped>
  .lds-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .spinner {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    .double-bounce1,
    .double-bounce2 {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #ff000f;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-animation: bounce 2s infinite ease-in-out;
      animation: bounce 2s infinite ease-in-out;
    }
    .double-bounce2 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
  }
  $count: 10;
  $color: #66f #09f;
  .bruce {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    .reflect-loading {
      display: flex;
      height: 80px;
      -webkit-box-reflect: below 0 linear-gradient(rgba(#fff, 0), rgba(#fff, 0.7));
      li {
        width: 20px;
        background-image: linear-gradient(to right, yellow, rgb(0, 255, 21));

        @for $i from 0 to $count {
          $args: append($color, $i * 100% / ($count - 1));  
          &:nth-child(#{$i + 1}) {
            background-color: mix($args...);
            animation: rotate 3s cubic-bezier(0.81, 0.04, 0.4, 0.7) infinite;
            animation-delay: $i * 50ms;
          }
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-0.5turn) rotateX(-1turn);
    }
    75%,
    100% {
      transform: none;
    }
  }

  @-webkit-keyframes bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
</style>