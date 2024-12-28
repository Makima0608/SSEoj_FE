<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <layoutNav />
  <div class="wrapper">
    <div class="menuContainer">
      <el-menu
        :default-active="activeMenuIndex"
        class="menu"
        mode="vertical"
        @select="handleSelect"
        background-color="rgb(200, 200, 200);"
        text-color="grey"
        active-text-color="black"
        :ellipsis="false"
      >
        <template v-if="!isSetting">
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">我的收藏</el-menu-item>
          <el-menu-item index="3">我的题库</el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="1">个人信息</el-menu-item>
          <el-menu-item index="2">安全设置</el-menu-item>
        </template>
      </el-menu>
      <el-button v-if="!isSetting" type="info" plain class="btnSet" @click="toggleSetting">个人设置</el-button>
      <el-button v-if="isSetting" type="info" plain class="btnSet" @click="toggleSetting">返回主页</el-button>
    </div>

    <div v-if="!isSetting" class="infomationContainer">
      <!-- 原来的 infomationContainer 内容 -->
      <div class="userHeader">
        <el-avatar :src="userStore.getAvatar()" class="userAvatar" />
        <div class="userContainer">
          <div class="nameContainer">
            <label class="userName">{{ userStore.userInfo.username }}</label>
            <div class="stasticContainer">
              <div class="stasticItem">
                <label>粉丝</label>
                <span class="value">{{ userStore.userInfo.subscribers_count }}</span>
              </div>
              <div class="stasticItem">
                <label>关注</label>
                <span class="value">{{ userStore.userInfo.subscribing_count }}</span>
              </div>
            </div>
          </div>
          <input type="text" class="profile" placeholder="Nothing here..." />
        </div>
      </div>
      <div class="listContainer">
        <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
          <li v-for="post in filteredPosts" :key="post.post_id" class="list-item">
            <ListItemContent
              :avatar="userStore.getAvatar()"
              :title="userStore.userInfo.username"
              :username="userStore.userInfo.username"
              :time="userStore.userInfo.username"
              :commentCount="userStore.userInfo.subscribers_count"
              :likeCount="userStore.userInfo.subscribing_count"
              v-model="selectedPost"
            />
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="setContainer">
      <!-- 新的 setContainer 内容 -->
      <div v-if="activeMenuIndex ==='1'" class="personalSet">
        <div class="nameSetContainer">
          <div class="nameInputContainer">
            <label>用户名</label>
            <input type="text" :placeholder="userStore.userInfo.username || '用户名'"/>
          </div>
          <el-button type="info" plain @click="changeUsername">确认修改</el-button>
        </div>

        <div class="profileSetContainer">
          <div class="profileInputContainer">
            <label>简介</label>
            <input type="text" :placeholder="userStore.userInfo.profile || 'Nothing here...'"/>
          </div>
          <el-button type="info" plain @click="changeProfile">确认修改</el-button>
        </div>

        <div class="avatarSetContainer">
          <div class="avartarInputContainer">
            <label>头像</label>
            <el-avatar :src="userStore.getAvatar()" class="avatarSet" />
          </div>
          <div class="avatarChoose">
            <el-button type="info" plain @click="changeAvatar">确认修改</el-button>
          </div>
        </div>
      </div>


      <div v-else-if="activeMenuIndex ==='2'" class="safeSet">
        <div class="emailSetContainer">
          <div class="emailInputContainer">
            <label>邮箱</label>
            <input type="text" :placeholder="userStore.userInfo.email || 'Nothing here...'"/>
          </div>
          <el-button type="info" plain @click="changeEmail">确认修改</el-button>
        </div>

        <div class="passwordsSetContainer">
          <label class="passwordsHead">密码</label>
          <div class="passwordsInputContainer">
            <div class="passwordsCheck">
              <label>原密码</label>
              <input type="text" placeholder="请输入"/>
            </div>
            <div class="passwordsCheck">
              <label>新密码</label>
              <input type="text" placeholder="请输入"/>
            </div>
            <div class="passwordsCheck">
              <label>再次输入</label>
              <input type="text" placeholder="请输入"/>
            </div>
          </div>
          <div class="btnContainer">
            <el-button type="info" plain @click="changePassword">修改密码</el-button>
            <el-button type="success" plain  @click="dialogFormVisible = true">忘记密码</el-button>
          </div>

        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Fogotten Your Passwords?" width="500" top="300px">
      <el-form :model="form">
        <el-form-item label="邮箱验证码" :label-width="formLabelWidth"  class="emailVerification">
          <el-input v-model="verificationCode" autocomplete="off"/>
          <el-button type="success" plain  class="btnSend">发送</el-button>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="newP" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false && handleForgotPassword(email, verificationCode, newPassword)">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import layoutNav from '@/views/Layout/components/layoutNav.vue';
