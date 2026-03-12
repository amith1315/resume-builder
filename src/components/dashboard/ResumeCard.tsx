import type { Resume } from '../../lib/types'
import { TEMPLATES } from '../../constants/templates'
import Button from '../ui/Button'
import Icon   from '../ui/Icon'

interface Props {
  resume:   Resume
  onEdit:   (id: string) => void
  onDelete: (id: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  })
}

export default function ResumeCard({ resume, onEdit, onDelete }: Props) {
  const tpl = TEMPLATES[resume.templateId] ?? TEMPLATES.nova

  return (
    <div
      onClick={() => onEdit(resume.id)}
      className="group relative bg-surface border border-border1 rounded-2xl p-6 cursor-pointer transition-all duration-200 overflow-hidden hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

      {/* Template badge */}
      <div className="relative z-10">
        <span className={[
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border mb-4',
          tpl.tier === 'paid'
            ? 'bg-violet-500/10 text-violet-300 border-violet-500/20'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        ].join(' ')}>
          {tpl.preview} {tpl.name}
        </span>

        <h3 className="font-semibold text-base mb-1 truncate">
          {resume.name || 'Untitled Resume'}
        </h3>
        <p className="text-sm text-[var(--text3)] mb-5 truncate">
          {resume.title || 'No title set'} · Updated {formatDate(resume.updatedAt)}
        </p>

        {/* Actions — stop propagation so clicks don't open editor */}
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <Button variant="secondary" size="sm" onClick={() => onEdit(resume.id)}>
            <Icon name="edit" size={12} /> Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(resume.id)}>
            <Icon name="trash" size={12} /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}