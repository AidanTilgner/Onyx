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

// Classes
import Places from "./places.js";

class Weather {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
    this.weatherTypes = [
      /rain/i, // Rainy
      /snow/i, // Snowy
      /cloud/i, // Cloudy
      /sun/i, // Sunny
      /wind/i, // Windy
      /fog/i, // Foggy
      /storm/i, // Stormy
      /sleet/i, // Sleet
      /hail/i, // Hail
      /drizzle/i, // Drizzle
      /mist/i, // Mist
      /smoke/i, // Smoke
      /haze/i, // Haze
      /dust/i, // Dust
      /ash/i, // Ash
      /sand/i, // Sand
      /squall/i, // Squall
      /tornado/i, // Tornado
      /clear/i, // Clear
      /overcast/i, // Overcast
    ];
    this.places = new Places(context, settings);
  }

  // Functional
  updateContext(context) {
    this.context = context;
  }

  getWeatherTypeFromVerb(verb) {
    return verb
      .replace("?", "")
      .replace("ing", "")
      .replace("foggy", "fog")
      .replace("sunny", "sun")
      .replace("y", "");
  }

  // Detects Weather Queries
  isWeatherQuery(input) {
    // What is the weather like?
    // What is the weather in [city name]?
    // Is it [weather type] in [city name]?
    // Is it [weather type]?
    if (
      (input.match(/what/i) && input.match(/weather/i)) ||
      (input.match(/is it/i) &&
        // One of the weather types is included in the input
        this.weatherTypes.some((weatherType) => input.match(weatherType)))
    )
      return true;
    return false;
  }

  // Deciphers Weather Queries
  async routeWeatherQuery(input) {
    input = input.toLowerCase();

    if (input.match(/what is/i)) {
      if (input.match(/in/))
        return this.describeCurrentWeather(
          await this.getWeather(
            await this.places.getCoordinatesByAddress(
              input.match(/in (.*)/i)[1]
            )
          )
        );
      return this.describeCurrentWeather(
        await this.getWeather(
          this.context.state.places.find((place) => place.type === "home")
            .coords
        )
      );
    }

    if (input.match(/is it/)) {
      if (input.match(/ in /))
        return this.detectWeatherType(
          await this.getWeather(
            await this.places.getCoordinatesByAddress(
              input.match(/in (.*)/i)[1]
            )
          ),
          input.match(/is it (.*)/i)[1].split(" ")[0]
        );
      return this.detectWeatherType(
        await this.getWeather(
          this.context.state.places.find((place) => place.type === "home")
            .coords
        ),
        input.match(/is it (.*)/i)[1].split(" ")[0]
      );
    }
  }

  // Weather Query Handlers
  describeCurrentWeather(weather) {
    return `It is currently ${Math.floor(
      weather.current.temp
    )} degrees Fahrenheit. There ${
      weather.current.weather[
        weather.current.weather.length - 1
      ].description.match(/s$/i)
        ? "are"
        : "is"
    } ${weather.current.weather
      .map((weather) => weather.description)
      .join(", ")}.`;
  }

  detectWeatherType(weather, verb) {
    if (
      weather.current.weather.some((weather) =>
        weather.description.match(
          new RegExp(this.getWeatherTypeFromVerb(verb), "i")
        )
      )
    ) {
      return `Yes, it is ${verb}`;
    }
    return `No, it is not ${verb}`;
  }

  async getWeather(coords) {
    return await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${this.context.state.env.PERSONAL_OPEN_WEATHER_API_KEY}`
    ).then((res) => res.json());
  }
}

export default Weather;
