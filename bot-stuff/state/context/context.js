// File System
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

// Classes
import Time from "../../helpers/types/time.js";
import Names from "../../helpers/types/names.js";

class Context {
  constructor(state, settings) {
    this.state = state
      ? {
          clientName: "dude",
          ...state,
        }
      : { clientName: "dude" };
    this.settings = settings;
    this.time = new Time(this.state, this.settings);
    this.names = new Names(this.state, this.settings);
  }

  // * Startup
  init() {
    this.updateTime();

    if (this.confirmContextStorage())
      this.state = { ...this.readFromContextStorage(), ...this.state };
  }

  // * Helper Methods to Work with Input Types
  splitInput(input) {
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i]
        .split("")
        .filter((letter) => letter !== "," && letter !== ".")
        .join("");
    }
    return words;
  }

  // * Methods to Find Context in the First Place
  checkForContext(input) {
    let contextExists = false;
    if (this.names.detectName(input)) {
      contextExists = true;
      this.updatePeople(this.names.extractName(input));
    }

    if (this.time.getDateTimeString() !== this.state.currentTime) {
      contextExists = true;
      this.updateTime();
    }

    this.updateTime();
    this.writeToContextStorage(this.state);

    return contextExists;
  }

  // * Methods to Update Context
  onInput(input) {
    this.updateTime();
    this.addToInputHistory(input);
    this.writeToContextStorage(this.state);
  }

  updatePeople(people) {
    this.state.people = [
      ...(this.state.people ? this.state.people : []),
      ...people,
    ];
    if (this.state.people) return true;
    return false;
  }

  updateTime = () => {
    this.state.currentTime = this.time.getDateTimeString();
    this.state.timeOfDay = this.time.getTimeOfDay(
      this.time.getDateTimeString()
    );
    if (this.state.currentTime && this.state.timeOfDay) return true;
    return false;
  };

  addToInputHistory(input) {
    this.state.inputHistory.push(input);

    if (this.state.inputHistory) return true;
    return false;
  }

  // * Methods to work with Persistant Storage
  confirmContextStorage() {
    if (
      !Buffer.isBuffer(
        readFileSync(path.resolve(__dirname, "../context.json"), "utf-8")
      )
    )
      return true;

    return false;
  }

  readFromContextStorage() {
    // TODO: Make take in a file name and path?
    return JSON.parse(
      readFileSync(path.resolve(__dirname, "../context.json"), "utf-8")
    );
  }

  writeToContextStorage(context) {
    writeFileSync(
      path.resolve(__dirname, "../context.json"),
      JSON.stringify(context)
    );
  }
}

export default Context;
