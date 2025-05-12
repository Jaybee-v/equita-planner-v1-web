import { GoogleConnectButton } from "@/components/shared/GoogleConnectButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SigninForm from "@/features/auth/forms/SigninForm";
import Link from "next/link";
export default function SigninPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Bienvenue</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleConnectButton />
          <section className="grid grid-cols-3">
            <article className="flex flex-col gap-2 items-center justify-center">
              <Separator className="w-1/2" />
              <Separator className="w-1/2" />
            </article>
            <article className="flex items-center justify-center">
              <p className="text-muted-foreground">ou</p>
            </article>
            <article className="flex flex-col gap-2 items-center justify-center">
              <Separator className="w-1/2" />
              <Separator className="w-1/2" />
            </article>
          </section>
          <SigninForm />
        </CardContent>
        <CardFooter className="border-t border-border flex  justify-center">
          <Link href="/auth/signup">
            <Button variant={"link"}>
              Pas encore de compte ? Créer un compte
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
