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
		<h5 class="mt-3">签到签退</h5>
		<div class="left-timeline mt-3 mb-3 pl-4">
			<ul class="list-unstyled events mb-0">
				<li
					v-for="activity in signRecords"
					:key="activity.ID"
					v-if="activity.userId === activity.selectedId"
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
		<h5 class="mt-3">博客发布</h5>
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
		<h5 class="mt-3">资料分享</h5>
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
	</div>
</template>