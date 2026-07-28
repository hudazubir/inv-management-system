<script setup>
import VueApexCharts from 'vue3-apexcharts'

const series = [
  {
    name: 'Stock In',
    data: [120, 168, 145, 210, 184, 235, 260],
  },
  {
    name: 'Stock Out',
    data: [80, 112, 98, 145, 132, 170, 188],
  },
]

const chartOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    fontFamily: 'inherit',
  },
  colors: ['#f59e0b', '#78716c'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.28,
      opacityTo: 0.02,
      stops: [0, 95],
    },
  },
  grid: {
    borderColor: '#e7e5e4',
    strokeDashArray: 4,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#78716c',
      },
    },
  },
  yaxis: {
    min: 0,
    labels: {
      style: {
        colors: '#78716c',
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: '#57534e',
    },
    markers: {
      size: 6,
    },
  },
  tooltip: {
    y: {
      formatter(value) {
        return `${value} units`
      },
    },
  },
}
</script>

<template>
  <article class="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">
        Last 7 months
      </p>

      <h3 class="mt-1 text-lg font-bold text-stone-900">
        Stock Movement
      </h3>

      <p class="mt-1 text-sm text-stone-500">
        Monthly stock-in compared with stock-out.
      </p>
    </div>

    <div class="mt-4">
      <VueApexCharts
        type="area"
        height="320"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </article>
</template>