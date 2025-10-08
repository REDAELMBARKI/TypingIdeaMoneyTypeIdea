import { useState } from "react";

interface Theme {
  id: number;
  name: string;
  colors: string[]; // array of 4 hex colors representing the theme
}

interface ThemeModalProps {
  themes: Theme[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (theme: Theme) => void;
}

export default function ThemeModal({ themes, isOpen, onClose, onSelect }: ThemeModalProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredThemes = themes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  if(filteredThemes && search != ""){
    return <FilteredModals  />
  }else{
     return <AllModals />
  }
}



function AllModals ({ themes, isOpen, onClose, onSelect , setSearch }: ThemeModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-96 max-w-full p-4 shadow-lg">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search themes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white mb-4"
        />

        {/* Themes List */}
        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
          {filteredThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {/* Theme Name */}
              <span className="text-gray-800 dark:text-gray-100">{theme.name}</span>

              {/* Color Squares */}
              <div className="flex gap-1">
                {theme.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </button>
          ))}

          {filteredThemes.length === 0 && (
            <div className="text-gray-500 text-sm text-center py-2">
              No themes found
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
    )
}




function FilteredModals ({ themes, isOpen, onClose, onSelect ,setSearch}: ThemeModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-96 max-w-full p-4 shadow-lg">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search themes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white mb-4"
        />

        {/* Themes List */}
        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
          {filteredThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {/* Theme Name */}
              <span className="text-gray-800 dark:text-gray-100">{theme.name}</span>

              {/* Color Squares */}
              <div className="flex gap-1">
                {theme.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </button>
          ))}

          {filteredThemes.length === 0 && (
            <div className="text-gray-500 text-sm text-center py-2">
              No themes found
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
    )
}