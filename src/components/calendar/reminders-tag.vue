<template>
  <div>
    <v-row v-for="reminder in cReminders" :key="reminder.id" class="my-0 py-0">
      <v-col class="mt-1 py-0">
        <v-btn 
          depressed
          small
          class="mr-1 ml-2 text--caption" 
          @click="openReminder(reminder.id)"
        >
          <span-with-tooltip :reminder="reminder" />
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-2 my-0 py-0">
      <v-btn @click="showAllReminders()" v-if="reminders.length > 3" small text>
        See all
      </v-btn>
    </v-row>
    <calendar-reminder-modal :id="selectedId"  v-model="isReminderModalOpen" v-if="isReminderModalOpen"/>
    <show-reminders-modal :reminders="reminders" v-model="isShowRemindersModalOpen" v-if="isShowRemindersModalOpen" />
  </div>
</template>

<script>
import CalendarReminderModal from '@/components/calendar-modal/calendar-reminder-modal.vue';
import ShowRemindersModal from '@/components/calendar/show-reminders-modal.vue';
import SpanWithTooltip from '@/components/calendar/span-with-tooltip.vue';
export default {
  components: {
    CalendarReminderModal,
    ShowRemindersModal,
    SpanWithTooltip
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
      isShowRemindersModalOpen: false
    }
  },
  computed: {
    cReminders() {
      return this.reminders.slice(0,3);
    }
  },
  methods: {
    showAllReminders(){
      this.isShowRemindersModalOpen = true;
    },
    openReminder(id){
      this.selectedId = id;
      this.isReminderModalOpen = true;
    },
  }
}
</script>

<style scoped>
  .text{
    color: black;
  }

</style>