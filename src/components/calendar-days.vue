<template>
  <ol class="calendar-day-list">
    <li 
      class="calendar-day" 
      :class="{ 'calendar-day-list-weekend': isWeekend(day.getDay())}" 
      v-for="(day, index) in days" 
      :key="index"
    >
      <span 
        class="text-h6" 
        :class="{ weekend: isWeekend(day.getDay()), 'not-actual-month': day.getMonth() !== actualMonth}"
      > 
        {{day.getDate()}}
      </span>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    days: {
      type: Array,
      required: true
    },
    actualMonth: {
      type: Number,
      required: true
    }
  },
  methods: {
    isWeekend(day) {
      console.log(day)
      return day === 0 || day === 6; 
    }
  }
}
</script>

<style scoped>
  .weekend {
    color: cornflowerblue;
  }
  .not-actual-month {
    color: grey;
  }
  .calendar-day-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid black;
  }
  .calendar-day-list-weekend {
    background-color: lightgray !important;
  }
  .calendar-day {
    height: 80px;
    outline: 1px solid black;
    background-color: white;
  }
</style>