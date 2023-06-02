<template>
  <div class="main">
    <header class="u-header">
      <div class="bd-header bd-login-header">
        <div class="bd-login-header__out">
          <div class="bd-left-header">
            <img src="../../assets/wp-logo.png" alt="" />
          </div>
          <div class="bd-right-header">
            <a href="http://www.baidu.com" target="blank">百度首页</a>
            <a href="http://www.baidu.com" target="blank">官方微博</a>
            <a href="http://www.baidu.com" target="blank">问题反馈</a>
            <a href="http://www.baidu.com" target="blank">会员中心</a>
          </div>
        </div>
      </div>
    </header>
    <main class="u-main">
      <div class="main-content">
        <div class="bd-login-content">
          <div class="bd-login-content__wrapper">
            <div>记录每一份热爱</div>
            <div>让美好永远陪伴</div>
          </div>
          <p>
            为你电脑/手机中的文件提供云备份、预览、分享等服务，帮你更便捷安全地管理数据。
          </p>
          <div class="bd-login-button bd-login-content__login">
            <div class="u-button bd-login-button__wrapper" @click="openLoginDialog()">
              去登录
            </div>
          </div>
        </div>
        <div class="bd-login-banner-image">
          <img src="../../assets/login-banner.png" alt="" />
        </div>
      </div>
    </main>
  </div>
  <el-dialog
    v-model="dialogVisible"
    append-to-body
    width="600px"
    custom-class="loginDialog"
  >
    <div class="pass-login-pop-content">
      <el-tabs
        v-model="loginType"
        class="login-tabs"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="账号登录" name="account">
          <div class="account_content">
						<el-form
							ref="ruleFormRef"
							:model="ruleForm"
							:rules="rules"
							label-width="120px"
							class="demo-ruleForm"
							:size="formSize"
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
        </el-tab-pane>
        <el-tab-pane label="扫码登录" name="qr">
          <div class="qr_content">
            <div class="content_img">
              <img src="../../assets/qrcode.png" alt="" />
              <img src="../../assets/phone-scan-case.png" alt="" />
            </div>
            <p class="content_tip">
              最新版百度网盘App-「我的」页面右上角-扫一扫
            </p>
					</div>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="sma"></el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { login, logout } from '@/api/login.js';
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router';

const loginType = ref<"account" | "qr" | "sms">("account");

function handleClick() {}

const dialogVisible = ref<false | true>(false);

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
	password: ''
})

// const username = ref<string>('')
// const password = ref<string>('')

// 打开登陆弹窗
function openLoginDialog() {
  dialogVisible.value = true
  // ElMessageBox.confirm("Are you sure to close this dialog?").then(() => {});
}

const rules = reactive<FormRules>({
	username: [
    { required: true, message: '请您输入手机号/用户名/邮箱', trigger: 'blur' }
  ],
	password: [
    { required: true, message: '请您输入密码', trigger: 'blur' }
  ],
})


const router = useRouter()
const clickLogin = async (formEl: FormInstance | undefined) => {
	console.log(formEl);
	
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
			const { password, username } = ruleForm
			login({
				username: username,
				password: password
			}).then(() => {
				router.push({
					path: '/home'
				})
			})
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  height: calc(100vh - 60px);
  max-height: 900px;
  min-height: 700px;
  flex-direction: column;
  .u-header {
    height: 56px;
    user-select: none;
    .bd-header {
      height: 100%;
      padding: 0 40px;
      .bd-login-header__out {
        height: 100%;
        display: flex;
        justify-content: space-between;
        .bd-left-header {
          width: 140px;
          height: 100%;
          display: flex;
          img {
            width: 100%;
            object-fit: contain;
          }
        }
        .bd-right-header {
          display: flex;
          a {
            text-decoration: none;
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #000;
            cursor: pointer;
          }
        }
      }
    }
  }
  .u-main {
    height: 100%;
    padding: 20px;
    user-select: none;

    .main-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .bd-login-content {
        width: 366px;
        user-select: none;
        .bd-login-content__wrapper {
          font-size: 48px;
          font-weight: bold;
        }
        p {
          font-size: 18px;
          line-height: 30px;
        }
        .bd-login-button {
          .u-button {
            height: 50px;
            width: 180px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #06a7ff;
            color: #fff;
            border-radius: 25px;
            font-size: 22px;
            cursor: pointer;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
      .bd-login-banner-image {
        flex: 0.7;
        img {
          width: 100%;
        }
      }
    }
  }
}
.loginDialog {
  .el-dialog__header {
    padding: 0;
  }
}
.pass-login-pop-content {
  height: 390px;
  background: url("../../assets/login-aside.png") no-repeat left center / 188px
    100%;
  border-radius: 16px 0 0 16px;
  padding-left: 188px;
  .login-tabs {
    user-select: none;
    width: calc(100%);
    ::v-deep(.el-tabs__nav-scroll) {
      height: 110px;
      &::after {
        height: 0;
        opacity: 0;
        background-color: #fff;
      }
    }
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
    .qr_content {
			padding: 20px;
      .content_img {
        display: flex;
        img {
          width: 50%;
        }
      }
      .content_tip {
        text-align: center;
      }
		}
  }
}
</style>