<template>
  <div>
    <span v-if="!cHasToolTip" :style="style(reminder.color)" >
      @{{reminder.time}}: {{reminder.reminder}} 
    </span>
    <v-tooltip bottom v-else>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
          class="d-inline-block text-truncate span-max-width"
          :style="style(reminder.color)"
        >
          @{{reminder.time}}: {{reminder.reminder}} 
        </span>
      </template>
      <span>
        @{{reminder.time}}: {{reminder.reminder}} 
      </span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    reminder: {
      type: Object,
      required: true 
    },
  },
  computed: {
    cHasToolTip() {
      return this.reminder.reminder.length > 25
    }
  },
  methods: {
    style(color){
      return `text-decoration: underline ${color} 1px;` 
    }
  }
}
</script>

<style>
  .span-max-width {
    max-width: 250px;
  }
</style>