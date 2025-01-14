<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <layoutNav />
  <div class="wrapper">
    <div class="menuContainer">
      <el-menu v-if="!showFollow"
        :default-active="activeMenuIndex"
        class="menu"
        mode="vertical"
        @select="handleSelect1"
        background-color="rgb(200, 200, 200);"
        text-color="grey"
        active-text-color="black"
        :ellipsis="false"
      >

        <el-menu-item index="1">我的发布</el-menu-item>
        <el-menu-item index="2">题目收藏</el-menu-item>
        <el-menu-item index="3">我的题单</el-menu-item>
        <!-- <el-menu-item index="4">我的计划</el-menu-item> -->
        <el-menu-item v-if="userStore.userInfo.id===otherUserInfo.id" index="4">个人设置</el-menu-item>
      </el-menu>

      <el-menu v-else
        :default-active="activeMenuIndexFollow"
        class="menu"
        mode="vertical"
        @select="handleSelect2"
        background-color="rgb(200, 200, 200);"
        text-color="grey"
        active-text-color="black"
        :ellipsis="false"
      >

        <el-menu-item index="1">粉丝</el-menu-item>
        <el-menu-item index="2">关注</el-menu-item>
      </el-menu>
    </div>

    <div v-if="activeMenuIndex==='1'|| activeMenuIndex==='2' || showFollow" class="infomationContainer">
      <!-- 原来的 infomationContainer 内容 -->
      <div class="userHeader">
        <el-avatar :src="avatarPreview" class="userAvatar" />
        <div class="userContainer">
          <div class="nameContainer">
            <label class="userName">{{ otherUserInfo.username }}</label>
            <div class="stasticContainer">
              <div class="stasticItem" @click="loadFollow">
                <label>粉丝</label>
                <span class="value">{{ otherUserInfo.subscribers_count }}</span>
              </div>
              <div class="stasticItem" @click="loadFollow">
                <label>关注</label>
                <span class="value">{{ otherUserInfo.subscribing_count }}</span>
              </div>
              <div class="stasticItem">
                <label>提交</label>
                <span class="value">{{ tryCount }}</span>
              </div>
              <div class="stasticItem">
                <label>通过</label>
                <span class="value">{{ passCount }}</span>
              </div>
            </div>
          </div>
          <label type="text" class="profile">{{ otherUserInfo.profile }}</label>
        </div>
      </div>
      <div v-if="activeMenuIndex==='1'&&!showFollow" class="listContainer">
        <!-- 如果没有任何东西就nothing -->
        <label v-if="filteredPosts.length === 0">Nothing here.....</label>
        <ul v-else v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
          <li v-for="post in filteredPosts" :key="post.post_id" class="list-item"
          @click="router.push(`/discussion/${post.post_id}`)">
            <ListItemContent
              :avatar="post.avatar"
              :title="post.post_title"
              :username="post.username"
              :time="post.create_time"
              :commentCount="post.comment_count"
              :likeCount="post.like_count"
              v-model="selectedPost"
            />
          </li>
        </ul>
      </div>

      <div v-if="showFollow&&activeMenuIndexFollow==='1'" class="listContainer">
        <!-- 如果没有任何东西就nothing -->
        <label v-if="followers.length === 0">你还没有粉丝...</label>
        <ul v-else class="list">
          <li v-for="follower in followers" :key="follower.id" class="list-item"
          @click="selectFollow(follower.id)">
            <followItem
              :avatar="follower.avatar"
              :profile="follower.profile"
              :username="follower.username"
              :isFollower="true"
              :follower_is_mutual_following="follower.is_mutual_following"
              :follower_is_followed_by_me="follower.is_followed_by_me"
              :following_is_mutual_following="null"
              :following_is_followed_by_me="null"

            />
          </li>
        </ul>
      </div>

      <div v-if="showFollow && activeMenuIndexFollow==='2'" class="listContainer">
        <!-- 如果没有任何东西就nothing -->
        <label v-if="followings.length === 0">你还没关注别人...</label>
        <ul v-else class="list">
          <li v-for="following in followings" :key="following.id" class="list-item"
          @click="selectFollow(following.id)">
            <followItem
              :avatar="following.avatar"
              :profile="following.profile"
              :username="following.username"
              :isFollower="false"
              :follower_is_mutual_following="null"
              :follower_is_followed_by_me="null"
              :following_is_mutual_following="following.is_mutual_following"
              :following_is_followed_by_me="following.is_followed_by_me"

            />
          </li>
        </ul>
      </div>

      <div v-if="activeMenuIndex ==='2'&&!showFollow" class="starProblem">
        <el-table :data="defaultProblemlist" stripe :row-style="{ height: '70px' }"
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
                     <span>{{ getRatio(scope.row.pass_count, scope.row.attempt_count)
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

    <div v-else-if="activeMenuIndex ==='4'" class="setContainer">
        <div class="infoSet">
          <div class="nameSetContainer">
            <div class="nameInputContainer">
              <label>用户名</label>
              <input v-model="newUsername" type="text" :placeholder="otherUserInfo.username || 'Nothing here...'"/>
            </div>
            <el-button type="info" plain @click="changeUsername">确认修改</el-button>
          </div>

          <div class="profileSetContainer">
            <div class="profileInputContainer">
              <label>简介</label>
              <input v-model="newProfile" type="text" :placeholder="otherUserInfo.profile || 'Nothing here...'"/>
            </div>
            <el-button type="info" plain @click="changeProfile">确认修改</el-button>
          </div>

          <div class="avatarSetContainer">
            <div class="avartarInputContainer">
              <label>头像</label>
              <!-- 动态更新头像的显示 -->
              <el-avatar :src="avatarPreview" class="avatarSet" />
            </div>
            <div class="avatarChoose">
              <el-button type="success" plain @click="selectFile">选择文件</el-button>
              <el-button type="info" plain @click="changeAvatar">确认修改</el-button>
              <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" accept=".jpg,.png" />
            </div>
          </div>
        </div>

        <div class="passwordsSetContainer">
          <label class="passwordsHead">密码</label>
          <div class="passwordsInputContainer">
            <div class="passwordsCheck">
              <label>原密码</label>
              <input v-model="oldPassword" type="text" placeholder="请输入"/>
            </div>
            <div class="passwordsCheck">
              <label>新密码</label>
              <input v-model="newPassword" type="text" placeholder="请输入"/>
            </div>
            <div class="passwordsCheck">
              <label>再次输入</label>
              <input v-model="confirmPassword" type="text" placeholder="请输入"/>
            </div>
          </div>

          <div class="btnContainer">
            <el-button type="info" plain @click="changePassword">修改密码</el-button>
            <el-button type="success" plain  @click="dialogFormVisible = true">忘记密码</el-button>
          </div>
        </div>
    </div>

    <!-- 我的题单 -->
    <div v-if="activeMenuIndex==='3'" class="problemListContainer">
      <label>我收藏的</label>
      <div class="myStar">
        <!-- 如果没有任何东西就nothing -->
        <label v-if="starProblemList.length === 0">Nothing here.....</label>
        <div v-else v-for="plistItem in starProblemList" :key="plistItem.id" class="problemlist-item"
          @click="router.push(`/problemlist/${plistItem.id}`)">

          <div class="problemlist-header">
              <span class="problemlist-title">{{ plistItem.id + '.' + plistItem.title }}</span>
              <div class="problemlist-star">
                  <span
                      :class="plistItem.is_star ? 'iconfont icon-shoucang' : 'iconfont icon-shoucangdanse'"></span>
                  <span>{{ plistItem.star_count }}</span>
              </div>
          </div>
          <div class="creator-info" @click="console.log(111)">
              <el-avatar :size="30" style="font-size: 12px;">KL</el-avatar>
              <span>{{ plistItem.user_info.username }}</span>
          </div>
          <div class="progress-num">
              <span>进度</span>
              <span style="font-weight: 500;">{{ plistItem.pass_count + ' / ' + plistItem.problem_count }}</span>
          </div>
          <el-progress :text-inside="true" :stroke-width="20"
              :percentage="calcProgress(plistItem.pass_count, plistItem.problem_count)" color="#004D40">
          </el-progress>
        </div>
      </div>

      <label>我创建的</label>
      <div class="problemlist">
        <!-- 如果没有任何东西就nothing -->
        <label v-if="!createdProblemlist">Nothing here.....</label>
        <div v-else v-for="plistItem in createdProblemlist" :key="plistItem.id" class="problemlist-item"
          @click="router.push(`/problemlist/${plistItem.id}`)">

            <div class="problemlist-header">
              <span class="problemlist-title">{{ plistItem.id + '.' + plistItem.title }}</span>
            </div>
            <div class= "info">
              <span class="problemCount">{{ 'Count:'+ plistItem.problem_count }}</span>
              <el-switch
                class="ml-2"
                v-model="isPubilc"
                inline-prompt
                active-text="Public"
                inactive-text="Private"
                style="--el-switch-on-color: black; --el-switch-off-color: grey"
              />
            </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Fogotten Your Passwords?" width="500" top="300px" >
      <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="email" autocomplete="off" />
        </el-form-item>
        <el-form-item v-model="verificationCode" label="邮箱验证码" :label-width="formLabelWidth"  class="emailVerification">
          <el-input v-model="verificationCode" autocomplete="off"/>
          <el-button
          :disabled="isDisabled"
          type="success"
          plain
          class="btnSend"
          @click="sendVerification">
          {{ isDisabled ? countdown + '秒' : '发送' }}
        </el-button>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="forgetPassword" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleForgotPassword">
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
// import followItem from '@/views/User/followItem.vue/';
import followItem from './followItem.vue';
import { ElMessage } from 'element-plus'; // 引入 Element Plus 提示组件
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import {getCreateProblemListAPI, getDefaultProblemListAPI,getUserInfoAPI } from '@/apis/user'
import { getProblemListAPI } from "@/apis/problemlist";
import { useTagsStore } from '@/stores/tagsStore';
import { getDifficultColor } from '@/utils/color';
import { getIdentityAPI } from '@/apis/user';
import { getRatio } from '@/utils/data_calculate';
import {getFollowingAPI ,getFollowerAPI} from'@/apis/user';


const router = useRouter()
const route = useRoute()

const otherUserInfo=ref({})

const id = route.params.id
const tagsStore = useTagsStore()
const userStore = useUserStore();
const postListStore = usePostListStore();
const count = ref(0);
const currentPage = ref(1);
const pageSize = ref(30);
const activeMenuIndex=ref('1');
const dialogFormVisible=ref(false);
const formLabelWidth = '100px'

const showFollow= ref(false);
const followings=ref([]);
const followers=ref([]);
const activeMenuIndexFollow=ref('1');


const newUsername = ref('');
const newProfile = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const verificationCode = ref('');
const forgetPassword = ref('');
const email=ref('');
const avatarPreview = ref(''); // 默认显示当前用户头像

const tryCount = ref(0);
const passCount = ref(0);

// 文件 Base64 编码
const selectedFile = ref(null);
const base64File = ref('');
const fileInput = ref(null); // 这里不要在方法中重复定义 ref

// 我的题单
const createdProblemlist = ref([])
const problemlistCount = ref(0)
const defaultProblemlist = ref([]);
const starProblemList=ref([]);



// 筛选参数
const keyword = ref(undefined)
const sort_type = ref('idAsc')

const test_params = computed(() => ({
    page_num: currentPage.value || 1,
    page_size: pageSize.value || 30,
    keyword: keyword.value || undefined,
    sort_type: sort_type.value || "idAsc"
}))




// 定义响应式变量
const isDisabled = ref(false);  // 按钮是否禁用
const countdown = ref(15);      // 倒计时秒数
let timer = null;               // 用于存储定时器

// const testProblemList = ref(
//   [
//     { id: 1, title: 'Problem 1', problem_count: 10, isPubilc: true },
//     { id: 2, title: 'Problem 2', problem_count: 20 , isPubilc: true},
//     { id: 3, title: 'Problem 3', problem_count: 30 , isPubilc: true},
//     { id: 4, title: 'Problem 4', problem_count: 40 , isPubilc: true},
//     { id: 5, title: 'Problem 5', problem_count: 50 , isPubilc: true},
//   ]
// )



// 监听菜单切换
const handleSelect1 = (index) => {
  activeMenuIndex.value = index; // 更新当前选中的 menu
};

const handleSelect2 = (index) => {
  activeMenuIndexFollow.value = index; // 更新当前选中的 menu
};

// 加载粉丝信息
const loadFollow = async()=>{
  showFollow.value=true;
  // 获取当前用户的关注列表
  const res1=await getFollowerAPI(id);
  followers.value = res1.data;
  const res2=await getFollowingAPI(id);
  followings.value = res2.data;
  console.log(followings.value)
}

const selectFollow= (follow_id)=>{
  router.push(`/user/${follow_id}`)
  activeMenuIndex.value = '1'
  activeMenuIndexFollow.value = '1'
  showFollow.value=false;
}

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

const sendVerification =async()=>{
  if (isDisabled.value) return;  // 如果按钮已经禁用，点击无效
  if(email.value.trim()){
    try {
      await getIdentityAPI({email:email.value,type:1});
      ElMessage.success('验证码发送成功');

      // 开始倒计时
      isDisabled.value = true;
      timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer); // 倒计时结束，清除定时器
          isDisabled.value = false; // 重新启用按钮
          countdown.value = 15; // 重置倒计时
        }
      }, 1000);
    } catch (error) {
      ElMessage.error('验证码发送失败');
    }
  }
  else{
    ElMessage.error('邮箱不能为空!!!');
  }
}

