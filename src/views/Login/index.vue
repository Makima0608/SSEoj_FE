<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div>
        <header>
            <p>我是登录页</p>
        </header>

        <section class="loginBlock">
            <div class="wrapper">
                <span>
                    账号登陆
                </span>

                <div class="form">
                    <el-form :model="user_form" :rules="rules" ref="formRef">
                        <el-form-item prop="email" label="账户">
                            <el-input v-model="user_form.email" />
                        </el-form-item>
                        <el-form-item prop="password" label="密码">
                            <el-input v-model="user_form.password" />
                        </el-form-item>
                        <el-button @click="doLogin">登陆</el-button>
                    </el-form>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import 'element-plus/theme-chalk/el-message.css';
import router from '@/router';

const formRef = ref(null)
const userStore = useUserStore()

const user_form = ref({
    email: '',
    password: '',
})

const rules = {
    email: [
        { required: true, message: "用户名不能为空", trigger: 'blur'}
    ],
    password: [
        { required: true, message: "用户名不能为空", trigger: 'blur'}
    ]
}


// 登陆函数
const doLogin = () => {
    const { email, password } = user_form.value
    formRef.value.validate(async (valid) => {
        if (valid) {
            await userStore.getUserInfo({email, password})
            ElMessage({ type: "success", message: "登陆成功"})
            router.replace({path: '/'})
        }
    })
}

</script>

<style scoped>
.loginBlock {
    display: flex;
    width: 400px;
    margin: 0 auto;
    margin-top: 200px;
}

</style>