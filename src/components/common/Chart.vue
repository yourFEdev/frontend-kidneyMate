<template>
  <div class="chart-container">
    <apexchart
      width="100%"
      height="350"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ApexOptions } from "apexcharts";

const series = ref([
  {
    name: "Health",
    data: [90, 92, 28, 51, 72, 88,85],
  },
]);

const chartOptions = ref<ApexOptions>({
  chart: {
    type: "area",
    width: "100%",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  dataLabels: {
    enabled: false,
  },

  stroke: {
    curve: "smooth",
    width: 2,
  },

  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 100],
    },
  },

  markers: {
    size: 3,
  },

  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },

  grid: {
    strokeDashArray: 4,
  },

  tooltip: {
    shared: true,
    intersect: false,
  },

  legend: {
    position: "top",
  },

  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 300,
        },
      },
    },
  ],
});
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>