
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
  } from './records'
  /**
   * Starter component
   */
  export default {

    components: { Layout, PageHeader },
    data() {
      return {
        title: '团队签到记录统计',
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
            series: [],
        },
        aDurationTop10:  {
            series: [],
            chartOptions: {},
        },
        aDurationPie: {
            series: [],
            chartOptions: {},
        },
        aAttendancePie: {
            series: [],
            chartOptions: {
                chart: {
                    dropShadow: {
                        enabled: true,
                        color: '#111',
                        top: -1,
                        left: 3,
                        blur: 3,
                        opacity: 0.2,
                    },
                },
                stroke: {
                    show: true,
                    width: 2,
                },
                colors: ['#43d39e', '#f77e53'],
                labels: ['打卡', '缺勤'],
                dataLabels: {
                    dropShadow: {
                        blur: 3,
                        opacity: 0.8,
                    },
                    enabled: false,
                },
                fill: {
                    type: 'pattern',
                    opacity: 1,
                    pattern: {
                        enabled: true,
                        style: [
                            'squares',
                            'horizontalLines',
                        ],
                    },
                },
                states: {
                    hover: {
                        enabled: false,
                    },
                },
                legend: {
                    show: false,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    verticalAlign: 'middle',
                    floating: false,
                    fontSize: '14px',
                    offsetX: 0,
                    offsetY: -10,
                },
                responsive: [
                    {
                        breakpoint: 600,
                        options: {
                            chart: {
                                height: 240,
                            },
                            legend: {
                                show: false,
                            },
                        },
                    },
                ],
            },
        },
      }
    },

   async mounted(){
      // 周博客资料发布趋势图 数据获取
        // 获取资料
        this.getAssets();
        // 获取博客
        this.getBlogs();
        // 获取学习时长相关图形
       this.getDurationTop10();
       // 缺勤与打卡人数占比图
        this.getAttendance();

    },
      methods: {
          /**
           * @method
           * @desc 获取资料数据
           */
          getAssets(){
            axios.get('http://localhost:8081/assets/select-everyday-assets')
            .then((response) => {
                console.log(response.data);
                this.aPublishTends.series.push({
                    name: '资料 - ' + new Date().getFullYear(),
                    data: response.data.data,
                })
            }).catch((error) => {
                console.log(error);
            });
        },
          /**
           * @method
           * @desc 获取博客数据
           */
          getBlogs(){
              axios.get('http://localhost:8081/blog/select-everyday-blog')
              .then((response) => {
                  console.log(response.data);
                  this.aPublishTends.series.push({
                      name: '博客 - ' + new Date().getFullYear(),
                      data: response.data.data,
                  })
              }).catch((error) => {
                  console.log(error);
              });
          },
          /**
           * @method
           * @desc 获取学习时长排行top10
           */
          getDurationTop10(){
              axios.get('http://localhost:8081/sign-in/select-learn-time-total')
              .then(res => {
                  let result = res.data.data;
                  let key = Object.keys(result);
                  let value = Object.values(result);
                  let keyTop10 = key.slice(0,10);
                  let valueTop10 = value.slice(0,10);
                  this.aDurationTop10.chartOptions = {
                      chart: {
                          toolbar: {
                              show: false,
                          },
                      },
                      plotOptions: {
                          bar: {
                              horizontal: true,
                          },
                      },
                      dataLabels: {
                          enabled: false,
                      },

                      colors: ['#5369f8'],
                      xaxis: {
                          // tslint:disable-next-line: max-line-length
                          categories: keyTop10,
                          axisBorder: {
                              color: '#d6ddea',
                          },
                          axisTicks: {
                              color: '#d6ddea',
                          },
                      },
                      states: {
                          hover: {
                              filter: 'none',
                          },
                      },
                      grid: {
                          borderColor: '#f1f3fa',
                      },
                      tooltip: {
                          theme: 'dark',
                          x: { show: false },
                      },
                  };
                  this.aDurationTop10.series = [{
                      data : valueTop10
                  }];
                  let temp = value.filter(item => {
                      return item !== 0;
                  });
                  if (temp.length !== 0){
                      this.aDurationPie.series = value;
                      this.aDurationPie.chartOptions = {
                          labels: key,
                          colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
                          legend: {
                              show: false,
                              position: 'bottom',
                              horizontalAlign: 'center',
                              verticalAlign: 'middle',
                              floating: false,
                              fontSize: '14px',
                              offsetX: 0,
                              offsetY: -10,
                          },
                          dataLabels: {
                              enabled: false,
                          },
                          responsive: [
                              {
                                  breakpoint: 600,
                                  options: {
                                      chart: {
                                          height: 240,
                                      },
                                      legend: {
                                          show: false,
                                      },
                                  },
                              },
                          ],
                      }
                  }else {
                      this.aDurationPie.chartOptions = {
                          labels: ['还没有人学习过哦~'],
                          colors: ['#A9A9A9'],
                          legend: {
                              show: false,
                              position: 'bottom',
                              horizontalAlign: 'center',
                              verticalAlign: 'middle',
                              floating: false,
                              fontSize: '14px',
                              offsetX: 0,
                              offsetY: -10,
                          },
                          dataLabels: {
                              enabled: false,
                          },
                          responsive: [
                              {
                                  breakpoint: 600,
                                  options: {
                                      chart: {
                                          height: 240,
                                      },
                                      legend: {
                                          show: false,
                                      },
                                  },
                              },
                          ],
                      }
                      this.aDurationPie.series = [100];
                  }


                  console.log("TOP10");
                  console.log(res.data.data);
              }).catch(error => {
                  console.log(error);
              })
          },
          /**
           * @method
           * @desc 获取今日缺勤人数与打卡人数占比图
           */
          getAttendance(){
              axios.get('http://localhost:8081/sign-in/select-compared')
              .then(res => {
                  this.aAttendancePie.series = res.data.data;
                  console.log('alert')
                  console.log(res.data.data);
              })
          }

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

