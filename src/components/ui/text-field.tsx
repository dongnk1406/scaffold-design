import { useId } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '#/lib/cn'

export interface TextFieldProps extends ComponentProps<'input'> {
  label: string
  helperText?: string
  error?: string
  trailing?: ReactNode
}

export function TextField({
  label,
  helperText,
  error,
  trailing,
  className,
  id,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const message = error ?? helperText
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-h5 text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          className={cn(
            'h-11 w-full rounded-sm border border-input bg-surface px-3 text-body text-foreground placeholder:text-foreground-subtle hover:border-input-hover focus-visible:border-input-active focus-visible:shadow-focus focus-visible:outline-none disabled:bg-page-subtle disabled:text-foreground-subtle',
            trailing && 'pr-11',
            error && 'border-critical-bold',
            className,
          )}
          {...props}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {trailing}
          </div>
        )}
      </div>
      {message && (
        <span
          className={cn(
            'text-body-xs',
            error ? 'text-critical' : 'text-foreground-subtle',
          )}
        >
          {message}
        </span>
      )}
    </div>
  )
}
