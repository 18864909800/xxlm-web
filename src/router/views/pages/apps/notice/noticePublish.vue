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
                                <button id="btn-new-event" class="btn btn-primary">
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
                                                value="Some text value..."
                                        ></b-form-input>
                                    </b-form-group>

                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label">类型</label>
                                        <div class="col-lg-11">
                                            <select class="form-control custom-select">
                                                <option>1</option>
                                                <option>2</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <vue-editor></vue-editor>
                                    </div>
                                </div>
                            </div>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>

    </Layout>
</template>

<script>
    import appConfig from '@src/app.config'
    import Layout from '@layouts/main'
    import PageHeader from '@components/page-header'
    import { VueEditor } from 'vue2-editor'



    export default {
        page: {
            title: '发表公告',
            meta: [{ name: 'description', content: appConfig.description }],
        },
        components: { Layout, PageHeader, VueEditor},
        data() {
            return {

            }
        },
        computed: {
            dragOptions() {
                return {
                    group: 'tasks',
                }
            },
        },
    }
</script>

