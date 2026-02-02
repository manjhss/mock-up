"use client";

import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  ArrowLeft02Icon,
  Download01Icon,
  FullScreenIcon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

export default function SandboxHeader({ id }: { id: string }) {
  const router = useRouter();

  return (
    <header className="bg-sidebar p-2 flex gap-2 items-center justify-between border-b border-sidebar-border">
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
          <Icon icon={ArrowLeft02Icon} />
        </Button>

        <CardTitle>{id}</CardTitle>
      </div>

      <div className="flex gap-1">
        <Button variant={"ghost"} size={"icon"}>
          <Icon icon={FullScreenIcon} />
        </Button>

        <Button variant={"ghost"} size={"icon"}>
          <Icon icon={Download01Icon} />
        </Button>
      </div>
    </header>
  );
}
