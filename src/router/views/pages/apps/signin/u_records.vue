<script>
  import Layout from '@layouts/main'
  import PageHeader from '@components/page-header'

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
        uPublishTends: uPublishTends,
        uDurationTends:  uDurationTends,
        uPublishPie: uPublishPie,
        uAttendancePie: uAttendancePie,
      }
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

      <!-- 本月学习时长趋势图 -->
      <div class="col-xl-6">
        <!-- begin card -->
        <div class="card">
          <!-- begin card-body -->
          <div class="card-body">
            <!-- 图表标题 -->
            <h4 class="header-title mt-0 mb-3">本月学习时长趋势图</h4>
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

