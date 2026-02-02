import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import {
	BackgroundIcon,
  BendToolIcon,
  Image01Icon,
  TextFontIcon,
} from "@hugeicons/core-free-icons";
import { IconSvgElement } from "@hugeicons/react";

const TOOLS: {
  id: string;
  icon: IconSvgElement;
}[] = [
	{ id: "background", icon: Image01Icon },
  { id: "font", icon: TextFontIcon },
  { id: "border", icon: BendToolIcon },
  { id: "shadow", icon: BackgroundIcon },
];

export default function Tools() {
  return (
    <div className="flex p-3 items-center justify-center">
      <div className="h-fit bg-sidebar rounded-xl p-1">
        {TOOLS.map((tool) => {
          const isActive = "font" === tool.id;

          return (
            <Button
              key={tool.id}
              size="icon"
              variant={isActive ? "default" : "ghost"}
            >
              <Icon icon={tool.icon} />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
