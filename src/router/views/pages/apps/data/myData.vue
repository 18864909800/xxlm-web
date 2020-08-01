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
                                    我的资料分享
                                </label>
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

                                                    <div>{{ data.text }}</div>

                                                    <a :href="data.address">{{ data.address }}</a>

                                                    <p class="mb-0 mt-2">
                                                        <small class=" text-muted mr-2">
                                                            {{ data.name }}
                                                        </small>

                                                        <small class=" text-muted">
                                                            {{ data.date }}
                                                        </small>

                                                        <span
                                                            class="text-nowrap align-middle font-size-13 mr-1 float-right">
                            <i @click="deleteThisBlog(data.id)" v-if="data.deleteFlag" class="uil uil-trash-alt text-muted mr-1"></i>
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
                        <span slot="title">{{ item.tab }}</span>
                    </el-menu-item>
                </el-menu>
            </el-scrollbar>

        </div>

        <!--删除确认模态框-->
        <b-modal v-model="deleteModel" title="删除公告" title-class="font-18">
            <!--<h6>公告发表</h6>-->
            <p>确认删除该公告吗？</p>
            <!--<hr />-->
            <template v-slot:modal-footer>
                <b-button variant="light" @click="deleteModel = false">取消</b-button>
                <b-button variant="primary" @click="confirmDelete">确认</b-button>
            </template>
        </b-modal>
        <!--删除确认模态框-->
    </Layout>
</template>

<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import axios from "axios";

export default {
    page: {
        title: '资料',
        meta: [{name: 'description', content: appConfig.description}],
    },
    components: {Layout, PageHeader},
    data() {
        return {
            tabOptions: [],
            dataList: [],
            typeId: 0,
            deleteModel: false,
            delId: null,

        }
    },
    created() {
        this.getAllCategory();
        this.getAllDetails();
    },

    methods: {
        // 查询所有分类
        getAllCategory() {
            axios.get("http://localhost:8080/assets/get-all-category").then(res => {
                if (res.data.responseCode == '200') {
                    if (res.data.data != null) {
                        this.tabOptions = [];

                        // 添加全部条目
                        this.tabOptions.push({
                            id: 0,
                            tab: '全部'
                        })

                        for (let i = 0; i < res.data.data.length; i++) {
                            let obj = res.data.data[i];

                            this.tabOptions.push({
                                id: obj.assetsId,
                                tab: obj.assetsName
                            })
                        }
                    }
                }
            })
        },
        // 查询所有详细信息
        getAllDetails() {
            axios.get("http://localhost:8080/assets/select-current-user-assets?category=" + this.typeId).then(res => {
                if (res.data.responseCode == '200') {
                    if (res.data.data != null) {
                        this.dataList = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            let obj = res.data.data[i];

                            this.dataList.push({
                                id: obj.acId,
                                title: obj.acTitle,
                                name: obj.assetsName,
                                date: obj.acDate,
                                text: obj.acContent,
                                address: obj.acLink,
                                deleteFlag: obj.deleteShow
                            })
                        }
                    }
                }
            })
        },

        // 修改类别
        menuSelect(id) {
            this.typeId = id;

            this.getAllDetails();
        },

        // 删除博客
        deleteThisBlog(id){
            this.delId = id;
            this.deleteModel = true;
        },

        confirmDelete() {
            axios.get("http://localhost:8080/assets/delete-by-id", {
                params: {
                    delId: this.delId
                }
            }).then(res => {
                if(res.data.responseCode == '200') {
                    if(res.data.data) {
                        this.getAllDetails();

                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                }
            }).catch(error => {
                this.$notify({
                    title: '失败',
                    message: '服务器正忙，请稍后再试',
                    type: 'warning'
                });
            })

            this.deleteModel = false;
        }
    }
}
</script>