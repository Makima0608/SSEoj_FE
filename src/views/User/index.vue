<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="container">
    <!-- 左面板 -->
    <div class="left-panel" :style="{ width: leftPanelWidth + 'px' }">
      左面板
    </div>

    <!-- 可拖动的分隔条 -->
    <div class="resizer" @mousedown="onMouseDown"></div>

    <!-- 右面板 -->
    <div class="right-panel" :style="{ width: rightPanelWidth + 'px' }">
      右面板dsjakldhjkslahkl
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const leftPanelWidth = ref(300); // 左面板初始宽度
// const rightPanelWidth = ref(600); 
const isDragging = ref(false); // 是否正在拖动
const initialMouseX = ref(0); // 初始鼠标横坐标
const initialLeftPanelWidth = ref(0); // 初始左面板宽度

// 鼠标按下事件
const onMouseDown = (e) => {
  isDragging.value = true;
  initialMouseX.value = e.clientX; // 获取鼠标初始位置
  initialLeftPanelWidth.value = leftPanelWidth.value; // 获取左面板的初始宽度

  // 添加鼠标移动和鼠标松开事件监听器
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

// 鼠标移动事件
const onMouseMove = (e) => {
  if (isDragging.value) {
    const deltaX = e.clientX - initialMouseX.value; // 计算鼠标移动的距离
    leftPanelWidth.value = initialLeftPanelWidth.value + deltaX; // 更新左面板的宽度
    // rightPanelWidth.value = window.innerWidth - leftPanelWidth.value - 50; 
  }
};

// 鼠标松开事件
const onMouseUp = () => {
  isDragging.value = false;
  // 移除事件监听器
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.left-panel {
  background-color: lightblue;
  height: 100%;
  /* transition: width 0.2s;  */
}

.right-panel {
  background-color: lightgreen;
  height: 100%;
  flex: 1;
  /* transition: width 0.2s; */
}

.resizer {
  background-color: #888;
  width: 10px;
  cursor: ew-resize; /* 设置光标为左右拖动形状 */
  height: 100%;
  user-select: none; /* 禁止选中文字 */
}
</style>
