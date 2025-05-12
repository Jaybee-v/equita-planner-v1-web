import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import User from "@/types/User";
import { Lock } from "lucide-react";
import { UpdatePasswordForm } from "../forms/UpdatePasswordForm";

type UpdatePasswordCardProps = {
  user: User;
};

export const UpdatePasswordCard = ({ user }: UpdatePasswordCardProps) => {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="size-6" /> Modifier le mot de passe
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <UpdatePasswordForm user={user} />
      </CardContent>
    </Card>
  );
};
