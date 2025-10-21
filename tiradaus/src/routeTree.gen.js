import { createFileRoute } from '@tanstack/react-router'
import { Index } from './pages/Index.jsx'

export const Route = createFileRoute('/')({
  component: Index,
})

export const routeTree = Route.addChildren([])