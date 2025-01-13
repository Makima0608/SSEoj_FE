<template>
    <layoutNav />
    <div class="wrapper">
        <div class="node">题目描述</div>
        <div class="editor">
            <FEditor :key="1" :init-id="ref1" ref="desRef"></FEditor>
        </div>
        

        <div class="node">输入格式</div>
        <div class="editor">
            <FEditor :key="2" :init-id="ref2" ref="inStyleRef"></FEditor>
        </div>
        

        <div class="node">输出格式</div>
        <div class="editor">
            <FEditor :key="3" :init-id="ref3" ref="outStyleRef"></FEditor>
        </div>
        

        <div class="node">数据范围</div>
        <div class="editor">
            <FEditor :key="4" :init-id="ref4" ref="dataRangeRef"></FEditor>
        </div>

        <div>
            <el-select v-model="value" multiple placeholder="Select" style="width: 240px">
                <el-option
                v-for="item in colors"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                    <div>
                        <el-tag :color="item.value" style="margin-right: 8px" size="small" />
                        <span :style="{ color: getDifficultColor(item.value) }">{{ item.label }}</span>
                    </div>
                </el-option>
                <template #tag>
                <el-tag v-for="color in value" :key="color" :color="color" />
                </template>
            </el-select>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import layoutNav from '../Layout/components/layoutNav.vue';
import FEditor from '@/components/FEditor.vue';
import { getDifficultColor } from '@/utils/color';

const ref1 = ('a')
const ref2 = ('b')
const ref3 = ('c')
const ref4 = ('d')

const desRef = ref(null)
const inStyleRef = ref(null)
const outStyleRef = ref(null)
const dataRangeRef = ref(null)

const colors = [
    {
        value: 1,
        label: 'Lv.1'
    },
    {
        value: 2,
        label: 'Lv.2'
    },
    {
        value: 3,
        label: 'Lv.3'
    },
    {
        value: 4,
        label: 'Lv.4'
    },
    {
        value: 5,
        label: 'Lv.5'
    },
    {
        value: 6,
        lable: 'Lv.6'
    }
]
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

.editor {
    width: 90%;
    margin: 20px auto 0px auto;
}
</style>