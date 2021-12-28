// File System
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

class Settings {
  constructor(context, state) {
    this.context = context;
    this.state = { ...state };
  }

  // * Startup
  init() {
    if (this.confirmSettingsStorage())
      this.state = { ...this.state, ...this.readFromSettingsStorage() };
  }

  updateContext(context) {
    this.context = { ...this.context, ...context };
  }

  // * Methods to work with Persistant Storage
  confirmSettingsStorage() {
    if (
      !Buffer.isBuffer(
        readFileSync(path.resolve(__dirname, "../settings.json"))
      )
    )
      return true;
    return false;
  }

  readFromSettingsStorage() {
    // TODO: Make take in a file name and path?
    return JSON.parse(
      readFileSync(path.resolve(__dirname, "../settings.json"))
    );
  }

  writeToSettingsStorage(context) {
    writeFileSync(
      path.resolve(__dirname, "../settings.json"),
      JSON.stringify(context)
    );
  }
}

export default Settings;
