import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type StableImagesCarouselProps = {
  images: string[];
};

export const StableImagesCarousel = ({ images }: StableImagesCarouselProps) => {
  if (images.length === 0) {
    return (
      <section className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground text-sm italic p-4">
          Aucune photo disponible
        </p>
      </section>
    );
  }

  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_URL + image}
              alt={`Image ${index + 1}`}
              width={800}
              height={800}
              priority
              className="w-full max-h-[400px] object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
      <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
    </Carousel>
  );
};
