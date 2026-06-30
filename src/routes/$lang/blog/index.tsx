import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/blog/")({
  component: BlogPage,
});

function BlogPage() {
  return <div>Hello "/$lang/blog/"!</div>;
}
