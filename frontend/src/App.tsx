import { useEffect } from 'react'
import { useThemeStore } from './store/themeStore'
import './App.css'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">AI Education Platform</h1>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p>Welcome to the AI-Powered Education Platform</p>
      </main>
    </div>
  )
}

export default App
