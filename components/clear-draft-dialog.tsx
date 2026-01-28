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
import Icon from "./icon";

export default function ClearDraftDialogContent() {
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
        <AlertDialogAction>Clear</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
