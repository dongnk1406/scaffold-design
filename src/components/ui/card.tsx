import type { ComponentProps } from 'react'
import { cn } from '#/lib/cn'

export type CardProps = ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-md shadow-e2 p-4',
        className,
      )}
      {...props}
    />
  )
}
