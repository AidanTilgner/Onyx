import Weather from "../weather";
import dotenv from "dotenv";
dotenv.config({ path: "../../../../.env" });

it("Exports a Class", () => {
  expect(typeof Weather).toBe("function");
});

it("Updates context", () => {
  const test = new Weather({ test: "test" });
  test.updateContext({ test: "test2" });
  expect(test.context.test).toBe("test2");
});

it("Gets weather", async () => {
  const test = new Weather({
    state: {
      env: {
        PERSONAL_OPEN_WEATHER_API_KEY:
          process.env.PERSONAL_OPEN_WEATHER_API_KEY,
      },
    },
  });
  const weather = await test.getWeather({
    lat: 44.86585090373615,
    lon: -122.6262927464399,
  });
  expect(Math.floor(weather.lat)).toBe(44);
});
