"use client";
import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicUpdatePasswordForm } from "@/features/user/forms/PublicUpdatePaswordForm";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!token || !refreshToken) {
    return <div>No token or refresh token</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 max-w-4xl mx-auto gap-4">
      <WelcomeHeader
        isResetPasswordPage
        auth={{ user: null, rider: null, instructor: null, stable: null }}
      />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Je modifie mon mot de passe</CardTitle>
        </CardHeader>
        <CardContent>
          <PublicUpdatePasswordForm token={token} refreshToken={refreshToken} />
        </CardContent>
      </Card>
    </div>
  );
}
