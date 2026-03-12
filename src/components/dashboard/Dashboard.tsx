import { useState, useEffect } from 'react'
import type { Resume, ToastData } from '../../lib/types'
import { db, createEmptyResume } from '../../lib/db'
import ResumeCard from './ResumeCard'
import Button     from '../ui/Button'
import Toast      from '../ui/Toast'
import Icon       from '../ui/Icon'

interface Props {
  onEdit: (id: string) => void
}

export default function Dashboard({ onEdit }: Props) {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [toast,   setToast]   = useState<ToastData | null>(null)

  useEffect(() => {
    db.list().then(data => {
      setResumes(data)
      setLoading(false)
    })
  }, [])

  const handleCreate = async () => {
    const r = createEmptyResume()
    await db.save(r.id, r)
    onEdit(r.id)
  }

  const handleDelete = async (id: string) => {
    await db.delete(id)
    setResumes(await db.list())
    setToast({ msg: 'Resume deleted', type: 'success' })
  }

  return (
    <div className="min-h-screen bg-bg">

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-8 border-b border-border1 sticky top-0 z-10 bg-bg">
        <div className="font-bold text-xl tracking-tight font-display">
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Resume
          </span>
          <span className="text-text2 font-normal">Builder</span>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Icon name="plus" size={14} /> New Resume
        </Button>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-8 py-10">

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-text1 font-display">
            Your Resumes
          </h1>
          <p className="text-text2">
            Create, edit, and download professional resumes with AI assistance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* New resume card */}
          <button
            onClick={handleCreate}
            className="flex flex-col items-center justify-center gap-3 min-h-44 bg-surface border-2 border-dashed border-border1 rounded-2xl text-text3 hover:border-indigo-500 hover:text-indigo-400 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center transition-transform group-hover:scale-110">
              <Icon name="plus" size={18} />
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm">Create New Resume</div>
              <div className="text-xs mt-0.5 opacity-70">Start from scratch</div>
            </div>
          </button>

          {/* Loading state */}
          {loading && (
            <div className="col-span-2 flex items-center justify-center py-16 text-text3 text-sm gap-2">
              <Icon name="loading" size={16} className="animate-spin-slow" />
              Loading resumes...
            </div>
          )}

          {/* Existing resumes */}
          {!loading && resumes.map(r => (
            <ResumeCard
              key={r.id}
              resume={r}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Empty state */}
        {!loading && resumes.length === 0 && (
          <div className="text-center py-16 text-text3">
            <div className="text-5xl mb-4">📄</div>
            <p className="text-sm">No resumes yet. Create your first one!</p>
          </div>
        )}
      </main>

      {toast && <Toast {...toast} onDone={() => setToast(null)} />}
    </div>
  )
}