<template>
  <div class="itemWarp" :class="{'is-active':isActive}" @click="changePage">
    <span v-show="!isActive ">
      <slot name="normalImg"></slot>
    </span>
    <span v-show="isActive ">
      <slot name="activeImg"></slot>
    </span>
    <span>{{data.title}}</span>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: "tabbaritem",
    props: {
      data: {
        type: Object
      },
      sel: {
        type: Number
      }
    },
    computed: {
      isActive: function() {
        if (this.sel == this.data.id) {
          return true;
        }
        return false;
      }
    },
    methods: {
      changePage() {
        //点击跳转对应的页面
        this.$router.push(this.data.path);
        this.$emit("changePage", this.data.id);
      }
    }
  };
</script>


<style scoped lang="scss">
  .itemWarp {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px 0;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
  }

  .is-active {
    color: #fa436a;
    // border: 1px solid #ddd;
    // border-radius: 0 0 50% 50%;
    // border-top: none;
  }

  .itemWarp span {
    font-size: 28px;
    line-height: 1;
  }
</style>