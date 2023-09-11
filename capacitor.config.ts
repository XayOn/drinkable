import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.moimob.drinkable",
  appName: "Drinkable",
  webDir: "dist",
  bundledWebRuntime: false,
  backgroundColor: "#161212",
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
