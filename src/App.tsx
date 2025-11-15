
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import TypingApp from './TypingMain'
import { ThemeProvider } from './providers/themeProvider'
import { CurrentLiveDataProvider } from './providers/CurrentLiveDataProvider'

function App() {

  return (
    <>
        <Router>
               <Routes>
                    <Route path='/' element={
                      <CurrentLiveDataProvider>
                      <ThemeProvider>
                         <Layout />
                      </ThemeProvider>

                      </CurrentLiveDataProvider>
                      
                      } >
                         <Route index element={<TypingApp />} />
                    </Route>
               </Routes>
        </Router>
    </>
  )
}

export default App
