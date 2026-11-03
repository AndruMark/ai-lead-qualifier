import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        muted: "#66727d",
        accent: "#665cf6",
      },
      boxShadow: {
        panel: "0 18px 50px rgba(34, 45, 59, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
