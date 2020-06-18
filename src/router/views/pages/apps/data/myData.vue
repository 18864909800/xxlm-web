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

    <div class="card">
      <el-tabs tab-position="right" style="height: 380px">
        <el-tab-pane v-for="tab in tabOptions" :key="tab.id" :label='tab.tab'
                     style="height: 380px;overflow-x: hidden; overflow-y: auto;">
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
        </el-tab-pane>
      </el-tabs>
    </div>

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

    methods: {}
  }
</script>