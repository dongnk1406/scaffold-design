import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({ component: Home })

// A tiny demo query so the TanStack Query wiring is exercised end-to-end.
function useDemoQuery() {
  return useQuery({
    queryKey: ['demo'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/TanStack/router')
      if (!res.ok) throw new Error('Request failed')
      const data = (await res.json()) as { stargazers_count: number }
      return data.stargazers_count
    },
  })
}

function Home() {
  const { data, isPending, isError } = useDemoQuery()

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">scaffold-design</h1>
      <p className="mt-4 text-lg">
        React + TanStack Router + TanStack Query + Tailwind CSS.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>

      <div className="mt-6 rounded-lg border border-gray-200 p-4">
        <span className="font-medium">TanStack Router GitHub stars: </span>
        {isPending
          ? 'loading…'
          : isError
            ? 'failed to load'
            : data.toLocaleString()}
      </div>
    </div>
  )
}
