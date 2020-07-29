<script>
	import Layout from '@layouts/main'
	import PageHeader from '@components/page-header'
	import Member from './teamMates/member'
	import Activity from './teamMates/activities/activities'
	import axios from '../../../../../utils/http'
	import {
		uPublishTends,
		uDurationTends,
		uPublishPie,
		uAttendancePie
	}from './../signin/records'


	/**
	 * Starter component
	 */
	export default {

		components: 
		{ 
			Layout,
			PageHeader,
			Member,
			Activity
		 },
		data() {
			return {
				title: '我的团队',

				// 时间线
				signRecords: [],
				blogRecords: [],
				assetRecords: [],

				// 图表
				uPublishTends: uPublishTends,
				uDurationTends:  uDurationTends,
				uPublishPie: uPublishPie,
				uAttendancePie: uAttendancePie,

				// 当前日期
				value: new Date(),
				calendarData: [],

				// 成员数据
				membersData: [],
				selectedMember: '',
				isActive: false,

				// 博客，资料数据
				 tabOptions: [
						{
							id: 0,
							tab: '全部'
						},

				],
				 dataList: [
					{
						id: 1,
						title: '标题1',
						name: '赵如冰',
						date: 'Jan 16, 2019',
						text: '描述',
						address: 'http://www.baidu.com',
						hits: 7,
						groupId: 1,
					},

				],
			}
		},
		computed:{

		},
		mounted(){
			// 挂载时加载团队成员
			this.getMembers();
			// 加载时间线
			this.getActivity();
		},
		methods:{

			/**
			 * @method 获取成员
			 * @description 获取团队成员，加载到memberData里
			 **/
 			getMembers(){
				axios.get('http://localhost:8081/user/select-all-normal-users').
				then((response) =>{
					let data = response.data.data;
					let arr = Object.values(data);
					for (let i = 0; i < arr.length; i++) {
						for (let j = 0; j < arr[i].length; j++) {
							// 加载到memberData里
							this.membersData.push({
								userId: arr[i][j].userId,
								userHead: arr[i][j].userHead,
								name: arr[i][j].name,
								userSex: arr[i][j].userSex === 1 ? "男" : "女",
								isSelected: i === 0
							})

						}
					}
					this.selectedMember = this.membersData[0];
				})
				return this.selectedMember;
			},

			/**
			 * @method changeMember 点击团队成员事件
			 * @description 切换选中成员触发的事件。包括改颜色，切换时间线
 			 */
			changeMember(member){
				// 改变背景颜色
				this.selectedMember.isSelected = false;
				this.selectedMember = member;
				this.selectedMember.isSelected = true;
				// Tab键切换到时间线
				this.getActivity();
			},

			/**
			 * @method 获取时间线
			 * @description 获取实验室成员签到签退，发布博客，发布资料时间线
			 **/
			async getActivity(){
				// 获取签到签退时间线
				await axios.get('http://localhost:8081/sign-in/select-time-line')
				.then(async response => {
					let data = response.data.data;
					// 接口数据映射
					for (let i = 0; i<data.length; i++){
						await  this.getName(data[i].umId).then(res =>{
							let title = data[i].simType === 0 ? ' 签到' : ' 签退';
							this.signRecords.push({
								ID: i,
								useId: data[i].umId,
								selectedId: this.selectedMember.userId,
								time: data[i].simDateExact,
								title: res +' '+ title,
								text: res + '在 ' + data[i].simDateExact + title
							})
						});
					}
				}).catch(error => {
					console.log(error);
				});
				// 获取博客发布时间线
				await axios.get('http://localhost:8081/blog/select-blog-line')
				.then(async response => {
					let data = response.data.data;
					// 接口数据映射
					for (let i = 0; i<data.length; i++){
						await  this.getName(data[i].umId).then(res =>{
							let title = ' 发布了博客';
							this.blogRecords.push({
								ID: i,
								time: data[i].bdDate,
								title: res +' '+ title,
								text: res + '在 ' + data[i].bdDate + title
							})
						});
					}
				}).catch(error => {
					console.log(error);
				});
				// 获取资料分享时间线
				await axios.get('http://localhost:8081/assets/select-assets-line')
				.then(async response => {
					let data = response.data.data;
					// 接口数据映射
					for (let i = 0; i<data.length; i++){
						await  this.getName(data[i].umId).then(res =>{
							let title = ' 分享了资料';
							this.assetRecords.push({
								ID: i,
								time: data[i].acDate,
								title: res +' '+ title,
								text: res + '在 ' + data[i].acDate + title
							})
						});
					}
				}).catch(error => {
					console.log(error);
				});
			},
			/**
			 * @method 获取用户姓名方法
			 * @param {number} id
			 * @return {Promise} data
			 * @description 根据id查询用户姓名，返回的是一个promise对象
			 **/
			async getName(id){
				console.log("getName，查询id" + id);
				let data;
				await axios.get('http://localhost:8081/user/get-name-by-Id',{
					params:{userId: id}
				}).then((response) => {
					data = response.data.data;
					// console.log(response.data.data);
				}).catch((error) => {
					console.log(error);
				});
				return data;
			},

			/**
			 * @method 根据id获取指定用户的签到日历
			 * @param id 指定用户id
			 */
			getCalendar(id){
				let ID = parseInt(id);
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;

				axios.get('http://localhost:8081/sign-in/select-assign-user-calendar',{
					params: {
						userId: ID,
						year: year,
						month: month
					}
				}).then((response) => {
					this.calendarData = response.data.data;
					console.log(response.data.data);
				}).catch((error) => {
					console.log(error);
				});
			},

			// TODO blog 查看某个用户的博客
			getBlog(id){},

			// TODO asset 查看某个用户的资料
			getAsset(id){},

			// TODO charts 查看某个用户的签到统计
			getCharts(id){},
		},
	}
