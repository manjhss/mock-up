export function ToolsCarousel() {
  const totalSlides = 6;

  return (
    <div className="flex-2">
      <div className="h-full px-3 flex items-center justify-center">
        <div className="h-full flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-md">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <CarouselItem key={index} item={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselItem({ item }: { item: number }) {
  return (
    <div className="h-full aspect-square bg-sidebar flex items-center justify-center rounded-md shrink-0">
      <span className="text-4xl font-semibold"></span>
    </div>
  );
}
