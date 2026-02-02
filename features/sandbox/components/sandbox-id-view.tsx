import SandboxHeader from "./sandbox-header";
import { Carousel } from "@/features/preview/components/preview-card";
import Tools from "./tools";
import { ToolsCarousel } from "./tools-carousel";

export default function SandboxIdView({ id }: { id: string }) {
  // filter id specific data from preset
  // then render components with that data in header and main area

  return (
    <div className="flex flex-col h-full bg-background">
      <SandboxHeader id={id} />

      <div className="flex-13">
        <div className="h-full p-3">
          <Carousel />
        </div>
      </div>

      <ToolsCarousel />
      <Tools />
    </div>
  );
}
