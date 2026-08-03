<script setup lang="ts">
import { computed } from "vue";
import type { ApexOptions } from "apexcharts";

const props = defineProps<{
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
  suffix?: string;
}>();

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: "area",
    toolbar: { show: false },
    zoom: { enabled: false },
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
    size: 4,
  },

  xaxis: {
    categories: props.categories,
  },

  tooltip: {
    y: {
      formatter: (value) => `${value} ${props.suffix ?? ""}`,
    },
  },

  grid: {
    strokeDashArray: 4,
  },

  legend: {
    position: "top",
  },
}));
</script>

<template>
  <div class="w-full">
    <apexchart
      width="100%"
      height="350"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
