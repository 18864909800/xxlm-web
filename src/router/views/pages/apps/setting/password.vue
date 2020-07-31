<template>
	<Layout>
		<PageHeader />
		
		<!-- 标题 -->
		<div class="row">
			<div class="col-12">
				<!-- begin card -->
				<div class="card">
					<!-- begin card-body -->
					<div class="card-body">
						<!--begin  align-items-center -->
						<div class="row align-items-center">
							<!--beigin col  -->
							<div class="col">
								<!--修改密码  -->
								<label class="font-weight-bold d-inline mr-2" style="font-size: 18px">
									{{title}}
								</label>
								<!-- /修改密码 -->
							</div>
							<!--/ end col  -->
						</div>
						<!--/end align-items-center -->
					</div>
					<!-- /end card-body -->
				</div>
				<!-- /end card -->
			</div>
		</div>
		<!-- /标题 -->

		<!-- box -->
		<div class="row box">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<!-- 表单 -->
						<form class="form-inline form">

							<!-- 填写表单 -->
							<div class="form-group col-12">

								<!-- 输入旧密码 -->
								<div class="item col-12">
									<b-row class="col-12">
										<b-col sm="3"></b-col>
										<b-col sm="3" class="label">
											<label for="inputOldPassword">旧密码：</label>
										</b-col>
										<b-col sm="3">
											<b-form-input
												id="inputOldPassword"
												type="password"
												placeholder="Old Password"
												v-model="old"
											></b-form-input>
										</b-col>
										<b-col sm="3"></b-col>
									</b-row>
									<div class="errorBox">
									</div>
								</div>
								<!-- /输入旧密码 -->

								<!-- 输入新密码 -->
								<div class="item col-12">
									<b-row class="col-12">
										<b-col sm="3"></b-col>
										<b-col sm="3" class="label">
											<label for="inputNewPassword">新密码：</label>
										</b-col>
										<b-col sm="3">
											<b-form-input
												id="inputNewPassword"
												type="password"
												placeholder="New Password"
												v-model="newP"
											></b-form-input>
										</b-col>
										<b-col sm="3"></b-col>
									
									</b-row>
									
									<b-row>
										<b-col sm="6"></b-col>
										<b-col sm="3" class="errorBox">
											<!-- v-if="newP" -->
											<span v-if="newP" class="errorText">{{passwordValidate.errorText}}</span>
										</b-col>
									</b-row>
								</div>
								<!-- /输入新密码 -->

								<!-- 确认密码 -->
								<div class="item col-12">
									<b-row class="col-12">
										
										<b-col sm="3"></b-col>
										<b-col sm="3" class="label">
											<label for="confirmPassword">确认密码：</label>
										</b-col>
										<b-col sm="3">
											<b-form-input
												id="confirmPassword"
												type="password"
												placeholder="Confirm Password"
												v-model="confirm"
											></b-form-input>
										</b-col>
										<b-col sm="3"></b-col>
										
									</b-row>
									<b-row>
										<b-col sm="6"></b-col>
										<b-col sm="3" class="errorBox">
											<!-- v-if="confirm"  -->
											<span v-if="confirm" class="errorText">{{passwordCheckValidate.errorText}}</span>
										</b-col>
									</b-row>
								</div>
								<!-- /确认密码 -->

							</div>
							<!-- /填写表单 -->

							<b-row sm="col-4" class="col-5"></b-row>
							<!-- 提交 -->
							<b-row sm="col-4" class="col-4">
								<!-- 保存 -->
								<div class="button-list col-12 save">
									<b-button type="button" variant="btn btn-primary col-12" @click="test">更新</b-button>
								</div>
								<!-- /保存 -->

								<!-- 弹框 -->
								<b-modal v-model="show" title="确认" title-class="font-18">
									
									<p>确认修改吗？</p>
									
									<template v-slot:modal-footer>
										<b-button variant="light" @click="cancel">关闭</b-button>
										<b-button variant="primary" @click="postPassword">保存</b-button>
									</template>
								</b-modal>
								<!-- /弹框 -->
							</b-row>
							<!-- 提交 -->
						</form>
						<!-- /表单 -->
					</div>
				<!-- end card-body -->
				</div>
				<!-- end card -->
			</div>
		</div>
		<!-- /box -->
	</Layout>
