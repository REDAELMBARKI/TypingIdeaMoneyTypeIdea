import { useState } from "react";
import { Palette, Keyboard } from "lucide-react";
import { useLocation } from "react-router-dom";
import ThemeModal from "../modals/ThemeModal";
import useThemeHook from "../customHooks/useThemeHook";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const {currentTheme} =  useThemeHook() ;
  const location = useLocation();
  const {setPreviewTheme,isThemeConfirmed} = useThemeHook()
  const toggleThemeModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };

  const NavLink = ({ href , children, highlight = false }:{href : string , children :string  , highlight : boolean }) => (
    <a
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        highlight
          ? `hover:bg-indigo-50 dark:hover:bg-indigo-950`
          : "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}

      style={ highlight ? {color : currentTheme.buttonHover} : {} }
    >
      {children}
    </a>
  );

  return (
    <>
      {isThemeModalOpen && (
        <ThemeModal setIsThemeModalOpen={setIsThemeModalOpen}  setPreviewTheme={setPreviewTheme} isThemeConfirmed={isThemeConfirmed}  />
      )}
      
      <nav className="fixed w-full top-0 z-40 px-4 sm:px-6 lg:px-8 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex h-16 items-center justify-between">
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Open menu</span>
                {mobileOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div  
                style={{
                background: `linear-gradient(90deg, ${currentTheme.buttonPrimary}, ${currentTheme.buttonHover})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
               }}  
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              {/* <span className="text-2xl font-bold  "
                style={{
                background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.white})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              >
                KeyFlow
              </span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-1">
              <NavLink href="/learn" highlight={location.pathname === "/learn"}>Learn</NavLink>
              <NavLink href="/" highlight={location.pathname === "/"}>Practice</NavLink>
              <NavLink href="/test" highlight={false}>Test</NavLink>
              <NavLink href="/games" highlight={false} >Games</NavLink>
              <NavLink href="/custom" highlight={false}>Custom Practice</NavLink>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Theme button */}
              <button
                onClick={toggleThemeModal}
                className="p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Change theme"
              >
                <Palette className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <button className="hidden sm:block p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                <span className="sr-only">Notifications</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="User"
                    className="h-9 w-9 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 z-50 py-2">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">john@example.com</p>
                    </div>
                    <div className="py-2">
                      <a
                        href="#profile"
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#stats"
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Statistics
                      </a>
                      <a
                        href="#settings"
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Settings
                      </a>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <a
                        href="#signout"
                        className="block px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                      >
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden mt-4 p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
            <div className="space-y-1">
              <a
                href="#learn"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Learn
              </a>
              <a
                href="#practice"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Practice
              </a>
              <a
                href="#test"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Test
              </a>
              <a
                href="#games"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Games
              </a>
              <a
                href="#custom"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
              >
                Custom Practice
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;