<template>
    <layoutNav />
    <div class="wrapper">
        <div>
            <span class="iconfont icon-chilun" style="font-size: 25px;"></span>
            <span style="font-size: 25px; margin-left: 10px;">编辑题单</span>
        </div>
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
            <button class="btn_edit" @click="editProblemList">修改</button>
            <button class="btn_delete" @click="dialogVisible=true">删除该题单</button>
        </div>
        <div class="profile">
            <div class="node">题单名称：</div>
            <input class="title" type="text" placeholder="请输入标题" v-model="title">
            <div class="node">题单简介：</div>
            <div style="margin: 0px 0px 30px auto; width: 90%;">
                <FEditor ref="summaryRef"/>
            </div>

        </div>
        <div class="autoComplete">
            <div>添加题目：</div>
            <el-autocomplete
                v-model="keyword"
                :fetch-suggestions="querySearchAsync"
                :trigger-on-focus="false"
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
            <el-table-column fixed="right" label="Operations" width="130">
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
        <el-dialog
          v-model="dialogVisible"
          title="WARNING"
          width="500"
          :before-close="handleClose"
        >
          <span>题单会被永久删除哦...</span>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="deleteProblemList">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
    </div>

</template>

<script  setup>
import { onMounted, ref } from 'vue';
import layoutNav from '../Layout/components/layoutNav.vue';
import { getProblemSetAPI } from '@/apis/problemset';
import { useTagsStore } from '@/stores/tagsStore';
import { getDifficultColor } from '@/utils/color';
import FEditor from '@/components/FEditor.vue';
import { getRatio } from '@/utils/data_calculate';
import { editProblemListAPI, getProblemListDetailAPI,deleteProblemListAPI } from '@/apis/problemlist';
import { ElMessage,ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

const tagsStore = useTagsStore()
const router = useRouter()
const route = useRoute()
const id = route.params.id

const type = ref(true)
const title = ref('')
const problems = ref([])
let originProblems = []
const keyword = ref('')
const summaryRef = ref(null)
const dialogVisible = ref(false)

const querySearchAsync = async(queryString, cb) => {
    const res = await getProblemSetAPI({keyword: queryString})
    cb(res.data.problems)
}
// 添加题目
const handleSelect = (item) => {
    problems.value.push(item)
    keyword.value = ''
}
// 删除题目
const deleteRow = (index) => {
    problems.value.splice(index, 1)
}
// 题单类型选项
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

const editProblemList = async() => {
    if (!title.value.trim()) {
        ElMessage.warning('标题不能为空')
        return
    }
    const problem_ids = problems.value.map(item => item.id)
    const origin_ids = originProblems.map(item => item.id)
    const data = {
        name: title.value,
        summary: summaryRef.value.getContent(),
        add: problem_ids.filter(item => !origin_ids.includes(item)),
        delete: origin_ids.filter(item => !problem_ids.includes(item))
    }
    console.log(data)
    await editProblemListAPI(id, data)
    ElMessage.success('修改成功')
    router.push('/problemlist')
}

const deleteProblemList = async() => {
  await deleteProblemListAPI(id)
  ElMessage.success("删除成功")
  dialogVisible.value = false
  router.push('/problemlist')
}

const getProblemListDetail = async() => {
    const res = await getProblemListDetailAPI(id)
    console.log()
    title.value = res.data.name
    type.value = res.data.is_public
    problems.value = res.data.problems
    originProblems = [...res.data.problems]
    summaryRef.value.setContent(res.data.summary)
}
onMounted(async() => {
    await tagsStore.getTags()
    await getProblemListDetail()
})
</script>

<style scoped>
.wrapper {
    width: 80%;
    margin: 30px auto 60px auto;
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
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.btn_edit {
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
.btn_delete{
    width: 100px;
    height: 30px;
    border-radius: 6px;
    background-color: #800000;
    cursor: pointer;
    border: none;
    color: #FFFFFF;
    font-size: 14px;
    transition: .2s;
    margin-left: 30px;
}
.btn_edit:hover{
    background-color: #009999;
}

.btn_delete:hover{
    background-color: #f70c0c;
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
