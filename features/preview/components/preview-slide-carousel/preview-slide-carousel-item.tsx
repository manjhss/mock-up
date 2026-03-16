import { Slide, SlideComponent } from "@/zod/schema";
import { getComponentByName } from "@/lib/component-registry";
import { useMockup } from "@/store/mockup";
import { cn } from "@/lib/utils";
import { pacifico, ramaraja } from "@/data";
import { GeistPixelSquare } from "geist/font/pixel";

export default function PreviewSlideCarouselItem({
  slide,
  index,
  readOnly = false,
}: {
  slide: Slide;
  index?: number;
  readOnly?: boolean;
}) {
  const { tempMockUp, tempMockUpStyles } = useMockup();

  // Get temp data if exists
  const tempSlide = tempMockUp.slides?.[index as number];

  // Merge temp data with slide data, using temp only if not empty
  const slideData = {
    logo: tempSlide?.data?.logo?.trim() || slide.data.logo,
    heading: tempSlide?.data?.heading?.trim() || slide.data.heading,
    description: tempSlide?.data?.description?.trim() || slide.data.description,
    media: tempSlide?.data?.media?.trim() || slide.data.media,
  };

  const slideStyle = tempSlide?.style || tempMockUpStyles || {};

  // Get component - either from direct reference or by name (for persisted data)
  const Component = (slide.component ||
    getComponentByName(slide.componentName)) as SlideComponent;

  // Fallback if no component is available
  if (!Component) {
    return (
      <div className="slide-export-item h-full aspect-video bg-sidebar flex items-center justify-center rounded-md shrink-0">
        <span className="text-4xl font-semibold">{slideData.heading}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "slide-export-item h-full aspect-video shrink-0",
        GeistPixelSquare.variable,
        pacifico.variable,
        ramaraja.variable,
      )}
    >
      <Component
        data={slideData}
        style={slideStyle}
        slideId={tempSlide?.id || slide.id}
        readOnly={readOnly}
      />
    </div>
  );
}
