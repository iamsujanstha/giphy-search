import ToggleTheme from '@/components/toggle-theme/ToggleTheme'
import './sass/main.scss'
import HomePage from '@/pages/home/HomePage'

function App() {

  return (
    <>
      <div>
        <ToggleTheme />
        <HomePage />
      </div>
    </>
  )
}

export default App
