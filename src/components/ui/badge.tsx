import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '#/lib/cn'

const badge = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-body-xs font-semibold',
  {
    variants: {
      variant: {
        neutral: 'bg-surface-hover text-foreground',
        positive: 'bg-positive-subtle text-positive',
        info: 'bg-info-subtle text-info',
        caution: 'bg-caution-subtle text-caution',
        critical: 'bg-critical-subtle text-critical',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
)

export interface BadgeProps
  extends ComponentProps<'span'>,
    VariantProps<typeof badge> {}

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant }), className)} {...props} />
}
