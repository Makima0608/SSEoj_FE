<template>
    <div class="header">
        <el-menu mode="horizontal" :default-active="$route.path" router="true" background-color="#282727"
            text-color="#ffffff" active-text-color="#ffffff" :ellipsis="false">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/problemset">题库</el-menu-item>
            <el-menu-item index="/problemlist">题单</el-menu-item>
            <el-menu-item index="/discussion">讨论</el-menu-item>
        </el-menu>
        <template v-if="flag">
            <div class="userInfo">
                <el-popover :show-arrow="false">
                    <template #reference>
                        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" :size="60" />
                    </template>
                    <template #default>
                        <div class="avatarDropdown">
                            <p><a href="#">111</a></p>
                            <p><a href="#">222</a></p>
                            <p><a href="#">333</a></p>
                            <p><a href="#">444</a></p>
                        </div>
                    </template>
                </el-popover>
                <span>Chitanda</span>
            </div>
        </template>
        <template v-else>
            <ul class="notAuth">
                <a href="/login">登录</a>
                <a href="/login">注册</a>
                <a href="#">帮助</a>
            </ul>
        </template>

    </div>
    <button @click="console.log($route.path)">1111</button>

    <!-- <el-avatar :size="80" class="avatar" /> -->
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
const userStore = useUserStore()

// 暂时代替是否登录的变量
const flag = ref(true) 

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
    background-color: #282727;
    border-radius: 10px;
    width: 85%;
    min-width: 600px;
}

.el-menu {
    margin-left: 50px;
    --el-menu-base-level-padding: 25px;
    --el-menu-border-color: none;
    gap: 15px;
    
}

.el-menu-item {
    font-size: 17px;
    --el-menu-hover-bg-color: black;
}

.el-menu-item.is-active {
    font-weight: 500;
}

.el-menu-item.is-active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 4px;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.4);
}

.el-menu--horizontal {
    --el-menu-horizontal-height: 60px;
}

.avatarDropdown p {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 50px;
}

.avatarDropdown p:hover {
    background-color: rgba(20, 20, 20, 0.4);
}


.avatarDropdown a {
    text-decoration: none;
    color: #333;
}

.userInfo {
    display: flex;
    margin-right: 80px;
    gap: 20px;
}

.userInfo .el-avatar {
    transform: translateY(-30px);
    scale: 1.3;
    /* border: #bbbbbb 2px solid; */
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2)
}

.userInfo span {
    color: black;
    transform: translateY(-30px);
    font-size: 16px;
    font-weight: bold;
}

.notAuth {
    display: flex;
    margin-right: 30px;
    --el-menu-base-level-padding: 10px;
    --el-menu-border-color: none;
    gap: 20px;
    align-items: center;
    justify-content: center;
}

.notAuth a{
    text-decoration: none;
    color: #ffffff;
}
.notAuth a:hover{
    font-weight: bold
}

</style>