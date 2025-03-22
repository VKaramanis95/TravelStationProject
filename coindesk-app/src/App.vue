<template>
  <div class="container">
    <div class="chart-container">
      <BitcoinChart :dateRange="selectedDateRange" />
    </div>

    <div class="info-container">
      <UserProfileCard />
      <DateRangePicker @date-range-selected="updateDateRange" />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "./components/UserProfileCard.vue";
import DateRangePicker from "./components/DateRangePicker.vue";
import BitcoinChart from "./components/BitcoinChart.vue";

export default {
  components: { UserProfileCard, DateRangePicker, BitcoinChart },
  data() {
    return {
      selectedDateRange: {},
    };
  },
  methods: {
    updateDateRange(range) {
      this.selectedDateRange = range;
    },
  },
};
</script>


