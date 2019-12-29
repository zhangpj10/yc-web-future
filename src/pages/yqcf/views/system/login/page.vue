<template>
  <div class="login">
    <vue-particles
      color="#ffffff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#ffffff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="login-bg"
    >
    </vue-particles>
    <el-form
      :model="loginForm"
      ref="loginForm"
      :rules="loginRules"
      label-width="100px"
      class="login-form"
    >
      <h1 class="login-title">
        <i class="el-icon-s-platform"></i>
        后台登录
      </h1>

      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        prop="seccode"
        label="验证码"
      >
        <el-input
          v-model="loginForm.seccode"
          placeholder="验证码"
        >
          <template slot="append">
            <el-button style="width: 60px; color: #d49f55;" type="text" @click="createCode">{{ checkCode}}</el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
        <el-button type="text" style="color: #fff;" @click="openUpdatePwd">忘记密码？</el-button>
      </el-form-item>
    </el-form>
    <update-pwd :show.sync="showUpdatePwd"></update-pwd>
  </div>
</template>

<script>
import UpdatePwd from "./update-pwd";
import { mapActions } from 'vuex';

export default {
  name: 'page',
  components: {UpdatePwd},
  data() {
    const codeValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空！'));
      } else if (value !== this.checkCode) {
        callback(new Error('验证码不正确！'));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        seccode: ''
      },
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        seccode: [
          { required: true, validator: codeValidator, trigger: 'blur' }
        ]
      },
      checkCode: '',
      showUpdatePwd: false
    };
  },
  mounted() {
    this.createCode();
  },
  methods: {
    ...mapActions('yqadmin/account', [
      'login'
    ]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login(this.loginForm)
            .then(() => {
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/');
            });
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败');
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    createCode() {
      let code = '';
      const codeLength = 4; //验证码的长度
      const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
      for(let i = 0; i < codeLength; i++) { //循环操作
        let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.checkCode = code; //把code值赋给验证码
    },
    openUpdatePwd() {
      this.showUpdatePwd = true;
    }
  }
};
</script>

<style scoped lang="scss">
  .login {
    &-title {
      padding-left: 48px; //让变体居中 这里使用的是padding-left
    }
    &-form {
      width: 500px;
      height: 400px;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      padding: 20px;
      border: 2px solid #fff;
      border-radius: 15px;
    }
    &-bg {
      background-image: url("./image/bg.png");
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
     }
  }
</style>
