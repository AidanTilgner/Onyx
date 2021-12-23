import Places from "../places.js";

it("Exports a class", () => {
  expect(typeof Places).toBe("function");
});

it("Updates context", () => {
  const test = new Places({ test: "test" });
  test.updateContext({ test: "test2" });
  expect(test.context.test).toBe("test2");
});

it("Gets coordinates for a specified address", async () => {
  const test = new Places();
  const coordinates = await test.getCoordinatesByAddress(
    "1600 Amphitheatre Parkway, Mountain View, CA"
  );
  expect(coordinates).toEqual({ lat: 37.422388, lng: -122.0841883 });
});
