export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        sky: {
          light: "#87CEEB",
          DEFAULT: "#3498db",
          dark: "#2c3e50",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "plane-flight": {
          "0%": {
            transform: "translateX(-100%) translateY(50px) rotate(10deg)",
            opacity: "0",
          },
          "10%": {
            transform: "translateX(-80%) translateY(30px) rotate(5deg)",
            opacity: "1",
          },
          "50%": {
            transform: "translateX(0%) translateY(-20px) rotate(-5deg)",
          },
          "90%": {
            transform: "translateX(80%) translateY(30px) rotate(5deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%) translateY(50px) rotate(10deg)",
            opacity: "0",
          },
        },
        "cloud-float-1": {
          "0%": {
            transform: "translateX(-120%) translateY(0)",
            opacity: "0",
          },
          "15%": {
            transform: "translateX(-100%) translateY(0)",
            opacity: "0.7",
          },
          "85%": {
            transform: "translateX(100%) translateY(0)",
            opacity: "0.7",
          },
          "100%": {
            transform: "translateX(120%) translateY(0)",
            opacity: "0",
          },
        },
        "cloud-float-2": {
          "0%": {
            transform: "translateX(-120%) translateY(-20px)",
            opacity: "0",
          },
          "20%": {
            transform: "translateX(-90%) translateY(-20px)",
            opacity: "0.8",
          },
          "80%": {
            transform: "translateX(90%) translateY(-20px)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateX(120%) translateY(-20px)",
            opacity: "0",
          },
        },
        "cloud-float-3": {
          "0%": {
            transform: "translateX(-120%) translateY(20px)",
            opacity: "0",
          },
          "25%": {
            transform: "translateX(-80%) translateY(20px)",
            opacity: "0.6",
          },
          "75%": {
            transform: "translateX(80%) translateY(20px)",
            opacity: "0.6",
          },
          "100%": {
            transform: "translateX(120%) translateY(20px)",
            opacity: "0",
          },
        },
        "content-fade-in": {
          "0%": { opacity: "0" },
          "70%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "plane-fly": "plane-flight 6s ease-in-out forwards",
        "cloud-1": "cloud-float-1 7s ease-in-out forwards",
        "cloud-2": "cloud-float-2 7.5s ease-in-out forwards",
        "cloud-3": "cloud-float-3 8s ease-in-out forwards",
        "content-appear": "content-fade-in 7s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
