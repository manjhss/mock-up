import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowTurnForwardIcon } from "@hugeicons/core-free-icons";
import Icon from "../icon";
import { useUI } from "@/store/ui";
import { Button } from "../ui/button";
import { useMockUp } from "@/store/mockup";
import { preset } from "@/data/presets";

export default function ResetStyleDialog() {
  const { selectedMockUp, setSelectedMockUp, addOrUpdateUserMockup } = useMockUp();
  const isSeletedMockUpEmpty = Object.keys(selectedMockUp).length === 0;

  const { styleSidebarState: rightSidebarState } = useUI();
  const isCollapsed = rightSidebarState === "collapsed";

  const handleClear = () => {
    // Find the original preset by ID
    const originalPreset = preset.find((p) => p.id === selectedMockUp.id);

    if (!originalPreset) return;

    // Reset selectedMockUp to original styles
    const resetMockup = {
      ...selectedMockUp,
      slides: originalPreset.slides.map((originalSlide, idx) => ({
        ...selectedMockUp.slides[idx],
        style: originalSlide.style,
      })),
    };

    setSelectedMockUp(resetMockup);
    // Save the reset as a user edit
    addOrUpdateUserMockup(resetMockup);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={"default"}
          size={isCollapsed ? "icon-lg" : "lg"}
          className={"w-full"}
          disabled={isSeletedMockUpEmpty}
        >
          <Icon icon={ArrowTurnForwardIcon} /> {!isCollapsed && "Reset Style"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="default">
        <AlertDialogHeader className="flex flex-col">
          <AlertDialogMedia className="bg-primary/10 text-primary">
            <Icon icon={ArrowTurnForwardIcon} />
          </AlertDialogMedia>
          <AlertDialogTitle>Reset Style?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reset the current style? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClear}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
