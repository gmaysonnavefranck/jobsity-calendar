<template>
  <v-dialog
    v-model="cValue"
    persistent
    transition="dialog-bottom-transition"
    max-width="550"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>
          <h2>All reminders of the day {{day}}</h2>
        </v-toolbar>
        <v-card-text>
          <v-row v-for="reminder in reminders" :key="reminder.id" class="mt-2">
            <span :style="style(reminder.color)" class="body-1 ma-2">
              @{{reminder.time}}: {{reminder.reminder}}
            </span>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false" color="primary">
            Close
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
      },
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
      day(){
        return this.reminders[0].date.substring(8,10);
      },
    },
    methods:{
      style(color){
        return `text-decoration: underline ${color} 2px;` 
      }
    }
  }
</script>
