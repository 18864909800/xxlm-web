<script>
/**
 * profile activities
 */
export default {
	props: {
		signRecords: {
			type: Array,
			default: () => [],
		},
		blogRecords: {
			type: Array,
			default: () => [],
		},
		assetRecords: {
			type: Array,
			default: () => [],
		},
	},
}
</script>

<template>
	<div>
		<!--没有任何签到签退，博客发布，资料发布活动时展示-->
		<!--用户太懒了，啥也不干-->
		<p
				class="do-nothing"
				v-if="assetRecords.length === 0 &&
				blogRecords.length === 0 &&
				signRecords.length === 0"
		>
			该用户太懒了，啥也没干~
		</p>
		<!--/用户太懒了，啥也不干-->

		<!--签到签退时间线-->
		<h5 class="mt-3" v-if="signRecords.length !== 0">签到签退</h5>
		<div class="left-timeline mt-3 mb-3 pl-4">
			<ul class="list-unstyled events mb-0">
				<li
					v-for="activity in signRecords"
					:key="activity.ID"
					class="event-list"
				>
					<div class="pb-4" >
						<div class="media">
							<div class="event-date text-center mr-4">
								<div
									class="bg-soft-primary p-1 rounded text-primary font-size-14"
									>{{ activity.time }}</div
								>
							</div>
							<div class="media-body">
								<h6 class="font-size-15 mt-0 mb-1">{{ activity.title }}</h6>
								<p class="text-muted font-size-14">{{ activity.text }}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!--/签到签退时间线-->

		<!--博客发布时间线-->
		<h5 class="mt-3" v-if="blogRecords.length !== 0">博客发布</h5>
		<div class="left-timeline mt-3 mb-3 pl-4">
			<ul class="list-unstyled events mb-0">
				<li
						v-for="activity in blogRecords"
						:key="activity.id"
						class="event-list"
				>
					<div class="pb-4">
						<div class="media">
							<div class="event-date text-center mr-4">
								<div
										class="bg-soft-primary p-1 rounded text-primary font-size-14"
								>{{ activity.time }}</div
								>
							</div>
							<div class="media-body">
								<h6 class="font-size-15 mt-0 mb-1">{{ activity.title }}</h6>
								<p class="text-muted font-size-14">{{ activity.text }}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!--/博客发布时间线-->

		<!--资料分享时间线-->
		<h5 class="mt-3" v-if="assetRecords.length !== 0">资料分享</h5>
		<div class="left-timeline mt-3 mb-3 pl-4">
			<ul class="list-unstyled events mb-0">
				<li
						v-for="activity in assetRecords"
						:key="activity.id"
						class="event-list"
				>
					<div class="pb-4">
						<div class="media">
							<div class="event-date text-center mr-4">
								<div
										class="bg-soft-primary p-1 rounded text-primary font-size-14"
								>{{ activity.time }}</div
								>
							</div>
							<div class="media-body">
								<h6 class="font-size-15 mt-0 mb-1">{{ activity.title }}</h6>
								<p class="text-muted font-size-14">{{ activity.text }}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!--/资料分享时间线-->
	</div>
</template>
<style>
	.do-nothing{
		line-height: 3000%;
		color: gray;
		text-align: center;
	}
</style>