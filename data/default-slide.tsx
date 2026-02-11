import { Style } from "@/zod/schema";

interface DefaultSlideProps {
  data: {
    logo: string;
    heading: string;
    description: string;
    media: string;
  };
  style: Style;
}

export function DefaultSlide({ data, style }: DefaultSlideProps) {
  return (
    <div
      className="relative h-full aspect-video rounded-md shrink-0 overflow-hidden"
      style={{
        backgroundImage: style.backgroundImage
          ? `url(${style.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
}
