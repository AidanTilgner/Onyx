import Time from "../time.js";

it("Updates context", () => {
  const test = new Time({ test: "test" });
  test.updateContext({ test: "test2" });
  expect(test.context.test).toBe("test2");
});

it("Splits Input", () => {
  const test = new Time();
  expect(test.splitInput("test, test.")).toEqual(["test", "test"]);
});

it("Gets correct date time string", () => {
  const test = new Time();
  expect(test.getDateTimeString().match(/..\:..\:../g) ? true : false).toBe(
    true
  );
});

it("Gets correct time of day", () => {
  const test = new Time();
  expect(test.getTimeOfDay("17:00")).toBe("evening");
});
