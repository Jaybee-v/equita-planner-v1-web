"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Props = {
  imageUri: string | null;
  setAvatar: (avatar: string | null) => void;
  riderId: string;
};

export const AvatarUploader = ({ imageUri, setAvatar, riderId }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const uploadImageToBackend = async (file: File): Promise<string | null> => {
    setUploadLoading(true);
    const formData = new FormData();
    const formDataFileName = "avatar";

    formData.append(formDataFileName, file);
    formData.append("riderId", riderId);
    formData.append("fileName", formDataFileName);

    try {
      // const res = await uploadImage(formData);
      // console.log("res", res);
      // setAvatar(res.url);
      // setUploadLoading(false);
      // return res.url; // À adapter selon ta réponse backend
      return null;
    } catch (err) {
      console.error("Erreur d'upload :", err);
      setUploadLoading(false);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("FILE ===>", file);
    const uploadedUrl = await uploadImageToBackend(file);
    if (!uploadedUrl) return;

    setAvatar(uploadedUrl);
  };

  return (
    <div
      className="relative w-24 h-24 md:w-32 md:h-32 rounded overflow-hidden border cursor-pointer bg-gray-100 flex items-center justify-center"
      onClick={() => fileInputRef.current?.click()}
    >
      {uploadLoading ? (
        <Loader2 className="animate-spin" size={28} color="white" />
      ) : imageUri ? (
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_URL + imageUri}
          alt="Uploaded"
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FaCamera size={28} />
          <span className="text-xs mt-1">Ajouter</span>
        </div>
      )}

      {imageUri && (
        <button
          onClick={async (e) => {
            e.stopPropagation();

            setAvatar(null);
          }}
          className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer hover:scale-110 transition-all duration-300"
        >
          {deleteLoading ? (
            <Loader2 className="animate-spin" size={18} color="white" />
          ) : (
            <MdDelete size={18} color="white" />
          )}
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
