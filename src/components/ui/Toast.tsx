import { useEffect } from 'react'
import type { ToastData } from '../../lib/types'
import Icon from './Icon'

interface ToastProps extends ToastData {
  onDone: () => void
}

export default function Toast({ msg, type, onDone }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className={[
      'fixed bottom-6 right-6 z-50 flex items-center gap-2',
      'px-4 py-3 rounded-xl text-sm shadow-xl animate-slide-up',
      'bg-surface3 border text-text1',
      type === 'success' ? 'border-emerald-500/30' : 'border-red-500/30',
    ].join(' ')}
    >
      <Icon
        name={type === 'success' ? 'check' : 'close'}
        size={14}
        className={type === 'success' ? 'text-emerald-400' : 'text-red-400'}
      />
      {msg}
    </div>
  )
}