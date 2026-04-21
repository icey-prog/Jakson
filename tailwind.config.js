/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        // Jackson Assurance brand palette
        "jackson-deep": "#0F766E",
        "jackson-vivid": "#14B8A6",
        "jackson-light": "#99F6E4",
        "jackson-cream": "#F0FDFA",
        "jackson-night": "#0F172A",
        "jackson-slate": "#475569",
        "jackson-gold": "#F59E0B",
        // Extended semantic colors
        "jackson-blue": "#0369A1",
        "jackson-bg": "#FAFCFB",
        "jackson-border": "#E2E8F0",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        "card": "20px",
        "btn": "14px",
        "pill": "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "soft": "0 2px 12px rgba(15, 23, 42, 0.04)",
        "card": "0 4px 24px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 12px 40px rgba(15, 23, 42, 0.1)",
        "float": "0 8px 32px rgba(15, 23, 42, 0.15)",
        "glow": "0 0 48px rgba(15, 118, 110, 0.15)",
        "glow-strong": "0 0 60px rgba(15, 118, 110, 0.25)",
        "inner-glow": "inset 0 2px 20px rgba(15, 118, 110, 0.08)",
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
        "float": {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -20px)" },
          "66%": { transform: "translate(-20px, 30px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.6)", opacity: "0.6" },
        },
        "sos-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(15, 118, 110, 0.4)" },
          "70%": { boxShadow: "0 0 0 18px rgba(15, 118, 110, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(15, 118, 110, 0)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
        "badge-pulse": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 20s infinite alternate ease-in-out",
        "pulse-dot": "pulse-dot 2s infinite",
        "sos-pulse": "sos-pulse 2s infinite",
        "shake": "shake 0.3s ease",
        "badge-pulse": "badge-pulse 2s infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      maxWidth: {
        "container": "1280px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
