// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#121C0E",
//         primaryLight: "#172312",
//         forBorders: "#2D4523",
//         secondary: "#51D928",
//         secondary40: "#51d9283d",
//         secondary40Active: "#51d92875",
//         secondaryDarker: "#41ae20",
//         header: "#9CFF66",
//         charactersBg: "#8198803a",

//         gold: "#FFD700",
//         seasonBackground: "#3976258e",
//         seasonBackgroundActive: "#397625f1",
//         episodesBackground: "#3976255b",

//         locationsBackground: "#eac7393b",
//         locations: "#eac739b6",
//         locationBtn: "#e0bb3741",
//         locationBtnActive: "#e0bb3767",
//       },
//       height: {
//         120: "28rem",
//         128: "30rem",
//         144: "34rem",
//         148: "36rem",
//         152: "38rem",
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121C0E",
        primaryLight: "#172312",
        forBorders: "#2D4523",
        secondary: "#51D928",
        secondary40: "#51d9283d",
        secondary40Active: "#51d92875",
        secondaryDarker: "#41ae20",
        header: "#9CFF66",
        charactersBg: "#8198803a",
        gold: "#FFD700",
        seasonBackground: "#3976258e",
        seasonBackgroundActive: "#397625f1",
        episodesBackground: "#3976255b",
        locationsBackground: "#eac7393b",
        locations: "#eac739b6",
        locationBtn: "#e0bb3741",
        locationBtnActive: "#e0bb3767",
      },
      height: {
        120: "28rem",
        128: "30rem",
        144: "34rem",
        148: "36rem",
        152: "38rem",
      },
      animation: {
        spin: "spin 2s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      screens: {
        "2xl": { max: "1535px" }, // <= 1535px
        xl: { max: "1279px" }, // <= 1279px
        // lg: { max: "1023px" }, // <= 1023px
        lg: { max: "1100px" }, // <= 1023px
        md: { max: "767px" }, // <= 767px
        sm: { max: "639px" }, // <= 639px
      },
    },
  },
  plugins: [],
};
