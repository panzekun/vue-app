<template>
  <!-- 滑动验证 -->
  <div class="sliders" ref="slidersRef">
    <div class="operationBgBox">
      <div class="text">{{ value }}</div>
      <!-- <div class="bgc" ref="bgcRef"></div> -->
      <div
        ref="operationBoxRef"
        class="operationBox"
        :style="styleData"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      >
        <div class="cg-font cg-rightSlide"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cg-sliders',
  props: {
    verifyRes: {
      type: Boolean,
      default:true
    },
  },
  data() {
    return {
      reset: false,
      value: '滑动登陆', //默认提示语
      systemWidth: '', //获取屏幕宽度
      xAxial: 0, //X轴的初始值
      x: 0, //触摸时X轴的值
      xRange: '', //滑块可移动的X轴范围
      styleData: {
        transform: `translate(0,-50%)`,
      },
      succeedMsg: '', //验证成功提示信息的默认值
      pullStatus: true, //是否允许验证成功后继续滑动
    }
  },
  watch: {
    // 监听，是否重置 false重置，
    verifyRes: function(falg) {
      if (!falg) {
        this.x = 0
        this.pullStatus = true
        this.styleData.transform = `translate(${this.x}px, -50%)`
      }
    },
  },

  methods: {
    touchstart(e) {
      //获取去X初始值
      this.xAxial =
        e.changedTouches[0].clientX - this.$refs.slidersRef.offsetLeft
      //滑块可移动的X轴范围
      this.xRange =
        this.$refs.slidersRef.clientWidth -
        this.$refs.operationBoxRef.clientWidth -
        2
    },
    touchmove(e) {
      //如验证成功后仍允许滑动，则执行下面代码块（初始值默认为允许）
      if (this.pullStatus) {
        //设置X轴的始点
        this.x = e.changedTouches[0].clientX - this.xAxial
        //如果触摸时X轴的坐标大于可移动距离则设置元素X轴的坐标等于可移动距离的最大值，否则元素X轴的坐标等于等于当前触摸X轴的坐标
        this.x >= this.xRange ? (this.x = this.xRange) : this.x
        //如果触摸时X轴的坐标小于设定的始点，则将元素X轴的坐标设置为0
        if (this.x < 0) this.x = 0
        //根据获取到的X轴坐标进行动画演示
        this.styleData.transform = `translate(${this.x}px, -50%)`
      }
    },

    touchend() {
      //如果触摸的X轴坐标大于等于设置的可移动范围，则验证成功
      if (this.x >= this.xRange) {
        //X轴坐标等于可移动范围的最大值
        this.x = this.xRange
        //验证成功提示语
        // this.succeedMsg = '验证成功'
        //验证成功禁止滑动
        this.pullStatus = false
        // 返回验证结果
        this.$emit('successful')
      } else {
        //X轴坐标归0
        this.x = 0
        this.pullStatus = true
        //清空成功提示
        // this.succeedMsg = ''
        //根据获取的X轴坐标进行动画演示
      }
      this.styleData.transform = `translate(${this.x}px, -50%)`
    },
  },
}
</script>

<style>
@import 'iconfont/iconfont.css';

.sliders {
  position: relative;
  display: flex;
  width: 80%;
  height: 96px;
  border: 3px solid #fe7721;
  border-radius: 48px;
  margin: 0 auto;
  font-size: 32px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.operationBgBox {
  width: 504px;
  height: 90px;
  background-color: #fff;
  border-radius: 48px;
  overflow: hidden;
  position: absolute;
  top: 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  color: #fe7721;
}
.bgc {
  position: absolute;
  width: 0;
  height: 100%;
  left: 0;
  border-radius: 48px;
  background-color: #fe7721;
}

.operationBox {
  width: 168px;
  height: 86px;
  border-radius: 44px;
  background: linear-gradient(90deg, #fb802e 0%, #fd6727 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translate(0, -50%);
}

.operationBox image {
  width: 50%;
  height: 50%;
}
</style>
