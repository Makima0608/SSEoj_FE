<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <layoutNav />
    <div class="wrapper">
        <div class="container">
            <div class="title">
                {{ solutionDetail.title }}
            </div>
            <el-popover 
                @show="showUserInfoCard(userInfo.id)"
                popper-style="background:transparent; border:none; box-shadow:none; margin-top:10px"
                :show-arrow="false"
            >
                <template #reference>
                    <div class="userInfo" @click="jumpToUser(userInfo.id)">
                        <el-avatar :size="25" style="font-size: 12px;" :src="userInfo.avatar">KL</el-avatar>
                        <span>{{ userInfo.username }}</span>
                    </div>
                </template>
                <template #default>
                    <UserInfoCard :userInfo="userInfo" @update:subscribe="toggleFollow"/>
                </template>
            </el-popover>
            
        </div>
        <div class="footer">

        </div>
        <div class="comment">
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSolutionDetailAPI } from '@/apis/problemset';
import layoutNav from '../Layout/components/layoutNav.vue';
import { subscribeUserAPI, getUserInfoAPI } from '@/apis/user';

const route = useRoute()
const router = useRouter()
const pid = route.params.pid
const sid = route.params.sid
const solutionDetail = ref({})
const userInfo = ref({})
const userInfoCard = ref({})

// 跳转到其他用户界面
const jumpToUser = (id) => {
    console.log(id)
    const userWindow = window.open('', '_blank')
    const userProfileUrl = router.resolve({ path: `/user/${id}` }).href
    console.log(userProfileUrl)
    userWindow.location.href = userProfileUrl
}

// 
const showUserInfoCard = async(id) => {
   if (id == undefined)
        return 
   const res = await getUserInfoAPI(id)
   userInfoCard.value = res.data
}

const toggleFollow = (msg) => {
    userInfoCard.value.is_subscribe = msg
    userInfoCard.value.subscribers_count += msg? 1: -1
    subscribeUserAPI(userInfoCard.value.id, msg)
}

onMounted(async() => {
    const res = await getSolutionDetailAPI(pid, sid)
    solutionDetail.value = res.data
    const res_info = await getUserInfoAPI(solutionDetail.value.user_info.id)
    userInfo.value = res_info.data
    console.log(userInfo.value)
})
</script>

<style scoped>
.wrapper {
    width: 80%;
    margin: 20px auto;
    border: 1px solid #333;
}
.userInfo {
    display: inline-flex;
    align-items: center;
}
</style>