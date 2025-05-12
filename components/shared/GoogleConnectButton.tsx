"use client";

import { defineRefreshToken, defineTokenCookie } from "@/lib/cookies";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

export const GoogleConnectButton = () => {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const handleConnectWithGoogle = () => {
    window.location.href = "http://localhost:8787/auth/google/login";
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
        className="bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-100 flex items-center gap-6 w-full justify-center transition-all duration-300"
      >
        <FcGoogle className="text-2xl" />{" "}
        {isLoading ? "Connexion en cours..." : "Connexion avec Google"}
      </button>
    </section>
  );
};
