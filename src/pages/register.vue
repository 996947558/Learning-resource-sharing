<template>
  <div>
    
    <mu-container class="a">
    <h2>注册</h2>
    <mu-form ref="form" :model="validateForm" class="mu-demo-form a">
        <mu-form-item label="用户名" help-text="请输入用户名" prop="username" :rules="usernameRules">
        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
        <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
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
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        username: '',
        password: '',
        isAgree: false
      },
      res:''
    }
  },
  methods: {
    submit () {
      var _this=this;
      this.$refs.form.validate().then((result) => {
        //console.log(this.validateForm);
        if (this.validateForm.isAgree) {
          if (this.validateForm.password&&this.validateForm.username !== '') {
              axios.post('/user/register?password='+this.validateForm.password+'&username='+this.validateForm.username).then(
              function(res) {
                  //console.log(res.data);
                  if(res.data === 'isOk') {
                      alert('注册成功')
                      _this.$router.push('/login')
                  } else {
                    alert('该用户已注册')
                  }
              }
              )
              .catch();
          }
        }

      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      };
    }
  }
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

</style>