import { useState } from 'react'
import type { Resume, ToastData } from '../../../lib/types'
import { generateSummary } from '../../../lib/gemini'
import Button from '../../ui/Button'
import Toast  from '../../ui/Toast'
import Icon   from '../../ui/Icon'

interface Props { resume: Resume; onChange: (r: Resume) => void }

const inputCls = "w-full bg-surface2 border border-border1 rounded-lg px-3 py-2.5 text-sm text-text1 placeholder:text-text3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
export default function SummarySection({ resume, onChange }: Props) {
  const [aiOut,   setAiOut]   = useState('')
  const [loading, setLoading] = useState(false)
  const [toast,   setToast]   = useState<ToastData | null>(null)

  const generate = async () => {
    setLoading(true)
    try {
      const result = await generateSummary(resume.title, resume.skills)
      setAiOut(result.trim())
    } catch {
      setToast({ msg: 'AI unavailable — check API key', type: 'error' })
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Summary</h2>
      <p className="text-sm text-[var(--text2)] mb-7">A brief overview of your professional background and goals.</p>

      <div className="flex flex-col gap-1.5 mb-3">
        <label className="text-xs font-medium text-[var(--text2)] tracking-wide">Professional Summary</label>
        <textarea
          className={inputCls}
          rows={5}
          value={resume.summary}
          onChange={e => onChange({ ...resume, summary: e.target.value })}
          placeholder="A results-driven engineer with 5+ years building scalable systems..."
        />
      </div>

      <Button variant="ai" size="sm" loading={loading} onClick={generate}>
        <Icon name="sparkle" size={13} />
        AI Generate
      </Button>

      {aiOut && (
        <div className="mt-4 bg-[var(--surface2)] border border-indigo-500/30 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 mb-2">
            <Icon name="sparkle" size={12} /> AI Suggestion
          </div>
          <p className="text-sm text-[var(--text2)] leading-relaxed whitespace-pre-wrap">{aiOut}</p>
          <div className="flex gap-2 mt-3">
            <Button variant="green" size="sm" onClick={() => { onChange({ ...resume, summary: aiOut }); setAiOut('') }}>
              ✓ Use This
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setAiOut('')}>Dismiss</Button>
          </div>
        </div>
      )}

      {toast && <Toast {...toast} onDone={() => setToast(null)} />}
    </div>
  )
}