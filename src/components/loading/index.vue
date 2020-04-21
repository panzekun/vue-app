<template>
  <div v-if="show" class="lds-spinner">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <!-- <div class="bruce flex-ct-x">
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
    </div>-->
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    ul {
      // $colors: #ffddaa, #ffbb66, #ffaa33, #ff8800, #ee7700;
      $colors: #7ef9ff, #89cff0, #4682b4, #0f52ba, #000080;
      display: flex;
      animation-delay: 1s;

      li {
        position: relative;
        width: 48px;
        height: 48px;
        margin: 12px;
        border-radius: 50%;

        &::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: inherit;
          animation: wave 2s ease-out infinite;
        }

        @for $i from 1 through 5 {
          &:nth-child(#{$i}) {
            background: nth($colors, $i);

            &::before {
              animation-delay: $i * 0.2s;
            }
          }
        }
      }
    }

    @keyframes wave {
      50%,
      75% {
        transform: scale(2);
      }

      80%,
      100% {
        opacity: 0;
      }
    }
  }

  // $count: 10;
  // $color: #66f #09f;
  // .bruce {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%);
  //   .reflect-loading {
  //     display: flex;
  //     height: 80px;
  //     -webkit-box-reflect: below 0 linear-gradient(rgba(#fff, 0), rgba(#fff, 0.7));
  //     li {
  //       width: 20px;
  //       background-image: linear-gradient(to right, yellow, rgb(0, 255, 21));

  //       @for $i from 0 to $count {
  //         $args: append($color, $i * 100% / ($count - 1));
  //         &:nth-child(#{$i + 1}) {
  //           background-color: mix($args...);
  //           animation: rotate 3s cubic-bezier(0.81, 0.04, 0.4, 0.7) infinite;
  //           animation-delay: $i * 50ms;
  //         }
  //       }
  //     }
  //   }
  // }

  // @keyframes rotate {
  //   0% {
  //     transform: rotate(-0.5turn) rotateX(-1turn);
  //   }
  //   75%,
  //   100% {
  //     transform: none;
  //   }
  // }

  // @-webkit-keyframes bounce {
  //   0%,
  //   100% {
  //     -webkit-transform: scale(0);
  //   }
  //   50% {
  //     -webkit-transform: scale(1);
  //   }
  // }

  // @keyframes bounce {
  //   0%,
  //   100% {
  //     transform: scale(0);
  //     -webkit-transform: scale(0);
  //   }
  //   50% {
  //     transform: scale(1);
  //     -webkit-transform: scale(1);
  //   }
  // }
</style>