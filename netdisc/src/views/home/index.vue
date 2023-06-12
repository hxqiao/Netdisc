<template>
	<div class="main-layout">
		<div class="main-layout__container">
			<header class="u-header">
				<div class="bd-header bd-login-header">
					<div class="bd-login-header__out">
						<div class="bd-left-header">
							<img src="../../assets/wp-logo.png" alt="" />
						</div>
						<div class="bd-right-header">
							<div ref="buttonRef" class="bd-right__download" @click="onClickOutside()">
								<Svgicon icon="icon-download" />
							</div>
							<div style="margin-left: 10px;" @click="getMD5">
								<Svgicon icon="icon-copy" />
							</div>
						</div>
					</div>
				</div>
			</header>
			<el-popover
				ref="popoverRef"
				:virtual-ref="buttonRef"
				trigger="click"
				virtual-triggering
			>
				<el-progress :percentage="uploadPercentage" />
			</el-popover>
			<div class="main-layout__wrapper">
				<div class="aside-wp-block">
					<div class="aside-nav__main">
						<div class="aside-nav__main-top">
							<div v-for="item of navList" class="aside-nav__main_item">
								<img src="../../assets/icon-home-active..png" alt="">
								<p>
									{{ item.name }}
								</p>
							</div>
						</div>
						<div class="aside-nav__main-bottom">

						</div>
					</div>
					<MyFiles />
				</div>
				<div class="main-layout__body">
					<FilesList @get-progress="getProgress" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import MyFiles from './MyFiles.vue'
import FilesList from './FilesList.vue'

const navList = ref([
	{
		name: '首页',
		icon: ''
	},
	{
		name: '收发',
		icon: ''
	}, 
	{
		name: '同步',
		icon: ''
	}, 
	{
		name: '消息',
		icon: ''
	}, 
])

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const uploadPercentage = ref<number>(0)
function getProgress(percentage: number) {
	console.log('upload');
	buttonRef.value.click()
	uploadPercentage.value = percentage
}

function getMD5() {
	
}
</script>

<style lang="scss" scoped>
.main-layout {
	display: flex;
	height: 100vh;
	user-select: none;
	.main-layout__container {
		flex: 1;
		
		.u-header {
			height: 56px;
			user-select: none;
			box-shadow: -7px 3px 10px 0 rgba(0,0,0,.06);
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
						align-items: center;
						cursor: pointer;
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

		.main-layout__wrapper {
			height: calc(100% - 56px);
			overflow: hidden;
			width: 100%;
			.aside-wp-block {
				height: 100%;
				display: inline-block;
				overflow: hidden;
				.aside-nav__main {
					width: 80px;
					height: 100%;
					display: inline-flex;
					box-shadow: 0 3px 10px 0 rgba(0,0,0,.06);
					vertical-align: middle;
					flex-direction: column;
					.aside-nav__main-top {
						position: relative;
						width: 100%;
						background-color: #FFF;
						.aside-nav__main_item {
							position: relative;
							text-align: center;
							margin-top: 30px;
							cursor: pointer;
							img {
								width: 36px;
								display: inline-block;
							}
							p {
								margin-top: 6px;
								margin-bottom: 0;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								font-size: 12px;
							}
						}
					}
					.aside-nav__main-bottom {
						width: 100%;
						height: 100px;
					}
				}
			}
			.main-layout__body {
				height: 100%;
				display: inline-block;
				width: calc(100% - 280px);
				overflow: hidden;
			}
		}
	}
}
</style>