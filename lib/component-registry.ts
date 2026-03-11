import { DefaultSlide } from "@/data/mockup/default/template/default-slide";
import { SlideComponent } from "@/zod/schema";

// Registry of available slide components
export const componentRegistry: Record<string, SlideComponent> = {
  DefaultSlide: DefaultSlide,
  // Add more components here as needed
};

// Get component by name, returns undefined if not found
export function getComponentByName(name?: string): SlideComponent | undefined {
  if (!name) return undefined;
  return componentRegistry[name];
}

// Get component name from component reference
export function getComponentName(component: any): string | undefined {
  if (!component) return undefined;

  // Find the component in the registry by reference
  for (const [name, comp] of Object.entries(componentRegistry)) {
    if (comp === component) {
      return name;
    }
  }

  return undefined;
}
