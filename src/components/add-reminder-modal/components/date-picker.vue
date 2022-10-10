<template>
  <div>
    <v-menu
      ref="datePicker"
      v-model="isDatePickerOpen"
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
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="cValue"
        no-title
        @input="isDatePickerOpen = false"
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
      isDatePickerOpen: false,
      dateFormatted: this.formatDate(new Date().toISOString().substring(0, 10)),
    }
  },
  created() {
    if(this.value) this.dateFormatted = this.formatDate(this.value)
  },
  watch: {
    cValue (newValue) {
      this.dateFormatted = this.formatDate(newValue)
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
  }
}
</script>
