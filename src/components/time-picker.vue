<template>
  <div>
    <v-menu
      ref="menu"
      v-model="timePicker"
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
          label="Picker in menu"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="timePicker"
        v-model="cValue"
        format="24hr"
        full-width
        @click:minute="$refs.menu.save(cValue)"
      ></v-time-picker>
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
      timePicker: false,
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

<style>

</style>