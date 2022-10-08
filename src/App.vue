<template>
  <v-app>
    <v-main>
      <calendar-view/>
    </v-main>
  </v-app>
</template>

<script>
import CalendarView from './components/calendar-view';

export default {
  name: 'App',
  components: {
    CalendarView,
  },
};
</script>
<style>
  ol,li {
    list-style-type: none;
    margin: 0;
    padding: 0 !important;
  }
</style>