<template>
    <layoutNav />
    <div class="solution-header">
        <span>问题信息</span>
        <button @click="postSolution">发布题解</button>
    </div>
    <div class="solution-title">
        <input type="text" placeholder="请输入标题" v-model="title">
        <div class="tag-list">
            <el-tag v-for="tag in selectedTag" :key="tag" closable :disable-transitions="false" type="info" @close="handleClose(tag)" >
                {{ tag }}
            </el-tag>
            <el-autocomplete v-if="inputVisible" :fetch-suggestions="tagSearch" v-model="tagKey"
                :trigger-on-focus="false" @select="handleSelect" @blur="exitInput" ref="autoCompleteRef" style="width: 80px; margin-bottom: 10px;" class="autoComplete">
            </el-autocomplete>
            <button v-else class="addTagBtn" @click="showInput">+ 添加标签</button>
        </div>
    </div>
    {{ allTags }}
    <TEditor class="solution-editor" ref="TEditorRef">
        <template #default="{ item }">
            {{ item }}
        </template>
    </TEditor>
</template>

<script setup>
import '@/assets/base-el-tag.css'
import layoutNav from '../Layout/components/layoutNav.vue';
import { onMounted, ref, nextTick } from 'vue';
import { useTagsStore } from '@/stores/tagsStore';

const tagsStore = useTagsStore()
const title = ref("")
const selectedTag = ref(['tag1', 'tag2', 'tag3'])
const allTags = ref()
const tagKey = ref("")
const TEditorRef = ref(null)
const inputVisible = ref(false)
const autoCompleteRef = ref(null)

const postSolution = () => {
    console.log(TEditorRef.value.handleGetContent());
}

const createFilter = (queryString) => {
    return (tag) => {
        return tag.includes(queryString)
    }
}
const tagSearch = (queryString, cb) => {
    const results = queryString
        ? allTags.value.filter(createFilter(queryString))
        : allTags.value
    console.log(results)
    const suggestions = results.map(item => ({ value: item }))
    cb(suggestions)
}

const exitInput = () => {
    inputVisible.value = false
}

const handleSelect = (item) => {
    if (item) {
        selectedTag.value.push(item.value)
    }
    inputVisible.value = false
    tagKey.value = ""
}

const handleClose = (tag) => {
    selectedTag.value.splice(selectedTag.value.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        autoCompleteRef.value.focus()
    })
}


onMounted(async () => {
    await tagsStore.getTags()
    // console.log(tagsStore.idToTags)
    allTags.value = Object.keys(tagsStore.tagsToID)
})
</script>

<style scoped>
.solution-header {
    width: 85%;
    margin: 20px auto 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.solution-header button {
    width: 80px;
    height: 50px;
}

.solution-header span {
    font-size: 20px;
}

.solution-title {
    width: 85%;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.4);
    overflow: auto;
    display: flex;
    flex-direction: column;
    /* flex-direction: column;*/
    /* align-items: center; */
    /*justify-content: center; */
    padding: 40px 0px;
}

.solution-title input {
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(33, 33, 33, 0.4);
    width: 95%;
    font-size: 25px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
}

.tag-list {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 95%;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-wrap: wrap;
    line-height: 10px;
}

.tag-list .el-tag,
.autoComplete,
.tag-list button {
    margin-bottom: 10px;
}
.autoComplete {
    width: 10px;
}

.tag-list button {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.4);
}

::v-deep .autoComplete .el-input {
    height: 24px;
    font-size: 12px;
}
::v-deep .autoComplete .el-input__inner {
    height: 24px;
}
.addTagBtn {
    width: 80px;
    height: 24px;
    border-radius: 5px;
}

.solution-editor {
    margin: 20px auto 0 auto;
    width: 85%;
}
</style>