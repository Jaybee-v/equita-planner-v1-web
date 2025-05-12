import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiderForm } from "../forms/RiderForm";

type CreateRiderCardProps = {
  userId: string;
};

export const CreateRiderCard = ({ userId }: CreateRiderCardProps) => {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Bienvenue sur Equita-Planner</CardTitle>
        <CardDescription>
          Créez votre club pour commencer à planifier vos activités
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RiderForm userId={userId} creation={true} />
      </CardContent>
    </Card>
  );
};
