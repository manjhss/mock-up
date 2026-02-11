import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import {
	BackgroundIcon,
  BendToolIcon,
  Image01Icon,
  TextFontIcon,
} from "@hugeicons/core-free-icons";
import { IconSvgElement } from "@hugeicons/react";
import { useTools } from "@/store/tools";
import { ButtonGroup } from "@/components/ui/button-group";

export type ToolId = "background" | "font" | "border" | "shadow";

const TOOLS: {
  id: ToolId;
  icon: IconSvgElement;
}[] = [
	{ id: "background", icon: Image01Icon },
  { id: "font", icon: TextFontIcon },
  { id: "border", icon: BendToolIcon },
  { id: "shadow", icon: BackgroundIcon },
];

export default function Tools() {
  const { activeTool, setActiveTool } = useTools();

  return (
    <div className="flex p-3 items-center justify-center">
      <ButtonGroup className="bg-sidebar rounded-xl p-1">
        {TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;

          return (
            <Button
              key={tool.id}
              size="icon"
              variant={isActive ? "default" : "ghost"}
              onClick={() => setActiveTool(tool.id)}
              className={"rounded-md!"}
            >
              <Icon icon={tool.icon} />
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
