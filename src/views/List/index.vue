<template>
  <div class="VirtualList">
    <!-- <header>头部</header> -->
    <div class="content">
      <VirtualList :listData="data" :itemSize="60" :remain="8">
        <Item slot-scope="{ itemList }" :itemList="itemList" />
      </VirtualList>
    </div>
  </div>
</template>

<script>
import VirtualList from '@c/vritual-list/index2.vue'
import Item from '@c/vritual-list//item'

let d = []
for (let i = 0; i < 50; i++) {
  d.push({ id: i, value: i })
}
export default {
name: 'List',
  components: {
    VirtualList,
    Item,
  },
  data() {
    return {
      data: d,
    }
  },
  computed: {
    windowW() {
      return document.documentElement.clientWidth
    },
    windowH() {
      return document.documentElement.clientHeight
    },
  },
}
</script>

<style>
.VirtualList {
  width: 100%;
  height: 100%;
}
header {
  width: 100%;
  height: 50px;
  background-color: pink;
  color: black;
}
.content {
  /* height: 500px; */
}
#VirtualList {
  height: 100%;
  width: 100%;
}
</style>
