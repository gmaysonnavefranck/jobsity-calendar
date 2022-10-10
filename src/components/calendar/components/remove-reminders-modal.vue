<template>
  <v-dialog
    v-model="cValue"
    persistent
    transition="dialog-bottom-transition"
    :max-width="reminders.length === 1 ? '310' : '340'"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title class="text-h5">
          <span>
            Are you sure you want 
          </span>
          <span v-if="reminders.length === 1">
            to delete this reminder?
          </span>
          <span v-if="reminders.length > 1">
            to delete all the reminders?
          </span>
        </v-card-title>
        <v-card-actions class="justify-end">
          <v-btn text @click="deleteReminders()" color="success">
            Yes, I am!
          </v-btn>
          <v-btn text @click="dialog.value = false" color="error">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    reminders: {
      type: Array,
      required: true
    }
  },
  computed: {
    cValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    deleteReminders() {
      this.$emit('deleted', true);
      this.reminders.forEach(reminder => {
        this.isDeleteDialogOpen = false;
        this.$store.dispatch("reminder/remove", reminder, { root: true });
        this.cValue = false;
      })
    }
  }
}
</script>

<style>

</style>