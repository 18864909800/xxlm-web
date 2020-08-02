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
                                    博客分享
                                </label>
                            </div>
                            <div class="col text-right">
                                <button id="btn-new-event" class="btn btn-primary" @click="noticePublish">
                                    <i class="uil-share-alt mr-1"></i>分享
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
                        <b-form class="form-horizontal">
                            <div class="row">
                                <div class="col">

                                    <div class="form-group mt-3 mt-sm-0 select"
                                         style="display: flex;justify-content: center">
                                        <label class="col-1" style="padding-left: 0;margin-top: 1%;">类型</label>
                                        <el-select v-model="type" placeholder="请选择" style="width: 100%">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.opt"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>

                                    <b-form-group
                                        label-cols-sm="10"
                                        label-cols-lg="1"
                                        label="标题"
                                        label-for="input-horizontal"
                                    >
                                        <b-form-input
                                            id="input-horizontal"
                                            v-model="title"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                        label-cols-sm="10"
                                        label-cols-lg="1"
                                        label="链接"
                                        label-for="input-horizontal"
                                    >
                                        <b-form-input
                                            id="input-horizontal"
                                            v-model="link"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                        label-cols-sm="11"
                                        label-cols-lg="1"
                                        label="描述"
                                        label-for="example-textarea"
                                    >
                                        <b-form-textarea
                                            id="example-textarea"
                                            size="lg"
                                            rows="3"
                                            v-model="text"
                                        ></b-form-textarea>
                                    </b-form-group>


                                </div>
                            </div>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>

        <!--博客分享确认模态框-->
        <b-modal v-model="publishModel" title="博客分享" title-class="font-18">
            <!--<h6>公告发表</h6>-->
            <p>确认分享该博客吗？</p>
            <!--<hr />-->
            <template v-slot:modal-footer>
                <b-button variant="light" @click="publishModel = false">取消</b-button>
                <b-button variant="primary" @click="publishConfirm">确认</b-button>
            </template>
        </b-modal>
        <!--博客分享确认模态框-->

    </Layout>
</template>

<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import axios from 'axios'
import qs from "querystring";

export default {
    page: {
        title: '分享博客',
        meta: [{name: 'description', content: appConfig.description}],
    },
    components: {Layout, PageHeader},
    data() {
        return {

            // 模态框显示开关
            publishModel: false,

            // 博客类型
            // options: ['Python','Java','架构','数据库','区块链','云计算','前端','人工智能','大数据','移动开发'],

            options: [],

            title: '',
            type: '',
            typeId: '',
            link: '',
            text: ''
        }
    },
    computed: {},

    created() {
        // 获取博客类型
        this.getAllCategory();
    },

    methods: {
        // 获取所有博客分类
        getAllCategory() {
            axios.get("http://localhost:8081/blog/get-all-category").then(res => {
                if (res.data.responseCode == '200') {
                    if (res.data.data != null) {
                        this.options = [];


                        for (let i = 0; i < res.data.data.length; i++) {
                            let obj = res.data.data[i];

                            this.options.push({
                                id: obj.blogCId,
                                opt: obj.blogCName
                            })
                        }
                    }
                }
            })
        },

        typeSelect() {
            console.log('111')
        },

        noticePublish() {

            if (this.type == null || this.type === '') {
                this.$notify({
                    title: '警告',
                    message: '请选择公告类型',
                    type: 'warning'
                });
                return;
            }
            if (this.title == null || this.title === '') {
                this.$notify({
                    title: '警告',
                    message: '请填写标题',
                    type: 'warning'
                });
                return;
            }
            if (this.link == null || this.link === '') {
                this.$notify({
                    title: '警告',
                    message: '请填写博客链接',
                    type: 'warning'
                });
                return;
            }
            if (this.text == null || this.text === '') {
                this.$notify({
                    title: '警告',
                    message: '请填写描述',
                    type: 'warning'
                });
                return;
            }

            this.publishModel = true;

        },

        publishConfirm() {
            axios({
                url: 'http://localhost:8081/blog/upload-blog',
                method: "POST",
                data: qs.encode({
                    blogCId: this.type,
                    bdTitle: this.title,
                    bdLink: this.link,
                    bdContent: this.text
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
            }).then(res => {
                if (res.data.responseCode == '200') {
                    if (res.data.data) {
                        // 清除所有输入框的内容
                        this.title = '';
                        this.type = '';
                        this.link = '';
                        this.text = '';

                        // 提示
                        this.$notify({
                            title: '成功',
                            message: '发表成功',
                            type: 'success'
                        });
                    }
                }
            }).catch(error => {
                // 提示
                this.$notify({
                    title: '失败',
                    message: '服务器正忙，请稍后再试',
                    type: 'warning'
                });
            })

            this.publishModel = false;
        }
    }
}
</script>

<style lang="scss">
.select {
    .el-select .el-input.is-focus .el-input__inner {
        border-color: #5369f8;;
    }

    .el-select .el-input__inner:focus {
        border-color: #5369f8;;
    }

}
</style>