</script>

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


		<div class="row box">

			<!-- 团队成员 -->
			
			<div class="col-xl-3 members">
				
				<el-scrollbar style="width: 100%;height: 700px;">
					<div class="card members">
						<div class="card-body pt-2 pb-2">
							<h5 class="mb-4 header-title">团队成员</h5>
							<!-- 循环member数组 -->
							<div 
								v-for="member of membersData" 
								:key="member.userId"
								@click="changeMember(member)"
							>
								<!-- member组件 -->
								<Member
									:image="member.userHead"
									:name="member.name"
									:gender="member.userSex"
									:is-selected="member.isSelected"
								/>
								<!-- /member组件 -->
							</div>
							<!-- /循环member数组 -->
						</div>
					</div>
				</el-scrollbar>
			</div>
		
			<!-- /团队成员 -->
			
			<!-- 详细信息 -->
			<div class="col-lg-9 detail">
				<div class="card">
					<div class="card-body">
						<b-tabs class="navtab-bg" pills justified>
							<b-tab
									title="时间线"
								   active
								   @click="getActivity(selectedMember.userId)"
							>
								<el-scrollbar style="width: 100%;height: 600px;">
									<Activity
											:signRecords = "signRecords"
											:assetRecords = "assetRecords"
											:blogRecords = "blogRecords"
									/>
								</el-scrollbar>
							</b-tab>
							<b-tab
									title="签到日历"
									@click="getCalendar(selectedMember.userId)"
							>
								<el-scrollbar style="width: 100%;height: 600px;">
									<el-calendar v-model="value">
										<template
												slot="dateCell"
												slot-scope="{date, data}"
										>
											<div class="item" v-for="item in calendarData">
												<div v-if="item.indexOf(data.day.split('-').slice(2)) !== -1">
													✔️
												</div>
											</div>
											<p :class="data.isSelected ? 'is-selected' : ''">
												{{ data.day.split('-').slice(1).join('-') }}
											</p>
										</template>
									</el-calendar>
								</el-scrollbar>
							</b-tab>
							<b-tab
									title="他的博客"
									@click="getBlog(selectedMember.userId)"
							>
								<div style="display: flex; justify-content: space-between; margin:0;">

									<el-scrollbar style="width: 75%;height: 600px;">
										<div class="row">
										<div class="col-12">
											<div class="board">
											<!-- todo tasks -->
											<div class="tasks border" style="width: 100%;margin-bottom: 0">
												<div id="task-list-two" class="task-list-items">
												<transition-group type="transition" :name="'flip-list'">
													<div v-for="(data,index) in dataList" :key="data.id"
														@click="noticeDetail(index)">
													<div class="card border mb-0">
														<div class="card-body p-3">

														<h6 class="mt-0 mb-2 font-size-15">
															<a href="javascript: void(0);"
															class="text-body">{{ data.title }}
															</a>
														</h6>

														<div>{{data.text}}</div>

														<a :href="data.address">{{data.address}}</a>

														<p class="mb-0 mt-2">
															<small class=" text-muted mr-2">
															{{data.name}}
															</small>

															<small class=" text-muted">
															{{ data.date }}
															</small>

															<span class="text-nowrap align-middle font-size-13 mr-2 float-right">
																							<i class="uil uil-eye text-muted mr-1"></i>
																							{{ data.hits }}
																						</span>
															<!--<span class="text-nowrap align-middle font-size-13 mr-2 float-right">-->
															<!--<i class="uil uil-trash-alt text-muted mr-1"></i>-->
															<!--</span>-->
														</p>
														</div>
													</div>
													</div>
												</transition-group>
												</div>
											</div>
											<!-- end - todo tasks -->
											</div>
										</div>
										</div>
									</el-scrollbar>

									<el-scrollbar class="card" style="width: 20%;height: 450px;">
										<el-menu v-for="item in tabOptions" :key="item.id" :default-active="tabOptions[0].id">
										<el-menu-item @click="menuSelect(item.id)">
											<span slot="title">{{item.tab}}</span>
										</el-menu-item>
										</el-menu>
									</el-scrollbar>

								</div>
							</b-tab>
							<b-tab
									title="他的资料"
									@click="getAsset(selectedMember.userId)"
							>
								<div style="display: flex; justify-content: space-between; margin:0;">

									<el-scrollbar style="width: 78%;height: 600px;">
										<div class="row">
										<div class="col-12">
											<div class="board">
											<!-- todo tasks -->
											<div class="tasks border" style="width: 100%;margin-bottom: 0">
												<div id="task-list-two" class="task-list-items">
												<transition-group type="transition" :name="'flip-list'">
													<div v-for="(data,index) in dataList" :key="data.id"
														@click="noticeDetail(index)">
													<div class="card border mb-0">
														<div class="card-body p-3">

														<h6 class="mt-0 mb-2 font-size-15">
															<a href="javascript: void(0);"
															class="text-body">{{ data.title }}
															</a>
														</h6>

														<div>{{data.text}}</div>

														<a :href="data.address">{{data.address}}</a>

														<p class="mb-0 mt-2">
															<small class=" text-muted mr-2">
															{{data.name}}
															</small>

															<small class=" text-muted">
															{{ data.date }}
															</small>

															<span class="text-nowrap align-middle font-size-13 mr-2 float-right">
																							<i class="uil uil-eye text-muted mr-1"></i>
																							{{ data.hits }}
																						</span>
															<!--<span class="text-nowrap align-middle font-size-13 mr-2 float-right">-->
															<!--<i class="uil uil-trash-alt text-muted mr-1"></i>-->
															<!--</span>-->
														</p>
														</div>
													</div>
													</div>
												</transition-group>
												</div>
											</div>
											<!-- end - todo tasks -->
											</div>
										</div>
										</div>
									</el-scrollbar>

									<el-scrollbar class="card" style="width: 20%;height: 450px;">
										<el-menu v-for="item in tabOptions" :key="item.id" :default-active="tabOptions[0].id">
										<el-menu-item @click="menuSelect(item.id)">
											<span slot="title">{{item.tab}}</span>
										</el-menu-item>
										</el-menu>
									</el-scrollbar>

								</div>
							</b-tab>
							<b-tab
									title="他的签到统计"
									@click="getCalendar(selectedMember.userId)"
							>
								<el-scrollbar style="width: 100%;height: 600px;">
									<!-- 第一行图表 -->
									<div class="row">

										<!-- 本月学习时长趋势图 -->
										<div class="col-xl-6">
											<!-- begin card -->
											<div class="card">
											<!-- begin card-body -->
											<div class="card-body">
												<!-- 图表标题 -->
												<h4 class="header-title mt-0 mb-3">本月学习时长趋势图</h4>
												<!-- 图表 -->
												<apexchart
												class="apex-charts"
												height="380"
												type="line"
												:series=" uDurationTends.series"
												:options=" uDurationTends.chartOptions"
												></apexchart>
											</div>
											<!-- /end card-body -->
											</div>
											<!-- /end card -->
										</div>
										<!-- /本月学习时长趋势图 -->

										<!-- 本周贡献趋势 -->
										<div class="col-xl-6">
											<!-- begin card -->
											<div class="card">
											<!-- begin card-body -->
											<div class="card-body">
												<!-- 图表标题 -->
												<h4 class="header-title mt-0 mb-3">本周贡献趋势</h4>
												<!-- 图表 -->
												<apexchart
												height="380"
												type="line"
												class="apex-charts"
												:series="uPublishTends.series"
												:options="uPublishTends.chartOptions"
												></apexchart>
												
											</div>
											<!-- end card-body -->
											</div>
											<!-- end card -->
										</div>
										<!-- /本周贡献趋势 -->

									</div>
									<!-- /第一行图表结束 -->


									<!-- 第二行图表 -->
									<div class="row">

										<!-- 本周不同资料发布占比 -->
										<div class="col-xl-6">
											<!-- begin card -->
											<div class="card">
											<!-- begin card-body -->
											<div class="card-body">
												<!-- 图表标题 -->
												<h4 class="header-title mt-0 mb-3">本周不同资料发布占比</h4>
												<!-- 图表 -->
												<apexchart
												class="apex-charts"
												height="320"
												type="pie"
												:series="uPublishPie.series"
												:options="uPublishPie.chartOptions"
												></apexchart>
											</div>
											<!-- /end card-body -->
											</div>
											<!-- /end card-->
										</div>
										<!-- /本周不同资料发布占比-->

										<!-- 本周打卡缺勤天数占比 -->
										<div class="col-xl-6">
											<!-- begin card -->
											<div class="card">
											<!-- begin card-body -->
											<div class="card-body">
												<!-- 图表标题 -->
												<h4 class="header-title mt-0 mb-3">本周打卡缺勤天数占比</h4>
												<!-- 图表 -->
												<apexchart
												type="donut"
												height="320"
												:series="uAttendancePie.series"
												:options="uAttendancePie.chartOptions"
												></apexchart>
											</div>
											<!-- /end card-body -->
											</div>
											<!-- /end card-->
										</div>
										<!-- /本周打卡缺勤天数占比 -->

									</div>
									<!-- /第二行图表结束 -->
								</el-scrollbar>
							</b-tab>
						</b-tabs>
					</div>
				</div>
			</div>
			<!-- /详细信息 -->

		</div>
	</Layout>
		
</template>
<style lang='scss'  scoped>
		.box{
			height: 700px;
			.members{
				height: 100%;
			}
		}
		.nav{
			position: fixed !important;
		}
		 .is-selected {
			color: #1989FA;
		}
		.isSelected{
			background-color: rgba(137, 175, 175, 0.15);
		}

		
</style>
<style>
	/* 解决自定义滚动条 x 轴显示问题 */
	.el-scrollbar .el-scrollbar__wrap
	{
		overflow-x: hidden;
	}
	.el-scrollbar{
		height: 100%;
	}
	.el-scrollbar__view{
		height: 100%;
	}

	/* 子组件样式 */
	.title{
		cursor: pointer;
	}
	.isSelected{
		 background-color: rgba(137, 175, 175, 0.15);
	 }
</style>


