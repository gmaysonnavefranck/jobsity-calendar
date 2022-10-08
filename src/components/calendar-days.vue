<template>
  <ol class="calendar-day__list">
    <li 
      class="calendar-day" 
      :class="{ 'calendar-day--weekend': isWeekend(day.getDay()) }" 
      v-for="(day, index) in days" 
      :key="index"
    >
      <span 
        class="calendar-day--text" 
        :class="{ 
          weekend: isWeekend(day.getDay()), 
          'calendar-day--outside-this-month': day.getMonth() !== actualMonth
        }"
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
      return day === 0 || day === 6; 
    }
  }
}
</script>

<style lang="scss" scoped>
  .calendar-day__list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid black;
  }
  .calendar-day {
    height: 180px;
    outline: 1px solid #9c9c9c;
    background-color: white;

    &--text {
      font-size: 1.5em;
      margin-left: 7%;
      font-weight: bold;
    }

    &--weekend {
      background-color: #f2f2f2;
      color: var(--v-accent-base);
    }

    &--outside-this-month {
      color: var(--v-disabled-base);
    }
  }
</style>