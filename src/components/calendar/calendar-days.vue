<template>
  <ol class="calendar-day__list">
    <li 
      class="calendar-day pt-1" 
      :class="{ 'calendar-day--weekend': isWeekend(day.getDay()) }" 
      v-for="(day, index) in days" 
      :key="index"
    >
      <span 
        v-if="!isToday(day)"
        class="calendar-day--text" 
        :class="{ 
          'calendar-day--outside-this-month': day.getMonth() !== actualMonth,
        }"
      > 
        {{day.getDate()}}
      </span>
      <v-avatar v-else color="primary" size="30" class="calendar-day--text calendar-day--today">
        {{day.getDate()}}
      </v-avatar>
      <reminders-tag :reminders="fetchReminderByDate(day)"/> 
    </li>
  </ol>
</template>

<script>
import RemindersTag from '@/components/calendar/reminders-tag.vue';
export default {
  components:{
    RemindersTag
  },
  props: {
    days: {
      type: Array,
      required: true
    },
    actualMonth: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    fetchReminderByDate(date){
      return this.$store.getters['reminder/getRemindersByDate'](date.toISOString().substr(0, 10));
    },
    isWeekend(day) {
      return day === 0 || day === 6; 
    },
    isToday(day) {
      return day.toISOString().substr(0, 10) === this.today;
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

    &--today {
      color: white;
      margin-left: 5%;
      font-size: 1.5em;
    }
  }
</style>
