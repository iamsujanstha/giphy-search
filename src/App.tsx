import { BrowserRouter } from 'react-router-dom'
import './sass/main.scss'
import HomePage from '@/pages/home/HomePage'

function App() {
  return (
    <>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </>
  )
}

export default App
