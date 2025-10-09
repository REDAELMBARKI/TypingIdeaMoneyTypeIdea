import { useState } from "react";
import type { ThemeColors } from "../types/experementTyping";
import { colorThemes } from "../data/themColors";
import useThemeHook from "../customHooks/useThemeHook";


interface ThemeModalProps {
    
    setIsThemeModalOpen: React.Dispatch<React.SetStateAction<boolean>>
 
}



export default function ThemeModal({setIsThemeModalOpen} :ThemeModalProps) {
  const [search, setSearch] = useState("");
  const [themes] = useState<ThemeColors[]>(colorThemes);

  const {setSelectedTheme} =  useThemeHook()
  const filteredThemes = themes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );


 
 
  const onClose = () => setIsThemeModalOpen(false) ;
  
 const onSelect = (theme:ThemeColors) => setSelectedTheme(theme) ;

  return filteredThemes.length > 0 || search !== "" ? (
    <FilteredModals
      themes={filteredThemes}
      onClose={onClose}
      onSelect={onSelect}
      search={search}
      setSearch={setSearch}
    />
  ) : (
    <AllModals
      themes={themes}
   
      onClose={onClose}
      onSelect={onSelect}
      search={search}
      setSearch={setSearch}
    />
  );
}

// Extend the props to include search & setSearch
interface ChildModalProps {
  search: string;
  setSearch: (value: string) => void;
  themes:ThemeColors[] 
  onClose: () => void;
  onSelect: (theme: ThemeColors) => void;

}


function AllModals({  themes, onClose, onSelect, search, setSearch }: ChildModalProps) {
  return (
    <BaseModal  themes={themes} onClose={onClose} onSelect={onSelect} search={search} setSearch={setSearch} />
  );
}

function FilteredModals({ themes, onClose, onSelect, search, setSearch }: ChildModalProps) {
  return (
    <BaseModal   themes={themes} onClose={onClose} onSelect={onSelect} search={search} setSearch={setSearch} />
  );
}

// Common base modal to avoid duplication
function BaseModal({ themes, onClose, onSelect, search, setSearch }: ChildModalProps) {
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
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span className="text-gray-800 dark:text-gray-100">{theme.name}</span>
              <div className="flex gap-1">
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}

          {themes.length === 0 && (
            <div className="text-gray-500 text-sm text-center py-2">No themes found</div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
