import Recognize from "./recognition/recognize.js";
import Response from "./responding/response.js";

class Router {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings ? settings : {};
    this.recog = new Recognize(this.context, settings);
    this.res = new Response(this.context, settings);
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
    if (!input) {
      return this.output(res.promptUserToSaySomething());
    }

    if (this.recog.isGreeting(input)) {
      console.log("Is greeting");
      console.log(
        "Returning: ",
        this.res.buildGreeting(this.context.state.clientName)
      );
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
    return output;
  }
}

export default Router;
