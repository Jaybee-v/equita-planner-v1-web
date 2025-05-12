"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

type StableImagesDisplayerProps = {
  images: string[];
  name: string;
};

export const StableImagesDisplayer = ({
  images: receivedImages,
  name,
}: StableImagesDisplayerProps) => {
  const [images, setImages] = useState<string[]>(receivedImages);

  if (images.length === 0) {
    return <p>Aucune image disponible</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((image, index) => {
        if (image !== "") {
          return (
            <Dialog key={"stable-image-dialog-" + image + index}>
              <DialogTrigger asChild>
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_URL + image}
                  alt={`Image ${index + 1} du club`}
                  width={100}
                  height={100}
                  className="cursor-pointer mx-auto"
                />
              </DialogTrigger>

              <DialogContent className="max-w-4xl w-full">
                <DialogHeader>
                  <DialogTitle>{`Image ${index + 1} - ${name}`}</DialogTitle>
                </DialogHeader>
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_URL + image}
                  alt={`Image ${index + 1} du club`}
                  width={900}
                  height={900}
                  className="mx-auto rounded-xl"
                />
              </DialogContent>
            </Dialog>
          );
        }
      })}
    </div>
  );
};
