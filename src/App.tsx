import { RouterProvider } from 'react-router-dom'
import './sass/main.scss'
import router from '@/routes/app-routes'

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
