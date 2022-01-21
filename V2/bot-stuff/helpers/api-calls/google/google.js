class Google {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
  }

  geocodingAPIbyAddress(apiKey, address) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  }

  geocodingAPIbyCoords(apiKey, lat, lng) {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  }
}

export default Google;
