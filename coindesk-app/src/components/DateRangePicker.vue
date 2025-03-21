<template>
    <div class="date-range-picker">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date" v-model="startDate" />
  
      <label for="end-date">End Date:</label>
      <input type="date" id="end-date" v-model="endDate" />
  
      <button @click="emitDateRange">Fetch Data</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startDate: '',
        endDate: '',
      };
    },
    methods: {
      emitDateRange() {
        this.$emit('date-range-selected', { startDate: this.startDate, endDate: this.endDate });
      },
    },
  };
  </script>
  
  