import type { Resume, SectionId } from '../../lib/types'
import { NAV_ITEMS } from '../../constants/templates'

interface Props {
  active:   SectionId
  resume:   Resume
  isPro:    boolean
  onSelect: (id: SectionId) => void
  onUnlock: () => void
}

function isFilled(id: string, resume: Resume): boolean {
  switch (id) {
    case 'personal':       return !!(resume.name || resume.email)
    case 'summary':        return !!resume.summary
    case 'experience':     return resume.experience?.some(e => e.company || e.role) ?? false
    case 'education':      return resume.education?.some(e => e.school) ?? false
    case 'skills':         return (resume.skills?.length ?? 0) > 0
    case 'projects':       return resume.projects?.some(p => p.name) ?? false
    case 'certifications': return resume.certifications?.some(c => c.name) ?? false
    default:               return false
  }
}

export default function SidebarNav({ active, resume, isPro, onSelect, onUnlock }: Props) {
  return (
    <aside className="w-45 bg-surface border-r border-border1 flex flex-col shrink-0 overflow-hidden">

      {/* Nav items */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-bold text-text3 uppercase tracking-[0.12em] px-3 mb-3">
          Sections
        </p>

        {NAV_ITEMS.map(item => {
          const filled   = isFilled(item.id, resume)
          const isActive = active === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id as SectionId)}
              className={[
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg',
                'text-sm font-medium transition-all duration-150 mb-0.5 cursor-pointer',
                isActive
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                  : 'text-text2 hover:bg-surface2 hover:text-text1 border border-transparent',
              ].join(' ')}
            >
              <span>{item.label}</span>
              <span className={[
                'w-2 h-2 rounded-full shrink-0 ml-2 inline-block',
                filled   ? 'bg-emerald-400' :
                isActive ? 'bg-indigo-400'  : 'bg-border2',
              ].join(' ')} />
            </button>
          )
        })}
      </div>

      {/* Upgrade button */}
      {!isPro && (
        <div className="p-3 border-t border-border1 shrink-0">
          <button
            onClick={onUnlock}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-500 hover:brightness-110 transition-all cursor-pointer"
          >
            💎 Unlock Premium
          </button>
        </div>
      )}
    </aside>
  )
}