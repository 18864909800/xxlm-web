<template>
	<Layout>
		<PageHeader  />
		
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
								<!--修改头像  -->
								<label class="font-weight-bold d-inline mr-2" style="font-size: 18px">
									{{title}}
								</label>
								<!-- /修改头像 -->
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
			<div class="col-12">
				<!-- begin card -->
				<div class="card">
					<!-- begin card-body -->
					<div class="card-body">
						<!--begin  align-items-center -->
						<div class="row align-items-center">
							<!--beigin col  -->
							<div class="col-6 image">
								<!-- 头像展示 -->
								<div class="demo-type image-item">
									<el-avatar :size="120" >
										<img :src="dialogImageUrl"/>
									</el-avatar>
								</div>
								<!-- /头像展示 -->

								<!-- 分割线 -->
								<div data-v-15325571="" class="border-line"></div>

								<!-- 上传头像 -->
								 <el-upload
									class="avatar-uploader image-item"
									action="http://localhost:8081/user/upload-user-head/"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:on-remove="handleRemove"
									:before-upload="beforeAvatarUpload">
									
									<span v-if="dialogImageUrl" class="el-upload-action" @click.stop="handleRemove">
										<i class="el-icon-delete"></i>
									</span>
									<i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
								</el-upload>
								<!-- /上传头像 -->

							</div>
							<!--/ end col  -->
							<!-- 提交 -->
							<div class="save col-2">
								<!-- 保存 -->
								<b-button type="button" variant="btn btn-primary col-10  save" @click="beforeUpload">更新</b-button>
								<!-- /保存 -->

								<!-- 弹框 -->
								<b-modal v-model="show" title="确认" title-class="font-18">
									
									<p>确认修改吗？</p>
									
									<template v-slot:modal-footer>
										<b-button variant="light" @click="cancel">关闭</b-button>
										<b-button variant="primary" @click="update">保存</b-button>
									</template>
								</b-modal>
								<!-- /弹框 -->
							</div>
							<!-- 提交 -->
							
						</div>
						<!--/end align-items-center -->
					</div>
					<!-- /end card-body -->
				</div>
				<!-- /end card -->
			</div>
		</div>
		<!-- /box -->

		

	</Layout>
</template>


<script>
	import Layout from '@layouts/main'
	import PageHeader from '@components/page-header'
    import axios from './../../../../../utils/http'
	import querystring from 'querystring'

	/**
	 * 修改头像模块
	 */
	export default {
		components: { Layout, PageHeader },
		data() {
			return {
				title: '修改头像',

				// 头像地址
				dialogImageUrl: '',

				// 弹出框展示
				show: false,
			}
		},
		 methods: {

			 // 移除图片方法
			handleRemove() {
				this.dialogImageUrl = ''
			},

			// 上传成功回调
			handleAvatarSuccess(res, file) {
				this.dialogImageUrl = res.data;
			},

			// 上传前格式和图片大小限制
			beforeAvatarUpload(file) {
				const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
				const isLt2M = file.size / 1024 / 1024 < 2
				if (!type) {
					this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!')
				}
				return type && isLt2M
			},

			// 成功提示 
			success(){
				this.show = false;
				this.$message({
						type: 'success',
						message: '上传头像成功!'
				});
			},

			// 取消提示
			cancel(){
				this.show = false;
				this.$message({
						type: 'info',
						message: '已取消'
				});  
			},

			// 点击更新前判断是否上传
			beforeUpload(){
				if (this.dialogImageUrl) {
					this.show = true
				}else{
					this.$message({
						type: 'error',
						message: '请先上传'
					}); 
				}
				
			},

			// 更新方法
			update() {
				const that = this;

				// 调用接口
				axios({
					method: 'post',
					url: 'http://localhost:8081/user/change-user-head/',
					data: querystring.stringify({
						"userHeadUrl": this.dialogImageUrl
					})
				})
				.then(function (response) {
					if (response.data.data) {	
						// 更新成功提示
						that.success();
						that.dialogImageUrl = '';
						// 修改完头像一秒后自动刷新
						setTimeout(function () {
							window.location.reload(true);
						},1000);
					}else{
						console.log("失败")
					}

					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			
			},
			throttle(func, wait) {
				let previous = 0;
				return function() {
					let now = Date.now();
					let context = this;
					let args = arguments;
					if (now - previous > wait) {
						func.apply(context, args);
						previous = now;
					}
				}
			},
			 
		}
	}
</script>

<style lang='scss' scoped>
	.avatar-uploader{
		width: 120PX;
		height: 120px;
		border-radius: 50%;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		background-size: 100% 100%;
		background-color: gray;
	}
	.avatar-uploader-icon{
		font-size: 0;
		color: #fff;
		width: 120px;
		height: 120px;
		line-height: 120px;
		text-align: center;
		font-size: 28px;
	}
	.avatar-uploader-icon:hover{
		font-size: 28px;
		background-color: rgba(0, 0, 0, .3);
	}
	.avatar {
		position: relative;
		width: 120px;
		height: 120px;
		display: block;
	}
	.el-upload-action {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		font-size: 0;
		color: #fff;
		text-align: center;
		line-height: 120px;
	}
	.el-upload-action:hover {
		font-size: 20px;
		background-color: #000;
		background-color: rgba(0, 0, 0, .3)
	}
	.box{
		position: relative;
		height: 500px;
		.card{
			height: 100%;
		}
	}
	.image{
		display: flex;
		margin: 5% 35%;
		.image-item{
			margin: 1% 5%;
		}
	}
	.border-line[data-v-15325571] {
		height: 150px;
		width: 1px;
		background: #e5e9ef;
		float: left;
	}
	.save{
		margin-bottom: 2px;
		width: 100%;
		position: absolute;
		bottom: 25%;
		right: 36%;
	}
</style>




