"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  ComputerIcon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { ButtonGroup } from "./ui/button-group";
import Icon from "./icon";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup className="border rounded-lg">
      <Button
        size="icon-sm"
        variant={theme === "system" ? "secondary" : "ghost"}
        onClick={() => setTheme("system")}
      >
        <Icon icon={ComputerIcon} />
      </Button>
      <Button
        size="icon-sm"
        variant={theme === "light" ? "secondary" : "ghost"}
        onClick={() => setTheme("light")}
      >
        <Icon icon={Sun03Icon} />
      </Button>
      <Button
        size="icon-sm"
        variant={theme === "dark" ? "secondary" : "ghost"}
        onClick={() => setTheme("dark")}
      >
        <Icon icon={Moon02Icon} />
      </Button>
    </ButtonGroup>
  );
}
