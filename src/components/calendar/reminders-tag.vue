<template>
  <div>
    <v-row v-for="(reminder, index) in reminders" :key="reminder.id" class="my-0 py-0">
      <v-col class="my-1 py-0"> <!--TODO truncate -->
        <v-btn 
          depressed
          small
          class="ml-1 text--caption" 
          :style="style(reminder.color)" 
          v-if="index < 3" 
          @click="openReminder(reminder.id)"
        >
         @{{reminder.time}}: {{reminder.reminder}}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-2 my-0">
      <v-btn @click="openAllReminders()" v-if="reminders.length > 3" small depressed text color="primary">
        See all
      </v-btn>
    </v-row>
    <calendar-reminder-modal :id="selectedId"  v-model="isReminderModalOpen" v-if="isReminderModalOpen"/>
  </div>
</template>

<script>
import CalendarReminderModal from '@/components/calendar-modal/calendar-reminder-modal.vue';
export default {
  components: {
    CalendarReminderModal,
  },
  props: {
    reminders: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      selectedId: null,
      isReminderModalOpen: false,
    }
  },
  methods: {
    openReminder(id){
      this.selectedId = id;
      this.isReminderModalOpen = true;
    },
    style(color){
      return `text-decoration: underline ${color} 2px;` 
    }
  }
}
</script>

<style scoped>
  .text{
    color: black;
  }

</style>