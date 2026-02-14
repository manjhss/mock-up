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
import { CleanIcon } from "@hugeicons/core-free-icons";
import Icon from "../icon";
import { useMockUp } from "@/store/mockup";
import { useUI } from "@/store/ui";
import { Button } from "../ui/button";

export default function ClearDraftDialog() {
  const { clearTempMockUp } = useMockUp();
  const { slideSidebarState, setExpandedSlides } = useUI();
  const isCollapsed = slideSidebarState === "collapsed";

  const handleClear = () => {
    clearTempMockUp();
    setExpandedSlides(new Set(["slide1"]));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={"destructive"}
          size={isCollapsed ? "icon-lg" : "lg"}
          className={"w-full"}
        >
          <Icon icon={CleanIcon} /> {!isCollapsed && "Clear Draft"}
        </Button>
      </AlertDialogTrigger>
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
    </AlertDialog>
  );
}
