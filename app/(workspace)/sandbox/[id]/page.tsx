import SandboxIdView from "@/features/sandbox/components/sandbox-id-view";

export default async function SandboxIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SandboxIdView id={id} />;
}
