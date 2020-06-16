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
                                                                    <div v-for="(notice,index) in noticeList" :key="notice.id" @click="noticeDetail(index)">
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

                                                                                    <span class="text-nowrap align-middle font-size-13 mr-2 float-right">
                                                                                      <i class="uil uil-eye text-muted mr-1"></i>
                                                                                      {{ notice.hits }}
                                                                                    </span>
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
                                                                    <div v-for="(homework,index) in homeworkList" :key="homework.id" @click="homeworkDetail(index)">
                                                                        <div class="card border mb-0">
                                                                            <div class="card-body p-3">

                                                                                <h6 class="mt-0 mb-2 font-size-15">
                                                                                    <a href="javascript: void(0);"
                                                                                       class="text-body">{{ homework.title }}
                                                                                    </a>
                                                                                </h6>

                                                                                <div style="overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">{{homework.text}}</div>

                                                                                <p class="mb-0 mt-2">
                                                                                    <small class=" text-muted">
                                                                                        {{ homework.date }}
                                                                                    </small>

                                                                                    <span class="text-nowrap align-middle font-size-13 mr-2 float-right">
                                                                                      <i class="uil uil-eye text-muted mr-1"></i>
                                                                                      {{ homework.hits }}
                                                                                    </span>
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
                                                <span class="text-nowrap align-middle font-size-13 mr-2 float-right " @click="deleteModel = true">
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
                noticeList: [
                    {
                        id: 2,
                        title: '公告标题',
                        date: 'Jan 16, 2019',
                        text:'公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1公告内容1',
                        hits: 7,
                        groupId: 1,
                    },
                    {
                        id: 3,
                        title: '考试通知',
                        date: 'Jan 22, 2019',
                        text:'<p>各校区、学院及学生班级：</p><p>\t根据我校 《关于做好疫情防控期间本科生课程考核工作的通知》（教务TZ[2020]51号）文件要求，结合学校学生返校情况，现将2019/2020学年第二学期期末考试有关事宜通知如下，各部门要做好传达并认真执行。</p><p>\t1．考试安排：跨学院的课程由教务处统一安排考试时间、地点，其余课程由各学院自行安排。具体课程考试安排见<strong>附件1：2019/2020学年第二学期期末考试安排表，根据各班级的返校人数考场已进行合并。已返校学生按考场安排进教室考试，未返校考生按照考试时间居家考试</strong>。</p><p>\t2．考试形式：线上方式，任课教师要提前告知学生需登录的平台、操作流程及注意事项。</p><p>\t3．考试时间：2020年6月29日——7月3日共五天，晋城校区的考试时间与教务处安排的考试时间统一。全部成绩必须在2020年7月6日晚6点前上报结束。</p><p>\t<strong>各学院组织的考试课考试时间自定，考试地点与教务处联系。</strong>各学院请于<strong>6月24日前</strong>将考试时间、地点、监考老师的电子版上报教务处（格式参照期末考试安排表）（晋城校区的考场及监考人员由晋城校区自行安排）。</p><p>\t<strong>4．考试命题：鼓励学院按照课程总体考核要求编制开放型试题。</strong></p><p>\t<strong>5．监考人员与工作人员进出考场需按照疫情防控要求佩戴口罩。</strong></p><p>&nbsp;6．<strong>考试结束后由承担教学任务的学院组织相关资料归档</strong>（晋城校区的自行负责）</p><p>&nbsp;7．考试领导：学校成立考试领导组，负责期末考试的组织领导。</p><p>\t组&nbsp;长：王枝茂</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成&nbsp;员：李虹&nbsp;刘向军&nbsp;吴素萍&nbsp;李志宏&nbsp;眭红亮&nbsp;刘明星&nbsp;刘志奇&nbsp;范明亮&nbsp;高丽娟</p><p>\t<strong>各学院（部）要成立以书记、院长为组长的考试领导组（成员名单考试前一周电子版报教务处），负责本单位期末考试的组织领导，按照学校要求做好本学院考试准备工作，督促本学院监考老师合理安排考场座次，维护考场秩序，确保考试顺利进行。</strong></p><p>\t8．其它：宣传部、学生处、团委、新闻中心以及各学院要广泛开展考风、考纪宣传教育活动，通过正确的舆论导向，引导学生诚信考试。保卫部门要加强期末考试期间校园秩序的维护；后勤部门要按照学校疫情防控要求，做好教室通风、消杀等工作；教育信息化中心要提前检查网络运行情况，保证校园网络顺畅，保障期末考试的顺利进行。</p><p>\t</p><p class="ql-align-center"><span style="color: white;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特此通知</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\t教\t&nbsp;&nbsp;\t务\t&nbsp;&nbsp;\t处</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020年6月15日</p><p><strong>附件1：2019/2020学年第二学期期末考试安排表</strong>&nbsp;&nbsp;&nbsp;&nbsp;</p>',
                        hits: 11,
                        groupId: 1,
                    },
                    {
                        id: 4,
                        title: 'Invite user to a project',
                        date: 'Feb 08, 2019',
                        text:'公告内容3',
                        hits: 10,
                        groupId: 1,
                    },
                ],
                homeworkList: [
                    {
                        id: 2,
                        title: '作业标题1',
                        date: 'Jan 16, 2019',
                        text:'作业内容1',
                        hits: 7,
                        groupId: 1,
                    },
                    {
                        id: 3,
                        title: 'Topnav layout design',
                        date: 'Jan 22, 2019',
                        text:'公告内容2',
                        hits: 11,
                        groupId: 1,
                    },
                    {
                        id: 4,
                        title: 'Invite user to a project',
                        date: 'Feb 08, 2019',
                        text:'公告内容3',
                        hits: 10,
                        groupId: 1,
                    },
                ],

                dId:'',
                dTitle: '',
                dDate: '',
                dText:'',
                dHits: '',

            }
        },

        computed: {

        },

        created() {
            // 初始化noticeList和homeworkList数组
            this.initNotice();
        },

        methods: {

            // 初始化noticeList和homeworkList数组
            initNotice() {

            },

            // 删除公告（普通公告或者作业公告）
            noticeDelete() {

                // 删除ID 为 this.dId

                this.deleteModel = false;
                this.detailFlag = true;
            },

            // 查看普通公告详情
            noticeDetail(index) {
                this.detailFlag = false;
                this.dId = this.noticeList[index].id;
                this.dTitle = this.noticeList[index].title;
                this.dText = this.noticeList[index].text;
                this.dHits = this.noticeList[index].hits;
                this.dDate = this.noticeList[index].date;
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
