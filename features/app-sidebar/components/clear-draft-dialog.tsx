import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CleanIcon } from "@hugeicons/core-free-icons";
import Icon from "../../../components/icon";
import { useMockUp } from "@/store/mock-up";
import { useUI } from "@/store/ui";

export default function ClearDraftDialogContent() {
  const { clearTempMockUp } = useMockUp();
  const { setExpandedSlides } = useUI();

  const handleClear = () => {
    clearTempMockUp();
    setExpandedSlides(new Set([0]));
  };

  return (
    <AlertDialogContent size="default">
      <AlertDialogHeader className="flex flex-col">
        <AlertDialogMedia className="bg-destructive/10 text-destructive">
          <Icon icon={CleanIcon} />
        </AlertDialogMedia>
        <AlertDialogTitle>Clear Draft?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to clear the current draft? This action cannot
          be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleClear}>Clear</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
