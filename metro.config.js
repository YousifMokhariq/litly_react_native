const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Wrap your config with withNativeWind and point it to your CSS file
module.exports = withNativeWind(config, { input: "./global.css" });