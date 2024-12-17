<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <layoutNav />

    <div class="wrapper">

        <!-- 左板块 -->
        <div class="left-panel" :style="{ width: leftPaneWidth + 'px', minWidth:'400px'}">
            <div class="tags">
                <div v-for="(tag, index) in tags" :key="index" class="tag" :class="{ active: selectedTag === tag }"
                    @click="selectTag(index)">
                    {{ tag }}
                </div>
            </div>
        <el-scrollbar class="content">
            <div >
                <router-view></router-view>
            </div>
        </el-scrollbar>
        </div>

        <div class="resizer" @mousedown="onMouseDown"></div>

        <!-- 右板块 -->
        <div class="right-panel">
            <div class="right-header">
                <el-upload :show-file-list="false" @change="handleFileChange" :limit="1" :on-exceed="handleExceed"
                    :before-upload="beforeFileUpload" :action="''">
                    <span class="iconfont icon-tianjiawenjian"></span>
                </el-upload>

                <el-select v-model="langOption" @change="toggleLanguage()">
                    <el-option v-for="item in languageList" :key="item" :label="item" :value="item" class="option" />
                </el-select>
            </div>
            <el-divider style="border-top: 0px;" />
            <el-scrollbar class="editor">
                <CodeMirror ref="codeMirror" class="codeMirror"></CodeMirror>
            </el-scrollbar>
            <el-divider />
            <div class="right-footer">
                <button>测试</button>
                <button>提交</button>
            </div>
        </div>

    </div>

</template>

<script setup>
import layoutNav from '@/views/Layout/components/layoutNav.vue'
import CodeMirror from './components/codemirror.vue';
import { useLanguageStore } from '@/stores/basicSetupStore';
import { onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import '@/assets/icon/iconfont.css'
import { useRouter, useRoute } from 'vue-router';

const leftPaneWidth = ref(500)
const isDragging = ref(false);
const initialMouseX = ref(0);
const initialLeftPanelWidth = ref(0);

const onMouseDown = (e) => {
    isDragging.value = true
    initialMouseX.value = e.clientX
    initialLeftPanelWidth.value = leftPaneWidth.value
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none';

    // 添加鼠标移动和鼠标松开事件监听器
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}

const onMouseMove = (e) => {
    if (isDragging.value) {
        const deltaX = e.clientX - initialMouseX.value
        leftPaneWidth.value = initialLeftPanelWidth.value + deltaX
    }
}

const onMouseUp = () => {
    isDragging.value = false
    document.body.style.userSelect = 'auto'
    document.body.style.webkitUserSelect = 'auto';
    // 移除事件监听器
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
}


const route = useRoute()
const router = useRouter()
const params = route.params
const id = params.id;
const languageStore = useLanguageStore()
const languageList = languageStore.languageList
const codeMirror = ref(null)

const tags = ['题目描述', '题解', '提交记录'];
const selectedTag = ref(tags[0]);
const selectTag = (index) => {
    selectedTag.value = tags[index];
    switch (index) {
        case 0:
            router.push(`/problem/${id}/description`)
            break
        case 1:
            router.push(`/problem/${id}/solutions`)
            break
        case 2:
            router.push(`/problem/${id}/submissions`)
            break
    }

};

const langOption = ref('C++')
const toggleLanguage = () => {
    codeMirror.value.toggleLanguage(langOption.value)
}


// 处理上传多个文件
const handleExceed = () => {
    ElMessage.warning('please choose one file')
}

// 阻止文件上传到服务器
const beforeFileUpload = () => {
    return false
}

// 处理上传文件
const handleFileChange = (fileList) => {
    const file = fileList.raw;
    if (!file) {
        ElMessage.error('请选择文件')
        return
    }

    const reader = new FileReader()
    reader.onload = () => {
        const fileContent = reader.result
        codeMirror.value.uploadCode(fileContent)
    }
    reader.readAsText(file);
}

// 处理应该激活的标签
const initActiveTags = () => {
    const currentPath = router.currentRoute.value.path
    const match = currentPath.match(new RegExp(`^/problem/(\\d+)/(\\w+)`))
    switch (match[2]) {
        case 'description':
            selectedTag.value = tags[0]
            break
        case 'solutions':
            selectedTag.value = tags[1]
            break
        case 'submissions':
            selectedTag.value = tags[2]
            break
    }
}

onMounted(() => {
    initActiveTags()
})

watch(
    () => route.path,
    initActiveTags
)

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 90%;
    height: calc(100vh - 140px);
    min-width: 800px;
    min-height: 500px;
    align-items: center
}

.left-panel {
    position: relative;
    display: flex;
    flex-direction: row;
    /* margin-right: 10px; */
    height: 100%;
    /* height: calc(100vh - 160px); */
}

.content {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    overflow: auto;
    padding: 15px;
    width: 100%;
    z-index: 100;
    background-color: white;
    height: 100%;
}

.tags {
    position: pos;
    display: flex;
    flex-direction: column;
    transform: translate(2px, 40px);
    height: 300px;
}

.tag {
    position: relative;
    /* width: 60px; */
    white-space: nowrap;
    padding: 15px 10px;
    font-size: 14px;
    text-align: center;
    background-color: #FFF;
    border: 1px #B5B5BE solid;
    margin-bottom: 8px;
    cursor: pointer;
    border-radius: 10px 0 0 10px;
    transition: background-color 0.2s;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    z-index: 10;
}

.tag.active {
    background-color: #6C6C6D;
    color: white;
}


.right-panel {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    flex: 1;
    border-radius: 10px;
    height: 100%;
    /* height: calc(100vh - 160px); */
}

.right-panel .el-divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

.editor {
    position: relative;
    min-width: 400px;
    height: calc(100vh - 300px);
    /* overflow-y: auto; */
    margin-left: 10px;
    margin-right: 10px;
}


.right-header {
    padding: 10px 0px 10px 20px;
    gap: 10px;
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;
    justify-content: space-between;
    align-items: center;
    background-color: #E6E6E6;
    /* margin-bottom: 5px; */
    height: 50px;
}

.right-header .el-select {
    max-width: 80px;
    --el-border-radius-base: 8px;
    margin-right: 20px;
    --el-input-text-color: black;
}

.icon-tianjiawenjian {
    font-size: 20px
}

.resizer {
    background-color: #888;
    width: 4px;
    margin: 0 5px;
    cursor: ew-resize; /* 设置光标为左右拖动形状 */
    height: 60px;
    z-index: 1;
    border-radius: 6px;
}

.resizer:hover {
    height: 100%;
    margin: 0 5px;
    width: 4px;
    background-color: blue;
}

.right-footer {
    flex: 1;
    width: 100%;
}
</style>