<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="wrapper">
      <div class="search_container">
        <input type="text" placeholder="Search" class="search_input" />
        <i class="search_icon">🔍</i>
      </div>
      <button type="sumit" class="btn_random">随机来一题</button>
      <div class="notice-bar">
        <label class="btn_notice">NOTICE</label>
        <div class="notice-content"></div>
          <span v-for="(item, index) in notices" :key="index" class="notice-item">
            {{ item }}
          </span>
        </div>
      </div>
</template>



<script>
export default {
  name: "NoticeBar",
  props: {
    notices: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.wrapper{
  left: 8%;
  position: relative;
  width: 1380px;
  height: 250px;
  background:transparent;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items:center;
  overflow: hidden;
  transition: height .2s ease;
}

.notice-bar {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  overflow: hidden;
  white-space: nowrap;
}

.notice-content {
  display: flex;
  gap: 20px;
  animation: scroll 10s linear infinite;
}

.notice-item {
  font-size: 14px;
  color: #333;
}

@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
