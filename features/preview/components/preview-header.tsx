import Icon from "@/components/icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Search01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { User } from "./user";
import { useUI } from "@/store/ui";

export default function PreviewHeader() {
  const { searchQuery, setSearchQuery } = useUI();

  return (
    <header className="sticky top-0 z-10 bg-sidebar p-2 flex gap-2 items-center justify-between border-b border-sidebar-border">
      <Image src={"/vercel.svg"} alt="Logo" width={32} height={32} />

      <InputGroup className="max-w-lg">
        <InputGroupInput
          placeholder="Search by name, nickname or tags"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroupAddon>
          <Icon icon={Search01Icon} />
        </InputGroupAddon>
      </InputGroup>

      <User />
    </header>
  );
}
