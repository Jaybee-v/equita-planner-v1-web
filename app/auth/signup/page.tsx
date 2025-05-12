import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { UserForm } from "@/features/user/forms/UserForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const { user } = await isAuthenticated();

  if (user) {
    redirect("/app");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Je m&apos;inscris</CardTitle>
          <CardDescription>
            Créez votre compte pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            Je possède déjà un compte
          </p>
          <Link href="/auth/signin">
            <Button variant={"link"} className="">
              Je me connecte
            </Button>
          </Link>
          <Link href="/" className="mt-6">
            <Button variant={"outline"}>
              <ArrowLeft />
              Retour à l&apos;accueil
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
