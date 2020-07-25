
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
        aPublishTends: aPublishTends,
        aDurationTop10: aDurationTop10,
        aDurationPie: aDurationPie,
        aAttendancePie: aAttendancePie,
      }
    },

    mounted(){
      // 周博客资料发布趋势图 数据获取
      // 资料
      axios.get('http://localhost:8081/assets/select-everyday-assets').then((response) => {
        aPublishTends.series[0].data = response.data.data;
        console.log(response.data);
      });
      // 博客
       axios.get('http://localhost:8081/blog/select-everyday-blog').then((response) => {
        aPublishTends.series[1].data = response.data.data;
        console.log(response.data);
      });

      // 

    },
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

