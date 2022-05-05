<template>
  <div>
     <mu-appbar style="width: 100%;" color="primary">
  <mu-button icon slot="left" @click="toHome">
    <i class="fa fa-home" style="font-size:35px;"></i>
  </mu-button>
  学习使我快乐
  <mu-button flat slot="right" @click="toLogin" v-if="showOne">
    登陆/注册
  </mu-button>
    <mu-menu slot="right"  v-if="showTwo">
      <mu-button flat>hi,{{username}}</mu-button>
      <mu-list slot="content">
        <mu-list-item button @click="quit">
          <mu-list-item-content>
            <mu-list-item-title>退出登陆</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button @click="toSystem">
          <mu-list-item-content>
            <mu-list-item-title>进入控制界面</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>
</mu-appbar>
  </div>
</template>

<script>
export default {
  data() {
  return {
    username:'',
    showOne: true,
    showTwo: false,
  }
},
  methods:{
    toLogin() {
      this.$router.push('/login')
    },
    toHome() {
      this.$router.push('/home')
    },
    quit() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      this.username='',
      location.reload()
    },
    toSystem() {
      this.$router.push('/system')
    }
  },
  mounted() {
  this.username = localStorage.getItem("username");
  if(this.username === ''||this.username==null) {
    this.showOne=true;
    this.showTwo=false;
  } else {
    this.showOne=false;
    this.showTwo=true;
  }
},
}
</script>

<style>

</style>