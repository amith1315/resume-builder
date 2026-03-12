import type { Resume, ProjectEntry } from '../../../lib/types'
import Button from '../../ui/Button'
import Icon   from '../../ui/Icon'

interface Props { resume: Resume; onChange: (r: Resume) => void }

const inputCls = "w-full bg-surface2 border border-border1 rounded-lg px-3 py-2.5 text-sm text-text1 placeholder:text-text3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
export default function ProjectsSection({ resume, onChange }: Props) {
  const add = () => onChange({
    ...resume,
    projects: [...resume.projects, { id: `p_${Date.now()}`, name: '', description: '', url: '', tech: '' }],
  })

  const remove = (id: string) => onChange({ ...resume, projects: resume.projects.filter(p => p.id !== id) })

  const upd = (id: string, field: keyof ProjectEntry, val: string) =>
    onChange({ ...resume, projects: resume.projects.map(p => p.id === id ? { ...p, [field]: val } : p) })

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Projects</h2>
      <p className="text-sm text-[var(--text2)] mb-7">Showcase notable personal or professional projects.</p>

      {resume.projects.map((proj, idx) => (
        <div key={proj.id} className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[var(--text3)] uppercase tracking-widest">Project {idx + 1}</span>
            {resume.projects.length > 1 && (
              <Button variant="danger" size="icon" onClick={() => remove(proj.id)}>
                <Icon name="trash" size={13} />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Project Name</label>
              <input className={inputCls} value={proj.name} onChange={e => upd(proj.id, 'name', e.target.value)} placeholder="E-Commerce Platform" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Tech Stack</label>
              <input className={inputCls} value={proj.tech} onChange={e => upd(proj.id, 'tech', e.target.value)} placeholder="React, Node.js, PostgreSQL" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-3">
            <label className="text-xs font-medium text-[var(--text2)]">Project URL</label>
            <input className={inputCls} value={proj.url} onChange={e => upd(proj.id, 'url', e.target.value)} placeholder="github.com/you/project" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--text2)]">Description</label>
            <textarea
              className={`${inputCls} resize-y`}
              rows={2}
              value={proj.description}
              onChange={e => upd(proj.id, 'description', e.target.value)}
              placeholder="What did you build and what impact did it have?"
            />
          </div>
        </div>
      ))}

      <Button variant="secondary" onClick={add}>
        <Icon name="plus" size={14} /> Add Project
      </Button>
    </div>
  )
}