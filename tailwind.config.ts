import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        LightBlueGray: "#A9CCDA",
        DarkPastelBlue: "#7E9BB7",
        WaikawaGrey: "#5A6B94",
        Rhino: "#3B4071",
        CloudBurst: "#27224E",
        Haiti: "#190F2C",
        Jaguar: "#060209",
        PearlRiver: "#D9DDDC",
        Cinnabar: "#EE4D2B",
        DarkCharcoal: "#292C31",
        Onyx: "#353A40",
      },
    },
  },
  plugins: [],
};
export default config;