import { useUserStore } from '@/stores/userStore';
import { usePostListStore } from '@/stores/postListStore';
import ListItemContent from '@/views/Discussion/ListItemContent.vue';
import { avatarChangeAPI,usernameChangeAPI,proflieChangeAPI,passwordChangeAPI,passwordForgetAPI } from '@/apis/user'

const userStore = useUserStore();
const postListStore = usePostListStore();
const count = ref(0);
const currentPage = ref(1);
const pageSize = ref(30);
const isSetting = ref(false); // 是否切换到个人设置界面
const activeMenuIndex=ref('1');
const dialogFormVisible=ref(false);
const formLabelWidth = '100px'

const newUsername = ref('');
const newProfile = ref('');
const newEmail = ref('');
const newAvatar = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const verificationCode = ref('');
const emailForReset = ref('');

const toggleSetting = () => {
  isSetting.value = !isSetting.value;
  console.log('isSetting:', isSetting.value);
  if (isSetting.value) {
    activeMenuIndex.value = '1'; // 默认切换到“个人信息”
  }
  console.log('activeMenuIndex:', activeMenuIndex.value);
};

// 监听菜单切换
const handleSelect = (index) => {
  activeMenuIndex.value = index; // 更新当前选中的 menu
};

const load = () => {
  count.value += 2;
};
const params = computed(() => ({
  page_num: currentPage.value || 1,
  page_size: pageSize.value || 30,
}));

const filteredPosts = computed(() => {
  return postListStore.postList.filter((post) => post.user_id === 1);
});

const changeUsername = async () => {
    try {
        await usernameChangeAPI(newUsername.value);  // 调用 API 更新用户名
        await userStore.updateUserInfo({ username: newUsername.value });  // 更新本地信息
        alert('用户名修改成功！');
    } catch (error) {
        console.error(error);
        alert('用户名修改失败！');
    }
};

const changeProfile = async () => {
    try {
        await proflieChangeAPI(newProfile.value);
        await userStore.updateUserInfo({ profile: newProfile.value });  // 更新简介
        alert('简介修改成功！');
    } catch (error) {
        console.error(error);
        alert('简介修改失败！');
    }
};

const changePassword = async () => {
    try {
        await passwordChangeAPI(oldPassword.value, newPassword.value);
        await userStore.updateUserInfo({ oldPassword: oldPassword.value, newPassword: newPassword.value });  // 更新密码
        alert('密码修改成功！');
    } catch (error) {
        console.error(error);
        alert('密码修改失败！');
    }
};

const handleForgotPassword = async (email, verificationCode, newPassword) => {
  try {
    await passwordForgetAPI(email, verificationCode, newPassword);
    alert('密码重置成功！');
  } catch (error) {
    console.error(error);
    alert('密码重置失败！');
  }
};


onMounted(async () => {
  await postListStore.getPostList(params.value); // 等待数据加载
  count.value = postListStore.count; // 更新总数
});
</script>

<style scoped>
.wrapper {
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 85%;
  margin-bottom: 20px;
  min-width: 800px;
}

.menuContainer {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  min-width: 150px;
  height: 300px;
  margin-right: 20px;
  border-radius: 10px;
}

.infomationContainer{
  display: flex;
  flex-direction: column;
  /* background: green; */
  /* justify-content: space-between; */
  width: 95%;
  /* height: 760px; */

}

.userHeader {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 160px;
  padding: 0px auto;
  margin:auto;
  margin-bottom: 20px;
  margin-top:0px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);

}

.userContainer{
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-right: 5%;
}

.userAvatar{
  width: 120px;
  height: 120px;
  margin: auto;
  margin-left: 5%;
  margin-right: 10px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
}

.nameContainer{
  display: flex;
  align-items: center;
  margin: auto;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 0px;
  width: 100%;
  gap:45%;
}

.userName{
  font-size: 40px;
  font-weight: bold;
  align-self: self-end;
}

.profile{
  height: 60px;
  width:90%;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  align-self: flex-start;
  outline: none;
  border: none;
}

.profile:hover,
.profile:focus{
  outline: none;
  border: none;
}

.stasticContainer{
  display: flex;
  align-items: center;
  height: 10%;
  /* margin-right: 90px; */
  margin-bottom: 30px;
  align-self: self-end;
  min-width: 200px;

}

.stasticItem{
  display: flex;
  flex-direction: column;
  margin-right: 30px;

}

.stasticContainer label{
  font-weight: bold;
}

.value{
  text-align: center;
}

.listContainer{
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  background: transparent;
  max-height: 700px;
}


.listContainer .list {
padding: 10px;
margin: 0;
list-style: none;
}

