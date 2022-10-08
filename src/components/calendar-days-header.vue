<template>
  <ol class="day-text body-1">
    <li v-for="day in days" :key="day"> {{ day }} </li>
  </ol>
</template>

<script>
const CONSTANT_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export default {
  computed: {
    days() {
      return CONSTANT_DAYS 
    }
  },
}
</script>

<style scoped>
.day-text {
  background-color:rgb(40, 71, 161);
  color: white;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

</style>