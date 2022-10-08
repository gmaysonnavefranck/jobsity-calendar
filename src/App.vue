<template>
  <v-app>
    <v-main>
      <notification-container />
      <calendar-view/>
    </v-main>
  </v-app>
</template>

<script>
import CalendarView from './components/calendar-view';
import NotificationContainer from './components/notification/notification-container.vue'

export default {
  name: 'App',
  components: {
    CalendarView,
    NotificationContainer
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