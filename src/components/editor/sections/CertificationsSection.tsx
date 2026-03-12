import type { Resume, CertificationEntry } from '../../../lib/types'
import Button from '../../ui/Button'
import Icon   from '../../ui/Icon'

interface Props { resume: Resume; onChange: (r: Resume) => void }

const inputCls = "w-full bg-surface2 border border-border1 rounded-lg px-3 py-2.5 text-sm text-text1 placeholder:text-text3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
export default function CertificationsSection({ resume, onChange }: Props) {
  const add = () => onChange({
    ...resume,
    certifications: [...resume.certifications, { id: `c_${Date.now()}`, name: '', issuer: '', year: '' }],
  })

  const remove = (id: string) => onChange({ ...resume, certifications: resume.certifications.filter(c => c.id !== id) })

  const upd = (id: string, field: keyof CertificationEntry, val: string) =>
    onChange({ ...resume, certifications: resume.certifications.map(c => c.id === id ? { ...c, [field]: val } : c) })

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Certifications</h2>
      <p className="text-sm text-[var(--text2)] mb-7">Professional certifications and licenses.</p>

      {resume.certifications.map((cert, idx) => (
        <div key={cert.id} className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[var(--text3)] uppercase tracking-widest">Certification {idx + 1}</span>
            {resume.certifications.length > 1 && (
              <Button variant="danger" size="icon" onClick={() => remove(cert.id)}>
                <Icon name="trash" size={13} />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Certification Name</label>
              <input className={inputCls} value={cert.name} onChange={e => upd(cert.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text2)]">Issuing Organization</label>
              <input className={inputCls} value={cert.issuer} onChange={e => upd(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--text2)]">Year</label>
            <input className={inputCls} value={cert.year} onChange={e => upd(cert.id, 'year', e.target.value)} placeholder="2024" />
          </div>
        </div>
      ))}

      <Button variant="secondary" onClick={add}>
        <Icon name="plus" size={14} /> Add Certification
      </Button>
    </div>
  )
}