/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Premium Industrial Theme - Dubai Power Tools
        ice: "#F8FAFC",       // Primary background, light mode
        slate: {
          panel: "#F1F5F9",   // Secondary background
        },
        charcoal: "#0F172A",  // Deep matte dark slate - dark panels
        amber: {
          DEFAULT: "#F97316", // Primary action / trust accent
          dark: "#C2410C",
        },
        brass: {
          DEFAULT: "#D97706", // Subtle luxury accent
          light: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hazard-stripe":
          "repeating-linear-gradient(135deg, #F97316 0px, #F97316 10px, #0F172A 10px, #0F172A 20px)",
      },
      boxShadow: {
        panel: "0 20px 60px -15px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
}
