import type { Resume } from '../../../lib/types'

interface Props { resume: Resume; onChange: (r: Resume) => void }

const inputCls = "w-full bg-surface2 border border-border1 rounded-lg px-3 py-2.5 text-sm text-text1 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-text2 tracking-wide">{label}</label>
    {children}
  </div>
)

export default function PersonalInfo({ resume, onChange }: Props) {
  const upd = (field: keyof Resume, val: string) => onChange({ ...resume, [field]: val })

  return (
    <div className="p-8 max-w-2xl">
      <h2
        className="text-2xl font-bold mb-1 text-text1"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Personal Info
      </h2>
      <p className="text-sm text-text2 mb-7">
        Your basic contact details shown at the top of your resume.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Full Name *">
          <input
            className={inputCls}
            value={resume.name}
            onChange={e => upd('name', e.target.value)}
            placeholder="Jane Smith"
          />
        </Field>
        <Field label="Professional Title">
          <input
            className={inputCls}
            value={resume.title}
            onChange={e => upd('title', e.target.value)}
            placeholder="Senior Software Engineer"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Email">
          <input
            className={inputCls}
            type="email"
            value={resume.email}
            onChange={e => upd('email', e.target.value)}
            placeholder="jane@example.com"
          />
        </Field>
        <Field label="Phone">
          <input
            className={inputCls}
            value={resume.phone}
            onChange={e => upd('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Location">
          <input
            className={inputCls}
            value={resume.location}
            onChange={e => upd('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </Field>
        <Field label="LinkedIn">
          <input
            className={inputCls}
            value={resume.linkedin}
            onChange={e => upd('linkedin', e.target.value)}
            placeholder="linkedin.com/in/janesmith"
          />
        </Field>
      </div>

      <div className="mb-4">
        <Field label="Website / Portfolio">
          <input
            className={inputCls}
            value={resume.website}
            onChange={e => upd('website', e.target.value)}
            placeholder="janesmith.dev"
          />
        </Field>
      </div>
    </div>
  )
}