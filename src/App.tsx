import { RouterProvider } from 'react-router-dom'
import './sass/main.scss'
import router from '@/routes/app-routes'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

export default App
