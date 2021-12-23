class Time {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
  }

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

  getDateTimeString = () => {
    let date = new Date();
    return date.toLocaleString("en-US", { hour12: false });
  };

  getTimeOfDay = (timeString) => {
    let hour = timeString.split(":")[0];

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
}

export default Time;
