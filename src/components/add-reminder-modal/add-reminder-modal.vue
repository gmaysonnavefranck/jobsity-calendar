<template>
  <div>
    <v-dialog
      v-model="cValue"
      persistent
      transition="dialog-bottom-transition"
      max-width="700"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            <h2>{{title}}</h2>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="reminderForm.reminder"
                      autofocus
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
                      :rules="rules.required"
                      prepend-icon="mdi-city"
                      hint="Type your city name"
                      label="Your city*"
                      @change ="(city) => searchCity(city)"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="reminderForm.weather"
                      :loading="loadingWeather"
                      prepend-icon="mdi-sun-snowflake-variant"
                      hint="Forecast for the day selected!"
                      readonly
                      label="Weather"
                      @change ="(city) => searchCity(city)"
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
            <v-btn text @click="openDeleteDialog()" color="warning" v-if="id">
              Delete
            </v-btn>
            <v-btn text @click="saveReminder()" color="success" data-testid="save-button">
              Save
            </v-btn>
            <v-btn text @click="dialog.value = false" color="error">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <remove-reminders-modal 
      v-model="isDeleteDialogOpen" 
      :reminders="[reminderForm]" 
      @deleted="(isReminderDeleted) => checkIfReminderDeleted(isReminderDeleted)"
    />
  </div>
</template>

<script>
import DatePicker from '@/components/add-reminder-modal/components/date-picker.vue';
import TimePicker from '@/components/add-reminder-modal/components/time-picker.vue';
import GeocodeService from "@/services/geocode.service.js";
import WeatherService from "@/services/weather.service.js";
import RemoveRemindersModal from '@/components/calendar/components/remove-reminders-modal.vue'

export default {
  components:{
    DatePicker,
    TimePicker,
    RemoveRemindersModal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      valid: false,
      loadingWeather: false,
      isDeleteDialogOpen: false,
      reminderForm: this.getForm(),
      coordinates: {},
      rules: {
        required: [v => !!v || 'Required.'],
        reminder: [v => v.length <= 30 && !!v || 'Name must be less than 30 characters'],
      }
    }
  },
  computed: {
    date() {
      return this.reminderForm.date;
    },
    time() {
      return this.reminderForm.time;
    },
    title(){
      return this.id ? "Update reminder" : "Add a Reminder";
    },
    cValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    date(){
      this.verifyDateTimeChange();
    },
    time(){
      this.verifyDateTimeChange();
    }
  },

  methods: {
    checkIfReminderDeleted(isReminderDeleted){
      this.cValue = !isReminderDeleted;
    },
    verifyDateTimeChange(){
      if(!this.reminderForm.city) return this.reminderForm.weather = "No city selected to know!"
      if(!this.coordinates?.lat || !this.coordinates?.long) return this.searchCity(this.reminderForm.city);
      this.getWeatherInformation(this.coordinates);
    },
    getForm(){
      if(this.id) return this.getReminder(this.id);
      const date = new Date();
      return {
        reminder: '',
        city: '',
        time: `${(date.getHours() + 1).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
        date: date.toISOString().substring(0, 10),
        color: '',
        weather: "No city selected to know!"
      }
    },
    async searchCity(city){
      try {
        //should search with more than the city alone, maybe I won't have time for that.
        const cityInformation = await GeocodeService.getCoordinatesFromCity(city);
        this.coordinates = cityInformation?.results[0]?.geometry.location;
        this.reminderForm.coordinates = this.coordinates;
        if(!this.coordinates) throw "Error! no coordinates!";
        this.getWeatherInformation(this.coordinates)
      } catch(error) {
        this.coordinates = {};
        this.reminderForm.weather = 'City not found!';
        const notification = {
          type: "error",
          message: `There was a problem fetching the weather: ${error.message}`,
        };
        this.$store.dispatch("notification/add", notification, { root: true });
      }
    },
    async getWeatherInformation(coordinates){
      const differenceInDayFromToday = this.getDifferenceBetweenDates();
      if(differenceInDayFromToday < 0) return this.reminderForm.weather = 'Date from the past!'
      if(differenceInDayFromToday > 5) return this.reminderForm.weather = 'Date too far!'; //API max date
      try {
        const {lat, lng} = coordinates;
        this.loadingWeather = true;
        const weatherInformation = await WeatherService.getWeatherInformationFromCoords(lat, lng, Math.ceil(differenceInDayFromToday) * 8)
        this.fillWeatherInformation(weatherInformation);
      } catch(error) {
        this.reminderForm.weather = "Couldn't fetch forecast!!"
        const notification = {
          type: "error",
          message: `There was a problem fetching the weather: ${error.message}`,
        };
        this.$store.dispatch("notification/add", notification, { root: true });
      } finally {
        this.loadingWeather = false;
      }
    },
    fillWeatherInformation(weatherInformation){
      let weatherListOnDate = 
        weatherInformation?.list.filter(
          (date) => date.dt_txt.substring(0,10) === this.reminderForm.date
        )
      if(!weatherListOnDate.length) {
        return this.reminderForm.weather = `The weather will be ${weatherInformation.list[0].weather[0].description}!`
      }

      let closestWeather = this.findClosestFromTimeSelected(weatherListOnDate);
      this.reminderForm.weather = `The weather will be ${closestWeather.weather[0].description}!`
    },

    findClosestFromTimeSelected(datesList){
      console.log(datesList)
      if(datesList.length === 1) return datesList;
      const hourSelected = parseInt(this.reminderForm.time.split(':')[0])
      const date = datesList.reduce((prev, curr) => {
        return Math.abs(parseInt(curr.dt_txt.substring(11,13)) - hourSelected) < Math.abs(parseInt(prev.dt_txt.substring(11,13)) - hourSelected) ? curr : prev
      })
      return date;
    },
    getDifferenceBetweenDates(){
      const today = new Date();
      const reminderDate = new Date(this.reminderForm.date)
      const [hours, minutes] = this.reminderForm.time.split(':')
      reminderDate.setHours(hours);
      reminderDate.setMinutes(minutes);
      reminderDate.setSeconds(0);
      reminderDate.setMilliseconds(0);
      reminderDate.setDate(reminderDate.getDate() + 1);
      return (reminderDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    },
    getReminder(id){
      const reminderToUpdate = {
        ...this.$store.getters['reminder/getReminderById'](id)
      };
      this.coordinates = reminderToUpdate.coordinates;
      return reminderToUpdate;
    },
    saveReminder() {
      if(!this.$refs.form.validate()) return;
      if(this.id) {
        this.$store.dispatch("reminder/update", this.reminderForm, { root: true });
        const notification = {
          type: "success",
          message: `Reminder updated!`,
        };
        this.$store.dispatch("notification/add", notification, { root: true });
        return this.cValue = false;
      }
      this.$store.dispatch("reminder/add", this.reminderForm, { root: true });
      const notification = {
          type: "success",
          message: `Reminder created!`,
        };
        this.$store.dispatch("notification/add", notification, { root: true });
      this.cValue = false;
    },
    openDeleteDialog(){
      this.isDeleteDialogOpen = true;
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
