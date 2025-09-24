
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import TypingApp from './TypingMain'
import { ThemeProvider } from './contexts/themeProvider'

function App() {

  return (
    <>
        <Router>
               <Routes>
                    <Route path='/' element={
                      <ThemeProvider>
                         <Layout />
                      </ThemeProvider>
                      
                      } >
                         <Route index element={<TypingApp />} />
                    </Route>
               </Routes>
        </Router>
    </>
  )
}

export default App
