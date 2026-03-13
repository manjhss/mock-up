import SlideText from "@/components/slide-text";
import SlideImage from "@/components/slide-image";
import Image from "next/image";

import { SlideProps } from "./top-to-bottom";

export function RightToLeft({
  data,
  style,
  slideId,
  readOnly = false,
}: SlideProps) {
  return (
    <div
      className="w-full h-full rounded-md flex flex-row items-center relative overflow-hidden @container-[size]"
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
      <div className="absolute top-[6cqw] -left-[46cqw] w-full h-full flex flex-col justify-center rounded-[2cqw] overflow-hidden">
        <SlideImage
          src={data.media}
          slideId={slideId}
          readOnly={readOnly}
          side="right"
        />
      </div>

      {/* text right */}
      <div className="z-10 shrink-0 space-y-[1cqw] mr-[5cqw] ml-auto w-full max-w-[36cqw]">
        <SlideText
          variant="heading"
          style={{ fontFamily: style.fontFamily! }}
          slideId={slideId}
          field="heading"
          readOnly={readOnly}
          className="text-start"
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
