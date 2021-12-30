import Weather from "../../helpers/types/weather.js";
import Time from "../../helpers/types/time.js";
class Response {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
    this.weather = new Weather(this.context, this.settings);
    this.time = new Time(this.context, this.settings);
  }

  updateContext(context) {
    this.context = context;
  }

  promptUserToSaySomething() {
    return "You do have to say something";
  }

  dontUnderstand() {
    return "I'm sorry, I don't understand";
  }

  buildGreeting = (clientName) => {
    let resList = [
      `Hey ${clientName}, my name's Onyx`,
      `Hey ${clientName}, how are you today?`,
      `Hey there, how has your day been so far?`,
      `Hey cutie, you're looking fresh today ;)`,
      `Hey`,
      `Hello`,
      `Ciao, that's hello in italian`,
      `Bonjour!..Heh heh, pardon my french`,
      `Hey ${clientName}, what are you up to today?`,
    ];

    let res = resList[Math.floor(Math.random() * resList.length)];

    console.log("Building response");
    return res;
  };

  generalKenobi = () => {
    return "General Kenobi!";
  };

  handleTime = async (input) => {
    return await this.time.routeTimeQuery(input);
  };

  describeWeather = async (input) => {
    return await this.weather.routeWeatherQuery(input);
  };

  myPleasure = () => {
    return "My pleasure";
  };
}

export default Response;
