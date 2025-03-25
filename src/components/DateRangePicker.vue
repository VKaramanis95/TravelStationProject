<template>
  <div class="date-range-picker">
    <div class="input-group">
      <label for="start-date">Start Date:</label>
      <input 
        type="date" 
        id="start-date" 
        v-model="startDate" 
        :min="oneYearAgo" 
        :max="today" 
        @change="validateDates"
      />
    </div>

    <div class="input-group">
      <label for="end-date">End Date:</label>
      <input 
        type="date" 
        id="end-date" 
        v-model="endDate" 
        :min="startDate || oneYearAgo" 
        :max="today" 
        @change="validateDates"
      />
    </div>

    <button class="fetch-button" @click="emitDateRange">Fetch Data</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div class="range-buttons">
      <button @click="setDateRange(1)">1M</button>
      <button @click="setDateRange(3)">3M</button>
      <button @click="setDateRange(6)">6M</button>
      <button @click="setDateRange(12)">1Y</button>
    </div>

    <button class="button" @click="fetchBitcoinPrice">Get BTC Price</button>
    <p v-if="btcPrice">Current BTC Price: ${{ btcPrice }}</p>
    <p v-if="btcError" class="error">{{ btcError }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      today: new Date().toISOString().split('T')[0], 
      oneYearAgo: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0], 
      btcPrice: null,
      btcError: '',
      errorMessage: ''
    };
  },
  methods: {
    setDateRange(months) {
      const currentDate = new Date();
      this.endDate = currentDate.toISOString().split('T')[0];
      const startDate = new Date();
      startDate.setMonth(currentDate.getMonth() - months);
      this.startDate = startDate.toISOString().split('T')[0];
      this.emitDateRange();
    },

    validateDates() {
      this.errorMessage = '';
      if (!this.startDate || !this.endDate) {
        this.errorMessage = 'Please select both start and end dates.';
        return false;
      }
      if (this.startDate > this.endDate) {
        this.errorMessage = 'Start date cannot be later than end date.';
        return false;
      }
      return true;
    },

    emitDateRange() {
      if (!this.validateDates()) return;
      console.log("Start Date:", this.startDate, "End Date:", this.endDate);
      this.$emit('date-range-selected', { startDate: this.startDate, endDate: this.endDate });
    },

    async fetchBitcoinPrice() {
      this.btcError = '';
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        this.btcPrice = data.bitcoin?.usd || null;
        if (!this.btcPrice) {
          throw new Error('No price data available.');
        }
      } catch (error) {
        this.btcError = 'Failed to fetch Bitcoin price. Please try again later.';
        console.error('Error fetching Bitcoin price:', error);
      }
    }
  }
};
</script>
