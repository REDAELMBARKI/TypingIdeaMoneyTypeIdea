import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import TypingApp from "./TypingMain";
import { ThemeProvider } from "./ContextProviders/themeProvider";
import { CurrentLiveDataProvider } from "./ContextProviders/CurrentLiveDataProvider";
import ReplayDataContextProvider from "./ContextProviders/ReplayDataContextProvider";
import ContainerAndFontContextProvider from "./ContextProviders/ContainerAndFontContext";
import TypingSessionStateContextProvider from "./ContextProviders/TypingSessionStateContextProvider";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeProvider>
                <TypingSessionStateContextProvider>
                  <ContainerAndFontContextProvider>
                    <CurrentLiveDataProvider>
                      <ReplayDataContextProvider>
                        <Layout />
                      </ReplayDataContextProvider>
                    </CurrentLiveDataProvider>
                  </ContainerAndFontContextProvider>
                </TypingSessionStateContextProvider>
              </ThemeProvider>
            }
          >
            <Route index element={<TypingApp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
