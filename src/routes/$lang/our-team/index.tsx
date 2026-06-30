import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/our-team/")({
  component: OurTeamPage,
});

function OurTeamPage() {
  return <div>Hello "/$lang/our-team/"!</div>;
}
