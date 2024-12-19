<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="wrapper">
      <div class="container">
          <div class="filter">
            <el-menu
              :default-active="'1'"
              class="menu_sort"
              mode="vertical"
              @select="handleSelect"
              background-color="rgb(200, 200, 200);"
              text-color="grey"
              active-text-color="black"
              :ellipsis="false"
            >
              <el-menu-item index="1">按热度</el-menu-item>
              <el-menu-item index="2">按时间</el-menu-item>
            </el-menu>
          </div>
          <div class="postList">
            <div class="infinite-list-wrapper" style="overflow: auto">
              <ul
                v-infinite-scroll="load"
                class="list"
              >
                <li
                  v-for="post in filteredPosts"
                  :key="post.post_id"
                  class="list-item"
                  @click="goToDiscussion(post.post_id)"
                >
                  <ListItemContent
                    :avatar="post.avatar"
                    :title="post.post_title"
                    :username="post.username"
                    :time="post.time"
                    :commentCount="post.comment_count"
                    :likeCount="post.like_count"

                  />
                </li>
              </ul>
              <!-- <p v-if="loading">Loading...</p>
              <p v-if="!loading && noMore">No more</p> -->
            </div>
          </div>
      </div>
      <div class="pagination">
          <el-pagination layout="prev, pager, next, jumper" v-model:current-page="currentPage" :total="postListStore.count"
              :background="true" :page-size="pageSize" @current-change="handleCurrentChange" />
      </div>
  </div>

</template>

<script setup>
import { ref, onMounted,computed } from 'vue';
import { usePostListStore } from '@/stores/postListStore';
import ListItemContent from './ListItemContent.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';


const count = ref(0)
const loadedCount = ref(0)
const loading = ref(false)
const noMore = computed(() => loadedCount.value  >= count.value)
const disabled = computed(() => loading.value || noMore.value)

const postListStore = usePostListStore();

const currentPage = ref(1);
const pageSize = ref(30);
const router = useRouter();


const load = async () => {
  if (disabled.value) return; // 防止重复加载
  loading.value = true; // 设置加载中状态

  try {
    await postListStore.getPostList(params.value);
    loadedCount.value = postListStore.postList.length; // 更新已加载数量
    console.log(loadedCount.value);
    console.log(count.value);
    console.log(noMore.value);

  } catch (err) {
    console.error("Error loading data:", err);
  } finally {
    loading.value = false; // 加载完成后关闭加载状态
  }
};


const params = computed(() => ({
  page_num: currentPage.value || 1,
  page_size: pageSize.value || 30,
}));

// 动态过滤帖子
const filteredPosts = computed(() => {
  // // 根据 menu index 动态筛选帖子
  // if (activeMenuIndex.value === '2') {
  //   return postListStore.postList.filter(post => post.post_id === 1);
  // } else if (activeMenuIndex.value === '3') {
  //   return postListStore.postList.filter(post => post.post_id >= 3&&post.post_id<=6); // 示例
  // } else if (activeMenuIndex.value === '1') {
  //   return postListStore.postList; // 或其他逻辑
  // }
  // return [];
  return postListStore.postList;
});

const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    console.log(params.value);
    postListStore.getPostList(params.value)
}

const goToDiscussion = (postId) => {
  router.replace(`/discussion/${postId}`);
};

onMounted(async () => {
  await postListStore.getPostList(params.value); // 等待数据加载
  count.value = postListStore.count; // 更新总数
});

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    width: 85%;
    margin-bottom: 20px;
    min-width: 800px;
}

.filter {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    min-width: 150px;
    height: 200px;
    margin-right: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    flex-shrink: 1;
}

.container {
    display: flex;
    padding: 0px auto;
    box-sizing: border-box;
    margin-bottom: 20px;
}


.postList {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 99%;
    height: 700px;
    padding: 0px auto;
    margin-bottom:50px ;
    background:transparent;
    border-radius: 6px;
    backdrop-filter: blur(20px);
    box-shadow:0 0 5px rgba(0, 0, 0, .5);
    align-items: center; /* 水平居中对齐 */
}

.infinite-list-wrapper {
position: relative;
margin-top: 25px; /* 与菜单之间的间距 */
width: 95%; /* 与 menu_main 的宽度一致 */
text-align: center;
height: 90%; /* 自动根据内容调整高度 */
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

.menu_sort{
position: relative;
top: 5px;
width: 90%;
border-radius: 12px;
border:none;
overflow: hidden;
align-items: center;
justify-content: center;

}

.menu_sort .el-menu-item{
text-align: center; /* 居中显示 */
font-size:16px;      /* 可选：设置字体大小 */
font-weight: 800;
margin: auto;
}
.menu_sort .el-menu-item:hover {
background-color: white;  /* 鼠标悬浮时的背景颜色 */
}
.menu_sort .el-menu-item.is-active {
background-color: white;  /* 选中项的背景色 */
}

.pagination {
    align-self: flex-end;
}
</style>
