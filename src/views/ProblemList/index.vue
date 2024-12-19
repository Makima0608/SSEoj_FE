<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="wrapper">
        <div class="container">
            <div class="filter">
                <div class="search-box" :style="isSearchActive" ref="searchBoxRef" @click="toggleSearchBox">
                    <span class="iconfont icon-sousuo"></span>
                    <span class="filter-text">搜索</span>
                    <input class="searchInput" type="text" style="display: none;" placeholder="search something..."
                        v-model="keyword" @keydown.enter="console.log('search', keyword)" />
                    <!-- </div> -->
                </div>
                <div class="diff-Filter">
                    <div class="diff-Circle"></div>
                    <span class="filter-text">难度</span>
                </div>
                <div class="alo-Filter">
                    <div class="tagNum">{{ selectedTag.length }}</div>
                    <span class="filter-text">算法</span>
                </div>
            </div>

            <div class="problemlist">
                <div v-for="plistItem in problemlistStore.problemlist" :key="plistItem.id" class="problemist-item">
                    {{ plistItem.id }}
                </div>
                <div class="pagination">
                    <el-pagination layout="prev, pager, next, jumper" v-model:current-page="currentPage"
                        :total="problemlistStore.count" :background="true" :page-size="pageSize"
                        @current-change="handleCurrentChange" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useProblemlistStore } from '@/stores/problemlistStore';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter()
const problemlistStore = useProblemlistStore()

// 筛选参数
const currentPage = ref(1)
const pageSize = ref(30)
const keyword = ref(undefined)
const sort_type = ref(undefined)

const params = computed(() => ({
    page_num: currentPage.value || 1,
    page_size: pageSize.value || 30,
    keyword: keyword.value || undefined,
    sort_type: sort_type.value || "idAsc"
}))

// filter 部分代码
const searchBoxRef = ref(null)
const selectedTag = ref([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
const isSearchActive = ref({})

const toggleSearchBox = () => {

    isSearchActive.value = {
        'width': '300px',
        'box-shadow': '0px 2px 6px 0px rgba(0,0,0,0.4)'
    }
    const spanRef = searchBoxRef.value.children[1]
    spanRef.style.display = 'none'
    const inputRef = searchBoxRef.value.children[2]
    inputRef.style.width = '260px'
    inputRef.style.display = 'inline'
    setTimeout(() => {
        inputRef.focus()
    }, 500)
}

const handleOutSideClick = (e) => {
    if (searchBoxRef.value && !searchBoxRef.value.contains(e.target)) {
        isSearchActive.value = {
            'width': '110px',
            'box-shadow': 'none'
        }
        const spanRef = searchBoxRef.value.children[1]
        spanRef.style.display = 'inline'
        const inputRef = searchBoxRef.value.children[2]
        inputRef.style.width = '60px'
        inputRef.style.display = 'none'
    }
}

document.addEventListener('click', handleOutSideClick)

const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    console.log(params.value);
    problemlistStore.getProblemList(params.value)
}

const rowSelected = (row) => {
    router.replace(`/problem/${row.problem_id}/description`)
}

onMounted(async() => {
    console.log(params.value)
    await problemlistStore.getProblemList(params.value)
    // console.log(problemlistStore.problemlist)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutSideClick)
})

</script>

<style scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    width: 85%;
    margin-bottom: 20px;
    min-width: 800px;
}

.container {
    display: flex;
    margin-bottom: 20px;
    padding: 0px auto;
    box-sizing: border-box;
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
    position: relative;
}

.problemlist {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.problemlist .problemist-item {
    margin-bottom: 20px;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2);
    height: 60px;
    border-radius: 10px;
    transition: .5s;
}

.problemlist .problemist-item:hover{
    transform: translateY(-5px);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.4);
}

</style>