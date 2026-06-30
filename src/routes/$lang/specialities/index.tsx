import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/specialities/")({
  component: SpecialitiesPage,
});

function SpecialitiesPage() {
  return <div>Hello "/$lang/specialities"!</div>;
}
