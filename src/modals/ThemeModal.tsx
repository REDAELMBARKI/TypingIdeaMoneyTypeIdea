import React ,  { createContext, useCallback, useContext, useState } from "react";
import type { ThemeColors } from "../types/experementTyping";
import { colorThemes } from "../data/themColors";
import useThemeHook from "../customHooks/useThemeHook";
import Loader from "../components/Loader";

interface ThemeModalProps {
  setIsThemeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviewTheme: React.Dispatch<React.SetStateAction<ThemeColors | null>> 
  isThemeConfirmed : boolean ;
}

type BaseModalContextType =  {
  setIsLoadingTheme: React.Dispatch<React.SetStateAction<boolean>>
  isLoadingTheme : boolean 
}

const BaseModelContext = createContext<BaseModalContextType | undefined>(undefined)


const useBaseModelContext : () => BaseModalContextType = () => {
   const context = useContext(BaseModelContext) ;

    if(! context){
      throw new  Error('you should past baseMoel data in provider')
    }


    return context ;
}

export default function ThemeModal({ setIsThemeModalOpen , setPreviewTheme ,isThemeConfirmed }: ThemeModalProps) {
  const [search, setSearch] = useState("");
  const [themes] = useState<ThemeColors[]>(colorThemes);
  const [isLoadingTheme, setIsLoadingTheme] = useState<boolean>(false);

  // this is the context sends data to base model

  const {  setIsThemeConfirmed  , setSelectedTheme , previewTheme } = useThemeHook();
  const filteredThemes = themes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const onClose = () => {
     setIsThemeModalOpen(false) 
     setPreviewTheme(null);
  };

  const onConfirm = useCallback(() => {
    if(!previewTheme) return ;
    setIsLoadingTheme(true) ;
    
    setTimeout(() => {
      setIsThemeConfirmed(true) ;
      setSelectedTheme(previewTheme) ;
      setPreviewTheme(null);
      setIsThemeModalOpen(false) 
      setIsLoadingTheme(false)
    },2000)
    
  }, [setIsThemeConfirmed, setPreviewTheme , previewTheme , setSelectedTheme , isThemeConfirmed , setIsThemeModalOpen]) ;


  const onSelect = (theme: ThemeColors) => {
        setPreviewTheme(theme) ;
  };
 
  return filteredThemes.length > 0 || search !== "" ? (
     <BaseModelContext.Provider value={{isLoadingTheme , setIsLoadingTheme}} >
    <FilteredModals 
      onConfirm={onConfirm}
      themes={filteredThemes}
      onClose={onClose}
      onSelect={onSelect}
      search={search}
      setSearch={setSearch}
    />
    </BaseModelContext.Provider>
  ) : (

    <BaseModelContext.Provider value={{isLoadingTheme , setIsLoadingTheme}} >
    <AllModals 
      onConfirm={onConfirm}
      themes={themes}
      onClose={onClose}
      onSelect={onSelect}
      search={search}
      setSearch={setSearch}
    />
    </BaseModelContext.Provider>
  );
}

// Extend the props to include search & setSearch
interface ChildModalProps {
  search: string;
  setSearch: (value: string) => void;
  themes: ThemeColors[];
  onClose: () => void;
  onSelect: (theme: ThemeColors) => void;
  onConfirm: () => void;
}

const AllModals : React.FC<ChildModalProps>  =  React.memo(({
  themes,
  onClose,
  onSelect,
  search,
  setSearch, 
  onConfirm
}) => {
  return (
    <BaseModal
      onConfirm={onConfirm}
      themes={themes}
      onClose={onClose}
      onSelect={onSelect}
      search={search}
      setSearch={setSearch}
    />
  );
})

const FilteredModals:  React.FC<ChildModalProps>  = React.memo(({
  themes,
  onClose,
  onSelect,
  search,
  setSearch,
  onConfirm
}) => {
  return (
    <BaseModal 
      onConfirm={onConfirm}
      themes={themes}
      onClose={onClose}
      onSelect={onSelect}
      search={search}
      setSearch={setSearch}
    />
  );
})

// Common base modal to avoid duplication
const  BaseModal : React.FC<ChildModalProps> = React.memo(({
  themes,
  onClose,
  onSelect,
  search,
  setSearch,
  onConfirm ,

}) => {

  const { currentTheme  } = useThemeHook();

  const {isLoadingTheme} = useBaseModelContext() ;
   
 

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center `}>
      
     
      <div
        className={` border border-[${currentTheme.border}]  rounded-xl w-96  max-w-full p-4 shadow-lg `}
       style={{backgroundColor : currentTheme.page_bg}}
      >
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search themes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{color : currentTheme.white}}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400  mb-4"
        />

        {/* Themes List */}
        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span className="text-gray-800 dark:text-gray-100">
                {theme.name}
              </span>
              <div className="flex gap-1">
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-700 ${color}`}
                    style={{
                      background: color
                    }}
                  />
                ))}
              </div>
            </button>
          ))}

          {themes.length === 0 && (
            <div className="text-gray-500 text-sm text-center py-2">
              No themes found
            </div>
          )}
        </div>
        <section className="flex gap-2 ">
            {/* confirm Button */}
            <button
              onClick={() =>  onConfirm()}
              className="mt-4 w-full py-2 rounded-md  text-white  transition"
              style={{
                backgroundColor: currentTheme.gray
              }}
            >
              {isLoadingTheme  ? <Loader style="scale" size={20} color={currentTheme.darkRed} /> :  "confirm"}
            </button>
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`mt-4 w-full py-2 rounded-md  text-white hover:bg-indigo-500 transition   `}

              style={{
                backgroundColor: currentTheme.red
              }}
            >
              close
            </button>
        </section>
      </div>

            
    </div>
            
  );
})
