"use client";

import { defineRefreshToken, defineTokenCookie } from "@/lib/cookies";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

type GoogleConnectButtonProps = {
  start?: boolean;
};

export const GoogleConnectButton = ({ start }: GoogleConnectButtonProps) => {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const handleConnectWithGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const code = params.get("token");
      const refreshToken = params.get("refreshToken");
      if (code && refreshToken) {
        setIsLoading(true);
        console.log(code);
        await defineTokenCookie(code);
        await defineRefreshToken(refreshToken);
        window.location.href = "/app";
      }
    };
    fetchToken();
  }, [params]);

  return (
    <section className="flex justify-center items-center gap-2 py-4">
      <button
        onClick={handleConnectWithGoogle}
        className="bg-transparent border cursor-pointer border-gray-500 text-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-100 flex items-center gap-6 w-full justify-center transition-all duration-300"
      >
        <FcGoogle className="text-2xl" />{" "}
        {!isLoading && start
          ? "Commencer avec Google"
          : "Connexion avec Google"}
        {isLoading && <Loader2 className="text-2xl animate-spin" />}
      </button>
    </section>
  );
};
