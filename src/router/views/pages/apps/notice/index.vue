<template>
    <Layout>
        <PageHeader/>

        <!--公告列表-->
        <div class="row" v-if="detailFlag">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-lg-12">
                                <b-tabs class="navtab-bg" pills justified>
                                    <b-tab title="普通公告" active>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="board">
                                                    <!-- todo tasks -->
                                                    <div class="tasks border" style="width: 100%">
                                                        <div id="task-list-two" class="task-list-items">
                                                            <draggable>
                                                                <transition-group type="transition" :name="'flip-list'">
                                                                    <div v-for="(notice,index) in noticeList" :key="notice.id" @click="noticeDetail(notice.id)">
                                                                        <div class="card border mb-0">
                                                                            <div class="card-body p-3">

                                                                                <h6 class="mt-0 mb-2 font-size-15">
                                                                                    <a href="javascript: void(0);"
                                                                                       class="text-body">{{ notice.title }}
                                                                                    </a>
                                                                                </h6>

                                                                                <!--<div style="overflow: hidden;text-overflow: ellipsis; white-space: nowrap;" v-html="notice.text"></div>-->

                                                                                <p class="mb-0 mt-2">
                                                                                    <small class=" text-muted">
                                                                                        {{ notice.date }}
                                                                                    </small>

<!--                                                                                    <span class="text-nowrap align-middle font-size-13 mr-2 float-right">-->
<!--                                                                                      <i class="uil uil-eye text-muted mr-1"></i>-->
<!--                                                                                      {{ notice.hits }}-->
<!--                                                                                    </span>-->
                                                                                    <!--<span class="text-nowrap align-middle font-size-13 mr-2 float-right">-->
                                                                                    <!--<i class="uil uil-trash-alt text-muted mr-1"></i>-->
                                                                                    <!--</span>-->
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </transition-group>
                                                            </draggable>
                                                        </div>
                                                    </div>
                                                    <!-- end - todo tasks -->
                                                </div>
                                            </div>
                                        </div>
                                    </b-tab>
                                    <b-tab title="作业公告">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="board">
                                                    <!-- todo tasks -->
                                                    <div class="tasks border" style="width: 100%">
                                                        <div id="task-list-one" class="task-list-items">
                                                            <draggable>
                                                                <transition-group type="transition" :name="'flip-list'">
                                                                    <div v-for="(homework,index) in homeworkList" :key="homework.id" @click="noticeDetail(homework.id)">
                                                                        <div class="card border mb-0">
                                                                            <div class="card-body p-3">

                                                                                <h6 class="mt-0 mb-2 font-size-15">
                                                                                    <a href="javascript: void(0);"
                                                                                       class="text-body">{{ homework.title }}
                                                                                    </a>
                                                                                </h6>

<!--                                                                                <div style="overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">{{homework.text}}</div>-->

                                                                                <p class="mb-0 mt-2">
                                                                                    <small class=" text-muted">
                                                                                        {{ homework.date }}
                                                                                    </small>

<!--                                                                                    <span class="text-nowrap align-middle font-size-13 mr-2 float-right">-->
<!--                                                                                      <i class="uil uil-eye text-muted mr-1"></i>-->
<!--                                                                                      {{ homework.hits }}-->
<!--                                                                                    </span>-->
                                                                                    <!--<span class="text-nowrap align-middle font-size-13 mr-2 float-right">-->
                                                                                    <!--<i class="uil uil-trash-alt text-muted mr-1"></i>-->
                                                                                    <!--</span>-->
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </transition-group>
                                                            </draggable>
                                                        </div>
                                                    </div>
                                                    <!-- end - todo tasks -->
                                                </div>
                                            </div>
                                        </div>
                                    </b-tab>
                                </b-tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/公告列表-->

        <!--公告详情-->
        <div v-if="!detailFlag">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <label class="font-weight-bold d-inline mr-2" style="font-size: 18px">
                                        公告详情
                                    </label>
                                </div>
                                <div class="col text-right">
                                    <button id="btn-new-event" class="btn btn-primary" @click="noticels">
                                        <i class="uil-step-backward mr-1" ></i>返回
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-lg-12">
                                    <div class="card border mb-0">
                                        <div class="card-body p-3">

                                            <h6 class="mt-0 mb-2 font-size-15">
                                                <a href="javascript: void(0);"
                                                   class="text-body">{{dTitle}}
                                                </a>
                                            </h6>
                                            <p class="mb-0 mt-3">

                                                <small class="text-muted">
                                                    {{dDate}}
                                                </small>

                                                <span class="text-nowrap align-middle font-size-13 mr-2 float-right ">
                                                  <i class="uil uil-eye text-muted mr-1"></i>
                                                  {{dHits}}
                                                </span>
                                                <span v-if="deleteFlag" class="text-nowrap align-middle font-size-13 mr-2 float-right " @click="deleteModel = true">
                                                  <i class="uil uil-trash-alt text-muted mr-1"></i>
                                                </span>
                                            </p>
                                            <div class="mb-0 mt-3" v-html="dText"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!--/公告详情-->

        <!--公告删除确认模态框-->
        <b-modal v-model="deleteModel" title="公告删除" title-class="font-18">
            <!--<h6>公告发表</h6>-->
            <p>确认删除该公告吗？</p>
            <!--<hr />-->
            <template v-slot:modal-footer>
                <b-button variant="light" @click="deleteModel = false">取消</b-button>
                <b-button variant="primary" @click="noticeDelete">确认</b-button>
            </template>
        </b-modal>
        <!--公告删除确认模态框-->

    </Layout>
