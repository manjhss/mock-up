import { useRef } from "react";
import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download01Icon,
  FullScreenIcon,
  Cancel01Icon,
  PaintBrush02Icon,
} from "@hugeicons/core-free-icons";
import { MockUp } from "@/zod/schema";
import { useMockUp } from "@/store/mockup";
import { PreviewSlideCarousel } from "@/features/preview/components/preview-slide-carousel";
import { useUI } from "@/store/ui";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { exportSlides } from "@/lib/export-slides";

export default function PreviewCard({ mockup }: { mockup: MockUp }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { selectedMockUp, setSelectedMockUp } = useMockUp();
  const { setStyleSidebarOpen } = useUI();

  const isSelected = selectedMockUp.id === mockup.id;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setSelectedMockUp({} as MockUp); // Deselect mockup
    setStyleSidebarOpen(false); // Close style sidebar
  };

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current) return;

    const slideElements = cardRef.current.querySelectorAll<HTMLElement>(
      ".slide-export-item"
    );
    if (slideElements.length > 0) {
      exportSlides(Array.from(slideElements));
    }
  };

  return (
    <Card
      ref={cardRef}
      className={cn(
        "pt-2.5 pb-0 gap-3",
        isSelected &&
          "ring-1 ring-primary ring-offset-2 ring-offset-background",
      )}
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{mockup.name}</CardTitle>
        <CardAction className="flex gap-1">
          {isSelected ? (
            <Button variant={"outline"} onClick={handleClose}>
              <Icon icon={Cancel01Icon} />
              Close
            </Button>
          ) : (
            <Button
              onClick={() => {
                setSelectedMockUp(mockup);
                setStyleSidebarOpen(true);
              }}
            >
              <Icon icon={PaintBrush02Icon} />
              Edit
            </Button>
          )}

          <ButtonGroup>
            <Dialog>
              <DialogTrigger>
                <Button size="icon" variant={"ghost"} className={"rounded-md!"}>
                  <Icon icon={FullScreenIcon} />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[80vw]! h-[80vh] aspect-video p-3 flex flex-col overflow-hidden gap-0">
                <DialogHeader className="py-2">
                  <DialogTitle>Full Screen Preview</DialogTitle>
                </DialogHeader>
                <div className="flex-1 pt-2">
                  <PreviewSlideCarousel slides={mockup.slides} />
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="icon"
              variant={"ghost"}
              className={"rounded-md!"}
              onClick={handleExport}
            >
              <Icon icon={Download01Icon} />
            </Button>
          </ButtonGroup>
        </CardAction>
      </CardHeader>

      <CardContent className="bg-background h-80 p-3">
        <PreviewSlideCarousel slides={mockup.slides} />
      </CardContent>
    </Card>
  );
}
