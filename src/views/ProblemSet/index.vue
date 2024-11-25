<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="wrapper">
        <div class="container">
            <div class="filter">
                <!-- <div class="search-box" ref="searchBoxRef" @click="changeWidth">    
                    <div class="icon"></div>
                    <div class="textInput">
                        <input type="text" placeholder="search something...">
                        <div class="clear"> </div>
                    </div>
                </div> -->
            </div>
            <div class="problemset">
                <div class="table">
                    <el-table :data="problemset" stripe :row-style="{ height: '70px' }">
                        <el-table-column prop="status" label="Status" width="80" />
                        <el-table-column prop="problem_id" label="Id" width="120" />
                        <el-table-column prop="problem_name" label="Name" />
                        <el-table-column prop="tags" label="Tags" />
                        <el-table-column prop="pass_rate" label="PassRate" />
                        <el-table-column label="Difficulty">
                            <template #default="scope">
                                <span :style="{ color: getDifficultColor(scope.row.difficulty) }">Lv.{{
                                    scope.row.difficulty }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination layout="prev, pager, next, jumper" v-model:current-page="currentPage" :total="total"
                        :background="true" :page-size="pageSize" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getProblemAPI } from '@/apis/problemset'
import { getDifficultColor } from '@/utils/color';

const problemset = ref([])
const total = ref(100)
const currentPage = ref(1)
const pageSize = ref(50)

const getProblemSet = async () => {
    const res = await getProblemAPI()
    console.log(res)
    total.value = res.data.total
    problemset.value = res.data.problems
}

onMounted(() => {
    getProblemSet()
})

const searchBoxRef = ref(null)
const changeWidth = () => {
    searchBoxRef.value.style.width = '300px'
    console.log(11)
}


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
}
/* .search-box{
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
    border: 1px solid #bbb;
    position: relative;
    overflow: hidden;
    margin: 10px auto;
    transition: .5s;
}
.textInput{
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    left: 40px;
    position: absolute;
}

.textInput input{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;

} */

.problemset {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 99%;
    padding:0px auto;
}

.table {
    margin-bottom: 20px;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding: 20px 20px 30px 20px;
    position: relative;
}
.el-table{
    width: 99%;
}

.pagination {
    align-self: flex-end;
}
</style>