export const colorThemes = [
  {
    id: 1,
    isDarkModed:true ,
    name: "Graphite Gray",
    page_bg: "bg-[#0f0f0f]",       // gray-950
    gray: "text-[#1f2937]",        // gray-800
    red: "text-[#f87171]",         // red-400
    white: "text-[#fafafa]",       // gray-50
    darkRed: "text-[#7f1d1d]",     // red-900
    border: "border-[#2a2a2a]",    // slightly lighter than bg
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
    page_bg: "bg-[#020617]",       // slate-950
    gray: "text-[#374151]",        // gray-700
    red: "text-[#f87171]",         // red-400
    white: "text-[#f3f4f6]",       // gray-100
    darkRed: "text-[#7f1d1d]",     // red-900
    border: "border-[#1e293b]",    // slate-800
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
    page_bg: "bg-[#18181b]",       // zinc-900
    gray: "text-[#3f3f46]",        // zinc-700
    red: "text-[#f87171]",         // red-400
    white: "text-[#f4f4f5]",       // zinc-100
    darkRed: "text-[#991b1b]",     // red-800
    border: "border-[#27272a]",    // zinc-800
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
    page_bg: "bg-[#0a0a0a]",       // neutral-950
    gray: "text-[#737373]",        // neutral-500
    red: "text-[#fb7185]",         // rose-400
    white: "text-[#f5f5f5]",       // neutral-100
    darkRed: "text-[#881337]",     // rose-900
    border: "border-[#2e2e2e]",    // neutral-800
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
    page_bg: "bg-[#000000]",
    gray: "text-[#444444]",
    red: "text-[#ef4444]",         // red-500
    white: "text-[#eeeeee]",
    darkRed: "text-[#7f1d1d]",     // red-900
    border: "border-[#2c2c2c]",    // mid-gray border to stand out
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
    page_bg: "bg-[#010203]",
    gray: "text-[#5e676e]",
    red: "text-[#ff8c42]",
    white: "text-[#e0e0e0]",
    darkRed: "text-[#b3471f]",
    border: "border-[#2e343a]",    // cool gray tone
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
    page_bg: "bg-[#ffffff]",
    gray: "text-[#6b7280]",        // gray-700
    red: "text-[#dc3545]",
    white: "text-[#000000]",
    darkRed: "text-[#a71d2a]",
    border: "border-[#d1d5db]",    // gray-300
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
    page_bg: "bg-[#dad3c1]",
    gray: "text-[#918b7d]",
    red: "text-[#bf616a]",
    white: "text-[#1d1b17]",
    darkRed: "text-[#793e44]",
    border: "border-[#bcb49f]",    // slightly darker warm tone
    get colors() {
      return [this.page_bg, this.red, this.gray].map(c =>
        c.includes("text-") ? c.replace("text-", "bg-") : c
      );
    },
  },
];
