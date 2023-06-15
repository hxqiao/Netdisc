<template>
  <div class="account_content">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item label="" label-width="0" prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="手机号/邮箱/用户名"
          size="large"
          class="user"
        />
      </el-form-item>
      <el-form-item label="" label-width="0" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="密码"
          show-password
          size="large"
          class="password"
        />
      </el-form-item>
      <el-button class="act_login" type="primary" round size="large" @click="clickLogin(ruleFormRef)">
        登录
      </el-button>
      <p>阅读并接受<a target="_blank" href="http://passport.baidu.com/static/passpc-account/html/protocal.html">百度用户协议</a> 和 <a target="_blank" href="http://privacy.baidu.com/policy">隐私政策</a></p>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Storage } from '@/utils/Storage';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { loginApi } from '@/api/login/index';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
	password: ''
})

const rules = reactive<FormRules>({
	username: [
    { required: true, message: '请您输入手机号/用户名/邮箱', trigger: 'blur' }
  ],
	password: [
    { required: true, message: '请您输入密码', trigger: 'blur' }
  ],
})

const clickLogin = async (formEl: FormInstance | undefined) => {
	
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
			const { password, username } = ruleForm
			const { token } = await loginApi({
				username: username,
				password: password
			})
      
      Storage.set(ACCESS_TOKEN_KEY, token);
			router.push({
        path: '/home'
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.account_content {
  padding: 20px;
  .user {
    width: 100%;
  }
  .password {
    margin-top: 10px;
    width: 100%;
  }
  .act_login {
    width: 100%;
    margin-top: 30px;
  }
  p {
    text-align: center;
  }
  a {
    text-decoration: none;
  }
}
</style>