import Icon from "@/components/icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Search01Icon } from "@hugeicons/core-free-icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-sidebar p-2 flex items-center justify-center border-b border-sidebar-border">
      <InputGroup className="max-w-lg">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Icon icon={Search01Icon} />
        </InputGroupAddon>
      </InputGroup>
    </header>
  );
}
