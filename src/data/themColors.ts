export const colorThemes = [
  {
    id: 1,
    isDarkModed: true,
    name: "Graphite Gray",
    page_bg: "#0f0f0f",
    gray: "#1f2937",
    red: "#f87171",
    white: "#fafafa",
    darkRed: "#7f1d1d",
    border: "#2a2a2a",
    // Button colors
    buttonPrimary: "#f87171",      // Main action - red
    buttonSecondary: "#374151",    // Secondary action - darker gray
    buttonHover: "#fca5a5",        // Lighter red on hover
    buttonDisabled: "#1f2937",     // Muted gray
    // Special colors
    accent: "#60a5fa",             // Blue accent for highlights
    success: "#34d399",            // Green for success states
    warning: "#fbbf24",            // Amber for warnings
    info: "#a78bfa",               // Purple for info
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
 {
  id: 2,
  isDarkModed: true,
  name: "Midnight Blue",
  page_bg: "#020617",
  gray: "#374151",
  red: "#60a5fa",              // Bright blue (for wrong chars - highly visible)
  white: "#f3f4f6",
  darkRed: "#1e3a8a",          // Deep blue (for background/darker states)
  border: "#1e293b",
  // Button colors
  buttonPrimary: "#3b82f6",    // Blue primary
  buttonSecondary: "#475569",  // Slate secondary
  buttonHover: "#60a5fa",      // Lighter blue
  buttonDisabled: "#334155",   // Dark slate
  // Special colors
  accent: "#f87171",           // Red accent for contrast
  success: "#10b981",          // Emerald success
  warning: "#f59e0b",          // Amber warning
  info: "#06b6d4",             // Cyan info
  get colors() {
    return [this.page_bg, this.red, this.gray].map(c =>
      c.includes("text-") ? c.replace("text-", "bg-") : c
    );
  },
},
  {
    id: 3,
    isDarkModed: true,
    name: "Warm Charcoal",
    page_bg: "#18181b",
    gray: "#3f3f46",
    red: "#f87171",
    white: "#f4f4f5",
    darkRed: "#991b1b",
    border: "#27272a",
    // Button colors
    buttonPrimary: "#f87171",      // Red primary
    buttonSecondary: "#52525b",    // Zinc secondary
    buttonHover: "#fca5a5",        // Light red
    buttonDisabled: "#3f3f46",     // Dark zinc
    // Special colors
    accent: "#a855f7",             // Purple accent
    success: "#22c55e",            // Green success
    warning: "#fb923c",            // Orange warning
    info: "#38bdf8",               // Sky blue info
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 4,
    isDarkModed: true,
    name: "Deep Wine",
    page_bg: "#0a0a0a",
    gray: "#737373",
    red: "#fb7185",
    white: "#f5f5f5",
    darkRed: "#881337",
    border: "#2e2e2e",
    // Button colors
    buttonPrimary: "#fb7185",      // Rose primary
    buttonSecondary: "#525252",    // Neutral gray
    buttonHover: "#fda4af",        // Light rose
    buttonDisabled: "#404040",     // Dark neutral
    // Special colors
    accent: "#d946ef",             // Magenta accent
    success: "#4ade80",            // Lime green success
    warning: "#facc15",            // Yellow warning
    info: "#c084fc",               // Purple info
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 5,
    isDarkModed: true,
    name: "Black Night",
    page_bg: "#000000",
    gray: "#444444",
    red: "#ef4444",
    white: "#eeeeee",
    darkRed: "#7f1d1d",
    border: "#2c2c2c",
    // Button colors
    buttonPrimary: "#ef4444",      // Pure red primary
    buttonSecondary: "#525252",    // Medium gray
    buttonHover: "#f87171",        // Lighter red
    buttonDisabled: "#333333",     // Very dark gray
    // Special colors
    accent: "#06b6d4",             // Cyan accent (pops on black)
    success: "#14b8a6",            // Teal success
    warning: "#eab308",            // Yellow warning
    info: "#8b5cf6",               // Violet info
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 6,
    isDarkModed: true,
    name: "Dark Orange",
    page_bg: "#010203",
    gray: "#5e676e",
    red: "#ff8c42",
    white: "#e0e0e0",
    darkRed: "#b3471f",
    border: "#2e343a",
    // Button colors
    buttonPrimary: "#ff8c42",      // Orange primary
    buttonSecondary: "#4a5460",    // Cool gray
    buttonHover: "#ffab70",        // Light orange
    buttonDisabled: "#3a424a",     // Dark cool gray
    // Special colors
    accent: "#06b6d4",             // Cyan accent (complements orange)
    success: "#10b981",            // Emerald success
    warning: "#fbbf24",            // Amber warning
    info: "#818cf8",               // Indigo info
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 7,
    isDarkModed: false,
    name: "Soft Light",
    page_bg: "#ffffff",
    gray: "#6b7280",
    red: "#dc3545",
    white: "#000000",
    darkRed: "#a71d2a",
    border: "#d1d5db",
    // Button colors
    buttonPrimary: "#dc3545",      // Red primary
    buttonSecondary: "#e5e7eb",    // Light gray
    buttonHover: "#b02a37",        // Darker red
    buttonDisabled: "#f3f4f6",     // Very light gray
    // Special colors
    accent: "#2563eb",             // Blue accent
    success: "#059669",            // Green success
    warning: "#d97706",            // Orange warning
    info: "#7c3aed",               // Purple info
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 8,
    isDarkModed: false,
    name: "Warm Sand",
    page_bg: "#dad3c1",
    gray: "#918b7d",
    red: "#bf616a",
    white: "#1d1b17",
    darkRed: "#793e44",
    border: "#bcb49f",
    // Button colors
    buttonPrimary: "#bf616a",      // Dusty rose primary
    buttonSecondary: "#a8a295",    // Warm gray
    buttonHover: "#a0515a",        // Darker rose
    buttonDisabled: "#c9c2b3",     // Light warm gray
    // Special colors
    accent: "#5e8c8a",             // Teal accent (earthy complement)
    success: "#6a9955",            // Olive green success
    warning: "#d08770",            // Terracotta warning
    info: "#8675a9",               // Muted purple info
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
];