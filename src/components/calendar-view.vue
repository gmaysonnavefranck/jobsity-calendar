<template>
  <div class="mx-5 mt-5">
    <calendar-days-header/>
    <calendar-days :days="days" :actualMonth="actualMonth"/>
  </div>
</template>

<script>
import CalendarDaysHeader from '@/components/calendar-days-header.vue';
import CalendarDays from '@/components/calendar-days.vue';
  export default {
    name:"CalendarView",
    components: {
      CalendarDaysHeader,
      CalendarDays
    },
    data() {
      return {
        actualMonth: null
      }
    },
    computed: {
      days() {
        const now = new Date();
        this.getActualMonth(now)
        const thisMonthDates =  this.getAllDatesInMonth(now.getFullYear(), now.getMonth());
        return this.fillDates(thisMonthDates);
      }
    },
    methods: {
      getActualMonth(today){
        this.actualMonth = today.getMonth();
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
        console.log(lastDateDay)
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