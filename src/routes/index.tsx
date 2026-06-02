import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { TextField } from '#/components/ui/text-field'

export const Route = createFileRoute('/')({ component: LoginPage })

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-page-subtle p-4">
      {/* Figma card radius is 12px (off our sm/md scale) and is flat — here we
          stay on-system with rounded-md and drop the Card's default elevation. */}
      <Card className="w-full max-w-[400px] border-0 p-10 shadow-none">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Logo placeholder — the Figma brand mark is a custom vector asset */}
          <div className="flex justify-center">
            <span className="text-h3 text-primary">Scaffold</span>
          </div>

          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-h2 text-foreground">Welcome back</h1>
            <p className="text-body text-foreground-subtle">
              Log in to the Scaffold portal
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="Eg. Smith"
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-foreground-subtle hover:bg-surface-hover"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button type="button" variant="ghost" className="w-full">
              Forgot password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
