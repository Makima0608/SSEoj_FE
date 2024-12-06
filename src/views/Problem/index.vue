<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <layoutNav />
    <div class="wrapper">
        <div class="pane-left">
            <div class="tags">
                <div v-for="(tag, index) in tags" :key="index" class="tag" :class="{ active: selectedTag === tag }"
                    @click="selectTag(index)">
                    {{ tag }}
                </div>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>

        <div class="pane-right">
            <div class="header">
                <el-upload :show-file-list="false" @change="handleFileChange" :limit="1" :on-exceed="handleExceed"
                    :before-upload="beforeFileUpload" :action="''">
                    <span class="iconfont icon-tianjiawenjian"></span>
                </el-upload>
                <el-select v-model="langOption" @change="toggleLanguage()">
                    <el-option v-for="item in languageList" :key="item" :label="item" :value="item" class="option"/>
                </el-select>
            </div>
            <el-divider style="border-top: 0px;"/>
            <div class="editor">
                <CodeMirror ref="codeMirror" class="codeMirror"></CodeMirror>
            </div>
            <el-divider />
            <button>提交</button>
        </div>

    </div>

</template>

<script setup>
import layoutNav from '@/views/Layout/components/layoutNav.vue'
import CodeMirror from './components/codemirror.vue';
import { useLanguageStore } from '@/stores/basicSetupStore';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import '@/assets/icon/iconfont.css'
import { useRouter, useRoute } from 'vue-router';

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

</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 90%;
    max-height: calc(100vh - 180px);
    min-width: 800px;
    min-height: 500px;
}

.pane-left {
    display: flex;
    flex-direction: row;
    /* height: 650px; */
    /* height: 100vh; */
}

.tags {
    display: flex;
    flex-direction: column;
    /* margin-right: 20px; */
    transform: translateY(40px);
}

.tag {
    width: 60px;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    background-color: #f0f0f0;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: 6px 0 0 6px;
    transition: background-color 0.3s;
}

.tag.active {
    background-color: #6C6C6D;
    color: white;
}

.content {
    min-width: 200px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
    margin-right: 15px;
    border-radius: 10px;
    overflow: auto;
    padding: 20px;
}

.pane-right {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    width: 100%;
    border-radius: 10px;
    overflow: auto;
    /* height: 650px */
}

.pane-right .el-divider{
    margin-top: 10px;
    margin-bottom: 10px;
}

.editor {
    width: 700px;
    height: 450px;
    /* overflow-y: auto; */
    margin: auto;
}


.header {
    padding: 10px 0px 10px 20px;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #E6E6E6;
    /* margin-bottom: 5px; */
}

.header .el-select{
    max-width: 80px;
    --el-border-radius-base: 8px;
    margin-right: 20px;
    --el-input-text-color: black;
}

.icon-tianjiawenjian {
    font-size: 20px
}
</style>