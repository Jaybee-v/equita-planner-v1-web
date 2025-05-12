"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant={"outline"}>
      <ArrowLeft />
      <span>Retour</span>
    </Button>
  );
};
