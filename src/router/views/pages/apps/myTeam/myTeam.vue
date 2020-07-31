<script>
	import Layout from '@layouts/main'
	import PageHeader from '@components/page-header'
	import Member from '@components/member'
	import Activities from './teamMates/activities'
	import Projects from './teamMates/projects'
	import { activities, messageData, projectData, tasks } from './teamMates/data-profile'
	// 引入图表插件
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
			Activities,
			Projects,
		 },
		data() {
			return {
				title: '我的团队',
				// 时间线
				activities: activities,
				// 图表
				uPublishTends: uPublishTends,
				uDurationTends:  uDurationTends,
				uPublishPie: uPublishPie,
				uAttendancePie: uAttendancePie,

				// 日历
				value: new Date(),
				// 成员数据
				membersData: [
					{
						image: require('@assets/images/users/avatar-7.jpg'),
						text: '信管2班',
						name: 'Shreyu N',
						gender: '男'
					},
					{
						image: require('@assets/images/users/avatar-9.jpg'),
						text: '软件工程1班',
						name: 'Greeva Y',
						gender: '男'
					},
					{
						image: require('@assets/images/users/avatar-4.jpg'),
						text: '电商2班',
						name: 'Nik G',
						gender: '男'
					},
					{
						image: require('@assets/images/users/avatar-1.jpg'),
						text: '信管1班',
						name: 'Hardik G',
						gender: '男'
					},
					{
						image: require('@assets/images/users/avatar-2.jpg'),
						text: 'Sales Persons',
						name: 'Stive K',
						gender: '男'
					},
				],
				// 博客，资料数据
				 tabOptions: [
						{
							id: 0,
							tab: '全部'
						},
						{
							id: 1,
							tab: 'Python'
						},
						{
							id: 2,
							tab: 'Java'
						},
						{
							id: 3,
							tab: '架构'
						},
						{
							id: 4,
							tab: '数据库'
						},
						{
							id: 5,
							tab: '区块链'
						},
						{
							id: 6,
							tab: '云计算'
						},
						{
							id: 7,
							tab: '前端'
						},
						{
							id: 8,
							tab: '人工智能'
						},
						{
							id: 9,
							tab: '大数据'
						},
						{
							id: 10,
							tab: '5G'
						},
						{
							id: 11,
							tab: '移动开发'
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
					{
						id: 2,
						title: '标题',
						name: '赵如冰',
						date: 'Jan 16, 2019',
						text: '描述',
						address: 'http://www.baidu.com',
						hits: 7,
						groupId: 1,
					},
					{
						id: 3,
						title: '标题',
						name: '赵如冰',
						date: 'Jan 16, 2019',
						text: '描述',
						address: 'http://www.baidu.com',
						hits: 7,
						groupId: 1,
					},
					{
						id: 4,
						title: '标题',
						name: '赵如冰',
						date: 'Jan 16, 2019',
						text: '描述',
						address: 'http://www.baidu.com',
						hits: 7,
						groupId: 1,
					},
					{
						id: 5,
						title: '标题',
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
							<div v-for="member of membersData" :key="member.name">
								<Member
									:image="member.image"
									:name="member.name"
									:text="member.text"
									:gender="member.gender"
								/>
							</div>
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
							<b-tab title="时间线" active>
								<el-scrollbar style="width: 100%;height: 600px;">
									<Activities :activities="activities" />
								</el-scrollbar>
							</b-tab>
							<b-tab title="签到日历">
								<el-scrollbar style="width: 100%;height: 600px;">
									<el-calendar v-model="value">
									</el-calendar>
								</el-scrollbar>
							</b-tab>
							<b-tab title="他的博客">
								<div style="display: flex; justify-content: space-between; margin:0;">

									<el-scrollbar style="width: 75%;height: 450px;">
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
							<b-tab title="他的资料">
								<div style="display: flex; justify-content: space-between; margin:0;">

									<el-scrollbar style="width: 78%;height: 450px;">
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
							<b-tab title="他的签到统计">
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
												height="380"
												type="line"
												class="apex-charts"
												:series="uPublishTends.series"
												:options="uPublishTends.chartOptions"
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
												class="apex-charts"
												height="380"
												type="line"
												:series=" uDurationTends.series"
												:options=" uDurationTends.chartOptions"
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
</style>


