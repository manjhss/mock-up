import Icon from "@/components/icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderLibraryIcon, UserIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export function User() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size={"icon"}>
          <Icon icon={UserIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <Link href="/drafts">
            <DropdownMenuItem>
              <Icon icon={FolderLibraryIcon} />
              Drafts
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm">Theme</span>
          <ModeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
