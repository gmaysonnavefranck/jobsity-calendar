<template>
  <div>
    <v-menu
      ref="datePicker"
      v-model="datePicker"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          label="Date"
          hint="MM/DD/YYYY format"
          persistent-hint
          readonly
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="cValue"
        no-title
        @input="datePicker = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true 
    },
  },
  data() {
    return {
      datePicker: false,
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
    }
  },
  watch: {
    cValue () {
      this.dateFormatted = this.formatDate(this.cValue)
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
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }
}
</script>

<style>

</style>