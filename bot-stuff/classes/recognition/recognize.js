import Weather from "../../helpers/types/weather.js";

class Recognize {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
    this.weather = new Weather(this.context, this.settings);
  }

  // * Methods simply for classful functionality
  updateContext(context) {
    this.context = context;
  }

  splitInput(input) {
    return (input = input
      .toLowerCase()
      .replace(".", "")
      .replace(",", "") // normalize all the data
      .split(" ")); // Split the input into an array of words
  }

  // TODO: Add sections for different conversational points, e.ging. greeting, body, goodbye, etc.
  isGreeting(input) {
    let words = this.splitInput(input);
    if (
      words.includes("hello") ||
      words.includes("hi") ||
      words.includes("ciao") ||
      words.includes("hola") ||
      words.includes("hey")
    ) {
      return true;
    }

    return false;
  }

  isThankful(input) {
    input = input.toLowerCase();
    if (
      input.match(/thank/) ||
      input.match(/thanks/) ||
      input.match(/thank you/) ||
      input.match(/gracias/) ||
      input.match(/grazie/)
    ) {
      return true;
    }
    return false;
  }

  generalKenobi(input) {
    if (input.toLowerCase() === "hello there!") {
      return true;
    }
    return false;
  }

  timeQuery(input) {
    // TODO: Add more types of time queries
    // If the input asks about the current time, return true
    if (
      this.splitInput(input).includes("what") &&
      this.splitInput(input).includes("time")
    ) {
      return true;
    }
    return false;
  }

  isWeatherQuery(input) {
    if (this.weather.isWeatherQuery(input)) return true;
    return false;
  }
}

export default Recognize;
