<template>
  <div>
<mu-paper :z-depth="1" class="demo-list-wrap">
  <mu-list class="list">
    <mu-list-item button :ripple="false" @click="toBulletinSystem">
      <mu-list-item-action>
        <i class="fa fa-cog" style="font-size:24px;margin-left:5px"></i>
      </mu-list-item-action>
      <mu-list-item-title>公告设置</mu-list-item-title>
    </mu-list-item>
    <mu-list-item button :ripple="false" @click="toArticleSystem">
      <mu-list-item-action>
        <i class="fa fa-cog" style="font-size:24px;margin-left:5px"></i>
      </mu-list-item-action>
      <mu-list-item-title>文章设置</mu-list-item-title>
    </mu-list-item>
    <mu-list-item button :ripple="false" @click="toCommentSystem">
      <mu-list-item-action>
        <i class="fa fa-cog" style="font-size:24px;margin-left:5px"></i>
      </mu-list-item-action>
      <mu-list-item-title>大厅留言板设置</mu-list-item-title>
    </mu-list-item>
    <mu-list-item button :ripple="false" @click="toUserSystem">
      <mu-list-item-action>
        <i class="fa fa-cog" style="font-size:24px;margin-left:5px"></i>
      </mu-list-item-action>
      <mu-list-item-title>用户设置</mu-list-item-title>
    </mu-list-item>
  </mu-list>
</mu-paper>
<router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toBulletinSystem() {
      this.$router.push('/system/bulletinSystem')
    },
    toArticleSystem() {
      this.$router.push('/system/articleSystem')
    },
    toCommentSystem() {
      this.$router.push('/system/commentSystem')
    },
    toUserSystem() {
      this.$router.push('/system/userSystem')
    },
  }
};
</script>

<style>
.demo-list-wrap {
  float: left;
  height: 100%;
  position: absolute;
  width: 15%;
  max-width: 360px;
  background-color: #fff;
  }
</style>