import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { PriceCard } from "@/features/price/components/PriceCard";
import { CreatePriceForm } from "@/features/price/forms/CreatePriceForm";
import { AlertCircle, PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function StablePricesPage() {
  const { user, stable } = await isAuthenticated();

  if (!user || !stable) {
    redirect("/");
  }

  const prices = stable.prices;

  return (
    <div className="md:grid md:grid-cols-3 gap-4 space-y-2">
      <WelcomeHeader
        auth={{
          user,
          stable,
          instructor: null,
          rider: null,
        }}
        isPricePage={true}
      />
      <section className="col-span-2 bg-white rounded drop-shadow-2xl p-4 space-y-4 h-fit">
        <h1 className="text-2xl font-bold">Mes tarifs</h1>
        {prices.length > 0 ? (
          <section className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {prices.map((price) => (
              <PriceCard key={price.id} price={price} />
            ))}
          </section>
        ) : (
          <section className="h-40 flex items-center justify-center">
            <Alert className="w-fit">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                Vous n&apos;avez pas encore renseigné de tarif
              </AlertTitle>
              <AlertDescription>
                Veuillez renseigner un tarif pour pouvoir commencer à gérer vos
                activités équestres
              </AlertDescription>
            </Alert>
          </section>
        )}
      </section>
      <section className="bg-white rounded drop-shadow-2xl p-4 space-y-4 h-fit">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <PlusCircle />
          Je souhaite ajouter un tarif
        </h2>
        <CreatePriceForm stable={stable} />
      </section>
    </div>
  );
}
