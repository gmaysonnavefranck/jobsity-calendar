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
                    prepend-icon="mdi-sun-snowflake-variant"
                    hint="Forecast for the day selected!"
                    readOnly
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
import DatePicker from '@/components/calendar-modal/date-picker.vue';
import TimePicker from '@/components/calendar-modal/time-picker.vue';
import GeocodeService from "@/services/geocode.service.js";
import WeatherService from "@/services/weather.service.js";

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
      if(Object.keys(this.coordinates).length === 0) return this.reminderForm.weather = "No city selected to know!"
      this.getWeatherInformation(this.coordinates)
    },
    time(){
      if(Object.keys(this.coordinates).length === 0) return this.reminderForm.weather = "No city selected to know!"
      this.getWeatherInformation(this.coordinates)
    }
  },
  methods: {
    getForm(){
      const date = new Date();
      return {
        reminder: '',
        city: '',
        time: `${(date.getHours() + 1).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
        date: date.toISOString().substr(0, 10),
        color: '',
        weather: "No city selected to know!"
      }
    },
    async searchCity(city){
      try {
        //should search with more than the city alone, maybe I won't have time for that.
        const cityInformation = await GeocodeService.getCoordinatesFromCity(city);
        this.coordinates = cityInformation.results[0].geometry.location;
        this.getWeatherInformation(this.coordinates, 5)
      } catch(e) {
        this.coordinates = {};
        this.reminderForm.weather = 'City not found!';
        console.log(e) //TODO snackbar
      }
    },
    async getWeatherInformation(coordinates){
      const differenceInDayFromToday = this.getDifferenceBetweenDates();
      if(differenceInDayFromToday < 0) return this.reminderForm.weather = 'Date from the past!'
      if(differenceInDayFromToday > 5) return this.reminderForm.weather = 'Date too far!'; //API max date
      try {
        const {lat, lng} = coordinates;
        const weatherInformation = await WeatherService.getWeatherInformationFromCoords(lat, lng, Math.ceil(differenceInDayFromToday) * 8)
        this.fillWeatherInformation(weatherInformation);
      } catch(e) {
        this.reminderForm.weather = "Couldn't fetch forecast!!"
        console.log(e) //TODO snackbar
      }
    },
    fillWeatherInformation(weatherInformation){
      const weatherListOnDate = 
        weatherInformation.list.filter(
          (date) =>date.dt_txt.substr(0,10) === this.reminderForm.date
        )
      const closestWeather = this.findClosestFromTimeSelected(weatherListOnDate);
      console.log(closestWeather);
      this.reminderForm.weather = `The weather will be ${closestWeather.weather[0].description}!`
    },
    findClosestFromTimeSelected(datesList){
      const hourSelected = parseInt(this.reminderForm.time.split(':')[0])
      const date = datesList.reduce(
        (prev, curr) => Math.abs(curr.dt_txt.substr(11,13) - hourSelected) < Math.abs(prev.dt_txt.substr(11,13) - hourSelected) ? curr : prev
        )
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
