
<script>
  import Layout from '@layouts/main'
  import PageHeader from '@components/page-header'

  // 引入图标插件
  import {
    aPublishTends,
    aDurationTop10,
    aDurationPie,
    aAtendencePie,
  }from './records'
  /**
   * Starter component
   */
  export default {

    components: { Layout, PageHeader },
    data() {
      return {
        title: '签到记录',
        aPublishTends: aPublishTends,
        aDurationTop10: aDurationTop10,
        aDurationPie: aDurationPie,
        aAtendencePie: aAtendencePie,
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
              <h4 class="header-title mt-0 mb-3">周博客资料发布趋势</h4>
              <apexchart
                class="apex-charts"
                height="380"
                type="line"
                :series="aPublishTends.series"
                :options="aPublishTends.chartOptions"
              ></apexchart>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mt-0 mb-3">本周学习时长排行TOP10</h4>

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
			  </div>
		  </div>
      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title mt-0 mb-3">各成员本周学习时长占比图</h4>
              <apexchart
                class="apex-charts"
                height="320"
                type="pie"
                :series="aDurationPie.series"
                :options="aDurationPie.chartOptions"
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
              <h4 class="header-title mt-0 mb-3">今日缺勤人数与打卡人数占比图</h4>
              <apexchart
                height="345"
                type="donut"
                :series="aAtendencePie.series"
                :options="aAtendencePie.chartOptions"
              ></apexchart>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card-->
			</div>
		</div>

  </Layout>
</template>

