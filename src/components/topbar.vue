<script>
import { authComputed } from '@state/helpers'


export default {
	components: {
	},
	props: {
		user: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		isMenuOpened: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {}
	},
	computed: {
		...authComputed,
	},
	methods: {
		toggleMenu() {
			this.$parent.toggleMenu()
		},
		toggleRightSidebar() {
			this.$parent.toggleRightSidebar()
		},
	},
}
</script>

<template>
	<!-- Topbar Start -->
	<div class="navbar navbar-expand flex-column flex-md-row navbar-custom">
		<div class="container-fluid">
			<!-- LOGO -->
			<a href="/" class="navbar-brand mr-0 mr-md-2 logo">
				<span class="logo-lg">
					<img src="@assets/images/xxlm/logo.png" alt height="55" />
					<span class="d-inline h5 ml-2 text-logo">xxlm</span>
				</span>
				<span class="logo-sm">
					<img src="@assets/images/logo.png" alt height="24" />
				</span>
			</a>

			<ul
				class="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0"
			>
				<li class>
					<button
						class="button-menu-mobile open-left disable-btn"
						:class="{ open: isMenuOpened }"
						@click="toggleMenu"
					>
						<feather type="menu" class="menu-icon align-middle"></feather>
						<feather type="x" class="close-icon"></feather>
					</button>
				</li>
			</ul>

			<ul
				class="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0"
			>
				<li class="d-none d-sm-block">
					<div class="app-search">
						<form>
							<div class="input-group">
								<input
									type="text"
									class="form-control"
									placeholder="Search..."
								/>
								<feather type="search" class="align-middle"></feather>
							</div>
						</form>
					</div>
				</li>





<!--				<li-->
<!--					id="setting-tooltip"-->
<!--					class="dropdown notification-list"-->
<!--					title="Settings"-->
<!--				>-->
<!--					<a-->
<!--						href="javascript:void(0);"-->
<!--						class="nav-link right-bar-toggle toggle-right"-->
<!--						@click="toggleRightSidebar"-->
<!--					>-->
<!--						<feather type="settings" class="toggle-right"></feather>-->
<!--					</a>-->
<!--					<b-tooltip target="setting-tooltip" placement="left"-->
<!--						>Settings</b-tooltip-->
<!--					>-->
<!--				</li>-->

				<b-nav-item-dropdown
					right
					class="notification-list align-self-center profile-dropdown"
					toggle-class="nav-user mr-0"
				>
					<template v-slot:button-content>
						<div class="media user-profile">
							<img
								src="@assets/images/users/avatar-7.jpg"
								alt="user-image"
								class="rounded-circle align-self-center"
							/>
							<div class="media-body text-left">
								<h6 class="pro-user-name ml-2 my-0">
									<span>{{ user.name }}</span>
									<span class="pro-user-desc text-muted d-block mt-1"
										>Administrator</span
									>
								</h6>
							</div>
							<feather
								type="chevron-down"
								class="ml-2 align-self-center"
							></feather>
						</div>
					</template>


					<b-dropdown-item href="javascript:void(0);" class="notify-item p-0">
						<feather type="settings" class="icon-dual icon-xs mr-2"></feather>
						<span>修改头像</span>
					</b-dropdown-item>

					<b-dropdown-item
						href="pages-lock-screen.html"
						class="notify-item p-0"
					>
						<feather type="lock" class="icon-dual icon-xs mr-2"></feather>
						<span>修改密码</span>
					</b-dropdown-item>

					<b-dropdown-divider></b-dropdown-divider>

					<b-dropdown-item href="/logout" class="notify-item p-0">
						<feather type="log-out" class="icon-dual icon-xs mr-2"></feather>
						<span>退出登录</span>
					</b-dropdown-item>
				</b-nav-item-dropdown>
			</ul>
		</div>
	</div>
	<!-- end Topbar -->
</template>

<style lang="scss">
.noti-scroll {
	height: 220px;
}
.ps > .ps__scrollbar-y-rail {
	width: 8px !important;
	background-color: transparent !important;
}
.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:active > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:hover > .ps__scrollbar-y {
	width: 6px !important;
}
.button-menu-mobile {
	outline: none !important;
}
</style>
