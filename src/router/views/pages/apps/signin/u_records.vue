<script>
  import Layout from '@layouts/main'
  import PageHeader from '@components/page-header'
  import axios from '../../../../../utils/http'

  // 引入图表插件
  import {
    uPublishTends,
    uDurationTends,
    uPublishPie,
    uAttendancePie
  }from './records'
  /**
   * Starter component
   */
  export default {

    components: { Layout, PageHeader },
    data() {
      return {
        title: '我的签到记录统计',
        uDurationTends:   {
              series: [],
              chartOptions: {
                  chart: {
                      type: 'line',
                      height: 350
                  },
                  stroke: {
                      curve: 'stepline',
                  },
                  dataLabels: {
                      enabled: false
                  },
                  markers: {
                      hover: {
                          sizeOffset: 4
                      }
                  }
              },
         },
        uPublishTends: {
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

        uPublishPie:  {
            series: [],
            chartOptions: {},
        },
        uAttendancePie: {
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
     mounted(){
      // 周博客资料发布趋势图 数据获取
         this.getDurationTends();
        this.getAssets();
        this.getBlogs();
        this.getPublishPie();
        this.getAttendance();

    },
      methods: {
        /**
         *@method
         * @desc 获取本周学习时长趋势图
         */
        getDurationTends(){
            axios.get('http://localhost:8080/sign-in/select-learn-time-self')
            .then(res => {
                this.uDurationTends.series = [{
                    data : res.data.data
                }]
            })
        },
          /**
           * @method
           * @desc 获取资料数据
           */
          getAssets(){
              axios.get('http://localhost:8080/assets/select-everyday-everyone-assets')
                  .then((response) => {
                      console.log(response.data);
                      this.uPublishTends.series.push({
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
              axios.get('http://localhost:8080/blog/select-everyday-everyone-blog')
                  .then((response) => {
                      console.log(response.data);
                      this.uPublishTends.series.push({
                          name: '博客 - ' + new Date().getFullYear(),
                          data: response.data.data,
                      })
                  }).catch((error) => {
                  console.log(error);
              });
          },
          /**
           *@method
           * @desc 获取本周不同资料占比
           */
          getPublishPie(){
             axios.get('http://localhost:8080/assets/select-assets-names')
              .then(async res => {
                  if (res.data.data.name.length === 0){
                      this.uPublishPie.chartOptions = {
                          labels: ['啥也没有发~'],
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
                      this.uPublishPie.series = [100];
                  }else{
                      this.uPublishPie.chartOptions = {
                          labels: res.data.data.name,
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
                      await axios.get('http://localhost:8080/assets/select-assets-counts')
                          .then(res => {
                              this.uPublishPie.series = res.data.data.count;
                          })
                  }

              })
          },
          /**
           * @method
           * @desc 获取今日缺勤人数与打卡人数占比图
           */
          getAttendance(){
              axios.get('http://localhost:8080/sign-in/select-compared-self')
                  .then(res => {
                      this.uAttendancePie.series = res.data.data;
                      console.log('alert')
                      console.log(res.data.data);
                  })
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

      <!-- 本月学习时长趋势图 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">本周学习时长趋势图</h4>
            <!-- 图表 -->
            <apexchart
              height="380"
              type="line"
              class="apex-charts"
              :series="uDurationTends.series"
              :options="uDurationTends.chartOptions"
            ></apexchart>
          </div>
          <!-- /end card-body -->
        </div>
        <!-- /end card -->
      </div>
      <!-- /本月学习时长趋势图 -->

      <!-- 本周贡献趋势 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">本周贡献趋势</h4>
            <!-- 图表 -->
            <apexchart
              class="apex-charts"
              height="380"
              type="line"
              :series="uPublishTends.series"
              :options=" uPublishTends.chartOptions"
            ></apexchart>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- /本周贡献趋势 -->

    </div>
    <!-- /第一行图表结束 -->


    <!-- 第二行图表 -->
    <div class="row">

      <!-- 本周不同资料发布占比 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">本周不同资料发布占比</h4>
            <!-- 图表 -->
            <apexchart
              class="apex-charts"
              height="320"
              type="pie"
              :series="uPublishPie.series"
              :options="uPublishPie.chartOptions"
            ></apexchart>
          </div>
          <!-- /end card-body -->
        </div>
        <!-- /end card-->
      </div>
      <!-- /本周不同资料发布占比-->

      <!-- 本周打卡缺勤天数占比 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">本周打卡缺勤天数占比</h4>
            <!-- 图表 -->
            <apexchart
              type="donut"
              height="320"
              :series="uAttendancePie.series"
              :options="uAttendancePie.chartOptions"
            ></apexchart>
          </div>
          <!-- /end card-body -->
        </div>
        <!-- /end card-->
      </div>
      <!-- /本周打卡缺勤天数占比 -->

    </div>
    <!-- /第二行图表结束 -->

  </Layout>

</template>

