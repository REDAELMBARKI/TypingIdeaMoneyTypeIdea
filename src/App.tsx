import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import TypingApp from "./TypingMain";
import { ThemeProvider } from "./providers/themeProvider";
import { CurrentLiveDataProvider } from "./providers/CurrentLiveDataProvider";
import ReplayDataContextProvider from "./providers/ReplayDataContextProvider";
import ContainerAndFontContextProvider from "./providers/ContainerAndFontContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeProvider>
                  <ContainerAndFontContextProvider> 
                <CurrentLiveDataProvider>
                    <ReplayDataContextProvider>
                      <Layout />
                    </ReplayDataContextProvider>
                </CurrentLiveDataProvider>
                  </ContainerAndFontContextProvider>
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
