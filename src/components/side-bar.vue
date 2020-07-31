<script>

    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {authComputed} from '@state/helpers'
    import Appmenu from './app-menu'
    import {settingRoutes} from '../router/routes'
    import axios from '../utils/http.js'

    /**
     * Left sidebar component - contains mainly the application menu
     */
    export default {
        name: 'left-side-bar',
        components: {VuePerfectScrollbar, Appmenu},
        props: {
            isCondensed: {
                type: Boolean,
                default: false,
            },
            theme: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            width: {type: String, required: true},
            user: {
                type: Object,
                required: false,
                default: () => ({}),
            },
        },
        data() {
            return {
                // url
                menuItems: settingRoutes,
                settings: {
                    minScrollbarLength: 60,
                },
                // 用户身份
                userIdentity: '',
                // 用户姓名
                userName:null,
                // 用户头像
                umHeadUrl:null
            }
        },
        computed: {
            ...authComputed,
        },
        watch: {
            theme: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    switch (newVal) {
                        case 'dark':
                            document.body.classList.add('left-side-menu-dark')
                            document.body.classList.remove('left-side-menu-condensed')
                            document.body.classList.remove('boxed-layout')
                            break
                        default:
                            document.body.classList.remove('left-side-menu-dark')
                            break
                    }
                }
            },
            type: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    switch (newVal) {
                        case 'condensed':
                            document.body.classList.add('left-side-menu-condensed')
                            document.body.classList.remove('left-side-menu-dark')
                            document.body.classList.remove('boxed-layout')
                            break
                        default:
                            document.body.classList.remove('left-side-menu-condensed')
                            break
                    }
                }
            },
            width: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    switch (newVal) {
                        case 'boxed':
                            document.body.classList.add('left-side-menu-condensed')
                            document.body.classList.remove('left-side-menu-dark')
                            document.body.classList.add('boxed-layout')
                            break
                        default:
                            document.body.classList.remove('left-side-menu-condensed')
                            document.body.classList.remove('boxed-layout')
                            break
                    }
                }
            },
        },
        // beforeMount () {
        //     Vue.prototype.$cookieStore = {
        //         setCookie,
        //         getCookie,
        //         delCookie
        //     }
        // },
        created() {
            // console.log("222")
            // console.log(this.user.data.identify)
            if (this.user.data.identify === '1') {
                this.userIdentity = '管理员'
            } else {
                this.userIdentity = '普通用户'
            }



            // this.$cookieStore.getCookie(JSESSIONID)
            //  侧边栏获取信息
            axios.get('http://localhost:8081/user/select-admin-message').then(res=>{
                // console.log("侧边栏数据接口")
                // console.log(this.user.data.sessionId)
                // console.log(res)
                this.userName=res.data.data.umName
                this.umHeadUrl=res.data.data.umHeadUrl
            })

        },


    }
</script>

<template>
    <!-- ========== Left Sidebar Start ========== -->
    <div class="left-side-menu">
        <div class="media user-profile mt-2 mb-2">
            <img
                    :src=this.umHeadUrl
                    class="avatar-sm rounded-circle mr-2"
                    alt="用户头像"
            />
            <div class="media-body">
                <h6 class="pro-user-name mt-0 mb-0">{{userName}}</h6>
                <span class="pro-user-desc">{{ userIdentity }}</span>
            </div>
            <b-dropdown variant="black" class="align-self-center" toggle-class="p-0">
                <template v-slot:button-content>
                    <feather type="chevron-down" class="align-middle"></feather>
                </template>


                <b-dropdown-item href="javascript:void(0);" class="notify-item">
                    <feather
                            type="settings"
                            class="icon-dual icon-xs mr-2 align-middle"
                    ></feather>
                    <router-link to="/setting/headPortrait" style="color: #1e2139">
                        <span>修改头像</span>
                    </router-link>
                </b-dropdown-item>


                <b-dropdown-item href="javascript: void(0);" class="notify-item">
                    <feather
                            type="lock"
                            class="icon-dual icon-xs mr-2 align-middle"
                    ></feather>
                    <router-link to="/setting/password" style="color: #1e2139">
                        <span>修改密码</span>
                    </router-link>
                </b-dropdown-item>

                <b-dropdown-divider></b-dropdown-divider>

                <b-dropdown-item href="/logout" class="notify-item">
                    <feather
                            type="log-out"
                            class="icon-dual icon-xs mr-2 align-middle"
                    ></feather>
                    <span>退出登录</span>
                </b-dropdown-item>
            </b-dropdown>
        </div>

        <div class="sidebar-content">
            <VuePerfectScrollbar
                    v-if="!isCondensed"
                    v-once
                    class="slimscroll-menu"
                    :settings="settings"
            >
                <div id="sidebar-menu">
                    <Appmenu/>
                </div>
            </VuePerfectScrollbar>
            <div v-else id="sidebar-menu">
                <Appmenu/>
            </div>
        </div>
        <!-- Sidebar -left -->
    </div>
    <!-- Left Sidebar End -->
</template>

<style lang="scss">
    .slimscroll-menu {
        height: 100%;
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
</style>
