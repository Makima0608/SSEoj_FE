<template>
  <div class="list-item-content">
    <div class="avatarContainer">
      <img :src="getAvatar(avatar)" alt="Avatar" class="follow_avatar" />
    </div>

    <div class="follow_content">
      <p class="follow_username">{{ username }}</p>
      <p class="follow_profile">{{ profile }}</p>
    </div>
    <div v-if="isFollower" class="special">
        <label class="mutualFollowing" v-if="follower_is_mutual_following">互相关注</label>
        <label class="fan" v-else-if="follower_is_followed_by_me">粉丝</label>
    </div>
    <div v-else class="special">
      <label class="mutualFollowing" v-if="following_is_mutual_following">互相关注</label>
      <label class="follow" v-else-if="following_is_followed_by_me">已关注</label>
    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue';
import { transformDate, getDate} from '@/utils/time';
import { getAvatar } from '@/utils/basic'


defineProps({
  avatar: { type: String, required: true }, // 用户头像的 URL
  username: { type: String, required: true},
  profile: { type: String, required: true },  // 标题
  isFollower: { type: Boolean, required: true},
  follower_is_mutual_following:{ type: Boolean},
  follower_is_followed_by_me:{ type: Boolean},
  following_is_mutual_following:{ type: Boolean},
  following_is_followed_by_me:{ type: Boolean}


});

</script>

<style scoped>

.list-item-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 99%;
  cursor: pointer;

}



.follow_avatar {
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.follow_username {
  position: relative;
  flex-grow: 1; /* 标题占据剩余空间 */

  font-size: larger;
  color: #333;
  text-align: left;
  max-width: 100px;
  margin-top:8px;
  font-weight: bold;
}

.follow_content{
  margin-right:20px ;
  width: 400px;
  display: flex;
  flex-direction: column;

}

.follow_profile {
  position: relative;
  flex-grow: 1; /* 标题占据剩余空间 */
  margin: 0;
  margin-right:20px ;
  font-size: small;
  color: #333;
  text-align: left;
}

.special{
  margin: auto;
}

.mutualFollowing{
  font-weight: bold;
  color: rgb(8, 176, 84);
}
.fan{
  font-weight: bold;
  color: pink;
}
.follow{
  font-weight: bold;
  color: rgba(0, 145, 255, 0.979);
}
</style>
