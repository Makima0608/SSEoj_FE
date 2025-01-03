<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="wrapper">
    <div class="searchContainer">
      <el-input
        v-model="input4"
        style="width: 80%; height: 50%; "
        placeholder="Type something"
      >
        <template #prefix>
          <span class="iconfont icon-sousuo"></span>
        </template>
      </el-input>

      <el-radio-group v-model="searchType">
        <el-radio value="1" size="large">题目</el-radio>
        <el-radio value="2" size="large">帖子</el-radio>
      </el-radio-group>
    </div>
    <div class="mainContainer">
      <div class="wrapper_post">
        <div class="menuContainer">
          <el-menu
            :default-active="'1'"
            class="menu_main"
            mode="horizontal"
            @select="handleSelect"
            background-color="white"
            text-color="black"
            active-text-color="black"
            :ellipsis="false"
          >
            <el-menu-item index="1">热门讨论</el-menu-item>
            <el-menu-item index="2">你的关注</el-menu-item>
            <el-menu-item index="3">我的发布</el-menu-item>
          </el-menu>
        </div>

        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul
            v-infinite-scroll="postListStore.getHotPost"
            class="list"
          >
            <li
              v-for="post in postListStore.postList"
              :key="post.post_id"
              class="list-item"
              @click="goToDiscussion(post.post_id)"
            >
              <ListItemContent
                :avatar="post.avatar"
                :title="post.post_title"
                :username="post.username"
                :time="post.create_time"
                :commentCount="post.comment_count"
                :likeCount="post.like_count"
                v-model="selectedPost"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="rightContainer">
        <div class="noticeContainer">
          <label>NOTICE</label>
          <ul v-infinite-scroll="load" class="noticeBar" style="overflow: auto">
            <li v-for="noticeItem in notices" :key="noticeItem.id" class="infinite-list-item">{{ noticeItem.content }}</li>
          </ul>
        </div>
        <div class="planContainer">
          <label>SCHEDUL</label>
        </div>
      </div>

    </div>
  </div>


    <!-- <div class="wrapper_feedback">
      <label class="feedback_label">有任何问题，欢迎反馈~</label>
      <input class="feedback_input" type="text" required placeholder="here!"/>
      <el-button class="btn_feedback" type="success" plain>Submit</el-button>
    </div> -->
</template>



<script setup>
import { ref, onMounted,computed } from 'vue';
import { usePostListStore } from '@/stores/postListStore';
import ListItemContent from '../Discussion/ListItemContent.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const search_query =ref("");
const count = ref(0)
const postListStore = usePostListStore();

const currentPage = ref(1);
const pageSize = ref(30);
const sortTpye = ref("likeDesc");
const searchType = ref('1')


// 当前选中的 menu index
const activeMenuIndex = ref('1');

const router = useRouter();

// 监听菜单切换
const handleSelect = async (index) => {
  activeMenuIndex.value = index; // 更新当前选中的 menu
  postListStore.clearPostList();
  if (index == '1') {
    await postListStore.getHotPost(); // 等待数据加载
  }
  else if (index == '2') {
    await postListStore.getSubscribePost(); // 等待数据加载
  }
  else {
    await postListStore.getMyPost(); // 等待数据加载
  }
};


// NOTICE数据
const notices = ref([
  { id: 1, content: 'Notice 1' },
  { id: 2, content: 'Notice 2' },
  { id: 3, content: 'Notice 3' },
  { id: 4, content: 'Notice 4' },
  { id: 5, content: 'Notice 5' },
  { id: 6, content: 'Notice 6' },
  { id: 7, content: 'Notice 7' },
  { id: 8, content: 'Notice 8' },
  { id: 9, content: 'Notice 9' },
  { id: 10, content: 'Notice 10' }
])

const params = computed(() => ({
  page_num: currentPage.value || 1,
  page_size: pageSize.value || 30,
  sort_type: sortTpye.value || "likeDesc",
  keyword: ""
}));


const goToDiscussion = (postId) => {
  router.replace(`/discussion/${postId}`);
};


onMounted(async () => {
  postListStore.clearPostList();
  await postListStore.getHotPost(); // 等待数据加载
  count.value = postListStore.count; // 更新总数
});

</script>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  width: 85%;
  min-width: 800px;
  justify-content: space-between;
  margin: auto;
  gap:20px
}

.searchContainer{
  display: flex;
  flex-direction: column;
  margin: auto;
  width:80%;
  height: 100px;
  /* background: green; */
}

.searchContainer .el-input{
  margin: auto;
}

.searchContainer .el-radio-group{
  margin: auto;
}

.mainContainer{
  gap:10px;
  width: 100%;
  margin: auto;
  display: flex;
  margin-bottom:20px;
}


.wrapper_post{
width: 75%;
background:transparent;
border-radius: 12px;
backdrop-filter: blur(20px);
box-shadow:0 0 5px rgba(0, 0, 0, .5);
display: flex;
flex-direction: column; /* 子元素按列排列 */
align-items: center; /* 水平居中对齐 */

}

.menuContainer{
  min-height: 60px;
  display: flex;
  width: 100%;
}

.menu_main{
display: flex;
position: relative;
top: 5px;
margin-left: 70px;
margin-right: 70px;
width: 100%;
/* border-radius: 12px; */
/* border:none; */
overflow: hidden;
/* gap:25%; */
justify-content: space-between;
min-height: 60px;
}

.menu_main .el-menu-item{
/* margin-right: 25%; */
text-align:left; /* 居中显示 */
font-size:16px;      /* 可选：设置字体大小 */
}
.menu_main .el-menu-item:hover {
background-color: white;  /* 鼠标悬浮时的背景颜色 */
}
.menu_main .el-menu-item.is-active {
background-color: white;  /* 选中项的背景色 */
}


.infinite-list-wrapper {
position: relative;
margin-top: 25px; /* 与菜单之间的间距 */
margin-bottom: 25px; /* 与菜单之间的间距 */
width: 95%; /* 与 menu_main 的宽度一致 */
text-align: center;
height: 80%; /* 自动根据内容调整高度 */
}
.infinite-list-wrapper .list {
padding: 0;
margin: 0;
list-style: none;
}

.infinite-list-wrapper .list-item {
display: flex;
align-items: center;
justify-content: center;
height: 75px;
}
.infinite-list-wrapper .list-item + .list-item {
margin-top: 1px;
}

.rightContainer{
  display: flex;
  flex-direction: column;
  width: 25%;
  /* background: green; */
  height: 600px;
  gap:20px;
}

.noticeContainer{
  width: 100%;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  height: 300px;
  display: flex;
  flex-direction: column;
}

.noticeBar {
  height: 90%;
  width: 90%;
  padding: 0;
  margin: 0;
  list-style: none;
}
.noticeBar .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: left;

  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.noticeBar .infinite-list-item + .list-item {
  margin-top: 10px;
}

.noticeContainer label{
  font-weight: bold;
  font-size: larger;
  color: gray;
  margin-left: 10px;
  margin-top: 5px;
}

.planContainer{
  width: 100%;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  height: 300px;
  display: flex;
  flex-direction: column;
}

</style>
