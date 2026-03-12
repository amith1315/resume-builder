import type { Resume, EducationEntry } from '../../../lib/types'
import Button from '../../ui/Button'
import Icon   from '../../ui/Icon'

interface Props { resume: Resume; onChange: (r: Resume) => void }

const inputCls = "w-full bg-surface2 border border-border1 rounded-lg px-3 py-2.5 text-sm text-text1 placeholder:text-text3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
export default function EducationSection({ resume, onChange }: Props) {
  const add = () => onChange({
    ...resume,
    education: [...resume.education, { id: `ed_${Date.now()}`, school: '', degree: '', field: '', year: '', gpa: '' }],
  })

  const remove = (id: string) => onChange({ ...resume, education: resume.education.filter(e => e.id !== id) })

  const upd = (id: string, field: keyof EducationEntry, val: string) =>
    onChange({ ...resume, education: resume.education.map(e => e.id === id ? { ...e, [field]: val } : e) })

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Education</h2>
      <p className="text-sm text-[var(--text2)] mb-7">Your academic background and qualifications.</p>

      {resume.education.map((edu, idx) => (
        <div key={edu.id} className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[var(--text3)] uppercase tracking-widest">Education {idx + 1}</span>
            {resume.education.length > 1 && (
              <Button variant="danger" size="icon" onClick={() => remove(edu.id)}>
                <Icon name="trash" size={13} />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">School / University</label>
              <input className={inputCls} value={edu.school} onChange={e => upd(edu.id, 'school', e.target.value)} placeholder="MIT" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Graduation Year</label>
              <input className={inputCls} value={edu.year} onChange={e => upd(edu.id, 'year', e.target.value)} placeholder="2023" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Degree</label>
              <input className={inputCls} value={edu.degree} onChange={e => upd(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Field of Study</label>
              <input className={inputCls} value={edu.field} onChange={e => upd(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--text2)]">GPA (optional)</label>
            <input className={inputCls} value={edu.gpa} onChange={e => upd(edu.id, 'gpa', e.target.value)} placeholder="3.9 / 4.0" />
          </div>
        </div>
      ))}

      <Button variant="secondary" onClick={add}>
        <Icon name="plus" size={14} /> Add Education
      </Button>
    </div>
  )
}