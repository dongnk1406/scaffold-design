import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Custom typography utilities (text-h1, text-body, ...) are font sizes, not
// colors. Register them in the font-size group so merging text-body with
// text-foreground does not drop one of them.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-1',
            'display-2',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'body-lg',
            'body',
            'body-sm',
            'body-xs',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs))
}
