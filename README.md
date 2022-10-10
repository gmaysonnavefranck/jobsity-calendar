# jobsity-calendar
  This is a project for the jobsity challenge.
  I have made a calendar from scratch that can add, update and delete reminders from a calendar grid using Vuex.
  For the ui components I have used Vuetify. There are some extra things such as the notification module that
  takes care of all my notifications and act basically as a service for my components. 

  Creating a reminder for the calendar also displays the forecast for that day and time, there are calculations to
  get the closest time that the api returns for better results. Also since I am using the google geocode api to get
  the coordinates required for the weather API, sometimes you can get results even writting a wrong city name, 
  something like curitiiba (curitiba is my home city).

  You can run this project using npm start and also run the tests using npm run test:unit
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