const changeUsername = async () => {
  if(!newUsername.value.trim()){
    ElMessage.error('用户名不能为空!!!');
    return;
  }
  const res= await userStore.updateUserInfo({ username: newUsername.value });  // 更新本地信息
  if(res){
    ElMessage.success('用户名修改成功！');
  }
  else{
    ElMessage.error('用户名修改失败！');
  }
};

const changeProfile = async () => {
  if(!newProfile.value.trim()){
    ElMessage.error('简介不能为空!!!');
    return;
  }
  const res= await userStore.updateUserInfo({ profile: newProfile.value });  // 更新本地信息
  if(res){
    ElMessage.success('简介修改成功！');
  }
  else{
    ElMessage.error('简介修改失败！');
  }
};

const changePassword = async () => {
  if(!newPassword.value.trim() || !oldPassword.value.trim() || !newPassword.value.trim()){
    ElMessage.error('信息不能为空!!!');
    return;
  }
  if(newPassword.value===confirmPassword.value){
    const publicKeyPem = `-----BEGIN PUBLIC KEY-----
  MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKHP3hnFtL1g3bpgDMFAma1MofY9UmInthR8vK5Q9/dYcfdqvzLFRdRCPdeefqGO+BIFfLeCKJi4odn61XJEvp8CAwEAAQ==
  -----END PUBLIC KEY-----`
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedNew = forge.util.encode64(publicKey.encrypt(newPassword.value));
    const encryptedOld = forge.util.encode64(publicKey.encrypt(oldPassword.value));
    const res= await userStore.updateUserInfo({id:userStore.userInfo.id, oldPassword: encryptedOld, newPassword: encryptedNew });  // 更新密码
    if(res){
      ElMessage.success('密码修改成功！');
    }
    else{
      ElMessage.error('密码修改失败！');
    }
  }
  else{
    ElMessage.error('两次输入的新密码不一致!');
    return;
  }
};

