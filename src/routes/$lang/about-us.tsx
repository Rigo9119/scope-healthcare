import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/about-us")({
  component: AboutUsPage,
});

function AboutUsPage() {
  return <div>Hello "/$lang/about-us"!</div>;
}
