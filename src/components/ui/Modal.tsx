import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  onClose:  () => void
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
  onClick={onClose}
>
  <div
    className="bg-surface border border-border2 rounded-2xl p-8 w-full max-w-md text-text1"
    onClick={e => e.stopPropagation()}
  >
    {children}
  </div>
</div>
  )
}