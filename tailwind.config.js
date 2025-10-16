/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(214.3 31.8% 91.4%)", // slate-200
        input: "hsl(214.3 31.8% 91.4%)", // slate-200
        ring: "hsl(221.2 83.2% 53.3%)", // blue-500
        background: "hsl(210 40% 98%)", // slate-50
        foreground: "hsl(222.2 84% 4.9%)", // slate-900
        primary: {
          DEFAULT: "hsl(221.2 83.2% 53.3%)", // blue-500
          foreground: "hsl(210 40% 98%)", // slate-50
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96.1%)", // slate-100
          foreground: "hsl(222.2 84% 4.9%)", // slate-900
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)", // red-500
          foreground: "hsl(210 40% 98%)", // slate-50
        },
        muted: {
          DEFAULT: "hsl(210 40% 96.1%)", // slate-100
          foreground: "hsl(215.4 16.3% 46.9%)", // slate-500
        },
        accent: {
          DEFAULT: "hsl(210 40% 96.1%)", // slate-100
          foreground: "hsl(222.2 84% 4.9%)", // slate-900
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)", // white
          foreground: "hsl(222.2 84% 4.9%)", // slate-900
        },
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    }
  },
  plugins: [],
}