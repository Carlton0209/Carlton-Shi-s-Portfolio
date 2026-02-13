import { useParams, Link } from 'react-router-dom'

export function ProjectDetail() {
  const { id } = useParams()

  return (
    <main className="min-h-screen p-10">
      <Link to="/" className="text-sm underline">
        Back
      </Link>

      <h1 className="text-3xl font-bold mt-6">Project: {id}</h1>
    </main>
  )
}
