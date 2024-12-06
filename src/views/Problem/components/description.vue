<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="pCard">
        <div class="cardLeft">
            <div class="pId">{{ id }}</div>
            <div class="pName" :style="{'border-bottom': `3px solid ${getDifficultColor(difficulty)}`}">{{ name }}</div>
            <div class="source">题目来源：{{ source }}</div>
            <div class="difficulty">难度：<span :style="{'color': `${getDifficultColor(difficulty)}`}">Lv.{{ difficulty }}</span></div>
        </div>

        <div class="cardRight">
            <div>时间限制：{{ timeLimit }}</div>
            <div>内存限制：{{ memLimit }}</div>
        </div>

    </div>


    <div>
        <div class="node">题目描述</div>
        <div>{{ description }}</div>
    </div>
    <el-divider />
    <div>
        <div class="node">输入格式</div>
        <div>{{ inputStyle }}</div>
    </div>
    <el-divider />
    <div>
        <div class="node">输出格式</div>
        <div>{{ outputStyle }}</div>
    </div>
    <el-divider />
    <div>
        <div class="node">输入输出样例</div>
        <div v-for="(item, index) in inputs" :key="index" class="sampleBox">
            <div class="inputs">
                <span>Input #{{ index }}</span>
                <span class="iconfont icon-fuzhi" @click="copyText(item)"></span>
            </div>
            <div class="sample">{{ item }}</div>
            <div class="outputs">
                <span>Output #{{ index }}</span>
                <span class="iconfont icon-fuzhi" @click="copyText(outputs[index])"></span>
            </div>
            <div class="sample">{{ outputs[index] }}</div>
        </div>
    </div>
    <el-divider style="margin-bottom: 10px;" />
    <div>
        <el-collapse style="border: none;">
            <el-collapse-item style="--el-collapse-header-height:50px; vertical-align: center;">
                <template #title>
                    <div class="node" style="">标签</div>
                </template>
                <span v-for="(tag_index, index) in tags" :key="index" class="tag"> {{ tagsStore.idToTags[tag_index].name
                    }} </span>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>
import '@/assets/icon/iconfont.css'

import { useRoute } from 'vue-router';
import { useProblemDescStore } from '@/stores/problemStore';
import { computed, onMounted, ref } from 'vue';
import { transTime, transMem } from '@/utils/data_calculate';
import { ElMessage } from 'element-plus';
import { useTagsStore } from '@/stores/tagsStore';
import { getDifficultColor } from '@/utils/color';

const route = useRoute()
const id = route.params.id

const problemDescStore = useProblemDescStore()
const name = ref()
const description = ref()
const inputStyle = ref()
const outputStyle = ref()
const timeLimit = ref()
const memLimit = ref()
const difficulty = ref()
const source = ref()
const inputs = ref()
const outputs = ref()
const tags = ref()

const diffColor =  computed(() => {
    console.log({'border-bottom': '1px solid' + getDifficultColor(4)})
    return {
        'border-bottom': '1px solid' + getDifficultColor(4)
    }
})

const tagsStore = useTagsStore()

onMounted(async () => {
    await problemDescStore.getProblemDesc(id)
    name.value = problemDescStore.problemDesc.name
    description.value = problemDescStore.problemDesc.description
    inputStyle.value = problemDescStore.problemDesc.input_style
    outputStyle.value = problemDescStore.problemDesc.output_style
    timeLimit.value = transTime(problemDescStore.problemDesc.time_limit)
    memLimit.value = transMem(problemDescStore.problemDesc.memory_limit)
    difficulty.value = problemDescStore.problemDesc.difficulty
    source.value = problemDescStore.problemDesc.source
    inputs.value = problemDescStore.problemDesc.sample.inputs
    outputs.value = problemDescStore.problemDesc.sample.outputs
    tags.value = problemDescStore.problemDesc.tags

    await tagsStore.getTags()
})

const copyText = async (txt) => {
    if ('clipboard' in navigator) {
        try {
            await navigator.clipboard.writeText(txt);
            ElMessage({
                message: '文本已复制到剪贴板',
                type: 'message',
            })
        } catch (err) {
            ElMessage({
                message: err,
                type: 'error',
            })
        }
    } else {
        ElMessage({
            message: '当前浏览器不支持 Clipboard API',
            type: 'error',
        })
    }
}

</script>

<style scoped>
.pCard {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px
}

.cardLeft {
    display: flex;
    flex-direction: column;
    width: 250px;
}

.cardRight {
    color: #696666;
    font-size: 15px;
    padding-top: 10px;
}

.pId {
    font-size: 20px;
}

.pName {
    font-size: 28px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-bottom: 6px;
}

.source, .difficulty {
    color: #696666;
    font-size: 15px;
}


.sampleBox {
    border-radius: 5px;
    border: 1px solid #3D3737;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: hidden;
}

.sample {
    background-color: #EEEEEE;
    padding: 5px;
}

.el-divider {
    width: 100%;
    margin: 15px 0;
}

.node {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.node ~ div {
    margin-left:10px;
    margin-right:10px;
}

.node::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #3F3C3C;
    margin-right: 8px;
    vertical-align: middle;
}

.inputs {
    border-bottom: 1px solid #3D3737;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
}

.outputs {
    border-bottom: 1px solid #3D3737;
    border-top: 1px solid #3D3737;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
}

.tag {
    display: inline-block;
    background-color: #EAEAEA;
    border-radius: 8px;
    padding: 2px 10px 2px 10px;
    margin: 4px 4px 4px 4px;
    color: black;
}
</style>