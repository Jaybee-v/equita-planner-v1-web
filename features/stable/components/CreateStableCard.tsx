import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StableForm } from "../forms/StableForm";

type CreateStableCardProps = {
  userId: string;
};

export const CreateStableCard = ({ userId }: CreateStableCardProps) => {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Bienvenue sur Equita-Planner</CardTitle>
        <CardDescription>
          Créez votre club pour commencer à planifier vos activités
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StableForm userId={userId} />
      </CardContent>
    </Card>
  );
};
