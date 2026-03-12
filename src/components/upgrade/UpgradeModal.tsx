import Modal  from '../ui/Modal'
import Button from '../ui/Button'
import Icon   from '../ui/Icon'

interface Props {
  onUpgrade: () => void
  onClose:   () => void
}

const FEATURES = [
  'Premium Prism Executive template',
  'Professional two-column layout with sidebar',
  'Skill proficiency visualization bars',
  'Priority PDF export with full styling',
  'All future premium templates',
]

export default function UpgradeModal({ onUpgrade, onClose }: Props) {
  return (
    <Modal onClose={onClose}>

      {/* Title */}
      <h2
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        💎 Upgrade to Premium
      </h2>
      <p className="text-sm text-[var(--text2)] mb-6 leading-relaxed">
        Unlock the <strong className="text-violet-300">Prism Executive Template</strong> and
        stand out from the crowd with a polished, premium layout.
      </p>

      {/* Feature list */}
      <ul className="flex flex-col gap-2.5 mb-6">
        {FEATURES.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm text-[var(--text2)]">
            <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <Icon name="check" size={10} className="text-emerald-400" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl font-bold">$9.99</span>
        <span className="text-sm text-[var(--text3)] ml-2">/ one-time</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-500 hover:brightness-110"
          onClick={onUpgrade}
        >
          Upgrade Now (Simulated)
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>

    </Modal>
  )
}