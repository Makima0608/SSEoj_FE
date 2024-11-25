<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div>
        <header>
            <p>我是登录页</p>
        </header>

        <!-- <section class="loginBlock">
            
        </section> -->
        <div class="body">
            <div class="choice">
                <span @click="flag = true">登陆</span>
                <span class="vertical-divider"></span>
                <span @click="flag = false">注册</span>
            </div>
            <template v-if="flag">
                <div class="form">
                    <el-form :model="user_form" :rules="rules" ref="formRef">
                        <el-form-item prop="email" label="邮箱">
                            <el-input v-model="user_form.email" />
                        </el-form-item>
                        <el-form-item prop="password" label="密码">
                            <el-input v-model="user_form.password" />
                        </el-form-item>
                    </el-form>
                    <div class="buttonGroup">
                        <el-button>注册</el-button>
                        <el-button @click="doLogin">登陆</el-button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="form">
                    <el-form :model="user_form" :rules="rules" ref="formRef">
                        <el-form-item prop="email">
                            <span>邮箱</span>
                            <el-input v-model="user_form.email" />
                        </el-form-item>
                        <el-form-item prop="password" class="verification">
                            <span>验证码</span>
                            <el-input v-model="user_form.password" />
                            <el-button>发送验证码</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button>注册</el-button>
                </div>
            </template>
        </div>

    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import 'element-plus/theme-chalk/el-message.css';
import router from '@/router';

const flag = ref(true)

const formRef = ref(null)
const userStore = useUserStore()

const user_form = ref({
    email: '',
    password: '',
})

const rules = {
    email: [
        { required: true, message: "邮箱不能为空", trigger: 'blur' }
    ],
    password: [
        { required: true, message: "密码不能为空", trigger: 'blur' }
    ]
}


// 登陆函数
const doLogin = () => {
    const { email, password } = user_form.value
    formRef.value.validate(async (valid) => {
        if (valid) {
            await userStore.getUserInfo({ email, password })
            ElMessage({ type: "success", message: "登陆成功" })
            router.replace({ path: '/' })
        }
    })
}

</script>

<style scoped>
.body {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
    margin-top: 200px;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding-top: 20px;
}

.el-form-item{
    position: relative;
    display: flex;
}

.choice {
    display: flex;
    gap: 20px;
    margin: auto;
    font-size: 20px;
    align-items: center;
    margin-bottom: 50px;
}

.vertical-divider {
    height: 100%;
    margin: 0 50px;
    width: 1px;
    height: 30px;
    background-color: #ccc;
}

.form {
    margin: 0px 40px 0px 40px;
    display: flex;
    flex-direction: column;
}

.form span{
    width: 40px;
}

.el-form-item {
    display: flex;
    align-items: center;

}

.el-form-item span {
    margin-right: 10px;
    white-space: nowrap;
}

.verification {
    display: flex;
    align-items: center;

    /* 垂直居中 */
}

.el-input {
    flex: 1;
    margin: 0px 10px 0px 10px;
}

.verification .el-button {
    white-space: nowrap;
    /* 防止按钮文本换行 */
}
</style>