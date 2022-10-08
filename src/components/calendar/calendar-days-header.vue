<template>
  <ol class="day-text">
    <li v-for="day in cDays" :key="day"> {{ day }} </li>
  </ol>
</template>

<script>
const CONSTANT_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export default {
  computed: {
    cDays() {
      return CONSTANT_DAYS 
    }
  },
}
</script>

<style scoped>
  .day-text {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 1.5em;
    font-weight: bold; 
    letter-spacing: 0.1em;
    background-color: var(--v-primary-base);
    color: white;
  }
</style>