const handleForgotPassword = async () => {
  if(!email.value.trim() || !verificationCode.value.trim() || !forgetPassword.value.trim()){
    ElMessage.error('信息不能为空!!!');
    return;
  }
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKHP3hnFtL1g3bpgDMFAma1MofY9UmInthR8vK5Q9/dYcfdqvzLFRdRCPdeefqGO+BIFfLeCKJi4odn61XJEvp8CAwEAAQ==
-----END PUBLIC KEY-----`
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = forge.util.encode64(publicKey.encrypt(forgetPassword.value));
  const res= await userStore.passwordForget({email: email.value,verification_code:verificationCode.value, password_new:encrypted});
  if(res){
    ElMessage.success('密码修改成功！');
    dialogFormVisible.value = false
  }
  else{
    ElMessage.error('密码修改失败！');
  }
};




//上传头像
const selectFile = () => {
  fileInput.value.click(); // 触发 file input 的点击事件
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];

  // 检查文件是否存在
  if (!file) {
    ElMessage.error('未选择文件');
    return;
  }

  // 限制文件类型为 jpg 和 png
  const validTypes = ['image/jpeg', 'image/png'];
  if (!validTypes.includes(file.type)) {
    ElMessage.error('只允许上传 .jpg 和 .png 格式的文件');
    return;
  }

  // 将文件转为 Base64
  const reader = new FileReader();
  reader.onload = () => {
    base64File.value = reader.result; // 保存 Base64 编码的文件
    avatarPreview.value = reader.result; // 实时更新预览头像
  };
  reader.onerror = () => {
    ElMessage.error('文件读取失败');
  };

  reader.readAsDataURL(file); // 读取文件并转换为 Base64
};

const changeAvatar = async () => {
  if (!base64File.value) {
    ElMessage.error('请先选择一个文件');
    return;
  }
  const res = await userStore.updateUserInfo({ avatar: base64File.value });
  if(res){
    avatarPreview.value = base64File.value; // 更新显示的头像
    ElMessage.success('头像修改成功');
    location.reload();
  }
  else{
    ElMessage.error('头像修改失败');
  }
};

// 获取创建的题单
const getCreatedProblemList = async (id) => {
  const res = await getCreateProblemListAPI(id)
  createdProblemlist.value = res.data
  console.log('--------', createdProblemlist.value)
}

// 获取默认的收藏
const getDefaultProblemList = async (id) => {
  const res = await getDefaultProblemListAPI(id)
  console.log(res)
  defaultProblemlist.value = res.data.problems
}

// 获取其他收藏
const getStarProblemList = async (test_params) => {
  const res = await getProblemListAPI(test_params)
  starProblemList.value = res.data.problemlists.filter((problemlist)=> problemlist.is_star===true)
}

// 计算进度条
const calcProgress = (pass_count, problem_count) => {
    return (pass_count / problem_count * 100).toFixed(1)
}

// 重新获取用户
// const getUserInfo = async ()=>{
//   await userStore.getUserInfo(id)
// }

const rowSelected = (row) => {
    router.push(`/problem/${row.id}/description`);
    location.reload();
}

onMounted(async () => {
  if (timer) {
    clearInterval(timer);
  }
  const res = await getUserInfoAPI(id);
  otherUserInfo.value = res.data;
  console.log(otherUserInfo.value)
  avatarPreview.value = userStore.getAvatar()
  await postListStore.getPostList(params.value); // 等待数据加载
  await userStore.getPractice(id);

  userStore.practiceInfo.forEach((practice) => {
    tryCount.value++; // 每遍历一个元素，尝试计数加 1
    if (practice.pass_status === true) {
      console.log(practice.pass_status)
      passCount.value++; // 如果通过状态为 true，计数加 1
    }
  });

  await getStarProblemList(test_params.value);
  await getDefaultProblemList(id);


  await getCreatedProblemList(id);
  count.value = postListStore.count; // 更新总数

    // 遍历 practiceInfo 进行计数


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
  gap:25%;
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
  padding:10px;
  font-size: smaller;
}


.stasticContainer{
  display: flex;
  align-items: center;
  height: 10%;
  /* margin-right: 90px; */
  margin-bottom: 30px;
  align-self: self-end;
  min-width: 250px;


}

.stasticItem{
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  cursor: pointer;

}

.stasticContainer label{
  font-weight: bold;
  cursor: pointer;
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
  min-height: 300px;
  padding:5px;
  display: flex;
  flex-direction: column;
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

.listContainer label{
  align-self: center;
  font-weight: bold;
  color: grey;
  font-size: large;
}

.starProblem {
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  background: transparent;
  max-height: 700px;
  min-height: 300px;
  padding:5px;
  display: flex;
  flex-direction: column;
}

.menuContainer{
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  min-width: 150px;
  height: 250px;
  margin-right: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.menu{
  top: 5px;
  margin-bottom: 10px;
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
  margin-top: 20px;
  margin-bottom: 10px;

}

.setContainer{
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background: transparent;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5); */
}

.infoSet{
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  box-shadow:0 0 5px rgba(0, 0, 0, .5);
  margin-bottom: 20px;
}

.nameSetContainer{
  display: flex;
  width: 100%;
  /* height: 130px; */
  margin:auto;
  margin-top:0px;
  margin-bottom: 10px;
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
  margin:auto;
  margin-bottom: 10px;
  margin-top:0px;

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
  /* height: 400px; */
  margin:auto;
  margin-bottom: 20px;
  margin-top:0px;

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
  /* height: 500px; */
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
  margin-bottom: 10px;
}

.btnSend{
  margin-left: 30px;
  width: 80px;
}

.emailVerification .el-input{
  width:70%;
}

.problemListContainer{
  display: flex;
  flex-direction:column;
  gap:20px;
  width: 100%;
}

.problemlist {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    column-gap: 40px;
    /* background: green; */
}

.problemlist-item {
    margin-bottom: 20px;
    padding: 20px 15px;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2);
    width: 350px;
    height: 150px;
    border-radius: 10px;
    transition: .5s;
    border: 1px solid #DEDCDC;
    /* display: block; */
}

.problemlist-item:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.4);
}

.problemlist-header {
    display: flex;

}

.problemlist-title {
    width: 85%;
    font-size: 20px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 5px;
}

.info{
  /* display: flex; */

}

.problemCount{
  color: grey;
}

.info .el-switch{
  margin-left: 20px;
  margin-top: -5px;
}

.problemListContainer label{
  font-weight: bold;
  font-size: large;
  margin-left: 5px;
  color:grey;
}

.myStar {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  column-gap: 40px;
  min-height: 150px;
  /* background: green; */
}

</style>
