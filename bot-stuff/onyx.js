// Classes
import Router from "./classes/router.js";
import Context from "./state/context/context.js";
import Command from "./helpers/commands/command.js";

// Path
import readline from "readline";
import { stdin as input, stdout as output } from "process";

// Initialize .env
import dotenv from "dotenv";
dotenv.config();
class Onyx {
  constructor(state, settings) {
    this.context = state
      ? new Context({ clientName: "dude", env: process.env, ...state })
      : new Context({ clientName: "dude", env: process.env });
    this.settings = settings
      ? { prependInput: "->> ", prependOutput: "-<< ", ...settings }
      : { prependInput: "->> ", prependOutput: "-<< " };
    this.router = new Router(this.context, this.settings);
    this.command = new Command(this.context, this.settings);

    this.context.init();
  }

  start() {
    const RL = readline.createInterface({ input, output });

    console.log(`Welcome ${this.context.state.clientName}...\n`);
    let getInput = () => {
      RL.question(this.settings.prependInput, async (res) => {
        if (
          res.toLowerCase() === "exit" ||
          res.toLowerCase() === "quit" ||
          res.toLowerCase() === "bye" ||
          res.toLowerCase() === "goodbye"
        ) {
          console.log(`Bye ${this.context.state.clientName}!`);
          return RL.close();
        }

        if (this.context.checkForContext(res))
          this.router.updateAllContext(this.context);

        if (this.command.isCommand(res)) {
          this.output(await this.command.fulfill(res));
        } else {
          this.router.takeInput(res);
        }

        getInput();
      });
    };
    getInput();
  }

  updateContext(context) {
    this.context = { ...this.context, ...context };
  }

  output(output) {
    console.log(this.settings.prependOutput + output);
  }
}

export default Onyx;
