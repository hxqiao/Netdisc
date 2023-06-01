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
						<div class="u-button bd-login-button__wrapper">
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
</template>

<script setup lang="ts">
// <img :src="require('@/assets/login-banner.png')" alt="">
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

    .main-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .bd-login-content {
        width: 366px;
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
</style>