<template>
    <layoutNav />
    <div class="wrapper">

        <div class="header">
            <div>题单类型：</div>
            <el-select
                v-model="type"
                placeholder="Select"
                size="middle"
                style="width: 150px"
            >
                <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <button>创建</button>
        </div>
        <div class="profile">
            <div class="node">题单名称：</div>
            <input class="title" type="text" placeholder="请输入标题" v-model="title">
            <div class="node">题单简介：</div>
            <div style="margin: 0px 0px 30px auto; width: 90%;">
                <FEditor />
            </div>
            
        </div>
        <div class="autoComplete">
            <div>添加题目：</div>
            <el-autocomplete
                v-model="keyword"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入题目编号或名称"
                clearable=true
                @select="handleSelect"   
            >
                <template #default="{ item }">
                    <span>{{ item.id }}.{{ item.name }}</span>
                </template>
            </el-autocomplete>
        </div>

        <el-table :data="problems" stripe :row-style="{ height: '70px' }">
            <el-table-column prop="id" label="编号" width="100" />
            <el-table-column prop="name" label="题目名称" />
            <el-table-column label="标签">
                <template #default="scope">
                    <span v-for="tagId in scope.row.tags" :key="tagId">{{ tagsStore.idToTag(tagId) + " "
                        }}</span>
                </template>
            </el-table-column>
            <el-table-column label="通过率" width="80">
                    <template #default="scope">
                        <span>{{ getRatio(scope.row.pass_count, scope.row.attempt_count)
                        }}</span>
                    </template>
            </el-table-column>
            <el-table-column label="难度" width="80">
                    <template #default="scope">
                        <span :style="{ color: getDifficultColor(scope.row.difficulty) }">Lv.{{
                        scope.row.difficulty }}</span>
                    </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" min-width="80">
                <template #default="scope">
                    <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="deleteRow(scope.$index)"
                    >
                    Remove
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from 'vue';
import layoutNav from '../Layout/components/layoutNav.vue';
import { getProblemSetAPI } from '@/apis/problemset';
import { useTagsStore } from '@/stores/tagsStore';
import { getDifficultColor } from '@/utils/color';
import FEditor from '@/components/FEditor.vue';
import { getRatio } from '@/utils/data_calculate';
  
const tagsStore = useTagsStore()

const type = ref(true)
const title = ref('')
const problems = ref([])
const keyword = ref('')

const querySearchAsync = async(queryString, cb) => {
    const res = await getProblemSetAPI({keyword: queryString})
    cb(res.data.problems)
}

const handleSelect = (item) => {
    problems.value.push(item)
    keyword.value = ''
}

const deleteRow = (index) => {
    problems.value.splice(index, 1)
}

const selectOptions = [
    {
        label: '公开',
        value: true
    }, 
    {
        label: '私有',
        value: false
    }
]

onMounted(async() => {
    await tagsStore.getTags()
}) 
</script>

<style scoped>
.wrapper {
    width: 80%;
    margin: 30px auto 0px auto;
}
.autoComplete {
    display: flex;
    align-items: center;
    width: 400px;
    margin-bottom: 20px;
}
.autoComplete div{
    width: 150px;
}

.header {
    display: flex;
    justify-content: flex-end;
}
.header button {
    width: 100px;
    height: 30px;
    border-radius: 6px;
    background-color: #008080;
    cursor: pointer;
    border: none;
    color: #FFFFFF;
    font-size: 14px;
    transition: .2s;
    margin-left: 30px;
}
.header button:hover{
    background-color: #009999;
}

.profile {
    border-bottom: 1px solid black;
    padding-bottom: 40px;
    margin-bottom: 40px;
}
.node {
    font-size: 20px;
    border-left: 3px solid #CDCDCD;
    padding-left: 10px;
    margin-bottom: 20px;
}

.title {
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(33, 33, 33, 0.4);
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    margin: 0px 0px 30px auto;
    width: 90%;
}
</style>