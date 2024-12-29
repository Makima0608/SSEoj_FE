<template>
    <div class="info-card" v-if="loadComplete">
        <el-avatar :size="60" :src="userInfo.avatar">KL</el-avatar>
        <div class="basic-info">
            <span class="username">{{ userInfo.username }}</span>
            <span class="profile">{{ userInfo.profile }}</span>
        </div>
        <div class="follow-info">
            <div class="subscribers_count">
                <span>粉丝</span>
                <span>{{ transNum(userInfo.subscribers_count) }}</span> 
            </div>
            <div class="divider"></div>
            <div class="subscribing_count">
                
                <span>关注</span>
                <span>{{ transNum(userInfo.subscribing_count) }}</span>
            </div> 
        </div>
        <div class="info-card-btn" :class="userInfo.is_subscribe? 'info-card-btn2': 'info-card-btn1'" @click="toggleFollow">{{ followText }}</div>
    </div>
</template>

<script setup>
import { getUserInfoAPI } from '@/apis/user';
import { ref, watch } from 'vue';
import { transNum } from '@/utils/data_calculate';

const userInfo = ref({})
const loadComplete = ref(false)
const followText = ref('')
const emit = defineEmits(['update:isFollow'])
watch(userInfo, (newValue) => {
    console.log('change')
    emit('update:isFollow', newValue)
})

const getUserInfo = async(id) => {
    if (id == undefined)
        return 
    const res = await getUserInfoAPI(id)
    userInfo.value = res.data
}

const displayUserInfo = async(id) => {
    await getUserInfo(id)
    followText.value = userInfo.value.is_subscribe? '已关注': '+ 关注TA'
    loadComplete.value = true
}

const clearUserInfo = () => {
    loadComplete.value = false
}
const toggleFollow = () => {
    userInfo.value.is_subscribe = !userInfo.value.is_subscribe
    if (userInfo.value.is_subscribe) {
        followText.value = '已关注'
    }
    else {
        followText.value = '+ 关注TA'
    }
}

defineExpose({
    displayUserInfo,
    clearUserInfo
})

</script>

<style scoped>
.info-card {
    width: 270px;
    height: 180px;
    border: 1px solid #DEDCDC;
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.4);
    padding: 0px 18px;
    overflow: hidden;
}

.info-card .el-avatar{
    /* transform: translateY(-30px); */
    top: -30px;
    position: absolute;
}
.info-card .basic-info{
    margin: 10px 0px 0px 65px;
    display: flex;
    flex-direction: column;
}
.info-card .basic-info .username{
    font-size: 17px;
    font-weight: bold;
}
.info-card .basic-info .profile{
    margin-top: 10px;
    font-size: 13px;
    height: 20px;
    color: #bbb;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: auto;
}

.info-card .follow-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 15px;
    font-size: 12px;
}

.follow-info .subscribers_count, .follow-info .subscribing_count{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.follow-info .divider{
    width: 2px;
    height: 25px;
    background-color: #2f2a2a;
}

.subscribing_count span:last-of-type, .subscribers_count span:last-of-type{
    margin-top: 3px;
    font-size: 20px;
    font-weight: bold;
}

.info-card-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 6px;
    height: 30px;
    width: 80%;
    margin: 15px auto 0px auto;
    cursor: pointer;
    transition: background-color .3s ease-in-out;
}
.info-card-btn1 {
    background-color:#1682da;
    color: white;
}
.info-card-btn2 {
    background-color: #EEE;
    color: #BBB;
}

</style>