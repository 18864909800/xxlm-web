
  // Admin 周博客资料发布趋势图
  const aPublishTends = {
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
        min: 5,
        max: 40,
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
        name: '资料 - 2020',
        data: [28, 29, 12, 36, 32, 32, 33],
      },
      {
        name: '博客 - 2020',
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
  }
  
  // Admin 本周学习时长排行TOP10
  const aDurationTop10 = {
    series: [
      {
        data: [20, 40, 60, 80, 100],
      },
    ],
    chartOptions: {
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
        categories: [
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
          '隋亮亮',
        ],
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
    },
  }


  // Admin 各成员本周学习时长占比图
  const aDurationPie = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['隋亮亮', '隋亮亮','隋亮亮','隋亮亮','隋亮亮',],
      colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
      legend: {
        show: true,
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
    },
  }
  
  // Admin 今日缺勤人数与打卡人数占比图
  const aAtendencePie = {
    chartOptions: {
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
          expandOnClick: false,
        },
      },
      colors: [ '#43d39e', '#ffbe0b'],
      legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'left',
        itemMargin: {
          horizontal: 6,
          vertical: 3,
        },
      },
      labels: [ '打卡', '缺勤'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: (value) => {
            return value + 'k'
          },
        },
      },
    },
    series: [88, 12],
  }
  

  // User 周博客资料贡献趋势
  const uPublishTends = {
    chartOptions: {
      chart: {
        shadow: {
          enabled: false,
          color: '#bbb',
          top: 3,
          left: 2,
          blur: 3,
          opacity: 1,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
        x: { show: false },
      },
      stroke: {
        width: 5,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000',
          '2/11/2000',
          '3/11/2000',
          '4/11/2000',
          '5/11/2000',
          '6/11/2000',
          '7/11/2000',
          '8/11/2000',
          '9/11/2000',
          '10/11/2000',
          '11/11/2000',
          '12/11/2000',
          '1/11/2001',
          '2/11/2001',
          '3/11/2001',
          '4/11/2001',
          '5/11/2001',
          '6/11/2001',
        ],
        axisBorder: {
          color: '#d6ddea',
        },
        axisTicks: {
          color: '#d6ddea',
        },
      },
      title: {
        text: 'Social Media',
        align: 'left',
        style: {
          fontSize: '14px',
          color: '#666',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#43d39e'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        opacity: 0.9,
        colors: ['#50a5f1'],
        strokeColor: '#fff',
        strokeWidth: 2,
        style: 'inverted', // full, hollow, inverted
        hover: {
          size: 7,
        },
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: 'Engagement',
        },
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
        name: 'Likes',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
      },
    ],
  }

  // User 本月学习时长趋势图
  const uDurationTends = {
    series: [
      {
        name: 'Team A',
        type: 'area',
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
      },
      {
        name: 'Team B',
        type: 'line',
        data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
      },
    ],
    chartOptions: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: ['#5369f8', '#43d39e'],
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      fill: {
        type: 'solid',
        opacity: [0.35, 1],
      },
      labels: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09 ',
        '10',
        '11',
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        axisBorder: {
          color: '#d6ddea',
        },
        axisTicks: {
          color: '#d6ddea',
        },
      },
      yaxis: [
        {
          title: {
            text: 'Series A',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Series B',
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' points'
            }
            return y
          },
        },
        theme: 'dark',
        x: { show: false },
      },
    },
  }

  // User 发布不同的资料占比
  const uPublishPie = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['隋亮亮', '隋亮亮','隋亮亮','隋亮亮','隋亮亮',],
      colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
      legend: {
        show: true,
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
    },
  }

  // User 本周缺勤天数与打卡天数
  const uAttendancePie = {
    chartOptions: {
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
          expandOnClick: false,
        },
      },
      colors: [ '#43d39e', '#ffbe0b'],
      legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'left',
        itemMargin: {
          horizontal: 6,
          vertical: 3,
        },
      },
      labels: [ '打卡', '缺勤'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: (value) => {
            return value + 'k'
          },
        },
      },
    },
    series: [88, 12],
  }

  // 导出图表
  export {
    aPublishTends,
    aDurationTop10,
    aDurationPie,
    aAtendencePie,
    uPublishTends,
    uDurationTends,
    uPublishPie,
    uAttendancePie
  }
  