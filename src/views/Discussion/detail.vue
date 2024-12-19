<template>
  <layoutNav />
  <div class="wrapper">
    <div class="containerLeft">
      <div class="information">
        <div class="authorContainer">
          <label>作者</label>
          <img :src="avatar"  class="avatar" />
          <p class="authorName">{{ authorName }}</p>
        </div>
        <div class="timeContainer">
          <label>发布时间</label>
          <p>{{ postTime }}</p>
        </div>
        <el-button type="info" plain class="replyBtn">回复贴主</el-button>
      </div>
    </div>

    <div class="containerRight">
      <div class="postContainer">
        <!-- 标题 -->
        <div class="titleContainer">
          <label>{{ postTitle }}</label>
        </div>

        <!-- 内容容器 -->
        <div class="contentContainer">
          <!-- 使用 v-html 来渲染 HTML 内容 -->
          <p v-html="formattedPostContent"></p>
        </div>
      </div>
        <!--评论容器-->
      <div class="commentsContainer">

      </div>
    </div>

  </div>
</template>

<script setup>
import layoutNav from '@/views/Layout/components/layoutNav.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePostStore } from '@/stores/postStore';

const route = useRoute()
const router = useRouter()
const params = route.params
const id = params.id;
const postStore= usePostStore();
// 模拟 API 数据
const authorName = ref('haha');
const postTime=ref("2024/12/2");
const avatar = ref('');
const postTitle = ref("示例帖子标题");
const postContent = ref("这是一些示例内容。你可以添加更多文字来测试 contentContainer 的高度自动调整。");
// 格式化 postContent
const formattedPostContent = ref('');

// 你可以在实际应用中替换为真实的 API 请求
onMounted(async () => {
  await postStore.getPost(id);  // 等待 API 请求完成

  // 直接从 postStore.post 中提取数据
  postTitle.value = postStore.post.post_title;  // 获取标题
  postContent.value = postStore.post.post_content;  // 获取内容
  postTime.value = postStore.post.create_time;  // 获取发布时间
  avatar.value = postStore.post.avatar;  // 获取头像
  authorName.value = postStore.post.name;  // 获取作者名

  // 将 \n 替换为 <br>，以实现换行
  formattedPostContent.value = postContent.value.replace(/\n/g, '<br>');
});

</script>

<style scoped>
/* 外层容器 */
.wrapper {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  width: 85%;
  margin: auto;
  min-width: 800px;
  margin-bottom: 20px;
}

.containerLeft{
  min-width: 240px;
  display: flex;
  padding: 0px auto;
  box-sizing: border-box;
  background: black;
  margin-right: 20px;
}

/* 右边容器 */
.containerRight {
  display: flex;
  flex-direction: column;
  padding: 0px auto;
  box-sizing: border-box;
  width: 99%;
  margin: auto;
}

.information {
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  min-width: 240px;
  height: 230px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  flex-shrink: 1;
}

.authorContainer {
  display: flex;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

.authorContainer label{
  display: flex;
  font-size: 15px;
  font-weight: bold;
  margin: auto;
  margin-left: 0px;
}

.authorContainer img {
  margin: auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

}

.authorName{
  min-width: 60px;
  text-align: left;
  color:grey;
  font-weight: bold;
}

.timeContainer {
  display: flex;
  padding: 5px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;

}

.timeContainer label{
  display: flex;
  font-size: 15px;
  font-weight: bold;
  margin: auto;
  margin-left: 0px;
}

.timeContainer p{
  min-width: 60px;
  text-align: center;
  color:grey;
  font-weight: bold;
}

.replyBtn{
  display: flex;
  margin-top:30px;
  margin-right: 20px;
  width:40%;
  align-self: flex-end;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
}

/* 帖子容器 */
.postContainer {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 50px;
  background: transparent;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  align-items: flex-start; /* 内容左对齐 */
}

/* 标题容器 */
.titleContainer {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* 内容容器 */
.contentContainer {
  background-color: rgb(240, 240, 240); /* 背景为黑色 */
  color: black; /* 文字颜色为白色 */
  padding: 15px;
  /* padding-top:5px; */
  border-radius: 6px;
  width: 100%; /* 自适应父容器的宽度 */
  box-sizing: border-box; /* 保证 padding 不影响宽度 */
  overflow-wrap: break-word; /* 确保长文本能自动换行 */
  word-wrap: break-word;
  margin-bottom: 20px;
}

/* 评论区容器 */
.commentsContainer {

  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 20px; /* 添加一定的上边距，确保与 postContainer 分开 */
}

</style>
