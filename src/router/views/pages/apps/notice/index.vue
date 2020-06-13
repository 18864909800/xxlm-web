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
                                                        <div id="task-list-one" class="task-list-items">
                                                            <draggable v-model="todoTasks" v-bind="dragOptions">
                                                                <transition-group type="transition" :name="'flip-list'">
                                                                    <div v-for="notice in noticeList" :key="notice.id" @click="noticeDetail">
                                                                        <div class="card border mb-0">
                                                                            <div class="card-body p-3">

                                                                                <h6 class="mt-0 mb-2 font-size-15">
                                                                                    <a href="javascript: void(0);"
                                                                                       class="text-body">{{ notice.title }}
                                                                                    </a>
                                                                                </h6>

                                                                                <div style="overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">{{notice.text}}</div>

                                                                                <p class="mb-0 mt-2">
                                                                                    <small class=" text-muted">
                                                                                        {{ notice.dueDate }}
                                                                                    </small>

                                                                                    <span class="text-nowrap align-middle font-size-13 mr-2 float-right">
                                                                                      <i class="uil uil-eye text-muted mr-1"></i>
                                                                                      {{ notice.comments }}
                                                                                    </span>
                                                                                    <span class="text-nowrap align-middle font-size-13 mr-2 float-right">
                                                                                      <i class="uil uil-trash-alt text-muted mr-1"></i>
                                                                                    </span>
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
                                        <Homework :homework="homework"/>
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
                                                   class="text-body">标题
                                                </a>
                                            </h6>
                                            <p class="mb-0 mt-3">

                                                <small class="text-muted">
                                                    2020-06-13
                                                </small>

                                                <span class="text-nowrap align-middle font-size-13 mr-2 float-right ">
                                                  <i class="uil uil-eye text-muted mr-1"></i>
                                                  6
                                                </span>
                                                <span class="text-nowrap align-middle font-size-13 mr-2 float-right ">
                                                  <i class="uil uil-trash-alt text-muted mr-1"></i>
                                                </span>
                                            </p>
                                            <div class="mb-0 mt-3" style="overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">内容</div>
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

    </Layout>
</template>

<script>
    import Layout from '@layouts/main'
    import PageHeader from '@components/page-header'
    import Homework from './homework'

    import draggable from 'vuedraggable'
    import appConfig from '@src/app.config'
    // import {tasks} from './data-taskboard'


    export default {
        page: {
            title: '公告',
            meta: [{name: 'description', content: appConfig.description}],
        },
        components: {Layout, PageHeader, Homework, draggable},
        data() {
            return {
                detailFlag: true,
                noticeList: [
                    {
                        id: 1,
                        title: '公告标题',
                        dueDate: 'Jan 16, 2019',
                        text:'公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1',
                        comments: 7,
                        groupId: 1,
                    },
                    {
                        id: 2,
                        title: 'Topnav layout design',
                        dueDate: 'Jan 22, 2019',
                        text:'公告内容2',
                        comments: 11,
                        groupId: 1,
                    },
                    {
                        id: 3,
                        title: 'Invite user to a project',
                        dueDate: 'Feb 08, 2019',
                        text:'公告内容3',
                        comments: 10,
                        groupId: 1,
                    },
                ],
            }
        },

        computed: {
            dragOptions() {
                return {
                    group: 'tasks',
                }
            },
        },

        methods: {
            noticeDetail() {
                this.detailFlag = false
            },
            noticels() {
                this.detailFlag = true
            }
        }
    }
</script>
