<script>
	import Layout from '@layouts/main'
	import PageHeader from '@components/page-header'
	import Member from '@components/member'
	import Activities from './teamMates/activities'
	import Messages from './teamMates/messages'
	import Projects from './teamMates/projects'
	import Tasks from './teamMates/tasks'
	import { activities, messageData, projectData, tasks } from './teamMates/data-profile'
	// import Calendar from './teamMates/calendar/calendar'
	// import Records from './teamMates/sign/records.vue'
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
			Tasks,
			
		 },
		data() {
			return {
				title: '我的团队',
				activities: activities,
				messageData: messageData,
				projectData: projectData,
				tasks: tasks,
				membersData: [
					{
						image: require('@assets/images/users/avatar-7.jpg'),
						text: 'Senior Sales Guy',
						name: 'Shreyu N',
					},
					{
						image: require('@assets/images/users/avatar-9.jpg'),
						text: 'Social Media Campaign',
						name: 'Greeva Y',
					},
					{
						image: require('@assets/images/users/avatar-4.jpg'),
						text: 'Inventory Manager',
						name: 'Nik G',
					},
					{
						image: require('@assets/images/users/avatar-1.jpg'),
						text: 'Sales Persons',
						name: 'Hardik G',
					},
					{
						image: require('@assets/images/users/avatar-2.jpg'),
						text: 'Sales Persons',
						name: 'Stive K',
					},
			    ],
			}
		},
	}
</script>

<template>
	<Layout>
		<PageHeader :title="title"  />
		<div class="row">
			<div class="col-xl-3">
				<div class="card">
					<div class="card-body pt-2 pb-2">
						<h5 class="mb-4 header-title">团队成员</h5>
						<div v-for="member of membersData" :key="member.name">
							<Member
								:image="member.image"
								:name="member.name"
								:text="member.text"
							/>
						</div>
					</div>
				</div>
			</div>
				<div class="col-lg-9">
				<div class="card">
					<div class="card-body">
						<b-tabs class="navtab-bg" pills justified>
							<b-tab title="时间线" active>
								<Activities :activities="activities" />
							</b-tab>
							<b-tab title="签到日历">
								<!-- <Calendar /> -->
							</b-tab>
							<b-tab title="他的博客">
								<Projects :projects="projectData" />
							</b-tab>
							<b-tab title="他的资料">
								<Tasks :tasks="tasks" />
							</b-tab>
							<b-tab title="他的签到统计">
								<!-- <Records /> -->
							</b-tab>
						</b-tabs>
					</div>
				</div>
			</div>

		</div>
	</Layout>
</template>



