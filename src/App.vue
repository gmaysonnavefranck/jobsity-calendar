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

  data: () => ({
    //
  }),
};
</script>
