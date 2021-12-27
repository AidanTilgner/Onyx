// Helpers
import fetch from "node-fetch";

// Path
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

// Config
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

class Weather {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
  }

  updateContext(context) {
    this.context = context;
  }

  async getWeather(coords) {
    console.log(process.env.PERSONAL_OPEN_WEATHER_API_KEY);
    console.log(
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${this.context.state.env.PERSONAL_OPEN_WEATHER_API_KEY}`
      ).then((res) => res.json())
    );
    return await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${this.context.state.env.PERSONAL_OPEN_WEATHER_API_KEY}`
    ).then((res) => res.json());
  }
}

const test = new Weather({
  state: {
    env: {
      PERSONAL_OPEN_WEATHER_API_KEY: process.env.PERSONAL_OPEN_WEATHER_API_KEY,
    },
  },
});

test.getWeather({ lat: 44.86585090373615, lon: -122.6262927464399 });

export default Weather;
