import { useState } from "react";
import { Palette, Keyboard } from "lucide-react";
import { useLocation } from "react-router-dom";
import ThemeModal from "../modals/ThemeModal";
import useThemeHook from "../customHooks/useThemeHook";
import AuthButton from "../components/AuthButton";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const { currentTheme, setPreviewTheme, isThemeConfirmed } = useThemeHook();
  const isLogedIn = false;
  const location = useLocation();

  const toggleThemeModal = () => {
    setIsThemeModalOpen(!isThemeModalOpen);
  };

  const NavLink = ({
    href,
    children,
    isActive,
  }: {
    href: string;
    children: string;
    isActive: boolean;
  }) => (
    
      href={href}
      style={{
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        border: "none",
        padding: "0.5rem 0.8rem",
        color: isActive ? currentTheme.page_bg : currentTheme.white,
        transition: "all 0.15s ease-in-out",
        position: "relative",
        backgroundColor: isActive ? currentTheme.white : "transparent",
        fontWeight: isActive ? 600 : 400,
        fontSize: "14px",
      }}
    >
      {children}
      {isActive && (
        <>
          <span
            style={{
              position: "absolute",
              width: "10px",
              height: "10px",
              backgroundColor: currentTheme.buttonPrimary,
              bottom: 0,
              left: "-10px",
              borderBottomRightRadius: "300px",
              boxShadow: `3px 3px 0px 3px ${currentTheme.white}`,
            }}
          />
          <span
            style={{
              position: "absolute",
              width: "10px",
              height: "10px",
              backgroundColor: currentTheme.buttonPrimary,
              bottom: 0,
              right: "-10px",
              borderBottomLeftRadius: "300px",
              boxShadow: `-3px 3px 0px 3px ${currentTheme.white}`,
            }}
          />
        </>
      )}
    </a>
  );

  return (
    <>
      {isThemeModalOpen && (
        <ThemeModal
          setIsThemeModalOpen={setIsThemeModalOpen}
          setPreviewTheme={setPreviewTheme}
          isThemeConfirmed={isThemeConfirmed}
        />
      )}

      <nav className="fixed w-full top-0 z-40 px-4 sm:px-6 lg:px-8 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 transition-colors"
                style={{ color: currentTheme.white }}
              >
                <span className="sr-only">Open menu</span>
                {mobileOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                style={{
                  background: `linear-gradient(90deg, ${currentTheme.buttonPrimary}, ${currentTheme.buttonHover})`,
                }}
                className="flex items-center justify-center w-10 h-10 rounded-xl shadow-lg"
              >
                <Keyboard className="w-6 h-6" style={{ color: currentTheme.white }} />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div
              className="hidden sm:flex items-center"
              style={{
                position: "relative",
                display: "flex",
                borderRadius: "0.5rem",
                backgroundColor: currentTheme.buttonPrimary,
                padding: "1rem 1rem 0 1rem",
              }}
            >
              <NavLink href="/learn" isActive={location.pathname === "/learn"}>
                Learn
              </NavLink>
              <NavLink href="/" isActive={location.pathname === "/"}>
                Practice
              </NavLink>
              <NavLink href="/test" isActive={location.pathname === "/test"}>
                Test
              </NavLink>
              <NavLink href="/games" isActive={location.pathname === "/games"}>
                Games
              </NavLink>
              <NavLink href="/custom" isActive={location.pathname === "/custom"}>
                Custom
              </NavLink>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Theme button */}
              <button
                onClick={toggleThemeModal}
                className="p-2.5 rounded-lg transition-colors"
                style={{ color: currentTheme.white }}
                aria-label="Change theme"
              >
                <Palette className="w-5 h-5" />
              </button>

              {/* guest / user */}
              {isLogedIn ? (
                <div className="flex items-center space-x-2">
                  {/* Notifications */}
                  <button
                    className="hidden sm:block p-2.5 rounded-lg transition-colors relative"
                    style={{ color: currentTheme.white }}
                  >
                    <span className="sr-only">Notifications</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span
                      className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentTheme.red }}
                    ></span>
                  </button>

                  {/* User menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                        alt="User"
                        className="h-9 w-9 rounded-full border-2"
                        style={{ borderColor: currentTheme.border }}
                      />
                    </button>

                    {userMenuOpen && (
                      <div
                        className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 py-2"
                        style={{ backgroundColor: currentTheme.page_bg }}
                      >
                        <div
                          className="px-4 py-3 border-b"
                          style={{ borderColor: currentTheme.border }}
                        >
                          <p
                            className="text-sm font-medium"
                            style={{ color: currentTheme.white }}
                          >
                            John Doe
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: currentTheme.gray }}
                          >
                            john@example.com
                          </p>
                        </div>
                        <div className="py-2">
                          
                            href="#profile"
                            className="block px-4 py-2.5 text-sm transition-colors"
                            style={{ color: currentTheme.white }}
                          >
                            Your Profile
                          </a>
                          
                            href="#stats"
                            className="block px-4 py-2.5 text-sm transition-colors"
                            style={{ color: currentTheme.white }}
                          >
                            Statistics
                          </a>
                          
                            href="#settings"
                            className="block px-4 py-2.5 text-sm transition-colors"
                            style={{ color: currentTheme.white }}
                          >
                            Settings
                          </a>
                        </div>
                        <div
                          className="border-t pt-2"
                          style={{ borderColor: currentTheme.border }}
                        >
                          
                            href="#signout"
                            className="block px-4 py-2.5 text-sm transition-colors"
                            style={{ color: currentTheme.red }}
                          >
                            Sign Out
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <AuthButton />
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="sm:hidden mt-4 p-4 rounded-xl backdrop-blur-lg shadow-lg"
            style={{ backgroundColor: `${currentTheme.page_bg}CC` }}
          >
            <div className="space-y-1">
              
                href="/learn"
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: currentTheme.white }}
              >
                Learn
              </a>
              
                href="/"
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: currentTheme.white }}
              >
                Practice
              </a>
              
                href="/test"
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: currentTheme.white }}
              >
                Test
              </a>
              
                href="/games"
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: currentTheme.white }}
              >
                Games
              </a>
              
                href="/custom"
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: currentTheme.buttonPrimary }}
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