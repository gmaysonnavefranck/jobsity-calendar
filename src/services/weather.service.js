import { apiClient } from "./apiClient";

const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?'
const apiKey = '53901e80f2cf68f47a11ce57ea835357';

export default {
  async getWeatherInformationFromCoords(lat, lon, daysCount) {
    const { data } = await apiClient.get(`${baseUrl}lat=${lat}&lon=${lon}&cnt=${daysCount}&appid=${apiKey}`);
    return data;
  },

};