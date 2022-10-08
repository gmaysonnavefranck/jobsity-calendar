import { apiClient } from "./apiClient";

//I am using Google because the documentation of openWeather said its search for city name is depecated.
// And needs more than the city
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
const apiKey = 'AIzaSyDZSDh1-G6HBQGJaS_f5zdIiWviTK_5J7w'

export default {
  async getCoordinatesFromCity(city) {
    const { data } = await apiClient.get(`${baseUrl}?address=${city}&key=${apiKey}`);
    return data;
  },
};