</template>

<script>
    import Layout from '@layouts/main'
    import PageHeader from '@components/page-header'
    import draggable from 'vuedraggable'
    import appConfig from '@src/app.config'
    import axios from 'axios';

    export default {
        page: {
            title: '公告',
            meta: [{name: 'description', content: appConfig.description}],
        },
        components: {Layout, PageHeader, draggable},

        data() {
            return {

                // 模态框显示开关
                deleteModel:false,

                detailFlag: true,

                // 普通公告
                noticeList: [],

                // 作业公告
                homeworkList: [],

                dId:'',
                dTitle: '',
                dDate: '',
                dText:'',
                dHits: '',
                deleteFlag: false

            }
        },

        computed: {

        },

        created() {
            // 鉴权发表公告身份

            // 初始化noticeList和homeworkList数组

        },

        mounted() {
            this.initNotice();
        },

        methods: {

            // 初始化noticeList和homeworkList数组
            initNotice() {
                // 加载普通公告
                this.loadNotice('normal');


                // 加载作业公告
                this.loadNotice('special');
            },

            loadNotice(noticeFlag) {
                axios.get("http://localhost:8080/notice/select-all-message", {
                    params: {
                        typeId: noticeFlag === 'normal' ? 0 : 1
                    }
                }).then(res => {
                    let obj = res.data;
                    if(noticeFlag === 'normal') {
                        this.noticeList = [];
                    } else {
                        this.homeworkList = [];
                    }

                    if(obj.responseCode == '200') {
                        let resultList = obj.data;

                        for (let i = 0; i < resultList.length; i++) {
                            if(noticeFlag === 'normal') {
                                this.noticeList.push({
                                    id: resultList[i].noticeId,
                                    title: resultList[i].noticeTitle,
                                    date: resultList[i].noticeDate,
                                    text: resultList[i].noticeContent,
                                });
                            } else {
                                this.homeworkList.push({
                                    id: resultList[i].noticeId,
                                    title: resultList[i].noticeTitle,
                                    date: resultList[i].noticeDate,
                                    text: resultList[i].noticeContent,
                                });
                            }

                        }
                    }
                })
            },

            // 删除公告（普通公告或者作业公告）
            noticeDelete() {

                // 删除ID 为 this.dId
                axios.get("http://localhost:8080/notice/delete-notice/" + this.dId).then(res => {
                    if(res.data.responseCode == '200') {
                        if(res.data.data) {
                            this.initNotice();
                        }
                    }
                })

                this.deleteModel = false;
                this.detailFlag = true;
            },

            // 查看普通公告详情
            noticeDetail(index) {
                // 查看普通公告详情
                axios.get("http://localhost:8080/notice/select-details-by-id/" + index).then(res => {
                    if(res.data.responseCode == '200') {
                        if(res.data.data != null) {
                            this.dId =  res.data.data.noticeId;
                            this.dTitle =  res.data.data.noticeTitle;
                            this.dDate =  res.data.data.noticeDate;
                            this.dText =  res.data.data.noticeContent;
                            this.dHits =  res.data.data.noticeCount;
                        }
                    }
                })

                // 查询身份权限
                axios.get('http://localhost:8080/user/select-admin-message').then(res=>{
                    // console.log("侧边栏数据接口")
                    // console.log(this.user.data.sessionId)
                    if(res.data.responseCode == '200') {
                        if(res.data.data != null) {
                            console.log(res.data.data);
                            if(res.data.data.umIdentify == 1) {
                                this.deleteFlag = true;
                            }
                        }
                    }
                })

                this.detailFlag = false;
            },

            // 查看作业公告详情
            homeworkDetail(index) {
                this.detailFlag = false;
                this.dId = this.homeworkList[index].id;
                this.dTitle = this.homeworkList[index].title;
                this.dText = this.homeworkList[index].text;
                this.dHits = this.homeworkList[index].hits;
                this.dDate = this.homeworkList[index].date;
            },

            // 从详情页面返回列表页面
            noticels() {
                this.detailFlag = true
            }
        }
    }
</script>
