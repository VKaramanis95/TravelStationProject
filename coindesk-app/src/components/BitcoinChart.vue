<template>
  <div class="bitcoin-chart-container">
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="isLoading">Fetching Bitcoin Data...</p>
    <ApexChart
      v-if="!isLoading && chartData.length"
      type="line"
      :options="chartOptions"
      :series="chartData"
    />
    <p v-else-if="!isLoading">No data available for selected range.</p>
  </div>
</template>

<script>
import ApexCharts from "vue3-apexcharts";
import axios from "axios";

export default {
  components: { ApexChart: ApexCharts },
  props: ["dateRange"],
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      chartOptions: {
        chart: {
          id: "bitcoin-chart",
          toolbar: {
            show: window.innerWidth > 768,
            tools: {
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: false,
            },
          },
        },
        xaxis: { type: "datetime" },
        title: { text: "Bitcoin Price History", align: "center" },
      },
      chartData: [],
    };
  },

  watch: {
    dateRange: {
      immediate: true,
      handler(newRange) {
        if (newRange.startDate && newRange.endDate) {
          this.fetchBitcoinData(newRange);
        }
      },
    },
  },
  methods: {
    async fetchBitcoinData(range) {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        const start = new Date(range.startDate).getTime() / 1000;
        const end = new Date(range.endDate).getTime() / 1000;

        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range",
          {
            params: {
              vs_currency: "usd",
              from: start,
              to: end,
            },
          }
        );

        const data = response.data.prices;

        if (data.length === 0) {
          this.errorMessage = "No data available for the selected date range.";
        }

        this.chartData = [
          {
            name: "Bitcoin Price",
            data: data.map(([timestamp, price]) => ({
              x: new Date(timestamp),
              y: price,
            })),
          },
        ];
      } catch (error) {
        this.errorMessage = "Failed to fetch Bitcoin data. Please try again.";
        console.error("API error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>


