import { Logo } from "@/components/shared/Logo";
import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Home, Mail } from "lucide-react";
import Link from "next/link";
export default function SigninSuccesPage() {
  return (
    <div className="min-h-screen p-2 space-y-2 md:space-y-8 pb-20 sm:pt-24 w-full max-w-2xl mx-auto">
      <WelcomeHeader
        isSuccessSignin={true}
        auth={{
          user: null,
          instructor: null,
          rider: null,
          stable: null,
        }}
      />
      <section className="flex justify-center items-center py-4">
        <Logo size={100} />
      </section>
      <Card className="bg-green-100 border-green-600 border-2">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-green-600 flex items-center gap-2">
            <CheckCircle size={20} />
            Inscription confirmée
          </CardTitle>
          <CardDescription>
            Encore une étape : vérifiez votre adresse email pour activer votre
            compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Mail size={20} />
            <AlertTitle>Vous avez un email</AlertTitle>
            <AlertDescription>
              Un email de confirmation vient de vous être envoyé*. <br />{" "}
              Cliquez sur le lien contenu dans cet email pour finaliser
              l’activation de votre compte.
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground italic">
            *Si vous ne trouvez pas l&apos;email, vérifiez votre dossier spam.
          </p>
          <Link href="/">
            <Button variant={"link"} className="w-full">
              <Home size={20} />
              Page d&apos;accueil
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