</template>

<style lang='scss' scoped>
.box{
	height: 500px;
	position: relative;
	.form{
		height: 100%;
		width: 100%;
		position: absolute;
		top: 5%;
		right: 0%;
	}
	.form-control{
		width: 100%;
	}
	.card{
		height: 100%;
	}
	.item{
		margin: 1% 1%;
	}

   .save{
		position: absolute;
		bottom: 30%;
	}
	.label{
		padding: 10px 2px;
	}
	.errorBox{
		text-align: right;
		height: 20px;
		padding: 0 35px;
		color: red;
		.errorTest{
			float: right;
		}
	}

}
</style>

<script>
	import Layout from '@layouts/main'
	import PageHeader from '@components/page-header'
	import axios from './../../../../../utils/http'
	import querystring from 'querystring'

	/**
	 * 修改密码模块
	 */
	export default {

		components: { Layout, PageHeader },
		data() {
			return {
				title: '修改密码',

				// 表单数据
				old : '',
				newP : '',
				confirm : '',

				// 弹出展示
				show: false,

				// 空
				oldError: '',
				newPError: '',
				confirmError: '',
			}
		},

		// 表单验证
		computed : {

			// 新密码验证
			passwordValidate: function() {
				let errorText;
				if(!/^[0-9A-Za-z]{3,15}$/.test(this.newP)) {
					errorText = '* 密码少于3位';
				} else {
					errorText = '';
				}

				return {
					errorText
				}
			},

			// 检验密码验证
			passwordCheckValidate: function() {
				let errorText;

				if(!/^[0-9A-Za-z]{3,15}$/.test(this.confirm)) {
					errorText = '* 密码少于3位';
				}else if(this.newP !==this.confirm ){
					errorText = '* 两次密码不匹配';
				}
				else {
					errorText = '';
				}
				
				return {
					errorText
				}
			}
		},
		methods:{
			// 表单是否为空校验
			test(){
				if (this.old === '' || this.newP === '' || this.confirm === '') {
					this.$message({
						type: 'error',
						message: "请完善表单信息！"
					});
				}else{
					this.show = true;
				}
				
			},
			// 重置表单
			reset(){
				this.old = '';
				this.newP = '';
				this.confirm = '';
			},
			// 成功提示
			success(){
				console.log('成功！')
				this.reset();
				this.show = false;
				this.$message({
						type: 'success',
						message: "密码修改成功！"
				});
			},
			// 取消提示
			cancel(){
				this.reset();
				console.log('失败！')
				this.show = false;
				this.$message({
						type: 'info',
						message: '已取消'
				});  
			},
			// 修改错误警告
			postErro(){
				this.show = false;
				this.$message({
						type: 'error',
						message: "修改失败！"
				});  
			},
			// 旧密码错误警告
			pwdErro(){
				this.show = false;
				this.$message({
						type: 'error',
						message: "您输入的旧密码有误！"
				});  
			},
			// 提交密码
			postPassword(){
				console.log("hi")
				const old = this.old;
				const newP = this.newP;

				const that = this;

				// 发送 POST 请求
				axios({
					method: 'post',
					url: 'http://localhost:8080/user/change-normal-user-password/',
					data: querystring.stringify({
						"oldPassword": old,
						"newPassword": newP
					})
				})
					.then(function (response) {
						console.log(response.data.data);
						if (!response.data.data) {
							that.pwdErro();
						}
						else{
						console.log(response.data.data);
							// 修改成功
							that.success();
						}

						console.log(response);
					})
					.catch(function (error) {
						// 修改失败提示
						that.postErro();

						console.log(error);
					});
						
				
			}, 
		}
	}
</script>


