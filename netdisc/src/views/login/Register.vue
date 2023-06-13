<template>
  <div class="register_content">
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
      <el-button class="act_login" type="primary" round size="large" @click="clickRegister(ruleFormRef)">
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
import { registerApi } from '@/api/login.js';
import { useRouter } from 'vue-router';

const router = useRouter()

const emit = defineEmits(['success'])

const rules = reactive<FormRules>({
	username: [
    { required: true, message: '请您输入手机号/用户名/邮箱', trigger: 'blur' }
  ],
	password: [
    { required: true, message: '请您输入密码', trigger: 'blur' }
  ],
})

const ruleForm = reactive({
  username: '',
	password: ''
})
const ruleFormRef = ref<FormInstance>()

const clickRegister = async (formEl: FormInstance | undefined) => {
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { password, username } = ruleForm
			const { username: user} = await registerApi({
				username: username,
				password: password
			})
      ElMessage({
        type: 'success',
        message: `用户${ user }注册成功！`
      })
      emit('success')
    }
  })
}

</script>

<style lang="scss" scoped>
.register_content {
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