export const tablesTableData = [
  {
    name: 'Oliver Liam',
    email: 'oliver@burrito.com',
    password: 'FRB1235476',
    date: 1627873200000,
  },
  {
    name: 'Oliver Liam',
    email: 'oliver@burrito.com',
    password: 'FRB1235476',
    date: 1627873200000,
  },
  {
    name: 'Oliver Liam',
    email: 'oliver@burrito.com',
    password: 'FRB1235476',
    date: 1627873200000,
  },
];

export const lineChartData = [
  {
    name: 'Registered Employee',
    data: [5],
  }
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: true,
    },
  },
  tooltip: {
    theme: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'months',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    labels: {
      style: {
        colors: '#c8cfca',
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#c8cfca',
        fontSize: '12px',
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ['#4FD1C5', '#2D3748'],
  },
  colors: ['#4FD1C5', '#2D3748'],
};
