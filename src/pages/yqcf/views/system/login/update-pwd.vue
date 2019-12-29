<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    destroy-on-close
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="30%"
    @close="handleClose">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入原密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input v-model="form.newPass" placeholder="请输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="checkNewPass">
        <el-input v-model="form.checkNewPass" placeholder="请再次输入新密码" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary"  @click="submitForm('form')">确定修改</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'update-pwd',
  props: {
    show: Boolean
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      }
    }
  },
  data() {
    const validateNewPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkNewPass) {
          this.$refs.form.validateField('checkNewPass');
        }
        callback();
      }
    };
    const validateCheckNewPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      form: {
        username: '',
        password: '',
        newPass: '',
        checkNewPass: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPass: [
          { required: true, validator: validateNewPass, trigger: ['blur', 'change'] }
        ],
        checkNewPass: [
          { required: true, validator: validateCheckNewPass, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO: 修改密码接口
        } else {
          this.$message.warning('修改信息有误，请检查!');
          return false;
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
