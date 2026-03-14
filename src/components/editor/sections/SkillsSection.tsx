import { useState } from 'react'
import type { Resume } from '../../../lib/types'
import { suggestSkills } from '../../../lib/groq'
import Button from '../../ui/Button'
import Icon   from '../../ui/Icon'

interface Props { resume: Resume; onChange: (r: Resume) => void }

const inputCls = "w-full bg-surface2 border border-border1 rounded-lg px-3 py-2.5 text-sm text-text1 placeholder:text-text3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
export default function SkillsSection({ resume, onChange }: Props) {
  const [loading,   setLoading]   = useState(false)
  const [aiSkills,  setAiSkills]  = useState<string[]>([])

  const addSkill = () => {
    const s = resume.skillInput?.trim()
    if (!s || resume.skills?.includes(s)) return
    onChange({ ...resume, skills: [...(resume.skills || []), s], skillInput: '' })
  }

  const removeSkill = (s: string) =>
    onChange({ ...resume, skills: resume.skills.filter(k => k !== s) })

  const toggleAiSkill = (s: string) => {
    const already = resume.skills?.includes(s)
    onChange({ ...resume, skills: already ? resume.skills.filter(k => k !== s) : [...(resume.skills || []), s] })
  }

  const suggest = async () => {
    setLoading(true)
    try {
      setAiSkills(await suggestSkills(resume.title))
    } catch {
      setAiSkills([])
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Skills</h2>
      <p className="text-sm text-[var(--text2)] mb-7">Add your technical and professional skills.</p>

      {/* Current skills */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
        {(resume.skills || []).length === 0
          ? <span className="text-sm text-[var(--text3)]">No skills added yet</span>
          : (resume.skills || []).map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-[var(--surface3)] border border-[var(--border2)] rounded-full px-3 py-1 text-sm">
              {s}
              <button onClick={() => removeSkill(s)} className="text-[var(--text3)] hover:text-red-400 transition-colors">
                <Icon name="close" size={11} />
              </button>
            </span>
          ))
        }
      </div>

      {/* Manual input */}
      <div className="flex gap-2 mb-4">
        <input
          className={inputCls}
          value={resume.skillInput || ''}
          onChange={e => onChange({ ...resume, skillInput: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && addSkill()}
          placeholder="Type a skill and press Enter"
        />
        <Button variant="secondary" onClick={addSkill}>
          <Icon name="plus" size={14} /> Add
        </Button>
      </div>

      <Button variant="ai" size="sm" loading={loading} onClick={suggest}>
        <Icon name="sparkle" size={13} />
        AI Suggest Skills
      </Button>

      {aiSkills.length > 0 && (
        <div className="mt-4 bg-[var(--surface2)] border border-indigo-500/30 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 mb-3">
            <Icon name="sparkle" size={12} /> Suggested Skills — click to add
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSkills.map((s, i) => {
              const added = (resume.skills || []).includes(s)
              return (
                <button
                  key={i}
                  onClick={() => toggleAiSkill(s)}
                  className={[
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm border transition-all',
                    added
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-[var(--surface3)] border-[var(--border2)] text-[var(--text2)] hover:border-indigo-500/50',
                  ].join(' ')}
                >
                  <Icon name={added ? 'check' : 'plus'} size={11} />
                  {s}
                </button>
              )
            })}
          </div>
          <div className="mt-3">
            <Button variant="ghost" size="sm" onClick={() => setAiSkills([])}>Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  )
}