<template>
  <div class="date-range-picker">
    <div class="input-group">
      <label for="start-date">Start Date:</label>
      <input 
        type="date" 
        id="start-date" 
        v-model="startDate" 
        :min="'2010-01-01'"
        :max="today" 
      />
    </div>

    <div class="input-group">
      <label for="end-date">End Date:</label>
      <input 
        type="date" 
        id="end-date" 
        v-model="endDate" 
        :min="'2010-01-01'"  
        :max="today"  
      />
    </div>

    <button class="fetch-button" @click="emitDateRange">Fetch Data</button>

    <div class="range-buttons">
      <button @click="setDateRange(1)">1M</button>
      <button @click="setDateRange(3)">3M</button>
      <button @click="setDateRange(6)">6M</button>
      <button @click="setDateRange(12)">1Y</button>
      <button @click="setDateRange(60)">5Y</button>
      <button @click="setMaxDateRange">Max</button>
    </div>

    <button class="btc-price-button" @click="fetchBitcoinPrice">Get BTC Price</button>
    <p v-if="btcPrice">Current BTC Price: ${{ btcPrice }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      today: new Date().toISOString().split('T')[0], 
      btcPrice: null
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

    setMaxDateRange() {
      this.startDate = '2010-01-01'; 
      this.endDate = new Date().toISOString().split('T')[0]; 
      this.emitDateRange();
    },

    emitDateRange() {
      console.log("Start Date:", this.startDate, "End Date:", this.endDate);
      this.$emit('date-range-selected', { startDate: this.startDate, endDate: this.endDate });
    },

    async fetchBitcoinPrice() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        this.btcPrice = data.bitcoin.usd;
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    }
  },
};
</script>

