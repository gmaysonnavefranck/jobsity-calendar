<template>
  <v-snackbar
      v-model="snackbar"
      timeout="2000"
      :color="notification.type"
    >
     {{ notification.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      snackbar: true,
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification)
      this.snackbar = false;
  }, 2000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    },
  },
  methods: mapActions("notification", ["remove"]),
};
</script>
