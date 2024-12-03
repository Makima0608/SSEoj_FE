<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <layoutNav />
    <div>我是问题界面 {{ param }}</div>
    <div class="wrapper">
        <div class="content">11</div>
        <div class="codeblock">
            <div class="header">
                <el-upload :show-file-list="false" @change="handleFileChange" :limit="1" :on-exceed="handleExceed"
                    :before-upload="beforeFileUpload" :action="''">上传文件</el-upload>
                <el-select v-model="langOption" @change="toggleLanguage()">
                    <el-option v-for="item in languageList" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <el-divider />
            <CodeMirror ref="codeMirror" class="codeMirror"></CodeMirror>
        </div>

    </div>

</template>

<script setup>
import layoutNav from '@/views/Layout/components/layoutNav.vue'
import { useRoute } from 'vue-router';
import CodeMirror from './components/codemirror.vue';
import { useLanguageStore } from '@/stores/basicSetupStore';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';


const param = useRoute().params
const languageStore = useLanguageStore()
const languageList = languageStore.languageList
const langOption = ref('C++')
const codeMirror = ref(null)


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
    width: 85%;
    margin-bottom: 20px;
    min-width: 800px;
    min-height: 600px;
}

.content {
    min-width: 400px;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.4);
    margin-right: 40px;
    border-radius: 10px;

}

.codeblock {
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.4);
    width: 100%;
    border-radius: 10px;
}

.codeMirror {
    width: 700px;
    height: 450px;
    overflow-y: auto;
    margin: auto;
}


.header {
    margin: 10px 0px 10px 20px;
    width: 30%;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 5px; */
}

</style>