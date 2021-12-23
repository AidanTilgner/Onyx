// Helpers
import Places from "../types/places.js";

class Command {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
  }

  // * Functional Methods
  updateContext(context) {
    this.context = context;
  }

  isCommand(input) {
    if (input.split(" ").includes("$:") && input.split(" ").length > 1)
      return true;

    return false;
  }

  getCommandAsArray(input) {
    // hello, hi)
    let formInput = input.replace("$: ", "").split(" (");
    if (formInput[1]) formInput[1] = formInput[1].replace(")", "").split(", ");
    return formInput;
  }

  // * Fullfillment Methods
  fulfill(input) {
    if (typeof this[this.getCommandAsArray(input)[0]] !== "function") {
      console.error("Command not found: ", this.getCommandAsArray(input)[0]);
      return false;
    }
    input = this.getCommandAsArray(input);
    return this[input[0]](input[1]);
  }

  // * Command Methods
  say_hello() {
    console.log("Hello");
    return "Hello";
  }

  repeat([input]) {
    console.log("You said: ", input);
    return "You said: ", input;
  }

  echo_user_name() {
    console.log("Your name is: ", this.context.state.clientName);
    return "Your name is: ", this.context.state.clientName;
  }

  async get_coordinates_by_address([address]) {
    // $: get_coordinates_by_address (1465 Center ST NE Salem OR 97301)
    const coords = await new Places(
      this.context,
      this.settings
    ).getCoordinatesByAddress(address);
    return `Coordinates for '${address}' are (${coords.lat}, ${coords.lng})`;
  }

  async get_address_by_coordinates([lat, lng]) {
    // $: get_address_by_coordinates (44.9395544, -123.0216553)
    const address = await new Places(
      this.context,
      this.settings
    ).getAddressByCoordinates(lat, lng);
    return `Address for '(${lat}, ${lng})' is '${address}'`;
  }
}

export default Command;
