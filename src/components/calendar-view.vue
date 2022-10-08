<template>
  <div class="mx-5 mt-5">
    <div class="calendar-top">
      <calendar-month-year class="column" :month="selectedMonth" :year="selectedYear"/>
      <calendar-add-reminder class="column--center"/>
      <calendar-navigation 
        class="column--end"
        @changeMonth="(changeValue) => changeMonth(changeValue)"
      />
    </div>
    <calendar-days-header/>
    <calendar-days :days="daysToShow" :actualMonth="selectedMonth"/>
  </div>
</template>

<script>
import CalendarDaysHeader from '@/components/calendar-days-header.vue';
import CalendarMonthYear from '@/components/calendar-month-year.vue';
import CalendarDays from '@/components/calendar-days.vue';
import CalendarNavigation from '@/components/calendar-navigation.vue';
import CalendarAddReminder from '@/components/calendar-add-reminder.vue';
  export default {
    name:"CalendarView",
    components: {
      CalendarDaysHeader,
      CalendarDays,
      CalendarMonthYear,
      CalendarNavigation,
      CalendarAddReminder
    },
    
    data() {
      return {
        selectedMonth: null,
        selectedYear: null,
        selectedDate: null,
        today: null,
        daysToShow: [],
      }
    },

    watch: {
      selectedDate(newSelectedDate) {
        this.getCalendarInformationsFromDate(newSelectedDate)
      }
    },

    created() {
      this.today = new Date();
      this.selectedDate = new Date();
      this.getCalendarInformationsFromDate(this.today)
    },

    methods: {
      changeMonth(changeValue){
        if(!changeValue)
          return this.selectedDate = new Date();
        return this.selectedDate = new Date (this.selectedDate.setMonth(this.selectedDate.getMonth() + changeValue));
      },

      getCalendarInformationsFromDate(date){
        this.getMonthAndYear(date)
        const thisMonthDates =  this.getAllDatesInMonth(date.getFullYear(), date.getMonth());
        this.daysToShow = this.fillDates(thisMonthDates);
      },

      getMonthAndYear(date){
        this.selectedMonth = date.getMonth();
        this.selectedYear = date.getFullYear();
      },

      getAllDatesInMonth(year, month) {
        const date = new Date(year, month, 1);

        const dates = [];

        while (date.getMonth() === month) {
          dates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }

        return dates;
      },

      fillDates(listOfDates){
        const firstDate = new Date(listOfDates[0]);
        const lastDate = new Date(listOfDates[listOfDates.length-1]);

        let firstDateDay = firstDate.getDay();
        let lastDateDay = lastDate.getDay();

        while(firstDateDay > 0) {
          firstDate.setDate(firstDate.getDate() - 1);
          listOfDates.unshift(new Date(firstDate))
          firstDateDay--;
        }

        while(lastDateDay < 6) {
          lastDate.setDate(lastDate.getDate() + 1);
          listOfDates.push(new Date(lastDate))
          lastDateDay++;
        }

        return listOfDates;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .calendar-top {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .column {
    &--end {
      justify-self: end;
      align-self: center;
    }
    &--center {
      align-self: center;
      justify-self: center;
    }
  }
</style>