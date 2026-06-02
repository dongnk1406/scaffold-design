import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '#/lib/cn'

const alert = cva('flex gap-3 rounded-md border p-4 text-body text-foreground', {
  variants: {
    variant: {
      info: 'bg-info-subtle border-info',
      positive: 'bg-positive-subtle border-positive',
      caution: 'bg-caution-subtle border-caution',
      critical: 'bg-critical-subtle border-critical',
    },
  },
  defaultVariants: { variant: 'info' },
})

type AlertVariant = NonNullable<VariantProps<typeof alert>['variant']>

const icons: Record<AlertVariant, LucideIcon> = {
  info: Info,
  positive: CheckCircle2,
  caution: AlertTriangle,
  critical: XCircle,
}

const iconColor: Record<AlertVariant, string> = {
  info: 'text-info',
  positive: 'text-positive',
  caution: 'text-caution',
  critical: 'text-critical',
}

export interface AlertProps
  extends ComponentProps<'div'>,
    VariantProps<typeof alert> {}

export function Alert({
  variant = 'info',
  className,
  children,
  ...props
}: AlertProps) {
  const v: AlertVariant = variant ?? 'info'
  const Icon = icons[v]
  return (
    <div role="alert" className={cn(alert({ variant }), className)} {...props}>
      <Icon className={cn('h-5 w-5 shrink-0', iconColor[v])} aria-hidden />
      <div>{children}</div>
    </div>
  )
}
