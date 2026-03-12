import type { Resume } from '../../../lib/types'
import { TEMPLATE_LIST } from '../../../constants/templates'
import Button from '../../ui/Button'
import Icon   from '../../ui/Icon'

interface Props {
  resume:   Resume
  onChange: (r: Resume) => void
  isPro:    boolean
  onUnlock: () => void
}

export default function TemplateSection({ resume, onChange, isPro, onUnlock }: Props) {
  return (
    <div className="p-8 max-w-2xl">
      <h2
        className="text-2xl font-bold mb-1 text-text1"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Choose Template
      </h2>
      <p className="text-sm text-text2 mb-7">
        Select a layout for your resume. Premium templates require an upgrade.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {TEMPLATE_LIST.map(tpl => {
          const locked   = tpl.tier === 'paid' && !isPro
          const selected = resume.templateId === tpl.id

          return (
            <div
              key={tpl.id}
              onClick={() => locked ? onUnlock() : onChange({ ...resume, templateId: tpl.id })}
              className={[
                'border-2 rounded-xl cursor-pointer transition-all duration-200 p-4 relative',
                selected
                  ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                  : 'border-border1 bg-surface2 hover:border-indigo-500/50',
                locked ? 'opacity-75' : '',
              ].join(' ')}
            >
              {/* Selected check */}
              {selected && !locked && (
                <div className="absolute top-3 right-3 bg-indigo-500 rounded-full w-5 h-5 flex items-center justify-center">
                  <Icon name="check" size={11} className="text-white" />
                </div>
              )}

              {/* Lock badge */}
              {locked && (
                <div className="absolute top-3 right-3 bg-surface3 border border-border2 rounded-full w-5 h-5 flex items-center justify-center">
                  <Icon name="lock" size={10} className="text-text3" />
                </div>
              )}

              {/* Info */}
              <div className="font-semibold text-sm text-text1 mb-1 pr-6">
                {tpl.name}
              </div>
              <div className="text-xs text-text3 mb-3">
                {tpl.tagline}
              </div>
              <span className={[
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
                tpl.tier === 'paid'
                  ? 'bg-violet-500/10 text-violet-300 border-violet-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
              ].join(' ')}>
                {tpl.tier === 'paid' ? '💎 Premium' : '✓ Free'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Upgrade banner */}
      {!isPro && (
        <div className="mt-6 flex items-center gap-4 bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
          <div className="flex-1 text-sm text-text2">
            Unlock the <strong className="text-violet-300">Prism Executive</strong> template
            and all future premium layouts.
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onUnlock}
            className="shrink-0 bg-gradient-to-r from-violet-600 to-indigo-500"
          >
            <Icon name="lock" size={13} /> Upgrade
          </Button>
        </div>
      )}
    </div>
  )
}