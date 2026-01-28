import { ComponentExample } from "@/components/component-example";
import Header from "./header";
import { Separator } from "@/components/ui/separator";

export default function PreviewView() {
  return (
    <>
      <Header />
      <ComponentExample />
      <Separator />
    </>
  );
}
