import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      regular: "regular",
      regularBold: "regularBold",
    },
    colors: {
      white: "#FFFFFF",
      darkGray: "#2B2D42",
      gray: "#8D99AE",
      lightGray: "#EDF2F4",
      myRed1: "#EF233C",
      myRed2: "#D90429",
      success: "#a3e635",
      failure: "#dc2626",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
