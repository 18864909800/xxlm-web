<template>
    <Layout>

        <PageHeader/>

        <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <label class="font-weight-bold d-inline mr-2" style="font-size: 18px">
                                        资料
                                    </label>
                                </div>
                                <div class="col text-right">
                                    <button id="btn-new-event1" class="btn btn-primary" @click="scrollModal = true">
                                        <i class="uil-plus mr-1"></i>添加分类
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div style="display: flex; justify-content: space-between; margin:0;">

            <el-scrollbar style="width: 78%;height: 450px;">
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
                                                        <span class="text-nowrap align-middle font-size-13 mr-2 float-right">
                                                        <i class="uil uil-trash-alt text-muted mr-1"></i>
                                                        </span>
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

        <!--添加分类模态框-->
        <b-modal
                v-model="scrollModal"
                title="添加资料分类"
                title-class="font-18"
        >

            <b-form-input
                    id="example-placeholder"
                    type="text"
                    placeholder="请输入分类名称"
                    v-model="dataType"
            ></b-form-input>

            <template v-slot:modal-footer>
                <b-button variant="light" @click="scrollModal = false">取消</b-button>
                <b-button variant="primary" @click="addType">确定</b-button>
            </template>
        </b-modal>
        <!--/添加分类模态框-->

    </Layout>
</template>

<script>
    import appConfig from '@src/app.config'
    import Layout from '@layouts/main'
    import PageHeader from '@components/page-header'

    export default {
        page: {
            title: '资料',
            meta: [{name: 'description', content: appConfig.description}],
        },
        components: {Layout, PageHeader},
        data() {
            return {
                scrollModal: false,
                dataType:'',

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
                        tab: '架构'
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
                        tab: '前端'
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
                dataList: [
                    {
                        id: 1,
                        title: '标题1',
                        name: '赵如冰',
                        date: 'Jan 16, 2019',
                        text: '描述',
                        address: 'http://www.baidu.com',
                        hits: 7,
                        groupId: 1,
                    },
                    {
                        id: 2,
                        title: '标题',
                        name: '赵如冰',
                        date: 'Jan 16, 2019',
                        text: '描述',
                        address: 'http://www.baidu.com',
                        hits: 7,
                        groupId: 1,
                    },
                    {
                        id: 3,
                        title: '标题',
                        name: '赵如冰',
                        date: 'Jan 16, 2019',
                        text: '描述',
                        address: 'http://www.baidu.com',
                        hits: 7,
                        groupId: 1,
                    },
                    {
                        id: 4,
                        title: '标题',
                        name: '赵如冰',
                        date: 'Jan 16, 2019',
                        text: '描述',
                        address: 'http://www.baidu.com',
                        hits: 7,
                        groupId: 1,
                    },
                    {
                        id: 5,
                        title: '标题',
                        name: '赵如冰',
                        date: 'Jan 16, 2019',
                        text: '描述',
                        address: 'http://www.baidu.com',
                        hits: 7,
                        groupId: 1,
                    },
                ],
            }
        },
        computed: {},
        created() {
            this.getAllDetails();
            this.getAllCategory();
        },

        methods: {
            addType() {
                this.scrollModal = false;
                console.log(this.dataType)
            },
            menuSelect(index) {
                console.log(index);
            },

            // 查询所有分类
            getAllCategory() {
                this.axios.get("https://api.lightingsui.com/assets/get-all-category")
                    .then(res => {
                        if (res.data.status === 1) {

                            console.log(res.data.data);

                        }
                    });
            },
            // 查询所有详细信息
            getAllDetails() {

            },
        }
    }
</script>

<style>
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }


    .is-horizontal {
        display: none;
    }

</style>

<!--<style>-->
    <!--/* 设置滚动条的样式 */-->
    <!--::-webkit-scrollbar {-->
        <!--width:12px;-->
        <!--background-color: aqua;-->
    <!--}-->

    <!--/* 滚动槽 */-->
    <!--::-webkit-scrollbar-track {-->
        <!--border-radius:10px;-->
    <!--}-->

    <!--/* 滚动条滑块 */-->
    <!--::-webkit-scrollbar-thumb {-->
        <!--border-radius:10px;-->
        <!--background:black;-->
    <!--}-->
<!--</style>-->