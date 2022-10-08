<template>
  <div>
    <v-btn
      color="accent"
      small
      class="text-center"
      depressed
      @click="openReminderModal()"
    >
      Add Reminder
    </v-btn>
    <calendar-reminder-modal v-model="isReminderModalOpen" v-if="isReminderModalOpen"/>
  </div>
</template>

<script>
import CalendarReminderModal from '@/components/calendar-reminder-modal.vue';
export default {
  components: {
    CalendarReminderModal,
  },
  data() {
    return {
      isReminderModalOpen: false
    }
  },
  methods: {
    openReminderModal(){
      this.isReminderModalOpen = true
    }
  }
}
</script>

<style>

</style>