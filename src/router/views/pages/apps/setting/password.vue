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
								<!--签到记录  -->
								<label class="font-weight-bold d-inline mr-2" style="font-size: 18px">
									{{title}}
								</label>
								<!-- /签到记录 -->
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
								<b-row class="col-12 item">
									<b-col sm="3" class="label">
										<label for="inputOldPassword">旧密码</label>
									</b-col>
									<b-col sm="9">
										<b-form-input
											id="inputOldPassword"
											type="password"
											placeholder="Old Password"
											v-model="old"
										></b-form-input>
									</b-col>
								</b-row>
								<!-- /输入旧密码 -->

								<!-- 输入新密码 -->
								<b-row class="col-12 item">
									<b-col sm="3" class="label">
										<label for="inputNewPassword">新密码</label>
									</b-col>
									<b-col sm="9">
										<b-form-input
											id="inputNewPassword"
											type="password"
											placeholder="New Password"
											v-model="newP"
										></b-form-input>
									</b-col>
								</b-row>
								<!-- /输入新密码 -->

								<!-- 确认密码 -->
								<b-row class="col-12 item">
									<b-col sm="3" class="label">
										<label for="confirmPassword">确认密码</label>
									</b-col>
									<b-col sm="9">
										<b-form-input
											id="confirmPassword"
											type="password"
											placeholder="Confirm Password"
											v-model="confirm"
										></b-form-input>
									</b-col>
								</b-row>
								<!-- /确认密码 -->

							</div>
							<!-- /填写表单 -->

							<!-- 提交 -->
							<div class="save col-4">
								<!-- 保存 -->
								<b-button type="button" variant="btn btn-primary col-10  save" @click="show = true">更新</b-button>
								<!-- 弹框 -->
								<b-modal v-model="show" title="确认" title-class="font-18">
									
									<p>确认修改吗？</p>
									
									<template v-slot:modal-footer>
										<b-button variant="light" @click="cancel">关闭</b-button>
										<b-button variant="primary" @click="success">保存</b-button>
									</template>
								</b-modal>
								<!-- /弹框 -->
								<!-- /保存 -->
							</div>
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
		position: absolute;
		top: -5%;
		right: 0%;
	}
	.card{
		height: 100%;
	}
	.item{
		margin: 1% 1%;
	}

   .save{
		margin-bottom: 2px;
		width: 100%;
		position: absolute;
		bottom: 15%;
		right: 40%;
	}
	.label{
		padding: 10px 2px;
	}

}
</style>

<script>
	import Layout from '@layouts/main'
	import PageHeader from '@components/page-header'

	/**
	 * Starter component
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
			}
		},
		methods:{
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
						message: '修改成功!'
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
			// 提交密码
			postPassword(){
				
			}
		}
	}
</script>


