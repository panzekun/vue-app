<template>
  <div class="vritual-list-item">{{ itemList.item.value }}</div>
</template>

<script>
export default {
  name: 'vritualListItem',
  props: {
    itemList: Object,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.vritual-list-item {
  height: 120px;
  border: 1px solid red;
}
</style>
