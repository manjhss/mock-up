import Icon from "@/components/icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Search01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { User } from "./user";

export default function PreviewHeader() {
  return (
    <header className="sticky top-0 z-10 bg-sidebar p-2 flex gap-2 items-center justify-between border-b border-sidebar-border">
      <Image src={"/vercel.svg"} alt="Logo" width={32} height={32} />

      <InputGroup className="max-w-lg">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Icon icon={Search01Icon} />
        </InputGroupAddon>
      </InputGroup>

      <User />
    </header>
  );
}
