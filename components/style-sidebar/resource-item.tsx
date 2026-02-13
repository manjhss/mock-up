import { useMockUp } from "@/store/mockup";

interface ResourceItemProps {
  resource: string;
}

// Background resource item - displays image as background
export function BackgroundItem({ resource }: ResourceItemProps) {
  const { selectedMockUp, setSelectedMockUp, addOrUpdateUserMockup } =
    useMockUp();
  const isSelected =
    selectedMockUp.slides[0].style?.backgroundImage === resource;

  return (
    <div
      className={`h-full aspect-video bg-input rounded-md shrink-0 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      style={{
        backgroundImage: `url(${resource})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => {
        // Update selected mockup background for all slides
        const updatedMockup = {
          ...selectedMockUp,
          slides: selectedMockUp.slides.map((slide) => ({
            ...slide,
            style: {
              ...slide.style,
              backgroundImage: resource,
            },
          })),
        };

        setSelectedMockUp(updatedMockup);
        // Save user's edit
        addOrUpdateUserMockup(updatedMockup);
      }}
    />
  );
}

// Font resource item - displays font preview
export function FontItem({ resource }: ResourceItemProps) {
  const { selectedMockUp, setSelectedMockUp, addOrUpdateUserMockup } =
    useMockUp();
  const isSelected = selectedMockUp.slides[0].style?.fontFamily === resource;

  return (
    <div
      className={`h-full aspect-square bg-input rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      onClick={() => {
        // Update selected mockup font for all slides
        const updatedMockup = {
          ...selectedMockUp,
          slides: selectedMockUp.slides.map((slide) => ({
            ...slide,
            style: {
              ...slide.style,
              fontFamily: resource,
            },
          })),
        };

        setSelectedMockUp(updatedMockup);
        // Save user's edit
        addOrUpdateUserMockup(updatedMockup);
      }}
    >
      <span
        className="text-xl font-bold text-center"
        style={{ fontFamily: resource }}
      >
        A
      </span>
    </div>
  );
}

// Border resource item - displays border preview
export function BorderItem({ resource }: ResourceItemProps) {
  const { selectedMockUp, setSelectedMockUp, addOrUpdateUserMockup } =
    useMockUp();
  const isSelected = selectedMockUp.slides[0].style?.borderStyle === resource;

  return (
    <div
      className={`h-full aspect-square bg-input rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      onClick={() => {
        // Update selected mockup border for all slides
        const updatedMockup = {
          ...selectedMockUp,
          slides: selectedMockUp.slides.map((slide) => ({
            ...slide,
            style: {
              ...slide.style,
              borderStyle: resource,
            },
          })),
        };

        setSelectedMockUp(updatedMockup);
        // Save user's edit
        addOrUpdateUserMockup(updatedMockup);
      }}
    >
      <div
        className="w-full h-full border-4 rounded-md"
        style={{ borderStyle: resource }}
      />
    </div>
  );
}

// Shadow resource item - displays shadow preview
export function ShadowItem({ resource }: ResourceItemProps) {
  const { selectedMockUp, setSelectedMockUp, addOrUpdateUserMockup } =
    useMockUp();
  const isSelected = selectedMockUp.slides[0].style?.shadowStyle === resource;

  return (
    <div
      className={`h-full aspect-square bg-input rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      onClick={() => {
        // Update selected mockup shadow for all slides
        const updatedMockup = {
          ...selectedMockUp,
          slides: selectedMockUp.slides.map((slide) => ({
            ...slide,
            style: {
              ...slide.style,
              shadowStyle: resource,
            },
          })),
        };

        setSelectedMockUp(updatedMockup);
        // Save user's edit
        addOrUpdateUserMockup(updatedMockup);
      }}
    >
      <div
        className="w-3/4 h-3/4 bg-foreground rounded-md"
        style={{ boxShadow: resource }}
      />
    </div>
  );
}
