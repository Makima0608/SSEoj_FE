<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <layoutNav />
   <Favorites :is-visible="showFavorites" @update:isVisible="showFavorites = false"/>
   <div class="container">
      <div class="header">
         <div class="option-block">
            <span class="option-btn" @click="selectProfile">
               <span class="iconfont icon-miaoshu1"></span>
               <span>题单简介</span>
            </span>
            <span class="h-divider"></span>
            <span class="option-btn" @click="selectList">
               <span class="iconfont icon-miaoshu"></span>
               <span>题目列表</span>
            </span>
         </div>
         <div class="func-block">
            <span class="iconfont icon-31zhuanfa"></span>
            <span class="iconfont icon-shoucangdanse" @click="showFavorites = true"></span>
         </div>
      </div>
      <div v-if="showProfile" class="profile">
         题单简介
      </div>
      
      <div v-else class="problemlist">
         <el-table :data="problemListDetail.problems" stripe :row-style="{ height: '70px' }"
            @row-click="rowSelected">
            <el-table-column prop="status" label="状态" width="80" />
            <el-table-column prop="id" label="编号" width="100" />
            <el-table-column prop="name" label="题目名称" />
            <el-table-column label="标签">
                  <template #default="scope">
                     <span v-for="tagId in scope.row.tags" :key="tagId">{{ tagsStore.idToTag(tagId) + " "
                        }}</span>
                  </template>
            </el-table-column>
            <el-table-column label="通过率">
                  <template #default="scope">
                     <span>{{ (scope.row.pass_count / scope.row.attempt_count * 100).toFixed(1) + '%'
                        }}</span>
                  </template>
            </el-table-column>
            <el-table-column label="难度">
                  <template #default="scope">
                     <span :style="{ color: getDifficultColor(scope.row.difficulty) }">Lv.{{
                        scope.row.difficulty }}</span>
                  </template>
            </el-table-column>
         </el-table>
      </div>
      
   </div>
   
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import layoutNav from '../Layout/components/layoutNav.vue';
import { onMounted, ref, watch } from 'vue';
import { getProblemListDetailAPI } from '@/apis/problemlist';
import { useTagsStore } from '@/stores/tagsStore';
import { getDifficultColor } from '@/utils/color';
import Favorites from '@/components/Favorites.vue';

const route = useRoute()
const router = useRouter()
const problemlistId = route.params.id
const problemListDetail = ref({})
const tagsStore = useTagsStore()
const showProfile = ref(true)
const showFavorites = ref(false)

const getProblemListDetail = async() => {
   const res = await getProblemListDetailAPI(problemlistId)
   problemListDetail.value = res.data
   console.log(problemListDetail)
}
const rowSelected = (row) => {
    router.push(`/problem/${row.id}/description`)
}
const selectProfile = () => {
   showProfile.value = true
}
const selectList = () => {
   showProfile.value = false
}
const toggleScroll = (value) => {
  document.body.style.overflow = value ? 'hidden' : 'auto';
};
watch(showFavorites, (newValue) => {
  toggleScroll(newValue);
});
onMounted(async() => {
   await getProblemListDetail()
   await tagsStore.getTags()
})
</script>

<style scoped>
.container{
   width: 85%;
   margin: 10px auto 20px auto;
   box-sizing: border-box;
   min-width: 800px;
}
.header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 60px;
}
.option-block{
   /* border-radius: 6px; */
   margin-left: 20px;
   padding: 0px 30px;
   display: flex;
   gap: 20px;
   align-items: center;
   border-bottom: 2px solid #BBB;
   /* box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.4); */
   height: 60px;
}
.func-block {
   margin-right: 20px;
   display: flex;
   gap: 10px;
}
.option-btn{
   padding: 10px;
   cursor: pointer;
   border-radius: 5px;
   transition: .3s;
}
.option-btn:hover{
   background-color: #e3e3e3;
}

.icon-miaoshu, .icon-miaoshu1{
   font-size: 18px;
   margin-right: 5px;
}
.icon-31zhuanfa, .icon-shoucangdanse {
   background-color: #e4f1f3;
   color: rgb(20, 20, 20);
   border: 1px;
   border-radius: 100%;
   padding: 8px;
   width: 43px;
   height: 43px;
   text-align: center;
   font-size: 25px;
}


.h-divider{
   display: inline-block;
   width: 2px;
   height: 30px;
   background-color: rgb(189, 182, 182);
}


.problemlist, .profile{
   height: 2000px;
   width: 99%;
   box-shadow: 0px 2px 6px 0px rgba(146, 143, 143, 0.7);
   /* border: 1px solid #BBB; */
   border-radius: 10px;
   padding: 20px 20px 30px 20px;
   position: relative;
   margin-top: 15px;
}

.el-table {
   width: 99%;
}
</style>