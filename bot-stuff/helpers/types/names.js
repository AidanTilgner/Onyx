class Names {
  constructor(context) {
    this.context = context;
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

  detectName(input) {
    if (
      this.splitInput(input).includes("name") ||
      this.splitInput(input).includes("names")
    ) {
      return true;
    }
  }

  extractName(input) {
    let people = [];

    let words = this.splitInput(input);

    // Figure out what the subject is
    words.forEach((word, index) => {
      word = word.toLowerCase();

      if (word === "my") {
        if (words[index + 1] !== "name") {
          return;
        }

        people.push({ type: "client" });
      }

      if (word === "their")
        people.push({
          type: "friends",
        });
      if (word === "his") people.push({ type: "friend" });
      if (word === "him") people.push({ type: "friend" });
      if (word === "her") people.push({ type: "friend" });
      if (word === "it's") people.push({ type: "thing" });
      if (word === "i") people.push({ type: "client" });
      if (word.split("'")[1] === "s" && word !== "it's")
        people.push({ type: word });
    });

    //  Detect the uppercase words
    let UppercaseWords = words.filter((word) => {
      //  If there are two uppercase words in a sentence, then the name can't have an index of 0
      //  If there is only one uppercase word in the sentence, then that has to be the
      //  Check if the word is uppercase and if it is then return the word and its index
      if (word.length < 2) return false;
      return word.split("")[0].match(/[A-Z]/);
    });

    //  Find the name in the uppercase words list
    if (UppercaseWords.length === 1) {
      people[0].name = UppercaseWords[0];
    } else {
      let names = UppercaseWords.filter((word, index) => {
        return index > 0;
      });
      for (let i = 0; i < names.length; i++) {
        let name = names[i];
        if (people[i].type === "friends") {
          // If there are no more subjects after the current one
          if (people.length - i - 1 === 0) {
            people.splice(i, 1);
            for (let j = i; j < names.length; j++) {
              people.push({
                type: "friend",
                name: names[j],
              });
              i++;
            }
            // If there are more subjects after the current one
          } else {
            let counter;
            people.splice(i, 1, { type: "friend" });
            for (let j = i; j < names.length - i - 1; j++) {
              people.splice(i, 0, {
                type: "friend",
                name: names[j],
              });
              counter = j;
            }
            i = counter;
          }

          continue;
        }
        people[i].name = name;
      }
    }

    return people;
  }
}

export default Names;
