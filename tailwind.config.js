/** Colors come from CSS variables, which App.jsx fills from weddingConfig.theme */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        maroon: "rgb(var(--c-maroon) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        navy: "rgb(var(--c-navy) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
      },

      fontFamily: {
        // Existing fonts — preserved
        display: ["Cinzel", "serif"],
        script: ['"Great Vibes"', "cursive"],
        body: ['"Cormorant Garamond"', "serif"],
        ui: ["Poppins", "sans-serif"],

        // Additional fonts — centralized
        abhaya: ['"Abhaya Libre"', "serif"],
        amethysta: ['"Amethysta"', "serif"],
        asul: ['"Asul"', "serif"],
        ebgaramond: ['"EB Garamond"', "serif"],
        elsie: ['"Elsie Swash Caps"', "serif"],
        instrument: ['"Instrument Serif"', "serif"],
        jost: ["Jost", "sans-serif"],
        junge: ["Junge", "serif"],
        lunasima: ["Lunasima", "sans-serif"],
        lusitana: ["Lusitana", "serif"],
        luxurious: ['"Luxurious Script"', "cursive"],
        opensans: ['"Open Sans"', "sans-serif"],
        philosopher: ["Philosopher", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        inter: ["Inter", "sans-serif"],
      },

      keyframes: {
        rise: {
          from: { opacity: 0, transform: "translateY(28px)" },
          to: { opacity: 1, transform: "none" },
        },
        fall: {
          from: {
            transform: "translateY(-10vh) rotate(0)",
            opacity: 1,
          },
          to: {
            transform: "translateY(110vh) rotate(540deg)",
            opacity: 0.2,
          },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },

      animation: {
        rise: "rise .9s cubic-bezier(.2,.7,.2,1) both",
        fall: "fall 5s linear forwards",
        bob: "bob 1.8s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};
