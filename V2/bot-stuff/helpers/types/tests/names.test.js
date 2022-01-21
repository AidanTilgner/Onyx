import Names from "../names.js";

it("Exports a class", () => {
  expect(typeof Names).toBe("function");
});

it("Updates context", () => {
  const test = new Names({ test: "test" });
  test.updateContext({ test: "test2" });
  expect(test.context.test).toBe("test2");
});

it("Splits Input", () => {
  const test = new Names();
  expect(test.splitInput("My name, is Bob.")).toEqual([
    "My",
    "name",
    "is",
    "Bob",
  ]);
});

it("Detects a name", () => {
  const test = new Names();
  expect(test.detectName("My name, is Bob.")).toBe(true);
});

it("Extracts a name", () => {
  const test = new Names();
  expect(test.extractName("My name, is Bob.")).toEqual([
    { type: "client", name: "Bob" },
  ]);
});
