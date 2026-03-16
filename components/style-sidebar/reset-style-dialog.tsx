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
import { useMockup } from "@/store/mockup";

export default function ResetStyleDialog() {
  const {  clearTempMockUpStyles } = useMockup();

  const { styleSidebarState: rightSidebarState } = useUI();
  const isCollapsed = rightSidebarState === "collapsed";

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={"default"}
          size={isCollapsed ? "icon-lg" : "lg"}
          className={"w-full"}
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
          <AlertDialogAction onClick={clearTempMockUpStyles}>
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
