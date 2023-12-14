import { BrowserRouter, Routes, Route } from 'react-router-dom'
import List from './pages/List'
import Home from './pages/Home'
import Add from './pages/Add'
import { ReactElement } from 'react'

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='accountings' element={<List />} />
        <Route path='add' element={<Add />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
