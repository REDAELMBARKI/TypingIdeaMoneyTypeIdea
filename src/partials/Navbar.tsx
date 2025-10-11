import {  useState } from "react";
import { Link } from "react-router-dom";
import {  Sun } from "lucide-react";
import ThemeModal from "../modals/ThemeModal";
import useThemeHook from "../customHooks/useThemeHook";


export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
 

  const [isThemeModalOpen , setIsThemeModalOpen] =  useState<boolean>(false);
   const { setPreviewTheme  , isThemeConfirmed  } = useThemeHook();

  const toggleDarkMode = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };




  return (
     <>
     {
      isThemeModalOpen && <ThemeModal isThemeConfirmed={isThemeConfirmed} setPreviewTheme={setPreviewTheme} setIsThemeModalOpen={setIsThemeModalOpen}  />
     }
     <nav className={`fixed w-full h-[100px]  top-0  pt-[25px] `}>
      <div className="mx-auto max-w-full  sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-6 w-6"
                >
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-6 w-6"
                >
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo + Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block flex ">

                    <div className="flex space-x-4">
                      <Link to="/dashboard" className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">
                        Dashboard
                      </Link>
                      <Link to="/team" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                        Team
                      </Link>
                      <Link to="/projects" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                        Projects
                      </Link>
                      <Link to="/calendar" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                        Calendar
                      </Link>
                    </div>

                    
              </div>

              <div className="ms-auto flex items-center space-x-4">
                 <button
                      onClick={toggleDarkMode}
                      className={`p-2 rounded-lg transition-colors duration-200  `}
                      aria-label="Toggle dark mode"
                    >
                      <Sun size={20} />
                    </button>
              </div>
          </div>

          {/* Right side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
              <span className="sr-only">View notifications</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-6 w-6"
              >
                <path
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* User menu */}
            <div className="relative ml-3">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Your profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Settings</Link>
                  <Link to="/signout" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Sign out</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <Link to="/dashboard" className="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">Dashboard</Link>
          <Link to="/team" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Team</Link>
          <Link to="/projects" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Projects</Link>
          <Link to="/calendar" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Calendar</Link>
        </div>
      )}
    </nav>
     
     </>
  );
};

export default Navbar ;