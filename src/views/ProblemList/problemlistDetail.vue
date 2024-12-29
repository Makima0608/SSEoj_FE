<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <layoutNav />
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
            <span class="iconfont icon-31zhuanfa" @click="transferProblemList"></span>
            <span :class="problemListDetail.star_status?'iconfont icon-shoucang': 'iconfont icon-shoucangdanse'" @click="toggleStar"></span>
         </div>
      </div>
      <div v-if="showProfile && loadComplete" class="profile">
         <div class="problemlist-info">
            111
         </div>
         <div class="info-panel">
            <div class="creator-info">
               <div>创建者</div>
               <el-avatar :src="problemListDetail.creator_info.avatar">KL</el-avatar>
               {{ problemListDetail.creator_info.username }}
            </div>
            
         </div>
      </div>
      
      <div v-else class="problemlist">
         <el-table :data="problemListDetail.problems" stripe :row-style="{ height: '70px' }"
            @row-click="rowSelected">
            <el-table-column label="状态" width="80">
               <template #default="scope">
                  <span v-if="scope.row.pass_status" class="iconfont icon-duigou1" style="text-align: center; font-size: 20px;"></span>
               </template>
            </el-table-column>
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
import { onMounted, ref } from 'vue';
import { getProblemListDetailAPI, starProblemListAPI, transferProblemListAPI } from '@/apis/problemlist';
import { useTagsStore } from '@/stores/tagsStore';
import { getDifficultColor } from '@/utils/color';

const loadComplete = ref(false)
const route = useRoute()
const router = useRouter()
const problemlistId = route.params.id
const problemListDetail = ref({})
const tagsStore = useTagsStore()
const showProfile = ref(true)

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
const toggleStar = () => {
   problemListDetail.value.star_status = !problemListDetail.value.star_status
   starProblemListAPI(problemListDetail.value.id, problemListDetail.value.star_status)
}
const transferProblemList = () => {
   transferProblemListAPI(problemListDetail.value.id)
}
// const toggleScroll = (value) => {
//   document.body.style.overflow = value ? 'hidden' : 'auto';
// };
// watch(showFavorites, (newValue) => {
//   toggleScroll(newValue);
// });
onMounted(async() => {
   await getProblemListDetail()
   await tagsStore.getTags()
   loadComplete.value = true
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
.icon-31zhuanfa, .icon-shoucangdanse, .icon-shoucang {
   background-color: #e4f1f3;
   color: rgb(20, 20, 20);
   border: 1px;
   border-radius: 100%;
   padding: 8px;
   width: 43px;
   height: 43px;
   text-align: center;
   font-size: 25px;
   cursor: pointer;
}
.icon-shoucang{
   color: #4C4C4E;
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
   /* box-shadow: 0px 2px 6px 0px rgba(146, 143, 143, 0.7); */
   /* border: 1px solid #BBB; */
   border-radius: 10px;
   position: relative;
   margin-top: 15px;
   display: flex;
   margin-top: 40px;
}
.profile .problemlist-info {
   flex: 1;
   box-shadow: 0px 2px 6px 0px rgba(146, 143, 143, 0.7);
   margin-right: 30px;
   border-radius: 10px;
}
.profile .info-panel {
   border-radius: 10px;
   width: 300px;
   height: 200px;
}

.el-table {
   width: 99%;
}
</style>