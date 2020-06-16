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


                                    <div class="form-group mt-3 mt-sm-0" style="display: flex;justify-content: center">
                                    <!--<div>-->
                                        <label for="default" class="col-1" style="margin-top: 1%">类型</label>
                                        <multiselect v-model="type" :options="options" class="col-11"></multiselect>
                                    </div>

                                    <!--<b-form-group-->
                                            <!--label-cols-sm="11"-->
                                            <!--label-cols-lg="1"-->
                                            <!--label="内容"-->
                                            <!--label-for="example-textarea"-->
                                    <!--&gt;-->
                                        <!--<b-form-textarea-->
                                                <!--id="example-textarea"-->
                                                <!--size="lg"-->
                                                <!--rows="5"-->
                                                <!--v-model="text"-->
                                        <!--&gt;</b-form-textarea>-->
                                    <!--</b-form-group>-->

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
    import Multiselect from 'vue-multiselect'
    import { VueEditor } from 'vue2-editor'

    export default {
        page: {
            title: '发表公告',
            meta: [{ name: 'description', content: appConfig.description }],
        },
        components: { Layout, PageHeader, Multiselect, VueEditor},
        data() {
            return {

                // 模态框显示开关
                publishModel:false,

                // 公告类型
                options: ['普通公告','作业公告'],

                title:'',
                type:'',
                text:''
            }
        },
        computed: {

        },

        methods: {
            noticePublish() {

                if (this.title == null || this.title === '') {
                    this.$notify({
                        title: '警告',
                        message: '请填写标题',
                        type: 'warning'
                    });
                    return;
                }
                if (this.type == null || this.type === '') {
                    this.$notify({
                        title: '警告',
                        message: '请选择公告类型',
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

                this.publishModel = true;

            },

            publishConfirm() {
                console.log(this.title);
                console.log(this.type);
                console.log(this.text);

                this.publishModel = false;
            }
        }
    }
</script>

