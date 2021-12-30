class Time {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
    this.intervals = [
      { name: "seconds", milliseconds: 1000 },
      { name: "minutes", milliseconds: 60000 },
      { name: "hours", milliseconds: 3600000 },
      { name: "days", milliseconds: 86400000 },
    ];
  }

  // Functional Methods
  updateContext(context) {
    this.context = context;
  }

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

  // Detects Time Queries
  isTimeQuery(input) {
    input = input.toLowerCase();
    if (
      input.match(/^(?=.*what)(?=.*time).*$/i) ||
      input.match(/^(?=.*start)(?=.*timer)(?=.*for).*$/i)
    )
      return true;
    return false;
  }

  // Deciphers Time Queries
  async routeTimeQuery(input) {
    input = input.toLowerCase();
    if (input.match(/what time/i)) {
      return (
        "It is " +
        this.getTimeOfDay(this.getDateTimeString()) +
        ", " +
        this.getDateTimeString().split(" ")[1] +
        "."
      );
    }
    if (input.match(/timer/i)) {
      let units = input.match(/ \d* (.*)/im)[1];
      let amount = input.match(/ \d* /im);
      // Convert the amount to the proper amount of milliseconds based on the units
      await this.startTimer(amount, units);
      return "Timer ended.";
    }
  }

  // Handles Time Queries
  getDateTimeString = () => {
    let date = new Date();
    return date.toLocaleString("en-US", { hour12: false });
  };

  getTimeOfDay = (timeString) => {
    let hour = timeString.split(":")[0].split(" ")[1];

    // Late night: 0-3
    if ((hour >= 0 && hour <= 3) || hour === "24") {
      return "late night";
    }

    // Early morning: 4-7
    if (hour >= 4 && hour <= 7) {
      return "early morning";
    }

    // Morning: 8-11
    if (hour >= 8 && hour <= 11) {
      return "morning";
    }

    // Afternoon: 12-15
    if (hour >= 12 && hour <= 15) {
      return "afternoon";
    }

    // Evening: 16-19
    if (hour >= 16 && hour <= 19) {
      return "evening";
    }

    // Night: 20-23
    if (hour >= 20 && hour <= 23) {
      return "night";
    }
  };

  startTimer = async (amount, units) => {
    return new Promise((resolve) => {
      console.log("Starting timer for" + amount + units);
      amount = units.match(/hour/i)
        ? amount * 3600
        : units.match(/minute/i)
        ? amount * 60
        : amount;
      this.timer = setInterval(() => {
        --amount;
        if (amount === 0) {
          clearInterval(this.timer);
          resolve();
        }
      }, this.intervals.find((interval) => interval.name === "seconds").milliseconds);
    });
  };
}

export default Time;
