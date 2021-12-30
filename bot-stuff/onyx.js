// Classes
import Router from "./classes/router.js";
import Context from "./state/context/context.js";
import Settings from "./state/settings/settings.js";
import Command from "./helpers/commands/command.js";

// Path
import readline from "readline";
import { stdin as input, stdout as output } from "process";

// Initialize .env
import dotenv from "dotenv";
dotenv.config();

// Express
import express from "express";

class Onyx {
  constructor(state, settings) {
    this.context = state
      ? new Context({ clientName: "dude", env: process.env, ...state })
      : new Context({ clientName: "dude", env: process.env });
    this.settings = settings
      ? new Settings(this.context, {
          prependInput: "->> ",
          prependOutput: "-<< ",
          ...settings,
        })
      : new Settings(this.context, {
          prependInput: "->> ",
          prependOutput: "-<< ",
        });
    this.router = new Router(this.context, this.settings);
    this.command = new Command(this.context, this.settings);

    this.context.init();
    this.settings.init();
  }

  commandLine() {
    const RL = readline.createInterface({ input, output });

    console.log(`Welcome ${this.context.state.clientName}...\n`);
    let getInput = () => {
      RL.question(this.settings.state.prependInput, async (res) => {
        if (
          res.toLowerCase() === "exit" ||
          res.toLowerCase() === "quit" ||
          res.toLowerCase() === "bye" ||
          res.toLowerCase() === "goodbye" ||
          res.toLowerCase() === ";'"
        ) {
          console.log(`Bye ${this.context.state.clientName}!`);
          return RL.close();
        }

        if (this.context.checkForContext(res)) {
          this.router.updateAllContext(this.context);
        }

        if (this.command.isCommand(res)) {
          this.output(await this.command.fulfill(res));
        } else {
          await this.router.takeInput(res);
        }

        this.context.onInput(res);
        this.router.updateAllContext(this.context);
        getInput();
      });
    };
    getInput();
  }

  server(port) {
    const app = express();

    const wrapAsync = (fn) => {
      return (req, res, next) => {
        const fnReturn = fn(req, res, next);
        return Promise.resolve(fnReturn).catch(next);
      };
    };

    app.get(
      "/input",
      wrapAsync(async (req, res) => {
        console.log(req.query);
        let input = req.query.input;
        if (this.context.checkForContext(input)) {
          this.router.updateAllContext(this.context);
        }

        this.context.onInput(input);
        this.router.updateAllContext(this.context);

        if (this.command.isCommand(input)) {
          res.send(await this.command.fulfill(res));
        } else {
          res.send(await this.router.takeInput(input));
        }
      })
    );

    app.listen(port, () => console.log(`Listening on port ${port}`));
  }

  updateContext(context) {
    this.context = { ...this.context, ...context };
  }

  output(output) {
    console.log(this.settings.state.prependOutput + output);
  }
}

export default Onyx;
