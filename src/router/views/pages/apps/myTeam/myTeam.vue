<script>
	import Layout from '@layouts/main'
	import PageHeader from '@components/page-header'
	import Member from './teamMates/member'
	import Activity from './teamMates/activities/activities'
	import axios from '../../../../../utils/http'


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

				// 未经过滤的时间线数据
				signRecords: [],
				blogRecords: [],
				assetRecords: [],

				// start--图表数据
				uDurationTends:   {
					series: [],
					chartOptions: {
						chart: {
							type: 'line',
							height: 350
						},
						stroke: {
							curve: 'stepline',
						},
						dataLabels: {
							enabled: false
						},
						markers: {
							hover: {
								sizeOffset: 4
							}
						}
					},
				},
				uPublishTends: {
					chartOptions: {
						chart: {
							zoom: {
								enabled: false,
							},
							toolbar: {
								show: false,
							},
						},
						colors: ['#5369f8', '#43d39e'],
						dataLabels: {
							enabled: true,
						},
						stroke: {
							width: [3, 3],
							curve: 'smooth',
						},
						grid: {
							row: {
								colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
								opacity: 0.2,
							},
							borderColor: '#f1f3fa',
						},
						markers: {
							style: 'inverted',
							size: 6,
						},
						xaxis: {
							categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							title: {
								text: 'week',
							},
							axisBorder: {
								color: '#d6ddea',
							},
							axisTicks: {
								color: '#d6ddea',
							},
						},
						yaxis: {
							title: {
								text: '条数',
							},
							min: 0,
							max: 5,
						},
						legend: {
							position: 'top',
							horizontalAlign: 'right',
							floating: true,
							offsetY: -25,
							offsetX: -5,
						},
						tooltip: {
							theme: 'dark',
							x: { show: false },
						},
						responsive: [
							{
								breakpoint: 600,
								options: {
									chart: {
										toolbar: {
											show: false,
										},
									},
									legend: {
										show: false,
									},
								},
							},
						],
					},
					series: [],
				},
				uPublishPie:  {
					series: [],
					chartOptions: {},
				},
				uAttendancePie: {
					series: [],
					chartOptions: {
						chart: {
							dropShadow: {
								enabled: true,
								color: '#111',
								top: -1,
								left: 3,
								blur: 3,
								opacity: 0.2,
							},
						},
						stroke: {
							show: true,
							width: 2,
						},
						colors: ['#43d39e', '#f77e53'],
						labels: ['打卡', '缺勤'],
						dataLabels: {
							dropShadow: {
								blur: 3,
								opacity: 0.8,
							},
							enabled: false,
						},
						fill: {
							type: 'pattern',
							opacity: 1,
							pattern: {
								enabled: true,
								style: [
									'squares',
									'horizontalLines',
								],
							},
						},
						states: {
							hover: {
								enabled: false,
							},
						},
						legend: {
							show: false,
							position: 'bottom',
							horizontalAlign: 'center',
							verticalAlign: 'middle',
							floating: false,
							fontSize: '14px',
							offsetX: 0,
							offsetY: -10,
						},
						responsive: [
							{
								breakpoint: 600,
								options: {
									chart: {
										height: 240,
									},
									legend: {
										show: false,
									},
								},
							},
						],
					},
				},
				// end--图表数据

				// 日历相关数据
				value: new Date(),
				calendarData: [],

				// 成员数据
				membersData: [],
				selectedMember: '',

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
						tab: '前端'
					},
					{
						id: 4,
						tab: '数据库'
					}, {
						id: 5,
						tab: '区块链'
					},
					{
						id: 6,
						tab: '云计算'
					},
					{
						id: 7,
						tab: '架构'
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
				dataList: [],
			}
		},
		watch: {
			// 选中成员变化后重新调用API
			async selectedMember(newVal,oldValue){
				// this.getCalendar(newVal.userId).then(res => {
				// 	this.calendarData = res;
				// });
				// this.getBlog(newVal.userId).then(res => {
				//
				// });
				// this.getAsset(newVal.userId).then(res => {
				//
				// });
				await this.getDurationTends(newVal.userId).then(res => {
					this.uDurationTends.series = [{
						data : res.data.data
					}]
				});
				await this.getAssetsData(newVal.userId).then(async res => {
					if (this.uPublishTends.series !== null){
						this.uPublishTends.series.pop();
					}
					this.uPublishTends.series[0] = {
						name: '资料 - ' + new Date().getFullYear(),
						data: res,
					};
					await this.getBlogsData(newVal.userId).then(res => {
						this.uPublishTends.series.push({
							name: '博客 - ' + new Date().getFullYear(),
							data: res,
						});
					})
				});

				this.getPublishPie(newVal.userId).then(async res => {
					if (res.data.data.name.length === 0){
						this.uPublishPie.chartOptions = {
							labels: ['啥也没有发~'],
							colors: ['#A9A9A9'],
							legend: {
								show: false,
								position: 'bottom',
								horizontalAlign: 'center',
								verticalAlign: 'middle',
								floating: false,
								fontSize: '14px',
								offsetX: 0,
								offsetY: -10,
							},
							dataLabels: {
								enabled: false,
							},
							responsive: [
								{
									breakpoint: 600,
									options: {
										chart: {
											height: 240,
										},
										legend: {
											show: false,
										},
									},
								},
							],
						}
						this.uPublishPie.series = [100];
					}else{
						this.uPublishPie.chartOptions = {
							labels: res.data.data.name,
							colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
							legend: {
								show: false,
								position: 'bottom',
								horizontalAlign: 'center',
								verticalAlign: 'middle',
								floating: false,
								fontSize: '14px',
								offsetX: 0,
								offsetY: -10,
							},
							dataLabels: {
								enabled: false,
							},
							responsive: [
								{
									breakpoint: 600,
									options: {
										chart: {
											height: 240,
										},
										legend: {
											show: false,
										},
									},
								},
							],
						}
						await axios.get('http://localhost:8081/assets/select-somebody-assets-counts',{
							params: newVal.userId
						}).then(res => {
							this.uPublishPie.series = res.data.data.count;
						})
					}
				})
				this.getAttendance(newVal.userId).then(res => {
					this.uAttendancePie.series = res.data.data;
				})
			}
		},
		computed: {
			 // 过滤出指定用户的时间线
			 signTimeLine: function () {
			 	let result =  this.signRecords.filter((item) => {
					return	this.selectedMember.userId === item.userId
				})
				 return result;
			 },
			blogTimeLine: function(){
			 	return this.blogRecords.filter(item => {
			 		return this.selectedMember.userId === item.userId;
				})
			},
			assetTimeLine: function(){
				return this.assetRecords.filter(item => {
					return this.selectedMember.userId === item.userId;
				})
			}
		},
		async mounted(){
			// 挂载时加载页面所有所需信息
			await this.getMembers();
			await this.getActivity();
			await this.getCalendar(this.selectedMember.userId);
			await this.getBlog(this.selectedMember.userId);
			await this.getAsset(this.selectedMember.userId);
			await this.getCharts(this.selectedMember.userId);
		},
		methods:{

			/**
			 * @method
			 * @desc 获取团队成员，加载到memberData里
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
			 * @method
			 * @desc changeMember 切换选中成员触发的事件。包含颜色变化，被选中成员变化。
 			 */
			changeMember(member){
				// 改变背景颜色
				this.selectedMember.isSelected = false;
				this.selectedMember = member;
				this.selectedMember.isSelected = true;
			},

			/**
			 * @method
			 * @desc 获取实验室成员签到签退，发布博客，发布资料时间线
			 **/
			async getActivity(){
				// 获取签到签退时间线
				await axios.get('http://localhost:8081/sign-in/select-time-line')
				.then(async response => {
					let data = response.data.data;
					// 接口数据映射
					for (let i = 0; i<data.length; i++){
						// 首先获取姓名
						await  this.getName(data[i].umId).then(res =>{
							let title = data[i].simType === 0 ? ' 签到' : ' 签退';
							this.signRecords.push({
								ID: i,
								userId: data[i].umId,
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
								userId: data[i].umId,
								selectedId: this.selectedMember.userId,
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
								userId: data[i].umId,
								selectedId: this.selectedMember.userId,
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
			 * @method
			 * @param {number} id
			 * @return {Promise} data 姓名
			 * @desc 根据id查询用户姓名，返回的是一个promise对象
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
			 * @method
			 * @param {number} id
			 * @desc 根据id获取指定用户的签到日历，返回已签到日期的promise对象
			 */
			getCalendar(id){
				let ID = parseInt(id);
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
				console.log(typeof month)

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

			/**
			 * TODO 将测试数据全部换成后台数据
			 * @method
			 * @param {number} id
			 * @desc 根据id获取指定用户的博客
			 */
			getBlog(id){
				axios.get('http://localhost:8081/blog/select-assign-user-blog',{
					params:{
						category: this.tabOptions[3].id,
						userId: this.selectedMember.userId
					}
				}).then(res => {
					res.map(item => {
						this.dataList.push({
							id: item.bdId,
							title: item.bdTitle,
							name: item.assetsName,
							date: item.bdDate,
							text: item.bdContent,
							address: item.bdLink,
							groupId: 1,
						})
					})
				})
				return this.dataList;
			},

			// TODO asset 查看某个用户的资料
			getAsset(id){},

			/**
			 * @method
			 * @return {Promise} result
			 * @desc 获取本周学习时长趋势图
			 */
			async getDurationTends(id){
				let result;
				await axios.get('http://localhost:8081/sign-in/select-learn-time-somebody',{
					params: {
						userId: id
					}
				}).then(res => {
					result = res;
					this.uDurationTends.series = [{
						data : res.data.data
					}]
				})
				return result;
			},
			/**
			 * @method
			 * @return {Promise} assetsNum 资料数量
			 * @desc 获取资料数据
			 */
			async getAssetsData(id){
				let assetsNum;
				await axios.get('http://localhost:8081/assets/select-everyday-someone-assets',{
					params: {
						userId: id
					}
				}).then((response) => {
					console.log(response.data);
					this.uPublishTends.series[0] = {
						name: '资料 - ' + new Date().getFullYear(),
						data: response.data.data,
					};
					assetsNum = response.data.data;
				}).catch((error) => {
					console.log(error);
				});
				return assetsNum;
			},
			/**
			 * @method
			 * @return {Promise} blogNum 博客数量
			 * @desc 获取博客数据
			 */
			async getBlogsData(id){
				let blogNum;
				await axios.get('http://localhost:8081/blog/select-everyday-someone-blog',{
					params: {
						userId: id
					}
				}).then((response) => {
					blogNum = response.data.data;
				}).catch((error) => {
					console.log(error);
				});
				return blogNum;
			},
			/**
			 * @method
			 * @param {number} id
			 * @return {Promise} result 调用资料名接口返回值
			 * @desc 获取指定用户本周不同资料占比
			 */
			async getPublishPie(id){
				let result;
				await axios.get('http://localhost:8081/assets/select-somebody-assets-names',{
					params: {
						userId: id
					}
				}).then(async res => {
					result = res;
					if (res.data.data.name.length === 0){
						this.uPublishPie.chartOptions = {
							labels: ['啥也没有发~'],
							colors: ['#A9A9A9'],
							legend: {
								show: false,
								position: 'bottom',
								horizontalAlign: 'center',
								verticalAlign: 'middle',
								floating: false,
								fontSize: '14px',
								offsetX: 0,
								offsetY: -10,
							},
							dataLabels: {
								enabled: false,
							},
							responsive: [
								{
									breakpoint: 600,
									options: {
										chart: {
											height: 240,
										},
										legend: {
											show: false,
										},
									},
								},
							],
						}
						this.uPublishPie.series = [100];
					}else{
						this.uPublishPie.chartOptions = {
							labels: res.data.data.name,
							colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
							legend: {
								show: false,
								position: 'bottom',
								horizontalAlign: 'center',
								verticalAlign: 'middle',
								floating: false,
								fontSize: '14px',
								offsetX: 0,
								offsetY: -10,
							},
							dataLabels: {
								enabled: false,
							},
							responsive: [
								{
									breakpoint: 600,
									options: {
										chart: {
											height: 240,
										},
										legend: {
											show: false,
										},
									},
								},
							],
						}
						await axios.get('http://localhost:8081/assets/select-somebody-assets-counts',{
							params: id
						}).then(res => {
							this.uPublishPie.series = res.data.data.count;
						})
					}

				})
				return result;
			},
			/**
			 * @method
			 * @param {number} id
			 * @return {Promise} result 调用缺勤打卡天数接口返回值
			 * @desc 获取某人本周缺勤人数与打卡天数占比图
			 */
			async getAttendance(id){
				let result;
				await axios.get('http://localhost:8081/sign-in/select-compared-person',{
					params:{
						userId: id
					}
				}).then(res => {
					result = res;
					this.uAttendancePie.series = res.data.data;
					console.log(res.data.data);
				}).catch(error => {console.log(error);})
				return result;
			},
			/**
			 * @param {number} id
			 * @desc 调用所有绘图方法
			 */
			async getCharts(id){
				await this.getDurationTends(id);
				await this.getAssetsData(id);
				await this.getPublishPie(id);
				await this.getAttendance(id);
			},
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
							>
								<el-scrollbar style="width: 100%;height: 600px;">
									<Activity
											:signRecords = "signTimeLine"
											:assetRecords = "assetTimeLine"
											:blogRecords = "blogTimeLine"
									/>
								</el-scrollbar>
							</b-tab>
							<b-tab
									title="签到日历"
							>
								<el-scrollbar style="width: 100%;height: 600px;">
									<el-calendar v-model="value">
										<template
												slot="dateCell"
												slot-scope="{date, data}"
										>
											<div class="item" v-for="item in calendarData">
												<div class="is-selected" v-if="item.indexOf(data.day.split('-').slice(2)) !== -1">
													✔️
												</div>
											</div>
											{{parseInt(data.day.split('-')[1])}}
											<p :class="data.isSelected ? 'is-selected' : ''">
												{{ data.day.split('-').slice(1).join('-') }}
											</p>
										</template>
									</el-calendar>
								</el-scrollbar>
							</b-tab>
							<b-tab
									title="他的博客"
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


