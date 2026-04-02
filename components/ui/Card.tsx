import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: boolean
}

export default function Card({
  children,
  className = '',
  hover = true,
  padding = true,
}: CardProps) {
  const base =
    'bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
  const hoverClass = hover
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-navy-100'
    : ''
  const paddingClass = padding ? 'p-6' : ''

  return (
    <div className={[base, hoverClass, paddingClass, className].join(' ')}>
      {children}
    </div>
  )
}
