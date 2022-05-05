<template>
  <div> 
    <mu-container class="a">
    <h2>登陆</h2>
    <mu-form ref="form" :model="validateForm" class="mu-demo-form a">
        <mu-form-item label="用户名" help-text="请输入用户名" prop="username" :rules="usernameRules">
        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
<router-link :to="{ path: '/register' }" class="b clearfix">点击注册账号</router-link>        
<br>
        <mu-form-item>
        <mu-button color="primary" @click="submit">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
    </mu-form>
    </mu-container>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
      ],
      validateForm: {
        username: '',
        password: '',
      },
      token:'',
      userId:'',
    }
  },
  methods: {
    submit () {
      var _this=this;
      this.$refs.form.validate().then((result) => {
        //console.log(this.validateForm);
        if(this.validateForm.password&&this.validateForm.username !== '') {
        axios.post('/user/userLogin?password='+this.validateForm.password+'&username='+this.validateForm.username).then(
            function(res) {
                console.log(res.data);
                if (res.data.code === 401) {
                  alert('账号或密码错误，请重新输入')
                } else {
                _this.token=res.data.data.token;
                _this.userId=res.data.data.userID;
                localStorage.setItem('token',_this.token);
                localStorage.setItem('username',_this.validateForm.username)
                localStorage.setItem('userId',_this.userId)
                alert('登陆成功');
                _this.$router.push('/home');
                location.reload()
                }

            }
            )
            .catch();
        }

      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
      };
    }
  },

};
</script>

<style>
.a {
    margin: 50px auto;
}
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.b {
  float: left;
  color: #0000FF;
}
</style>