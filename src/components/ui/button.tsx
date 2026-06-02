import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '#/lib/cn'

const button = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-foreground-inverted hover:bg-primary-hover active:bg-primary-pressed disabled:bg-surface-disabled disabled:text-foreground-inverted',
        secondary:
          'bg-secondary text-foreground active:bg-secondary-pressed disabled:bg-surface-disabled disabled:text-foreground-inverted',
        outline:
          'border border-primary text-primary-hover bg-transparent hover:bg-primary-subtle disabled:border-border disabled:text-foreground-subtle',
        ghost:
          'text-primary-hover bg-transparent hover:bg-primary-subtle disabled:text-foreground-subtle',
      },
      size: {
        sm: 'h-9 px-3 text-body-sm',
        md: 'h-11 px-4 text-body',
        lg: 'h-14 px-6 text-body-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  )
}
