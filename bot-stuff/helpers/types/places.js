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
import Google from "../api-calls/google/google.js";

class Places {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
    this.google = new Google(context, settings);
  }

  updateContext(context) {
    this.context = context;
  }

  async getCoordinatesByAddress(address) {
    const place = await fetch(
      this.google.geocodingAPIbyAddress(
        this.context
          ? this.context.state.env.PERSONAL_GOOGLE_API_KEY
          : process.env.PERSONAL_GOOGLE_API_KEY,
        address
      )
    ).then((res) => res.json());

    console.log(place);
    console.log(process.env.PERSONAL_GOOGLE_API_KEY);

    console.log(await place.results[0].formatted_address);

    return (await place.results[0])
      ? place.results[0].geometry.location
      : "No results found";
  }

  async getAddressByCoordinates(lat, lng) {
    const place = await fetch(
      this.google.geocodingAPIbyCoords(
        this.context
          ? this.context.state.env.PERSONAL_GOOGLE_API_KEY
          : process.env.PERSONAL_GOOGLE_API_KEY,
        lat,
        lng
      )
    ).then((res) => res.json());

    return (await place.results[0])
      ? place.results[0].formatted_address
      : "No results found";
  }
}

const test = new Places({
  state: {
    env: {
      PERSONAL_GOOGLE_API_KEY: process.env.PERSONAL_GOOGLE_API_KEY,
    },
  },
});

test.getCoordinatesByAddress("1600 Amphitheatre Parkway, Mountain View, CA");

export default Places;
