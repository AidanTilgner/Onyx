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

  takeInput(input) {
    this.input = input;
    this.match(this.input);
  }

  match(input) {
    if (!input) {
      this.output(
        this.settings.state.prependOutput + res.promptUserToSaySomething()
      );
      return;
    }

    if (this.recog.isGreeting(input)) {
      this.output(
        this.settings.state.prependOutput +
          this.res.buildGreeting(this.context.state.clientName)
      );
      return;
    }

    if (this.recog.generalKenobi(input)) {
      this.output(this.settings.state.prependOutput + this.res.generalKenobi());
      return;
    }

    if (this.recog.timeQuery(input)) {
      this.output(
        this.settings.state.prependOutput + this.res.currentTime(input)
      );
      return;
    }

    if (this.recog.isThankful(input)) {
      this.output(this.settings.state.prependOutput + this.res.myPleasure());
      return;
    }

    this.output(this.settings.state.prependOutput + this.res.dontUnderstand());
  }

  output(output) {
    console.log(output);
  }
}

export default Router;
