<template>
  <!-- 能滚动的盒子 -->
  <div class="viewport" ref="viewport" @scroll="handleScroll">
    <!-- 滚动条 -->
    <div
      class="scroll-bar"
      ref="scrollBar"
      :style="{ height: listHeight }"
    ></div>
    <!-- 真实渲染的内容 -->
    <div class="scroll-list" :style="{ transform: getTransform }">
      <template v-if="visibleData.length > 0">
        <div v-for="(item, index) in visibleData" :key="index" ref="VirtualListItems">
          <slot :itemList="{ item, index }"></slot>
        </div>
      </template>
      <template v-else>
       <div class="noData">暂无数据</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList2',
  props: {
    //所有列表数据
    listData: {
      type: Array,
      default: () => [],
    },
    //每项高度
    itemSize: {
      type: Number,
      default: 80,
    },
    //可见多少个
    remain: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: 0,
    }
  },

  computed: {
    //渲染三屏
    //前面预留几个
    preCount() {
      return Math.min(this.start, this.remain)
    },
    //后面预留几个
    nextCount() {
      return Math.min(this.remain, this.listData.length - this.end)
    },
    // 可见数据
    visibleData() {
      let start = this.start - this.preCount
      let end = this.end + this.nextCount
      return this.listData.slice(start, end)
    },
    //列表总高度
    listHeight() {
      return this.listData.length * this.itemSize + 'px'
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.offset}px,0)`
    },
  },
  mounted() {
    this.$refs.viewport.style.height = this.itemSize * this.remain + 'px'
  },
  methods: {
    handleScroll() {
      //1.先算出当前滚过去几个，当前应该从第几个开始显示
      let scrollTop = this.$refs.viewport.scrollTop //拿到当前滚动的距离
      //2.获取当前应该从第几个开始渲染
      this.start = Math.floor(scrollTop / this.itemSize)
      //3.计算当前结尾的位置
      this.end = this.start + this.remain //当前可渲染区域
      //定位当前的可视区域，让当前渲染的内容在可视化区域
      this.offset = this.start * this.itemSize - this.itemSize * this.preCount
    },
  },
}
</script>
<style lang="scss" scoped>
.viewport {
  position: relative;
  overflow-y: scroll;
  border: 1px solid #000;
  -webkit-overflow-scrolling: touch;
  .scroll-bar {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .scroll-list {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
  }
}
</style>
