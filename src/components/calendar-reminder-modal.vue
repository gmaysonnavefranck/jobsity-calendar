<template>
  <v-dialog
    v-model="cValue"
    persistent
    transition="dialog-bottom-transition"
    max-width="700"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          Add a Reminder
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="reminderForm.reminder"
                    :rules="rules.reminder"
                    :counter="30"
                    prepend-icon="mdi-pen"
                    hint="What do you want to remind?"
                    label="Reminder*"
                  />
                </v-col>
                <v-col>
                  <v-row>
                    <v-col class="ma-0 pa-0 mt-3">
                      <span class="caption">Pick a color for your reminder:</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="ma-0 pa-0">
                      <v-color-picker
                        hide-canvas
                        hide-inputs
                        hide-mode-switch
                        class="no-alpha"
                        v-model="reminderForm.color"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="reminderForm.city"
                    :counter="30"
                    :rules="rules.required"
                    prepend-icon="mdi-city"
                    hint="Type your city name"
                    label="Your city*"
                    @change ="(e) => searchCity(e)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <date-picker v-model="reminderForm.date"/>
                </v-col>
                <v-col cols="12" lg="6">
                  <time-picker v-model="reminderForm.time"/>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="saveReminder()" color="success">
            Save
          </v-btn>
          <v-btn text @click="dialog.value = false" color="error">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import DatePicker from '@/components/date-picker.vue';
import TimePicker from '@/components/time-picker.vue';
export default {
  components:{
    DatePicker,
    TimePicker
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      valid: false,
      reminderForm: this.getForm(),
      rules: {
        required: [v => !!v || 'Required.'],
        reminder: [v => v.length <= 30 && !!v || 'Name must be less than 30 characters'],
      }
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
    getForm(){
      const date = new Date();
      return {
        reminder: '',
        city: '',
        time: `${date.getHours()}:${date.getMinutes()}`,
        date: date.toISOString().substr(0, 10),
        color: ''
      }
    },
    searchCity(e){
      console.log(e)
    },
    saveReminder() {
      if(!this.$refs.form.validate()) return;
      console.log(this.reminderForm)
      this.cValue = false;
    },
  },
}
</script>

<style>
  /* Well I had to do this since vuetify does not allow to remove the alpha slider */
  .no-alpha .v-color-picker__controls .v-color-picker__preview .v-color-picker__sliders .v-color-picker__hue{
    margin: 0
  }
  .no-alpha .v-color-picker__controls .v-color-picker__preview .v-color-picker__sliders .v-color-picker__alpha {
    display: none;
  }
</style>