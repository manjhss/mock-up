import SlideText from "@/components/slide-text";
import SlideImage from "@/components/slide-image";
import { Slide, Style } from "@/zod/schema";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SlideProps {
  data: Slide["data"];
  style: Style;
  slideId?: string;
  readOnly?: boolean;
}

export function TopToBottom({
  data,
  style,
  slideId,
  readOnly = false,
}: SlideProps) {
  return (
    <div
      className="w-full h-full rounded-md border flex flex-col items-center relative overflow-hidden @container-[size]"
      style={{
        color: style.textColor,
      }}
    >
      <Image
        src={style.backgroundImage!}
        alt="Background"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="text-center w-full max-w-[85cqw] mt-[3cqw] z-10 shrink-0 space-y-[1cqw]">
        <SlideText
          variant="heading"
          slideId={slideId}
          field="heading"
          readOnly={readOnly}
          className={cn("text-center", style.fontFamily)}
        >
          {data.heading}
        </SlideText>

        <SlideText
          variant="description"
          slideId={slideId}
          field="description"
          readOnly={readOnly}
          className="text-center"
        >
          {data.description}
        </SlideText>
      </div>

      {/* Slide Image Container */}
      <div className={cn("absolute top-[13cqw] w-[90cqw] h-full flex flex-col items-center rounded-[1cqw] overflow-hidden", style.borderStyle)}>
        <SlideImage
          src={data.media}
          slideId={slideId}
          readOnly={readOnly}
          side="top"
        />
      </div>
    </div>
  );
}
