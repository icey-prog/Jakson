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
        // ─── Apple Design System Palette ───
        // Action color — Jackson teal (charte hybride teal + accents verts vifs)
        "apple-blue":       "#0F766E",  // primary CTA → jackson-teal
        "apple-blue-focus": "#0D5F58",  // hover/focus → teal darker
        "apple-blue-dark":  "#2CC295",  // dark-section accent → jackson-meadow
        // Ink (texte)
        "apple-ink":        "#1d1d1f",
        "apple-ink-80":     "#333333",
        "apple-ink-48":     "#7a7a7a",
        "apple-muted":      "#cccccc",
        // Canvases
        "apple-white":      "#ffffff",
        "apple-parchment":  "#f5f5f7",
        "apple-pearl":      "#fafafc",
        // Tuiles sombres
        "apple-tile-1":     "#272729",
        "apple-tile-2":     "#2a2a2c",
        "apple-tile-3":     "#252527",
        "apple-black":      "#000000",
        "apple-chip":       "#d2d2d7",
        // Hairlines / Dividers
        "apple-hairline":   "#e0e0e0",
        "apple-divider":    "#f0f0f0",
        // ─── Jackson Brand Palette ───
        // Identité teal renforcée + accents verts vifs (inspiration palette réf.)
        "jackson-teal":      "#0F766E",  // teal principal (logo, primary CTA)
        "jackson-teal-deep": "#134E4A",  // teal profond (texte sur clair)
        "jackson-bangladesh":"#03624C",  // vert sombre (sections immersives)
        "jackson-meadow":    "#2CC295",  // accent vif (highlight, success, badge)
        "jackson-mint":      "#2FA98C",  // mint secondaire (hover, dégradés)
        "jackson-caribbean": "#00DF81",  // accent éclat (notifications rares)
        "jackson-pine":      "#063028",  // pine ultra-sombre (footer, hero overlay)
        "jackson-cream":     "#F0FDFA",  // canvas clair (light bg)
        "jackson-pearl":     "#ECFDF5",  // canvas alt
        "jackson-stone":     "#707D7D",  // gris neutre (UI muted)

        // Rétro-compatibilité — aliases (migration progressive vers tokens ci-dessus)
        "jackson-deep":     "#134E4A",
        "jackson-vivid":    "#2CC295",
        "jackson-light":    "#2FA98C",
        "jackson-night":    "#063028",
        "jackson-slate":    "#707D7D",
        "jackson-gold":     "#F59E0B",
        "jackson-blue":     "#0F766E",
        "jackson-bg":       "#F0FDFA",
        "jackson-border":   "#D1FAE5",
      },
      fontFamily: {
        // SF Pro Display sur macOS/iOS, Inter en fallback universel
        display: ['"SF Pro Display"', '"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        // SF Pro Text sur macOS/iOS, Inter en fallback universel
        body:    ['"SF Pro Text"',    '"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        // Apple typography scale — cf. DESIGN.md
        'hero':        ['56px', { lineHeight: '1.07', letterSpacing: '-0.28px',  fontWeight: '600' }],
        'display-lg':  ['40px', { lineHeight: '1.10', letterSpacing: '0px',      fontWeight: '600' }],
        'display-md':  ['34px', { lineHeight: '1.47', letterSpacing: '-0.374px', fontWeight: '600' }],
        'lead':        ['28px', { lineHeight: '1.14', letterSpacing: '0.196px',  fontWeight: '400' }],
        'lead-airy':   ['24px', { lineHeight: '1.5',  letterSpacing: '0px',      fontWeight: '300' }],
        'tagline':     ['21px', { lineHeight: '1.19', letterSpacing: '0.231px',  fontWeight: '600' }],
        'body-strong': ['17px', { lineHeight: '1.24', letterSpacing: '-0.374px', fontWeight: '600' }],
        'body-apple':  ['17px', { lineHeight: '1.47', letterSpacing: '-0.374px', fontWeight: '400' }],
        'caption':     ['14px', { lineHeight: '1.43', letterSpacing: '-0.224px', fontWeight: '400' }],
        'nav-link':    ['12px', { lineHeight: '1.0',  letterSpacing: '-0.12px',  fontWeight: '400' }],
        'fine-print':  ['12px', { lineHeight: '1.0',  letterSpacing: '-0.12px',  fontWeight: '400' }],
        'micro':       ['10px', { lineHeight: '1.3',  letterSpacing: '-0.08px',  fontWeight: '400' }],
      },
      borderRadius: {
        // Apple radius scale
        'none': '0px',
        'xs':   '5px',
        'sm':   '8px',
        'md':   '11px',
        'lg':   '18px',
        'pill': '9999px',
        'full': '9999px',
        // rétro-compat
        'xl':   'calc(var(--radius) + 4px)',
        'card': '18px',
        'btn':  '9999px',
      },
      boxShadow: {
        // Apple : un seul shadow réel, uniquement sur les visuels produit
        'product':    'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
        'divider':    '0 0 0 1px rgba(0, 0, 0, 0.08)',
        // rétro-compat
        'xs':         '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'soft':       '0 2px 12px rgba(0, 0, 0, 0.04)',
        'card':       '0 0 0 1px #e0e0e0',
        'card-hover': '0 0 0 2px #0066cc',
        'float':      '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glow':       'none',
        'glow-strong':'none',
        'inner-glow': 'none',
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
        "press": {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(0.95)" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%":      { transform: "scale(1.4)", opacity: "0.7" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%":  { transform: "translateX(-4px)" },
          "40%":  { transform: "translateX(4px)" },
          "60%":  { transform: "translateX(-4px)" },
          "80%":  { transform: "translateX(4px)" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sos-pulse": {
          "0%":   { boxShadow: "0 0 0 0 rgba(0, 102, 204, 0.4)" },
          "70%":  { boxShadow: "0 0 0 18px rgba(0, 102, 204, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(0, 102, 204, 0)" },
        },
        "badge-pulse": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "press":          "press 0.15s ease",
        "pulse-dot":      "pulse-dot 2s infinite",
        "sos-pulse":      "sos-pulse 2s infinite",
        "shake":          "shake 0.3s ease",
        "badge-pulse":    "badge-pulse 2s infinite",
        "fade-in-up":     "fade-in-up 0.6s ease-out forwards",
      },
      maxWidth: {
        "container": "1280px",
        "content":   "980px",
      },
      spacing: {
        "18":      "4.5rem",
        "22":      "5.5rem",
        "section": "80px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
