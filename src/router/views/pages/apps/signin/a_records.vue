
<script>
  import Layout from '@layouts/main'
  import PageHeader from '@components/page-header'
  import axios from '../../../../../utils/http'

  // 引入图表插件
  import {
    aPublishTends,
    aDurationTop10,
    aDurationPie,
    aAttendancePie,
  }from './records'
  /**
   * Starter component
   */
  export default {

    components: { Layout, PageHeader },
    data() {
      return {
        title: '团队签到记录统计',
        year: new Date().getFullYear,
        aPublishTends: {
            chartOptions: {
                chart: {
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#5369f8', '#43d39e'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    width: [3, 3],
                    curve: 'smooth',
                },
                grid: {
                    row: {
                        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.2,
                    },
                    borderColor: '#f1f3fa',
                },
                markers: {
                    style: 'inverted',
                    size: 6,
                },
                xaxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    title: {
                        text: 'week',
                    },
                    axisBorder: {
                        color: '#d6ddea',
                    },
                    axisTicks: {
                        color: '#d6ddea',
                    },
                },
                yaxis: {
                    title: {
                        text: '条数',
                    },
                    min: 0,
                    max: 5,
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5,
                },
                tooltip: {
                    theme: 'dark',
                    x: { show: false },
                },
                responsive: [
                    {
                        breakpoint: 600,
                        options: {
                            chart: {
                                toolbar: {
                                    show: false,
                                },
                            },
                            legend: {
                                show: false,
                            },
                        },
                    },
                ],
            },
            series: [
                {
                    name: '资料 - ' + this.year,
                    data: [],
                },
                {
                    name: '博客 - ' + this.year,
                    data: [],
                },
            ],
        },
        aDurationTop10: aDurationTop10,
        aDurationPie: aDurationPie,
        aAttendancePie: aAttendancePie,
      }
    },

    mounted(){
      // 周博客资料发布趋势图 数据获取
      // 资料
        console.log("1");
        let data = function() {
             axios.get('http://localhost:8081/assets/select-everyday-assets')
                 .then((response) => {
                     console.log(response.data.data);
                     this.aPublishTends.series[0].data = response.data.data;
                 }).catch((error) => {
                 console.log(error);
                 return [];
             });
         }();

        console.log(this.aPublishTends.series[0].data)
      // 博客
        this.aPublishTends.series[1].data = () => {
            axios.get('http://localhost:8081/blog/select-everyday-blog')
                .then((response) => {
                    console.log(response.data);
                    return response.data.data;
                }).catch((error) => {
                console.log(error);
                return [];
            });
        }


      // 

    },
      methods: {
        getAssets(){
            axios.get('http://localhost:8081/assets/select-everyday-assets')
            .then((response) => {
                console.log(response.data);
                return response.data.data;
            }).catch((error) => {
                console.log(error);
                return [];
            });
        },
          getBlogs(){
              axios.get('http://localhost:8081/blog/select-everyday-blog')
              .then((response) => {
                  console.log(response.data);
                  return response.data.data;
              }).catch((error) => {
                  console.log(error);
                  return [];
              });
          },
      }
  }
</script>
<template>
  <Layout>
    <!-- 头部 -->
    <PageHeader />
    <!-- /头部 -->


    <!-- 标题 -->
    <div class="row">
      <div class="col-12">
          <!-- begin card -->
          <div class="card">
              <!-- begin card-body -->
              <div class="card-body">
                  <!--begin  align-items-center -->
                  <div class="row align-items-center">
                      <!--beigin col  -->
                      <div class="col">
                          <!--签到记录  -->
                          <label class="font-weight-bold d-inline mr-2" style="font-size: 18px">
                              {{title}}
                          </label>
                          <!-- /签到记录 -->
                      </div>
                      <!--/ end col  -->
                  </div>
                  <!--/end align-items-center -->
              </div>
              <!-- /end card-body -->
          </div>
          <!-- /end card -->
        </div>
    </div>
    <!-- /标题 -->


    <!-- 第一行图表 -->
    <div class="row">

      <!-- 周博客资料发布趋势 图 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">周博客资料发布趋势</h4>
            <!-- 图表 -->
            <apexchart
              class="apex-charts"
              height="380"
              type="line"
              :series="aPublishTends.series"       
              :options="aPublishTends.chartOptions"
            ></apexchart>
          </div>
          <!-- /end card-body -->
        </div>
        <!-- /end card -->
      </div>
      <!-- /周博客资料发布趋势 图 -->

      <!-- 本周学习时长排行TOP10 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">本周学习时长排行TOP10</h4>
            <!-- 图表 -->
            <apexchart
              height="380"
              type="bar"
              class="apex-charts"
              :series="aDurationTop10.series"
              :options="aDurationTop10.chartOptions"
            ></apexchart>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- /本周学习时长排行TOP10 -->

    </div>
    <!-- /第一行图表结束 -->

    <!-- 第二行图表 -->
    <div class="row">

      <!-- 各成员本周学习时长占比图 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">各成员本周学习时长占比图</h4>
            <!-- 图表 -->
            <apexchart
              class="apex-charts"
              height="320"
              type="pie"
              :series="aDurationPie.series"
              :options="aDurationPie.chartOptions"
            ></apexchart>
          </div>
          <!-- /end card-body -->
        </div>
        <!-- /end card-->
      </div>
      <!-- /各成员本周学习时长占比图-->

      <!-- 今日缺勤人数与打卡人数占比图 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">今日缺勤人数与打卡人数占比图</h4>
            <!-- 图表 -->
            <apexchart
              height="320"
              type="donut"
              :series="aAttendancePie.series"
              :options="aAttendancePie.chartOptions"
            ></apexchart>
          </div>
          <!-- /end card-body -->
        </div>
        <!-- /end card-->
      </div>
      <!-- /今日缺勤人数与打卡人数占比图 -->

    </div>
    <!-- /第二行图表结束 -->

  </Layout>
</template>

