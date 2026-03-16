import SlideText from "@/components/slide-text";
import SlideImage from "@/components/slide-image";
import Image from "next/image";

import { SlideProps } from "./top-to-bottom";
import { cn } from "@/lib/utils";

export function RightToLeft({
  data,
  style,
  slideId,
  readOnly = false,
}: SlideProps) {
  return (
    <div
      className="w-full h-full rounded-md border flex flex-row items-center relative overflow-hidden @container-[size]"
      style={{ color: style.textColor }}
    >
      <Image
        src={style.backgroundImage!}
        alt="Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* image left */}
      <div className={cn("absolute top-[5cqw] -left-[52cqw] w-full h-full flex flex-col justify-center rounded-[1cqw] overflow-hidden", style.borderStyle)}>
        <SlideImage
          src={data.media}
          slideId={slideId}
          readOnly={readOnly}
          side="left"
        />
      </div>

      {/* text right */}
      <div className="z-10 shrink-0 space-y-[1cqw] mr-[6cqw] ml-auto w-full max-w-[42cqw]">
        <SlideText
          variant="heading"
          slideId={slideId}
          field="heading"
          readOnly={readOnly}
          className={cn("text-start", style.fontFamily)}
        >
          {data.heading}
        </SlideText>
        <SlideText
          variant="description"
          slideId={slideId}
          field="description"
          readOnly={readOnly}
          className="text-start"
        >
          {data.description}
        </SlideText>
      </div>
    </div>
  );
}