.listContainer .list-item {

display: flex;
align-items: center;
justify-content: center;
height: 75px;
border-radius: 6px;


}
.listContainer .list-item + .list-item {
  margin-top: 5px;
}

.menuContainer{
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  min-width: 150px;
  height: 250px;
  margin-right: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu{
  top: 5px;
}

.menu .el-menu-item{
  text-align: center; /* 居中显示 */
  font-size:16px;      /* 可选：设置字体大小 */
  font-weight: bold;
  margin: auto;
}

.menu .el-menu-item:hover {
background-color: white;  /* 鼠标悬浮时的背景颜色 */
}
.menu .el-menu-item.is-active {
background-color: white;  /* 选中项的背景色 */
}

.btnSet{
  margin: auto;
  margin-right: 10px;
}

.setContainer{
  display: flex;
  flex-direction: column;
  width: 95%;
  background: transparent;
}


.nameSetContainer{
  display: flex;
  width: 100%;
  height: 130px;
  margin:auto;
  margin-bottom: 20px;
  margin-top:0px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  /* justify-content: space-between; */
}

.nameInputContainer{
  display: flex;
  flex-direction: column;
  align-items: self-start;
  margin-top: 20px;
  margin-left: 30px;
  width: 25%;
}

.nameInputContainer label{
  font-size:20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.nameInputContainer input{
  height: 40px;
  width:90%;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  align-self: flex-start;
  outline: none;
  border: none;
}

.nameSetContainer .el-button{
  margin-top: 56px;
  margin-left: 20px;
  width: 120px;
  height: 40px;
}
.profileSetContainer{
  display: flex;
  width: 100%;
  height: 130px;
  margin:auto;
  margin-bottom: 20px;
  margin-top:0px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
}

.profileInputContainer{
  display: flex;
  flex-direction: column;
  align-items: self-start;
  margin-top: 20px;
  margin-left: 30px;
  width: 50%;
}


.profileInputContainer label{
  font-size:20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.profileInputContainer input{
  height: 40px;
  width:90%;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  align-self: flex-start;
  outline: none;
  border: none;
}

.profileSetContainer .el-button{
  margin-top: 56px;
  margin-left: 20px;
  width: 120px;
  height: 40px;
}

.avatarSetContainer{
  display: flex;
  width: 100%;
  height: 400px;
  margin:auto;
  margin-bottom: 20px;
  margin-top:0px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
}

.avatarSet{
  width: 140px;
  height: 140px;
  margin-top: 10px;
  margin-left: 0;
  margin-right: 30px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
}

.avartarInputContainer{
  display: flex;
  flex-direction: column;
  align-items: self-start;
  margin-top: 20px;
  margin-left: 30px;
  width: 20%;
}

.avartarInputContainer label{
  font-size:20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.avatarChoose .el-button{
  margin-top: 150px;
  margin-left: 20px;
  width: 120px;
  height: 40px;
}

.emailSetContainer{
  display: flex;
  width: 100%;
  height: 130px;
  margin:auto;
  margin-bottom: 20px;
  margin-top:0px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  /* justify-content: space-between; */
}

.emailInputContainer{
  display: flex;
  flex-direction: column;
  align-items: self-start;
  margin-top: 20px;
  margin-left: 30px;
  width: 40%;
}

.emailInputContainer label{
  font-size:20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.emailInputContainer input{
  height: 40px;
  width:90%;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  align-self: flex-start;
  outline: none;
  border: none;
}

.emailSetContainer .el-button{
  margin-top: 57px;
  margin-left: 20px;
  width: 120px;
  height: 40px;
}

.passwordsSetContainer{
  display: flex;
  flex-direction:column ;
  width: 100%;
  height: 500px;
  margin:auto;
  margin-bottom: 20px;
  margin-top:0px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
}

.passwordsHead{
  font-size:20px;
  font-weight: bold;
  /* margin-bottom: 10px; */
  align-items: self-start;
  margin-top: 20px;
  margin-left: 30px;
}

.passwordsInputContainer{
  display: flex;
  flex-direction: column;
  align-items: self-start;
  /* margin-top: 20px; */
  margin-left: 30px;
  width: 100%;
}

.passwordsCheck{
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 55%;
  /* margin-left: 30px; */

}

.passwordsCheck label{
  font-size:15px;
  /* font-weight: bold; */
  margin-bottom: 10px;
  margin-right: 10px;
  width: 14%;

}

.passwordsCheck input{
  height: 40px;
  width:70%;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  align-self: flex-start;
  outline: none;
  border: none;
}

.btnContainer{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 60px;
}

.btnSend{
  margin-left: 30px;
  width: 80px;
}

.emailVerification .el-input{
  width:70%;
}

</style>
