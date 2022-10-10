<template>
  <div>
    <v-btn
      color="accent"
      depressed
      @click="openReminderModal()"
    >
      Add Reminder
    </v-btn>
    <add-reminder-modal v-model="isReminderModalOpen" v-if="isReminderModalOpen"/>
  </div>
</template>

<script>
import AddReminderModal from '@/components/add-reminder-modal/add-reminder-modal.vue';
export default {
  components: {
    AddReminderModal,
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
