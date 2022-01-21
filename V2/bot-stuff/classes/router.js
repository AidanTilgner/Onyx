import Recognize from "./recognition/recognize.js";
import Response from "./responding/response.js";

class Router {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings ? settings : {};
    this.recog = new Recognize(this.context, settings);
    this.res = new Response(this.context, settings);

    this.routes = [
      {
        recognizer: "isGreeting",
        response: "buildGreeting",
        isAsync: false,
      },
      {
        recognizer: "generalKenobi",
        response: "generalKenobi",
        isAsync: false,
      },
      {
        recognizer: "timeQuery",
        response: "handleTime",
        isAsync: true,
      },
      {
        recognizer: "isWeatherQuery",
        response: "describeWeather",
        isAsync: true,
      },
      {
        recognizer: "isThankful",
        response: "myPleasure",
        isAsync: false,
      },
    ];
  }

  updateAllContext(context) {
    this.context = { ...this.context, ...context };
    this.recog.updateContext(this.context);
    this.res.updateContext(this.context);
  }

  updateContext(context) {
    this.context = context;
  }

  async takeInput(input) {
    this.input = input;
    return await this.match(this.input);
  }

  async match(input) {
    if (!input) return this.output(res.promptUserToSaySomething());

    for (let i = 0; i < this.routes.length; i++) {
      let route = this.routes[i];
      if (this.recog[route.recognizer](input)) {
        if (route.isAsync)
          return await this.outputAsync(this.res[route.response](input));
        return this.output(this.res[route.response](input));
      }
    }
  }

  async oldMatch(input) {
    // ! DEPRECATED, now refer to match() function
    if (!input) {
      return this.output(res.promptUserToSaySomething());
    }

    if (this.recog.isGreeting(input)) {
      return this.output(this.res.buildGreeting(this.context.state.clientName));
    }

    if (this.recog.generalKenobi(input)) {
      return this.output(this.res.generalKenobi());
    }

    if (this.recog.timeQuery(input)) {
      return await this.outputAsync(this.res.handleTime(input));
    }

    if (this.recog.isWeatherQuery(input)) {
      return await this.outputAsync(this.res.describeWeather(input));
    }

    if (this.recog.isThankful(input)) {
      return this.output(this.res.myPleasure());
    }

    return this.output(this.res.dontUnderstand());
  }

  output(output) {
    console.log(this.settings.state.prependOutput + output);
    return output;
  }

  async outputAsync(output) {
    console.log(this.settings.state.prependOutput + (await output));
    return await output;
  }
}

export default Router;
