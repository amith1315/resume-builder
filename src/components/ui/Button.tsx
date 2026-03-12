import { ReactNode } from 'react'
import Icon from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai' | 'green'
type Size    = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps {
  children?: ReactNode
  variant?:  Variant
  size?:     Size
  disabled?: boolean
  loading?:  boolean
  onClick?:  () => void
  className?: string
  type?:     'button' | 'submit'
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-indigo-500 text-white hover:bg-indigo-600',
  secondary: 'bg-surface2 text-text1 border border-border1 hover:bg-surface3 hover:border-border2',
  ghost:     'bg-transparent text-text2 hover:bg-surface2 hover:text-text1',
  danger:    'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
  ai:        'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:brightness-110',
  green:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20',
}

const sizeClasses: Record<Size, string> = {
  sm:   'px-3 py-1.5 text-xs gap-1.5',
  md:   'px-4 py-2 text-sm gap-2',
  lg:   'px-6 py-2.5 text-sm gap-2',
  icon: 'p-2',
}

export default function Button({
  children,
  variant  = 'secondary',
  size     = 'md',
  disabled = false,
  loading  = false,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center rounded-lg font-medium',
        'transition-all duration-150 cursor-pointer whitespace-nowrap',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {loading
        ? <Icon name="loading" size={13} className="animate-spin-slow" />
        : children}
    </button>
  )
}