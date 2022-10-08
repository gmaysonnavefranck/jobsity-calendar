<template>
  <h1>{{cYearMonth}}</h1>
</template>

<script>
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
export default {
  props: {
    year: {
      type: Number,
      required: true 
    },
    month: {
      type: Number,
      required: true 
    },
  },
  computed: {
    cYearMonth() {
      return `${this.getMonthName(this.month)}, ${this.year}`
    }
  },
  methods: {
    getMonthName(monthNumber) {
      return MONTH_NAMES[monthNumber];
    }
  },
}
</script>
