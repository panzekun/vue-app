<template>
  <!-- 购物车滑动删除组件 -->
  <div class="delete-cell" ref="deleteCell">
    <div
      class="slider"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      :style="deleteSlider"
      ref="slider"
    >
      <div class="content">
        <!-- 插槽中放具体项目中需要内容 -->
        <slot></slot>
      </div>
      <button class="remove" ref="remove" @click="handleDelete">删除</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        startX: 0, //触摸位置
        startY: 0, //触摸位置
        endX: 0, //结束位置
        moveX: 0, //滑动时的位置
        moveY: 0,
        disX: 0, //移动距离
        deleteSlider: "", //滑动时的效果,使用v-bind:style="deleteSlider"
        direction: 0 //滑动方向--1(左右)，2(上下)
      };
    },
    methods: {
      handleDelete() {
        this.$emit("delete-cell");
      },
      touchStart(ev) {
        ev = ev || event;
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕

        if (ev.touches.length == 1) {
          // 记录开始位置
          this.startX = ev.touches[0].clientX;
          this.startY = ev.touches[0].clientY;
        }
      },
      touchMove(ev) {
        ev = ev || event;
        //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
        let wd = this.$refs.remove.offsetWidth;
        if (ev.touches.length == 1) {
          // 滑动时距离浏览器左侧实时距离
          this.moveX = ev.touches[0].clientX;
          this.moveY = ev.touches[0].clientY;
          //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disX = this.startX - this.moveX;
          if (this.direction === 0) {
            this.direction = this.getDirection(
              this.startX,
              this.startY,
              this.moveX,
              this.moveY
            );
          }
          // console.log(this.direction);

          switch (this.direction) {
            case 1:
              // this.$refs.deleteCell.offsetParent; //获取上层父级元素
              this.$refs.deleteCell.offsetParent.style.overflowY = "hidden";
              ev.preventDefault();
              // 左滑动
              if (this.disX > 0 && this.type != "left") {
                this.deleteSlider = "transform:translateX(-" + this.disX + "px)";
              }
              //右滑动
              if (this.disX < 0) {
                // console.log('右滑动')
                if (this.type == "left") {
                  this.deleteSlider =
                    "transform:translateX(-" + (this.disX + wd) + "px)";
                }
              }

              // 最大也只能等于删除按钮宽度
              if (this.disX >= wd) {
                this.deleteSlider = "transform:translateX(-" + wd + "px)";
              }
              break;
            case 2:
              console.log("上下");
              break;
            default:
          }
        }
      },
      touchEnd(ev) {
        ev = ev || event;
        let wd = this.$refs.remove.offsetWidth;
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.disX = this.startX - endX;

          if (this.disX != 0 && this.direction == 1) {
            //如果距离小于删除按钮一半,强行回到起点
            if (this.disX < wd / 2) {
              this.deleteSlider = "transform:translateX(0px)";
              this.type = "right";
            } else {
              //大于一半 滑动到最大值
              this.deleteSlider = "transform:translateX(-" + wd + "px)";
              this.type = "left";
            }
          }
          this.direction = 0;
          this.$refs.deleteCell.offsetParent.style.overflowY = "auto";
          this.$refs.deleteCell.overflowX = "auto";
        }
      },
      //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
      getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;

        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
          return result;
        }
        if (Math.abs(angy) <= Math.abs(angx)) {
          //左右滑动
          result = 1;
        } else {
          //上下滑动
          result = 2;
        }

        return result;
      }
    }
  };
</script>
<style lang='scss'>
  .delete-cell {
    position: relative;
    overflow: hidden;
    .slider {
      transition-duration: 0.3s;
      .content {
        position: relative;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 0 15px;
        overflow: hidden;
        color: #323233;
        background-color: #fff;
        border-radius: 10px;
      }
      .remove {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        padding: 0 25px;
        border: none;
        background: red;
        color: #fff;
        text-align: center;
        font-size: 36px;
        transform: translate3d(100%, 0, 0);
      }
    }
  }
</style>