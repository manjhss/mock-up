import SlideText from "@/components/slide-text";
import SlideImage from "@/components/slide-image";
import { Slide, Style } from "@/zod/schema";
import Image from "next/image";

interface DefaultSlideProps {
  data: Slide["data"];
  style: Style;
  slideId?: string;
  readOnly?: boolean;
}

export function DefaultSlide({
  data,
  style,
  slideId,
  readOnly = false,
}: DefaultSlideProps) {
  return (
    <div
      className="w-full h-full rounded-md flex flex-col items-center relative overflow-hidden @container-[size]"
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

      <div className="text-center max-w-[85cqw] mt-[3cqw] z-10 shrink-0 space-y-[1cqw]">
        <SlideText
          variant="heading"
          style={{ fontFamily: style.fontFamily! }}
          slideId={slideId}
          field="heading"
          readOnly={readOnly}
        >
          {data.heading}
        </SlideText>

        <SlideText
          variant="description"
          slideId={slideId}
          field="description"
          readOnly={readOnly}
        >
          {data.description}
        </SlideText>
      </div>

      {/* Slide Image Container */}
      <SlideImage
        src={data.media}
        style={style}
        slideId={slideId}
        readOnly={readOnly}
      />
    </div>
  );
}
