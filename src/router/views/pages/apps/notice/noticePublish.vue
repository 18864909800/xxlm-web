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
                                    公告发表
                                </label>
                            </div>
                            <div class="col text-right">
                                <button id="btn-new-event" class="btn btn-primary" @click="noticePublish">
                                    <i class="uil-share-alt mr-1"></i>发表
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

                                    <div class="form-group mt-3 mt-sm-0 select" style="display: flex;justify-content: center">
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

                                    <div class="form-group">
                                        <vue-editor v-model="text"></vue-editor>
                                    </div>
                                </div>
                            </div>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>

        <!--公告发表确认模态框-->
        <b-modal v-model="publishModel" title="公告发表" title-class="font-18">
            <!--<h6>公告发表</h6>-->
            <p>确认发表该公告吗？</p>
            <!--<hr />-->
            <template v-slot:modal-footer>
                <b-button variant="light" @click="publishModel = false">取消</b-button>
                <b-button variant="primary" @click="publishConfirm">确认</b-button>
            </template>
        </b-modal>
        <!--公告发表确认模态框-->

    </Layout>
</template>

<script>
    import appConfig from '@src/app.config'
    import Layout from '@layouts/main'
    import PageHeader from '@components/page-header'
    import { VueEditor } from 'vue2-editor'
    import axios from 'axios';
    import qs from 'querystring';

    export default {
        page: {
            title: '发表公告',
            meta: [{ name: 'description', content: appConfig.description }],
        },
        components: { Layout, PageHeader, VueEditor},
        data() {
            return {

                // 模态框显示开关
                publishModel:false,

                // 公告类型
                options: [
                    {
                        id:0,
                        opt:'普通公告'
                    },
                    {
                        id:1,
                        opt:'作业公告'
                    }
                ],

                title:'',
                type:'',
                text:''
            }
        },
        computed: {

        },

        methods: {
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
                if (this.text == null || this.text === '') {
                    this.$notify({
                        title: '警告',
                        message: '请填写内容',
                        type: 'warning'
                    });
                    return;
                }


                console.log(this.type);
                console.log(this.title);
                console.log(this.text);

                this.publishModel = true;

            },

            publishConfirm() {
                console.log(this.title);
                console.log(this.type);
                console.log(this.text);

                this.publishModel = false;

                axios({
                    url: 'http://localhost:8081/notice/push-notice',
                    method: "POST",
                    data: qs.encode({
                        noticeTitle: this.title,
                        noticeType: this.type,
                        noticeContent: this.text
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                }).then(res => {
                    if(res.data.responseCode == '200') {
                        if(res.data.data == true) {
                            this.$notify({
                                title: '成功',
                                message: '公告发表成功',
                                type: 'success'
                            });


                            this.title = '';
                            this.type = '';
                            this.text = '';
                        }
                    }
                }).catch(error => {
                    this.$notify({
                        title: '警告',
                        message: '服务器正忙，请稍后再试',
                        type: 'warning'
                    });
                })


            }
        }
    }
</script>

