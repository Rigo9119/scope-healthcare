import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/services/")({
  component: ServicesPage,
});

function ServicesPage() {
  return <div>Hello "/$lang/our-services"!</div>;
}
