import { Slide, Style } from "@/zod/schema";
import Image from "next/image";

interface DefaultSlideProps {
  data: Slide["data"];
  style: Style;
}

export function DefaultSlide({ data, style }: DefaultSlideProps) {
  return (
    <div
      className="w-full h-full rounded-md flex flex-col items-center relative overflow-hidden select-none @container-[size]"
      style={{
        fontFamily: style.fontFamily,
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

      <div className="text-center max-w-[85cqw] mt-[4cqw] z-10 shrink-0 space-y-[1cqw]">
        <h1 className="text-[4.2cqw] font-serif font-medium tracking-tighter leading-[1.05]">
          {data.heading}
        </h1>

        <p className="text-[2.3cqw] font-sans opacity-85 font-normal tracking-tight leading-snug">
          {data.description}
        </p>
      </div>

      {/* Mockup Image Container */}
      <div className="relative w-[90cqw] flex-1 min-h-0 rounded-[2cqw] shadow-[0_4cqw_8cqw_-2cqw_rgba(0,0,0,0.3)] overflow-hidden translate-y-[3cqw]">
        <Image
          src={data.media}
          alt="Mockup Preview"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
    </div>
  );
}
