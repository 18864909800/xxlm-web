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

				// start--成员数据 //
				membersData: [],
				// 被选中成员
				selectedMember: '',
				// end--成员数据//

				// start--未经过滤的时间线数据 //
				signRecords: [],
				blogRecords: [],
				assetRecords: [],
				// end--未经过滤的时间线数据 //

				// 日历相关数据
				value: new Date(),
				calendarData: [],
				selectedMonth: '',

				// start--博客，资料数据 //
				// 博客，资料分类数据
				blogsSorts: [
					{
						id: 0,
						tab: '全部'
					},
				],
				assetsSorts: [
					{
						id: 0,
						tab: '全部'
					},
				],
				// 博客，资料列表
				blogsList: [],
				assetsList: [],
				// end--博客，资料数据 //

				// start--图表数据 //
				uDurationTends:   {
					series: [],
					chartOptions: {
						chart: {
							type: 'line',
							height: 350,
							toolbar: {
								show: false,
							},
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
						labels: ['打卡(天)', '缺勤(天)'],
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
				// end--图表数据 //
			}
		},
		// 选中成员变化后重新调用API。
		watch: {
			/*
			 由于刚开始selectedMember是空值，挂载执行完getMember（）后才赋值，所以会先执行一次watch的事件
			 对于需要通过成员id获取的值，不需要在mouted里执行，直接在watch里进行首次执行即可
			 否则会重复向服务器发出请求，出bug
			 */
			async selectedMember(newVal,oldValue){
				this.getCalendar(newVal.userId,this.selectedMonth).then(res => {
					this.calendarData = res;
				});
				await this.getBlog(newVal.userId).then(res => {
					if (this.blogsList !== null){
						this.blogsList = [];
					}
					res.map(item => {
						this.blogsList.push({
							id: item.bdId,
							title: item.bdTitle,
							name: item.assetsName,
							date: item.bdDate,
							text: item.bdContent,
							address: item.bdLink,
							groupId: 1,
						})
					});
				});
				await this.getAsset(newVal.userId).then(res => {
					if (this.assetsList !== null){
						this.assetsList = [];
					}
					res.map(item => {
						this.assetsList.push({
							id: item.acId,
							title: item.acTitle,
							name: item.assetsName,
							date: item.acDate,
							text: item.acContent,
							address: item.acLink,
							groupId: 1,
						})
					});
				});
				await this.getDurationTends(newVal.userId).then(res => {
					this.uDurationTends.series = [{
					    name: "时间(小时)",
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
						await axios.get('http://localhost:8080/assets/select-somebody-assets-counts',{
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
		// 过滤指定用户时间线
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
		// 进行签到日历点击事件注册
		created: function() {
			this.selectedMonth = new Date().getMonth() + 1;
			this.$nextTick(() => {
				// 点击前一个月
				let prevBtn = document.querySelector(
						".el-calendar__button-group .el-button-group>button:nth-child(1)"
				);
				let that = this;

				prevBtn.addEventListener("click", e => {
					let month = this.value.getMonth()+1;
					this.selectedMonth = month;
					that.getCalendar(that.selectedMember.userId,month);
				});

				// 点击下一个月
				let nextBtn = document.querySelector(
						".el-calendar__button-group .el-button-group>button:nth-child(3)"
				);
				nextBtn.addEventListener("click", () => {
					let month = this.value.getMonth()+1;
					this.selectedMonth = month;
					that.getCalendar(that.selectedMember.userId,month);
				});

				// 点击今天
				let todayBtn = document.querySelector(
						".el-calendar__button-group .el-button-group>button:nth-child(2)"
				);
				todayBtn.addEventListener("click", () => {
					let month = this.value.getMonth()+1;
					this.selectedMonth = month;
					that.getCalendar(that.selectedMember.userId,month);
				});
			});
		},
		// 挂载时加载页面所有所需信息。加载的是不需要通过成员id获取的公共数据。
		async mounted(){
			// 首先要获取成员信息，在这里将第一个成员设为被选中成员
			await this.getMembers();
			// 获取所有用户时间线，在computed里过滤指定成员的时间线
			await this.getActivity();
			// 获取资料，博客分类信息
			this.getAssetsSorts();
			this.getBlogsSorts();
		},
		methods:{

			/* start--团队成员相关方法 */
				/**
				 * @method
				 * @desc 获取团队成员，加载到memberData里。并将加载出的第一个团队成员设为被选中成员。
				 **/
				getMembers(){
					axios.get('http://localhost:8080/user/select-all-normal-users').
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
				},

				/**
				 * @method
				 * @param {member} member 每一个memberData数组里的元素都是一个member对象。
				 * @desc changeMember 点击成员触发的事件。包含颜色变化，被选中成员变化。
				 */
				changeMember(member){
					// 改变背景颜色
					this.selectedMember.isSelected = false;
					// 将被点中的成员赋值给selectedMember
					this.selectedMember = member;
					this.selectedMember.isSelected = true;
				},
			/* /end--团队成员相关方法 */

			/* start--时间线相关方法 */
				/**
				 * @method
				 * @desc 获取实验室成员签到签退，发布博客，发布资料时间线
				 **/
				async getActivity(){
					// 获取签到签退时间线
					await axios.get('http://localhost:8080/sign-in/select-time-line')
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
					await axios.get('http://localhost:8080/blog/select-blog-line')
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
					await axios.get('http://localhost:8080/assets/select-assets-line')
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
					await axios.get('http://localhost:8080/user/get-name-by-Id',{
						params:{userId: id}
					}).then((response) => {
						data = response.data.data;
						// console.log(response.data.data);
					}).catch((error) => {
						console.log(error);
					});
					return data;
				},
			/* /end--时间线相关方法 */

			/* start--签到日历相关方法 */
				/**
				 * @method
				 * @param {number} id
				 * @desc 根据id获取指定用户的签到日历，返回已签到日期的promise对象
				 */
				async getCalendar(id , mon){
					let ID = parseInt(id);
					let year = new Date().getFullYear();
					let month = mon || this.selectedMonth;
					let result;

					await axios.get('http://localhost:8080/sign-in/select-assign-user-calendar',{
						params: {
							userId: ID,
							year: year,
							month: month
						}
					}).then((response) => {
						result = response;
						this.calendarData = response.data.data;
					}).catch((error) => {console.log(error);});
					return result;
				},
			/* /end--签到日历相关方法 */

			/* start--博客资料模块相关方法 */
				/**
				 * @method
				 * @param {number} id 用户id
				 * @return {Promise} result 博客对象数组
				 * @desc 根据id获取指定用户的博客
				 */
				async getBlog(id){
					let result;
					await axios.get('http://localhost:8080/blog/select-assign-user-blog',{
						params:{
							category: 0,
							userId: id
						}
					}).then(res => {
						result = res.data.data;
					})
					return result;
				},

				/**
				 * @method
				 * @desc 獲取博客所有分類
				 */
				getBlogsSorts(){
					axios.get('http://localhost:8080/blog/get-all-category')
							.then(res => {
								let arr = res.data.data;
								arr.map(item => {
									this.blogsSorts.push({
										id: item.blogCId,
										tab: item.blogCName
									})
								})
							}).catch(error => error);
				},

				/**
				 * @method
				 * @param {number} cId 分類id
				 * @desc 博客分類點擊事件
				 */
				blogSortsSelect(cId){
					axios.get('http://localhost:8080/blog/select-assign-user-blog',{
						params:{
							category: cId,
							userId: this.selectedMember.userId
						}
					}).then(res => {
						let result = res.data.data;
						if (this.blogsList !== null){
							this.blogsList = [];
						}
						// start--映射结果 //
						result.map(item => {
							this.blogsList.push({
								id: item.bdId,
								title: item.bdTitle,
								name: item.assetsName,
								date: item.bdDate,
								text: item.bdContent,
								address: item.bdLink,
								groupId: 1,
							})
						});
						// end--映射结果 //
					}).catch(error => error);
				},

				/**
				 * @method
				 * @param {number} id 用户id
				 * @return {Promise} result 资料对象数组
				 * @desc 根据id获取指定用户的資料
				 */
				async getAsset(id){
					let result;
					await axios.get('http://localhost:8080/assets/select-assign-assets',{
						params:{
							category: 0,
							userId: id
						}
					}).then(res => {
						result = res.data.data;
					})
					return result;
				},

				/**
				 * @method
				 * @desc 獲取資料所有分類
				 */
				getAssetsSorts(){
					axios.get('http://localhost:8080/assets/get-all-category')
							.then(res => {
								let arr = res.data.data;
								arr.map(item => {
									this.assetsSorts.push({
										id: item.assetsId,
										tab: item.assetsName
									})
								})
							}).catch(error => error);
				},
				/**
				 * @method
				 * @param {number} aId 分類id
				 * @desc 資料分類點擊事件
				 */
				assetsSortsSelect(aId){
					axios.get('http://localhost:8080/assets/select-assign-assets',{
						params:{
							category: aId,
							userId: this.selectedMember.userId
						}
					}).then(res => {
						let result = res.data.data;
						if (this.assetsList !== null){
							this.assetsList = [];
						}
						result.map(item => {
							this.assetsList.push({
								id: item.acId,
								title: item.acTitle,
								name: item.assetsName,
								date: item.acDate,
								text: item.acContent,
								address: item.acLink,
								groupId: 1,
							})
						});
					})
				},
			/* /end--博客资料模块相关方法 */

			/* start--他的签到统计相关方法 */
				/**
				 * @method
				 * @return {Promise} result
				 * @desc 获取本周学习时长趋势图
				 */
				async getDurationTends(id){
					let result;
					await axios.get('http://localhost:8080/sign-in/select-learn-time-somebody',{
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
					await axios.get('http://localhost:8080/assets/select-everyday-someone-assets',{
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
					await axios.get('http://localhost:8080/blog/select-everyday-someone-blog',{
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
					await axios.get('http://localhost:8080/assets/select-somebody-assets-names',{
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
							await axios.get('http://localhost:8080/assets/select-somebody-assets-counts',{
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
					await axios.get('http://localhost:8080/sign-in/select-compared-person',{
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
			/* /end--他的签到统计相关方法 */
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
												<div
														class="is-selected"
														v-if="item.indexOf(data.day.split('-').slice(2)) !== -1
														&& parseInt(data.day.split('-')[1]) === parseInt(selectedMonth) "
												>
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
													<div v-for="(data,index) in blogsList" :key="data.id"
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
										<el-menu v-for="item in blogsSorts" :key="item.id" :default-active="blogsSorts[0].id">
										<el-menu-item @click="blogSortsSelect(item.id)">
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
													<div v-for="(data,index) in assetsList" :key="data.id"
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
										<el-menu v-for="item in assetsSorts" :key="item.id" :default-active="assetsSorts[0].id">
										<el-menu-item @click="assetsSortsSelect(item.id)">
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
												<h4 class="header-title mt-0 mb-3">本周学习时长趋势图</h4>
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


