class Recognize {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
  }

  // * Methods simply for classful functionality
  updateContext(context) {
    this.context = context;
  }

  splitInput(input) {
    return (input = input
      .toLowerCase() // normalize all the data
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
    let words = this.splitInput(input);
    if (
      words.includes("thank") ||
      words.includes("thanks") ||
      words.includes("thank you")
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

  weatherQuery(input) {
    // TODO: Add more types of weather queries
    // If the input asks about the current weather, return true
    if (
      this.splitInput(input).includes("what") &&
      this.splitInput(input).includes("weather")
    ) {
      return true;
    }
    return false;
  }
}

export default Recognize;
