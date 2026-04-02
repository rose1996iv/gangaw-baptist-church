import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  children: React.ReactNode
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-navy-600 text-white hover:bg-navy-700 active:bg-navy-800 shadow-lg hover:shadow-navy-600/30',
  accent:
    'bg-gold-500 text-navy-800 hover:bg-gold-400 active:bg-gold-600 shadow-lg hover:shadow-gold-500/30 font-semibold',
  outline:
    'border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white',
  ghost:
    'text-navy-600 hover:bg-navy-50 active:bg-navy-100',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 select-none'
  const classes = [base, variantClasses[variant], sizeClasses[size], className].join(' ')

  if (as === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
