<script setup>
import VueApexCharts from 'vue3-apexcharts'

const series = [232, 12, 4]

const chartOptions = {
  chart: {
    type: 'donut',
    fontFamily: 'inherit',
  },
  labels: ['Healthy Stock', 'Low Stock', 'Out of Stock'],
  colors: ['#10b981', '#f59e0b', '#ef4444'],
  stroke: {
    width: 4,
    colors: ['#ffffff'],
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: 'bottom',
    fontSize: '13px',
    labels: {
      colors: '#57534e',
    },
    markers: {
      size: 6,
    },
    itemMargin: {
      horizontal: 8,
      vertical: 6,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '72%',
        labels: {
          show: true,
          name: {
            show: true,
            color: '#78716c',
            fontSize: '13px',
          },
          value: {
            show: true,
            color: '#1c1917',
            fontSize: '24px',
            fontWeight: 700,
          },
          total: {
            show: true,
            label: 'Total Products',
            color: '#78716c',
            fontSize: '13px',
            formatter() {
              return '248'
            },
          },
        },
      },
    },
  },
  tooltip: {
    y: {
      formatter(value) {
        return `${value} products`
      },
    },
  },
}
</script>

<template>
  <article class="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">
        Current levels
      </p>

      <h3 class="mt-1 text-lg font-bold text-stone-900">
        Inventory Status
      </h3>

      <p class="mt-1 text-sm text-stone-500">
        Product availability across inventory.
      </p>
    </div>

    <div class="mt-4">
      <VueApexCharts
        type="donut"
        height="320"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </article>
</template>