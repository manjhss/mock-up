import SlideText from "@/components/slide-text";
import SlideImage from "@/components/slide-image";
import Image from "next/image";
import { SlideProps } from "./top-to-bottom";

export function BottomToTop({
  data,
  style,
  slideId,
  readOnly = false,
}: SlideProps) {
  return (
    <div
      className="w-full h-full rounded-md flex flex-col items-center relative overflow-hidden @container-[size]"
      style={{ color: style.textColor }}
    >
      <Image
        src={style.backgroundImage!}
        alt="Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* flip the translate so mockup overflows top instead of bottom */}
      <div className="absolute -top-[14cqw] w-[90cqw] h-full flex flex-col items-center rounded-[1cqw] overflow-hidden">
        <SlideImage
          src={data.media}
          slideId={slideId}
          readOnly={readOnly}
          side="bottom"
        />
      </div>

      {/* text at bottom */}
      <div className="absolute bottom-0 text-center w-full max-w-[85cqw] my-[3cqw] z-10 shrink-0 space-y-[2cqw]">
        <SlideText
          variant="heading"
          style={{ fontFamily: style.fontFamily! }}
          slideId={slideId}
          field="heading"
          readOnly={readOnly}
          className="text-center"
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
    </div>
  );
}
