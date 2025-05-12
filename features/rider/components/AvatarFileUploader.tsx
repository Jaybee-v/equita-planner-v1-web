"use client";

import { useState } from "react";
import { AvatarUploader } from "./AvatarUploader";

type AvatarFileUploaderProps = {
  riderId: string;
  image: string | null;
};

export const AvatarFileUploader = ({
  riderId,
  image,
}: AvatarFileUploaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(image);
  return (
    <div>
      <section>
        <h2>Photo / image</h2>
        <AvatarUploader
          imageUri={avatarUrl}
          setAvatar={setAvatarUrl}
          riderId={riderId}
        />
      </section>
    </div>
  );
};
