import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#2f74b5',
        disabled: '#a5a5a5',
        secondary: '#b0bec5',
        accent: '#3b739d',
        error: '#b71c1c',
      },
    },
  },
});
