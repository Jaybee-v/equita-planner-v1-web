"use client";
import { useState } from "react";
import { ImageUploader } from "./ImageUploader";

type UploadImagesProps = {
  logo: string;
  images: string[];
  stableId: string;
};

export const UploadImages = ({ logo, images, stableId }: UploadImagesProps) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(logo);
  const [presentationImages, setPresentationImages] =
    useState<string[]>(images);

  return (
    <div>
      <section>
        <h2>Logo du club</h2>

        <ImageUploader
          imageUri={logoUrl}
          index={0}
          setPresentationImages={setPresentationImages}
          setLogo={setLogoUrl}
          presentationImages={presentationImages}
          stableId={stableId}
        />
      </section>
      <section>
        <h2>Photos du club</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ImageUploader
              key={"images-" + i}
              imageUri={presentationImages[i] || null}
              index={i + 1}
              setPresentationImages={setPresentationImages}
              setLogo={setLogoUrl}
              presentationImages={presentationImages}
              stableId={stableId}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
