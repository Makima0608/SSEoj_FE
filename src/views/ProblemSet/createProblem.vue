<template>
    <layoutNav />
    <div class="wrapper">
        <div class="node">题目描述</div>
        <FEditor :key="1" :init-id="ref1" ref="desRef"></FEditor>

        <div class="node">输入格式</div>
        <FEditor :key="2" :init-id="ref2" ref="inStyleRef"></FEditor>

        <div class="node">输出格式</div>
        <FEditor :key="3" :init-id="ref3" ref="outStyleRef"></FEditor>

        <div class="node">数据范围</div>
        <FEditor :key="4" :init-id="ref4" ref="dataRangeRef"></FEditor>

        
    </div>

</template>

<script setup>
import { ref } from 'vue';
import layoutNav from '../Layout/components/layoutNav.vue';
import FEditor from '@/components/FEditor.vue';

const ref1 = ('a')
const ref2 = ('b')
const ref3 = ('c')
const ref4 = ('d')

const desRef = ref(null)
const inStyleRef = ref(null)
const outStyleRef = ref(null)
const dataRangeRef = ref(null)
</script>

<style scoped>
.wrapper {
    width: 80%;
    margin: 10px auto 0 auto;
}

.node {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
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
</style>