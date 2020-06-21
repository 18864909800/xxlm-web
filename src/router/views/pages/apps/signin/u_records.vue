<script>
  import Layout from '@layouts/main'
  import PageHeader from '@components/page-header'

  // 引入图标插件
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
        title: '签到记录',
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
    <PageHeader :title="title"   />
    	<div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mt-0 mb-3">本月学习时长趋势图</h4>

              <apexchart
                height="380"
                type="line"
                class="apex-charts"
                :series="uPublishTends.series"
                :options="uPublishTends.chartOptions"
              ></apexchart>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card-->
        </div>
        <div class="col-xl-6">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mt-0 mb-3">本周贡献趋势</h4>
              <apexchart
                class="apex-charts"
                height="380"
                type="line"
                :series=" uDurationTends.series"
                :options=" uDurationTends.chartOptions"
              ></apexchart>
            </div>
          </div>
        </div>
		  </div>
      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mt-0 mb-3">本周不同资料发布占比</h4>
              <apexchart
                class="apex-charts"
                height="320"
                type="pie"
                :series="uPublishPie.series"
                :options="uPublishPie.chartOptions"
              ></apexchart>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card-->
        </div>
        <!-- end col-->
        <div class="col-xl-6">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mt-0 mb-3">本周打卡缺勤天数占比</h4>
              <apexchart
                type="donut"
							  height="345"
                :series="uAttendancePie.series"
                :options="uAttendancePie.chartOptions"
              ></apexchart>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card-->
			</div>
		</div>

  </Layout>
</template>

