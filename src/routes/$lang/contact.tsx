import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/contact")({
  component: ContactPage,
});

function ContactPage() {
  return <div>Hello "/$lang/contact"!</div>;
}
