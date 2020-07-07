<template>
	<Layout>
		<!-- end row -->
		<div class="account-pages my-5">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-xl-10">
						<div class="card">
							<div class="card-body p-0">
								<div class="row">
									<div class="col-md-6 p-5">
										<div class="mx-auto mb-5">
											<a routerLink="/">
												<img src="@assets/images/xxlm/logo.png" alt height="44" />
												<h3 class="d-inline align-middle ml-1 text-logo"
												>xxlm</h3
												>
											</a>
										</div>

										<h6 class="h5 mb-0 mt-4">欢迎回来!</h6>
										<p class="text-muted mt-1 mb-4">
											输入您的账号和密码以访问管理面板。
										</p>

<!--										<b-alert-->
<!--												v-model="isAuthError"-->
<!--												variant="danger"-->
<!--												dismissible-->
<!--										>{{ authError }}</b-alert-->
<!--										>-->

										<b-form
												class="authentication-form"
												@submit.prevent="tryToLogIn"
										>
											<div class="form-group">
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather
																	type="mail"
																	class="align-middle icon-dual"
															></feather>
														</span>
													</div>
													<b-form-input
															id="input-1"
															v-model="username"
															type="text"
															required
															placeholder="Enter username"
													></b-form-input>
												</div>
											</div>
											<div class="form-group mt-4">
												<label class="form-control-label">密码</label>
												<div class="input-group input-group-merge">
													<div class="input-group-prepend">
														<span class="input-group-text">
															<feather
																	type="lock"
																	class="align-middle icon-dual"
															></feather>
														</span>
                                                    </div>
                                                    <b-form-input
                                                            id="password"
                                                            v-model="password"
                                                            type="password"
                                                            required
                                                            placeholder="Enter your password"
                                                    ></b-form-input>
                                                </div>
                                            </div>
                                            <div class="form-group mb-4">
                                                <div class="custom-control custom-checkbox">
                                                    <input
                                                            id="checkbox-signin"
                                                            type="checkbox"
                                                            class="custom-control-input"
                                                            checked
                                                    />
                                                </div>
                                            </div>
                                            <b-form-group id="button-group" class="mt-4 mb-1">
                                                <b-button
                                                        type="submit"
                                                        variant="primary"
                                                        class="btn-block"
                                                >登录
                                                </b-button
                                                >
                                            </b-form-group>
                                        </b-form>
                                        <div style="height: 30px"></div>
                                    </div>
                                    <div class="col-lg-6 d-none d-md-inline-block">
                                        <div class="auth-page-sidebar">
                                            <div class="overlay"></div>
                                            <div class="auth-user-testimonial">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end card-body -->
                        </div>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-7">
                                    ©2020 tyust-信息联盟工作室（IOA，Alliance Of Information）
                                </div>
                                <div class="col-2" >
                                    京ICP证030173号
                                </div>
                            </div>
                        </div>
                        <!-- end row -->
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
    </Layout>
</template>
<script>
import Layout from '@layouts/default'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'

/**
 * Login component
 */
export default {
	page: {
		title: '登录',
		meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
	},
	components: { Layout },
	data() {
		return {
			username: 'admin',
			password: 'password',
			authError: null,
			tryingToLogIn: false,
			isAuthError: false,
		}
	},
	computed: {
		placeholders() {
			return process.env.NODE_ENV === 'production'
				? {}
				: {
						username: 'Use "admin" to log in with the mock API',
						password: 'Use "password" to log in with the mock API',
				  }
		},
	},
	methods: {
		...authMethods,
		// Try to log the user in with the username
		// and password they provided.
		tryToLogIn() {
			this.tryingToLogIn = true
			// Reset the authError if it existed.
			this.authError = null
			return this.logIn({
				username: this.username,
				password: this.password,
			})
				.then((token) => {
					this.tryingToLogIn = false
					this.isAuthError = false
					// Redirect to the originally requested page, or to the home page
					this.$router.push(
						this.$route.query.redirectFrom || { name: 'Dashboard' }
					)
				})
				.catch((error) => {
					this.tryingToLogIn = false
					this.authError = error.response ? error.response.data.message : ''
					this.isAuthError = true
				})
		},
	},
}
</script>



<style lang="scss" module ></style>
