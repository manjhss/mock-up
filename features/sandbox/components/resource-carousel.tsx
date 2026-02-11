import { useTools } from "@/store/tools";
import { useResource } from "@/store/resource";
import { Resources } from "@/zod/schema";

export function ResourceCarousel({ resources }: { resources: Resources }) {
  const { activeTool } = useTools();

  // Get resources based on active tool with proper defaults
  const backgroundResources = activeTool === "background" ? (resources.background || []) : [];
  const fontResources = activeTool === "font" ? (resources.font || []) : [];
  const borderResources = activeTool === "border" ? (resources.border || []) : [];
  const shadowResources = activeTool === "shadow" ? (resources.shadow || []) : [];

  const hasResources =
    (activeTool === "background" && backgroundResources.length > 0) ||
    (activeTool === "font" && fontResources.length > 0) ||
    (activeTool === "border" && borderResources.length > 0) ||
    (activeTool === "shadow" && shadowResources.length > 0);

  if (!hasResources) {
    return (
      <div className="flex-[1.6]">
        <div className="h-full px-3 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            No resources available for {activeTool}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-[1.6]">
      <div className="h-full px-3 flex items-center justify-center">
        <div className="p-1 h-full flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-md">
          {activeTool === "background" && backgroundResources.map((resource, index) => (
            <BackgroundItem key={index} resource={resource} index={index} />
          ))}
          {activeTool === "font" && fontResources.map((fontName, index) => (
            <FontItem key={index} resource={fontName} index={index} />
          ))}
          {activeTool === "border" && borderResources.map((borderStyle, index) => (
            <BorderItem key={index} resource={borderStyle} index={index} />
          ))}
          {activeTool === "shadow" && shadowResources.map((shadowStyle, index) => (
            <ShadowItem key={index} resource={shadowStyle} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Background resource item - displays image as background
function BackgroundItem({ resource, index }: { resource: string; index: number }) {
  const { getSelectedResourceId, setSelectedResource } = useResource();
  const resourceId = `background-${index}`;
  const isSelected = getSelectedResourceId("background") === resourceId;

  return (
    <div
      className={`h-full aspect-square bg-sidebar rounded-md shrink-0 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      }`}
      style={{
        backgroundImage: `url(${resource})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => setSelectedResource("background", resourceId)}
    />
  );
}

// Font resource item - displays font preview
function FontItem({ resource, index }: { resource: string; index: number }) {
  const { getSelectedResourceId, setSelectedResource } = useResource();
  const resourceId = `font-${index}`;
  const isSelected = getSelectedResourceId("font") === resourceId;

  return (
    <div
      className={`h-full aspect-square bg-sidebar rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      }`}
      onClick={() => setSelectedResource("font", resourceId)}
    >
      <span className="text-xl font-bold text-center" style={{ fontFamily: resource }}>
        Aa
      </span>
    </div>
  );
}

// Border resource item - displays border preview
function BorderItem({ resource, index }: { resource: string; index: number }) {
  const { getSelectedResourceId, setSelectedResource } = useResource();
  const resourceId = `border-${index}`;
  const isSelected = getSelectedResourceId("border") === resourceId;

  return (
    <div
      className={`h-full aspect-square bg-sidebar rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      }`}
      onClick={() => setSelectedResource("border", resourceId)}
    >
      <div className="w-full h-full border-4 rounded-md" style={{ borderStyle: resource }} />
    </div>
  );
}

// Shadow resource item - displays shadow preview
function ShadowItem({ resource, index }: { resource: string; index: number }) {
  const { getSelectedResourceId, setSelectedResource } = useResource();
  const resourceId = `shadow-${index}`;
  const isSelected = getSelectedResourceId("shadow") === resourceId;

  return (
    <div
      className={`h-full aspect-square bg-sidebar rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      }`}
      onClick={() => setSelectedResource("shadow", resourceId)}
    >
      <div className="w-3/4 h-3/4 bg-foreground rounded-md" style={{ boxShadow: resource }} />
    </div>
  );
}
