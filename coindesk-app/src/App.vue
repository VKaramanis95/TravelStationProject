<template>
<div>
  <UserProfileCard />
  <DateRangePicker @date-range-selected="updateDateRange" />
  <BitcoinChart :dateRange="selectedDateRange" />
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