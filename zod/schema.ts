import { z } from "zod";

// ============================================================================
// Basic Building Blocks
// ============================================================================

/**
 * Position schema - represents x,y coordinates
 */
export const PositionSchema = z.object({
  x: z.number().describe("Horizontal position coordinate"),
  y: z.number().describe("Vertical position coordinate"),
});

/**
 * Size schema - represents width and height dimensions
 */
export const SizeSchema = z.object({
  width: z.number().positive().describe("Width dimension (must be positive)"),
  height: z.number().positive().describe("Height dimension (must be positive)"),
});

/**
 * Style schema - optional styling properties for elements
 */
export const StyleSchema = z
  .object({
    // add more styles as needed - font, shadow, etc
    position: PositionSchema.optional().describe("Element positioning"),
    size: SizeSchema.optional().describe("Element dimensions"),
  })
  .strict();

// ============================================================================
// Image Schema
// ============================================================================

/**
 * Image schema - represents an image with metadata and styling
 */
export const ImageSchema = z
  .object({
    id: z.string().min(1).describe("Unique identifier for the image"),
    url: z.string().url().describe("Valid image URL"),
    alt: z.string().optional().describe("Alternative text for accessibility"),
    style: StyleSchema.optional().describe("Image styling options"),
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
    logo: z.object({
      content: z.string().url().optional().describe("Logo image URL"),
      style: StyleSchema.optional().describe("Logo styling options"),
    }),
    heading: z.object({
      content: z
        .string()
        .min(1)
        .max(200)
        .optional()
        .describe("Slide heading/title"),
      style: StyleSchema.optional().describe("Heading text styling"),
    }),
    description: z.object({
      content: z
        .string()
        .max(1000)
        .optional()
        .describe("Slide description or content"),
      style: StyleSchema.optional().describe("Description text styling"),
    }),
    image: ImageSchema.optional().describe("Image on the slide"),
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
// Preset Schema
// ============================================================================

/**
 * Preset schema - represents a saved presentation template
 */
export const MockUpSchema = z
  .object({
    id: z.string().min(1).describe("Unique identifier for the preset"),
    nickname: z
      .string()
      .min(1)
      .max(50)
      .describe("Short nickname for the preset"),
    name: z.string().min(1).max(100).describe("Human-readable preset name"),
    slides: SlidesSchema.describe("Collection of slides in this preset"),
    resources: z.object({
      background: z
        .array(ImageSchema)
        .default([])
        .describe("Background image on the slide"),
    }),
    tags: z
      .array(z.string().min(1))
      .default([])
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

export type Position = z.infer<typeof PositionSchema>;
export type Size = z.infer<typeof SizeSchema>;
export type Style = z.infer<typeof StyleSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Slide = z.infer<typeof SlideSchema>;
export type Slides = z.infer<typeof SlidesSchema>;
export type MockUp = z.infer<typeof MockUpSchema>;
export type MockUps = z.infer<typeof MockUpsSchema>;
