import Icon from "@/components/icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "@hugeicons/core-free-icons";

export function User() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size={"icon"}>
          <Icon icon={UserIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm">Theme</span>
          <ModeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
