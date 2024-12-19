<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="searchHeader">
        <div class="searchBar">
            <input type="text" class="input" v-model="keyword">
            <span class="iconfont icon-sousuo" @click="search"></span>
        </div>
        <div class="tagBtn">
            标签
            <div v-if="selectedTag.length" class="tagNum">{{ selectedTag.length }}</div>
        </div>
        <div class="postSolutionBtn" @click="postSolution">发布题解</div>
    </div>
    <div v-if="isPageReady">
        <el-scrollbar>
            <ul v-infinite-scroll="loadSolutions" class="solutionList" :infinite-scroll-disabled="disabled"
                ref="infiniteScrollRef">
                <li v-for="(item, index) in solutions" :key="index">
                    <div class="solution-item">
                        <div class="title">
                            <span>{{ item.title }}</span>
                            <span>{{ item.create_time }}</span>
                        </div>
                        <div class="userInfo" @click="jumpToUser(item.user_info.id)">
                            <el-avatar :size="25" style="font-size: 12px;">KL</el-avatar>
                            <span>{{ item.user_info.username }}</span>
                        </div>
                        <div class="sol-content">
                            {{ item.content }}
                        </div>
                        <div class="tagBar">
                            <el-tag v-for="tagId in item.tags" :key="tagId" color="#EAEAEA" :disable-transitions="true"
                                type="info">{{ tagStore.idToTag(tagId) }}</el-tag>
                        </div>
                        <div class="footer">
                            <span :class="item.is_good ? 'iconfont icon-BxsLike' : 'iconfont icon-BxLike'"
                                @click="toggleLike(item)"></span>
                            <span>{{ transNum(item.like_count) }}</span>
                            <span class="iconfont icon-comment"></span>
                            <span>{{ item.comment_count }}</span>
                        </div>
                    </div>
                    <el-divider />
                </li>
                <p v-if="isLoading">Loading ...</p>
                <p v-if="noMore">No More</p>
            </ul>
        </el-scrollbar>
    </div>

</template>

<script setup>
import { onMounted, ref, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSolutionListAPI } from '@/apis/problem';
import { useTagsStore } from '@/stores/tagsStore';
import { transNum } from '@/utils/data_calculate';

const infiniteScrollRef = ref(null)
const isLoading = ref(false)
const noMore = computed(() => solutions.value.length >= count.value)
const disabled = computed(() => isLoading.value || noMore.value)

const isPageReady = ref(false)

const route = useRoute()
const router = useRouter()
const id = route.params.id
const reqData = ref({
    page: 1,
    page_size: 20,
    sort_type: 'timeAsc',
    keyword: null,
    tags: null
})

const solutions = ref([])
const tagList = ref([])
const count = ref(0)  //题解数

const selectedTag = ref([1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
const keyword = ref('')

const tagStore = useTagsStore()


// 获取题解列表
const getSolutionList = async () => {
    const res = await getSolutionListAPI(id, reqData.value)
    console.log('end 1')
    solutions.value = res.data.solutions
    tagList.value = res.data.taglist
    count.value = res.data.count
}

const search = async () => {
    isPageReady.value = false
    reqData.value.keyword = keyword.value
    reqData.value.page = 1
    await getSolutionList(id, reqData.value)
    isPageReady.value = true
}

const loadSolutions = async () => {
    isLoading.value = true
    reqData.value.page++
    // console.log(`load data..... ${reqData.value.page}`)
    const res = await getSolutionListAPI(id, reqData.value)
    count.value = res.data.count
    tagList.value = res.data.taglist
    setTimeout(() => {
        isLoading.value = false
        solutions.value = [...solutions.value, ...res.data.solutions]
    }, 1000)
}

const jumpToUser = (id) => {
    console.log(id)
    const userWindow = window.open('', '_blank')
    const userProfileUrl = router.resolve({ path: `/user/${id}` }).href
    console.log(userProfileUrl)
    userWindow.location.href = userProfileUrl
}

const toggleLike = (item) => {
    item.like_count += item.is_good ? -1 : 1
    item.is_good = !item.is_good
}

const postSolution = () => {
    nextTick(() => {
        infiniteScrollRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    })
    console.log('click')
}

onMounted(async () => {
    await getSolutionList(id, reqData.value)
    await tagStore.getTags()
    isPageReady.value = true
})
</script>


<style scope>
/*
顶部的搜索栏，标签按钮以及发布题解按钮
*/
.searchHeader {
    display: flex;
    flex-direction: row;
    padding: 0px 0px 10px 0px;
    min-height: 50px;
    gap: 10px;
    position: relative;
    z-index: 1000;
    background-color: white;
    width: 100%;
    border-bottom: 1px solid #777676;
}

.searchBar {
    display: flex;
    border: 1px solid #BBBBBB;
    border-radius: 10px;
    overflow: auto;
    flex: 1;
    gap: 5px;
    align-items: center;
    justify-items: center;
    padding-right: 10px;
}

.searchBar:hover {
    border: 1.1px solid #282727;
}

.input {
    margin: 0;
    padding: 0px 8px;
    font-size: 16px;
    /* background-color: blue; */
    flex: 1 1 0;
    border: none;
    outline: none;
    height: 100%;
    min-width: 10px;
}

.tagBtn {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    gap: 6px;
    border: 1px solid #BBBBBB;
    border-radius: 10px;
    padding: 0px 8px;
    font-size: 16px;
}

.tagNum {
    border: 1px solid #777676;
    border-radius: 8px;
    padding: 1px 4px;
    font-size: 14px;
    color: black;
}

.postSolutionBtn {
    display: flex;
    background-color: #008080;
    color: #FFFFFF;
    font-size: 16px;
    border-radius: 10px;
    justify-items: center;
    align-items: center;
    padding: 0px 13px;
}

.searchBar .icon-sousuo:hover {
    cursor: pointer;
}

.title {
    margin-bottom: 10px;
}

.title span:last-of-type {
    color: #BBBBBB;
    font-size: 12px;
}

.title span:first-of-type {
    font-weight: bold;
    margin-right: 10px;
}

.userInfo {
    display: flex;
    font-size: 14px;
    align-items: center;
    margin-bottom: 6px;
}

.userInfo .el-avatar {
    margin-right: 6px;
}

.userInfo:hover {
    cursor: pointer;
}

.sol-content {
    position: relative;
    margin-bottom: 11px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px;
    width: 100%;
    padding-left: 20px;
}

.tagBar {
    padding-left: 20px;
    margin-bottom: 8px;
}


.solutionList {
    position: relative;
    padding-top: 10px;
    width: 100%;
    z-index: 100;
    height: calc(100vh - 280px);
    overflow: auto;
    /* width: 300px; */
}



.solutionList li {
    list-style: none;
}

.solutionList .solution-item {
    height: 140px;
}

.el-divider {
    margin: 15px 0px 15px 0px;
}

.footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
}

.icon-BxLike,
.icon-BxsLike,
.icon-comment {
    font-size: 20px;
    margin-right: 6px;
}

.icon-BxLike+span,
.icon-BxsLike+span,
.icon-comment+span {
    font-size: 16px;
    margin-right: 20px;
}
</style>
