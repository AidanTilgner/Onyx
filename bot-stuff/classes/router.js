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
    await this.match(this.input);
  }

  async match(input) {
    if (!input) {
      this.output(res.promptUserToSaySomething());
      return;
    }

    if (this.recog.isGreeting(input)) {
      this.output(this.res.buildGreeting(this.context.state.clientName));
      return;
    }

    if (this.recog.generalKenobi(input)) {
      this.output(this.res.generalKenobi());
      return;
    }

    if (this.recog.timeQuery(input)) {
      this.output(this.res.currentTime(input));
      return;
    }

    if (this.recog.isWeatherQuery(input)) {
      await this.outputAsync(this.res.describeWeather(input));
      return;
    }

    if (this.recog.isThankful(input)) {
      this.output(this.res.myPleasure());
      return;
    }

    this.output(this.res.dontUnderstand());
  }

  output(output) {
    console.log(this.settings.state.prependOutput + output);
    return true;
  }

  async outputAsync(output) {
    console.log(this.settings.state.prependOutput + (await output));
    return true;
  }
}

export default Router;
