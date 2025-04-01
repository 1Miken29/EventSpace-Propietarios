/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit-Regular', 'sans-serif'],
        "outfit-thin": ['Outfit-Thin', 'sans-serif'],
        "outfit-bold": ['Outfit-Bold', 'sans-serif'],
        "outfit-extrabold": ['Outfit-ExtraBold', 'sans-serif'],
        "outfit-extralight": ['Outfit-ExtraLight', 'sans-serif'],
        "outfit-medium": ['Outfit-Medium', 'sans-serif'],
        "outfit-semibold": ['Outfit-SemiBold', 'sans-serif'],
        "outfit-black": ['Outfit-Black', 'sans-serif'],
        "outfit-light": ['Outfit-Light', 'sans-serif'],
      
        rubik: ['Rubik-Regular', 'sans-serif'],
        "rubik-black": ['Rubik-Black', 'sans-serif'],
        "rubik-bold": ['Rubik-Bold', 'sans-serif'],
        "rubik-extrabold": ['Rubik-ExtraBold', 'sans-serif'],
        "rubik-extralight": ['Rubik-ExtraLight', 'sans-serif'],
        "rubik-medium": ['Rubik-Medium', 'sans-serif'],
        "rubik-semibold": ['Rubik-SemiBold', 'sans-serif'],
        "rubik-light": ['Rubik-Light', 'sans-serif'],
        "rubik-thin": ['Rubik-Thin', 'sans-serif'],
      }
  }
  },
  plugins: [],
}