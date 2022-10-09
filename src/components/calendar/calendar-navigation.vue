<template>
  <div>
    <v-btn
      icon
      @click="() => changeMonth(-1)"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
    </v-btn>
    <v-btn 
      color="accent" 
      depressed 
      small  
      class="mx-3"
      @click="() => changeMonth(0)"
    >
      Current Month
    </v-btn>
    <v-btn
      icon
      @click="() => changeMonth(1)"
    >
      <v-icon>
        mdi-chevron-right
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    changeMonth(changeValue) {
      this.$emit('changeMonth', changeValue) // -1 to previous, 0 to return to current, 1 to next
    }
  }
}
</script>
