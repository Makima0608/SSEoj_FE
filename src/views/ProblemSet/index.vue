<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div>我是题库</div>
    <el-table :data="problemset" stripe style="width: 80%; margin: 0 auto;">
        <el-table-column prop="status" label="Status" width="80" />
        <el-table-column prop="problem_id" label="Id" width="180" />
        <el-table-column prop="problem_name" label="Name" />
        <el-table-column prop="tags" label="Tags" />
        <el-table-column prop="pass_rate" label="PassRate" />
        <el-table-column prop="difficulty" label="Difficulty" />
  </el-table>
</template>

<script setup> 
import { onMounted, ref } from 'vue';
import { getProblemAPI } from '@/apis/problemset'

    const problemset = ref([])
    const getProblemSet = async () => {
        const res = await getProblemAPI()
        console.log(res)
        problemset.value = res.data
    }

    onMounted(() => {
        getProblemSet()
    })
</script>