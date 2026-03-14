import { useState } from 'react'
import type { Resume, ExperienceEntry } from '../../../lib/types'
import { improveDescription } from '../../../lib/gemini'
import Button from '../../ui/Button'
import Icon   from '../../ui/Icon'

interface Props { resume: Resume; onChange: (r: Resume) => void }

const inputCls = "w-full bg-surface2 border border-border1 rounded-lg px-3 py-2.5 text-sm text-text1 placeholder:text-text3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
export default function ExperienceSection({ resume, onChange }: Props) {
  const [aiIdx,   setAiIdx]   = useState<number | null>(null)
  const [aiOut,   setAiOut]   = useState('')
  const [loading, setLoading] = useState(false)

  const add = () => onChange({
    ...resume,
    experience: [...resume.experience, { id: `e_${Date.now()}`, company: '', role: '', start: '', end: '', current: false, description: '' }],
  })

  const remove = (id: string) => onChange({ ...resume, experience: resume.experience.filter(e => e.id !== id) })

  const upd = (id: string, field: keyof ExperienceEntry, val: string | boolean) =>
    onChange({ ...resume, experience: resume.experience.map(e => e.id === id ? { ...e, [field]: val } : e) })

  const improve = async (idx: number) => {
    const exp = resume.experience[idx]
    if (!exp.description) return
    setAiIdx(idx)
    setLoading(true)
    try {
      setAiOut(await improveDescription(exp.role, exp.company, exp.description))
    } catch {
      setAiOut('AI unavailable.')
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Experience</h2>
      <p className="text-sm text-[var(--text2)] mb-7">List your work history, most recent first.</p>

      {resume.experience.map((exp, idx) => (
        <div key={exp.id} className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[var(--text3)] uppercase tracking-widest">Position {idx + 1}</span>
            {resume.experience.length > 1 && (
              <Button variant="danger" size="icon" onClick={() => remove(exp.id)}>
                <Icon name="trash" size={13} />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Job Title</label>
              <input className={inputCls} value={exp.role} onChange={e => upd(exp.id, 'role', e.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Company</label>
              <input className={inputCls} value={exp.company} onChange={e => upd(exp.id, 'company', e.target.value)} placeholder="Acme Corp" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Start</label>
              <input className={inputCls} value={exp.start} onChange={e => upd(exp.id, 'start', e.target.value)} placeholder="Jan 2022" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">End</label>
              <input className={inputCls} value={exp.end} onChange={e => upd(exp.id, 'end', e.target.value)} placeholder="Dec 2024" disabled={exp.current} />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm text-[var(--text2)] cursor-pointer">
                <input type="checkbox" checked={exp.current} onChange={e => upd(exp.id, 'current', e.target.checked)} className="accent-indigo-500 cursor-pointer" />
                Current
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-3">
            <label className="text-xs font-medium text-[var(--text2)]">Description</label>
            <textarea
              className={`${inputCls} resize-y`}
              rows={3}
              value={exp.description}
              onChange={e => upd(exp.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          <Button variant="ai" size="sm" loading={loading && aiIdx === idx} disabled={!exp.description} onClick={() => improve(idx)}>
            <Icon name="sparkle" size={13} />
            AI Improve
          </Button>

          {aiIdx === idx && aiOut && (
            <div className="mt-3 bg-[var(--surface)] border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 mb-2">
                <Icon name="sparkle" size={12} /> Improved Version
              </div>
              <p className="text-sm text-[var(--text2)] leading-relaxed whitespace-pre-wrap">{aiOut}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="green" size="sm" onClick={() => { upd(exp.id, 'description', aiOut); setAiOut(''); setAiIdx(null) }}>
                  ✓ Use This
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { setAiOut(''); setAiIdx(null) }}>Dismiss</Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="secondary" onClick={add}>
        <Icon name="plus" size={14} /> Add Position
      </Button>
    </div>
  )
}