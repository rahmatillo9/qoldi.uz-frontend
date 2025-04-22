import axios from 'axios';

export async function getLocationFromCoords(lat: number, lon: number) {
  const apiKey = "9833ffcf24714aaa9c2b6538bfb0ea22" // .env faylga qo‘yiladi
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=uz&pretty=1`;

  const res = await axios.get(url);
  const data = res.data;

  if (data.results.length > 0) {
    const components = data.results[0].components;
    return {
      city: components.city || components.town || components.village || "Noma'lum shahar",
      district: components.suburb || components.state_district || "Noma'lum tuman"
    };
  }

  return { city: "Noma'lum", district: "Noma'lum" };
}
