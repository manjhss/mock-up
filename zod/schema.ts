import { z } from "zod";

// ============================================================================
// Basic Building Blocks
// ============================================================================

/**
 * Style schema - optional styling properties for elements
 */
export const StyleSchema = z
  .object({
    backgroundImage: z
      .string()
      .url()
      .optional()
      .describe("Background image URL"),
    fontFamily: z.string().optional().describe("Font family for text elements"),
    borderStyle: z
      .string()
      .optional()
      .describe("Border style (e.g., 'solid', 'dashed')"),
    shadowStyle: z
      .string()
      .optional()
      .describe("Shadow style (e.g., '2px 2px 5px rgba(0,0,0,0.3)')"),
  })
  .strict();

// ============================================================================
// Slide Schema
// ============================================================================

/**
 * Slide schema - represents a single presentation slide
 */
export const SlideSchema = z
  .object({
    id: z.string().min(1).describe("Unique identifier for the slide"),
    componentName: z
      .string()
      .optional()
      .describe("Component identifier for persistence"),
    component: z
      .any()
      .optional()
      .describe("Component reference for rendering the slide"),
    data: z.object({
      logo: z.string().url().describe("Logo image URL"),
      heading: z.string().max(200).describe("Slide heading/title"),
      description: z
        .string()
        .max(1000)
        .describe("Slide description or content"),
      media: z.string().url().describe("Valid image URL"),
    }),
    style: StyleSchema.optional().describe("Styles for the slide"),
  })
  .strict();

/**
 * Slides collection schema - array of Slide objects
 */
export const SlidesSchema = z
  .array(SlideSchema)
  .min(1)
  .describe("Collection of slides (must have at least one)");

// ============================================================================
// Resources Schema
// ============================================================================

/**
 * Resources schema - represents available resources for the mockup
 */
export const ResourcesSchema = z
  .object({
    background: z
      .array(z.string().url().describe("Valid image URL"))
      .default([])
      .describe("Background images available for the slide"),
    font: z
      .array(z.string().min(1))
      .default([])
      .describe("Font options available for text elements"),
    border: z
      .array(z.string().min(1))
      .default([])
      .describe("Border styles available for elements"),
    shadow: z
      .array(z.string().min(1))
      .default([])
      .describe("Shadow styles available for elements"),
  })
  .strict();

// ============================================================================
// Preset Schema
// ============================================================================

/**
 * Preset schema - represents a saved presentation template
 */
export const MockUpSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .optional()
      .describe("Unique identifier for the preset"),
    nickname: z
      .string()
      .min(1)
      .max(50)
      .optional()
      .describe("Short nickname for the preset"),
    name: z
      .string()
      .min(1)
      .max(100)
      .optional()
      .describe("Human-readable preset name"),
    slides: SlidesSchema.describe("Collection of slides in this preset"),
    resources: ResourcesSchema.optional().describe(
      "Available resources for the mockup",
    ),
    tags: z
      .array(z.string().min(1))
      .default([])
      .optional()
      .describe("Tags for the preset"),
  })
  .strict();

/**
 * Presets collection schema - array of Preset objects
 */
export const MockUpsSchema = z
  .array(MockUpSchema)
  .describe("Collection of presentation presets");

// ============================================================================
// Type Exports (inferred from schemas)
// ============================================================================

export type Style = z.infer<typeof StyleSchema>;
export type Slide = z.infer<typeof SlideSchema>;
export type Slides = z.infer<typeof SlidesSchema>;
export type Resources = z.infer<typeof ResourcesSchema>;
export type MockUp = z.infer<typeof MockUpSchema>;
export type MockUps = z.infer<typeof MockUpsSchema>;
export type SlideComponent = React.ComponentType<{
  data: Slide["data"];
  style: Style;
}>;
