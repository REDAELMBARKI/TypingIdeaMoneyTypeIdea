
export const colorThemes = [
  {
    id: 1,
    isDarkModed:true ,
    name: "Graphite Gray",
    page_bg: "#0f0f0f",       // gray-950
    gray: "#1f2937",        // gray-800
    red: "#f87171",         // red-400
    white: "#fafafa",       // gray-50
    darkRed: "#7f1d1d",     // red-900
    border: "#2a2a2a",    // slightly lighter than bg
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 2,
    isDarkModed:true ,
    name: "Midnight Blue",
    page_bg: "#020617",       // slate-950
    gray: "#374151",        // gray-700
    red: "#f87171",         // red-400
    white: "#f3f4f6",       // gray-100
    darkRed: "#7f1d1d",     // red-900
    border: "#1e293b",    // slate-800
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 3,
    isDarkModed:true ,
    name: "Warm Charcoal",
    page_bg: "#18181b",       // zinc-900
    gray: "#3f3f46",        // zinc-700
    red: "#f87171",         // red-400
    white: "#f4f4f5",       // zinc-100
    darkRed: "#991b1b",     // red-800
    border: "#27272a",    // zinc-800
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 4,
    isDarkModed:true ,
    name: "Deep Wine",
    page_bg: "#0a0a0a",       // neutral-950
    gray: "#737373",        // neutral-500
    red: "#fb7185",         // rose-400
    white: "#f5f5f5",       // neutral-100
    darkRed: "#881337",     // rose-900
    border: "#2e2e2e",    // neutral-800
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 5,
    isDarkModed:true ,
    name: "Black Night",
    page_bg: "#000000",
    gray: "#444444",
    red: "#ef4444",         // red-500
    white: "#eeeeee",
    darkRed: "#7f1d1d",     // red-900
    border: "#2c2c2c",    // mid-gray border to stand out
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 6,
    isDarkModed:true ,
    name: "Dark Orange",
    page_bg: "#010203",
    gray: "#5e676e",
    red: "#ff8c42",
    white: "#e0e0e0",
    darkRed: "#b3471f",
    border: "#2e343a",    // cool gray tone
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 7,
    isDarkModed:false ,
    name: "Soft Light",
    page_bg: "#ffffff",
    gray: "#6b7280",        // gray-700
    red: "#dc3545",
    white: "#000000",
    darkRed: "#a71d2a",
    border: "#d1d5db",    // gray-300
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
  {
    id: 8,
    isDarkModed:false ,
    name: "Warm Sand",
    page_bg: "#dad3c1",
    gray: "#918b7d",
    red: "#bf616a",
    white: "#1d1b17",
    darkRed: "#793e44",
    border: "#bcb49f",    // slightly darker warm tone
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
];



