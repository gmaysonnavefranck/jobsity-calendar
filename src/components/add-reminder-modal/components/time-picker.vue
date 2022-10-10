<template>
  <div>
    <v-menu
      ref="timePicker"
      v-model="istimePickerOpen"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="cValue"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="cValue"
          label="Time"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-time-picker
        v-if="istimePickerOpen"
        v-model="cValue"
        format="24hr"
        full-width
        @click:minute="$refs.timePicker.save(cValue)"
      />
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
      istimePickerOpen: false,
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
}
</script>
