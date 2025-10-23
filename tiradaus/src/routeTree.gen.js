import { createFileRoute } from '@tanstack/react-router';
import { Index } from './pages/Index.jsx';
import { LogIn } from './pages/LogIn.jsx';

export const Route = createFileRoute('/')({
  component: Index,
})

export const SignIn = createFileRoute("/sign-in")({
  component: LogIn,
});

export const routeTree = Route.addChildren([SignIn])