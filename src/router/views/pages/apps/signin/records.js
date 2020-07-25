
  const year = new Date().getFullYear();

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
        name: '资料 - ' + year,
        data: '',
      },
      {
        name: '博客 - ' + year,
        data: '',
      },
    ],
  }
  
  // Admin 本周学习时长排行TOP10
  const aDurationTop10 = {
    series: [
      {
        data: [100, 90, 80, 70, 60, 50, 40, 30 ,20 ,10],
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
  const aAttendancePie = {
    series: [89, 11],
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
        show: true,
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
  }
  

  // User 本年学习时长趋势图
  const uDurationTends = {
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
          '1/01/2020',
          '2/01/2020',
          '3/01/2020',
          '4/01/2020',
          '5/01/2020',
          '6/01/2020',
          '7/01/2020',
          '8/01/2020',
          '9/01/2020',
          '10/01/2020',
          '11/01/2020',
          '12/01/2020',
        ],
        axisBorder: {
          color: '#d6ddea',
        },
        axisTicks: {
          color: '#d6ddea',
        },
      },
      title: {
        text: '',
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
        min: 0,
        max: 100,
        title: {
          text: '学习时长',
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
        name: '学习时长',
        data: [40, 30, 10, 90, 29, 19, 22, 90, 12, 70, 19, 50],
      },
    ],
  }


  // User 周博客资料贡献趋势
  
  const uPublishTends = {
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
        name: '资料 - ' + year,
        data: '',
      },
      {
        name: '博客 - ' + year,
        data: '',
      },
    ],
  }

  // User 发布不同的资料占比
  const uPublishPie = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['Linux', '数据库','Java','前端','CSS',],
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
    series: [89, 11],
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
        show: true,
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
  }

  // 导出图表
  export {
    aPublishTends,
    aDurationTop10,
    aDurationPie,
    aAttendancePie,
    uPublishTends,
    uDurationTends,
    uPublishPie,
    uAttendancePie
  }
  