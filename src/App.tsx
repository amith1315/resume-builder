import { useState, useEffect } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Editor    from './components/editor/Editor'

type View =
  | { screen: 'dashboard' }
  | { screen: 'editor'; resumeId: string }

export default function App() {
  const [view, setView] = useState<View>(() => {
    // On refresh, check URL hash for resumeId
    const hash = window.location.hash
    if (hash.startsWith('#/editor/')) {
      const resumeId = hash.replace('#/editor/', '')
      if (resumeId) return { screen: 'editor', resumeId }
    }
    return { screen: 'dashboard' }
  })

  // Keep URL in sync with view state
  useEffect(() => {
    if (view.screen === 'editor') {
      window.location.hash = `/editor/${view.resumeId}`
    } else {
      window.location.hash = ''
    }
  }, [view])

  if (view.screen === 'editor') {
    return (
      <Editor
        resumeId={view.resumeId}
        onBack={() => setView({ screen: 'dashboard' })}
      />
    )
  }

  return (
    <Dashboard
      onEdit={id => setView({ screen: 'editor', resumeId: id })}
    />
  )
}