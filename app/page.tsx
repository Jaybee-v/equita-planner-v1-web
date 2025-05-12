import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { PreRegistrationForm } from "@/features/pre-registration/forms/PreRegistrationForm";
import { subtitle, title } from "@/styles/title.primitive";
import { ArrowRight, Bell, Calendar, Ticket } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await isAuthenticated();

  if (user) {
    redirect("/app");
  }
  return (
    <section className="flex flex-col items-center justify-center pb-20 md:pt-20">
      {/* <TopDesign /> */}
      <div className="relative w-full flex flex-col-reverse gap-4 max-lg:py-8 lg:h-[650px] lg:grid lg:grid-cols-2 bg-gradient-to-br from-primary/80 to-primary">
        {/* <section className="absolute inset-0 z-0"> */}
        {/* <Image */}
        {/* // src="/images/horse-riding.jpg" */}
        {/* // alt="Équitation" */}
        {/* // fill */}
        {/* // className="w-full h-full object-cover opacity-60 z-0 brightness-150" */}
        {/* // /> */}
        {/* </section> */}
        <section className="flex flex-col justify-center w-full px-6 xl:ps-24 xl:pe-6 gap-2">
          <span className={`${title({ color: "white", weight: "black" })} `}>
            Simplifiez la gestion équestre.
          </span>
          <br />
          <span className={`${title({ weight: "semibold" })}`}>
            Offrez une expérience moderne à vos cavaliers.
          </span>
          <div
            className={`${subtitle({
              color: "white",
            })}  tracking-wide rounded-lg text-white py-4`}
          >
            <span>Equita-Planner</span> permet aux centres équestres et leurs
            cavaliers de gérer / visualiser le planning en ligne, la réservation
            d’activités... tout devient simple, rapide et connecté.
          </div>
          <div className="flex">
            <Link href="/auth/signup">
              <Button variant={"secondary"} className="gap-6 !px-12">
                <span className="font-semibold text-lg">Créer mon compte</span>
                <ArrowRight size={24} />
              </Button>
            </Link>
          </div>
        </section>
        <section className=" flex-col items-center justify-center flex lg:hidden">
          <Logo size={200} />
          <span className="text-white text-2xl font-bold">Equita-Planner</span>
        </section>
        <section className=" flex-col items-center justify-center hidden lg:flex">
          <Logo size={500} />
        </section>
      </div>
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Un planning en ligne. Des réservations simplifiées.
          </h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                📆 Trop de messages <br /> pour une simple inscription ?
              </h3>
              <p className="text-gray-600">
                Cavaliers qui demandent par SMS, parents qui oublient,
                changements de dernière minute... vous passez plus de temps à
                gérer qu&apos;à enseigner.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                ✅ Equita-Planner <br /> vous fait gagner du temps
              </h3>
              <p className="text-gray-600">
                Publiez votre planning en ligne. Vos cavaliers réservent en
                quelques clics. Vous restez maître de vos créneaux, sans gérer
                chaque message à la main.
              </p>
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            <article className="bg-primary/10 rounded-lg p-4 shadow-xl">
              <section className="bg-white rounded-full p-2 w-fit">
                <Ticket />
              </section>
              <h3 className="text-lg font-black tracking-wide text-left">
                Réservation simplifiée
              </h3>
              <p className="text-left mt-4">
                Réserver vos cours en quelques clics et suivez vos demandes
              </p>
            </article>
            <article className="bg-primary/10 rounded-lg p-4 shadow-xl">
              <section className="bg-white rounded-full p-2 w-fit">
                <Calendar />
              </section>
              <h3 className="text-lg font-black tracking-wide text-left">
                Planning en ligne à jours
              </h3>
              <p className="text-left mt-4">
                Consultez les plannings en ligne et en temps réel
              </p>
            </article>
            <article className="bg-primary/10 rounded-lg p-4 shadow-xl">
              <section className="bg-white rounded-full p-2 w-fit">
                <Bell />
              </section>
              <h3 className="text-lg font-black tracking-wide text-left">
                Rappels et notifications
              </h3>
              <p className="text-left mt-4">
                Recevez des notifications pour les réservations, des rappels
                avant vos leçons
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 px-6 py-20 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Restez informé du lancement
          </h2>
          <p className="text-gray-700 mb-6">
            Inscrivez-vous pour recevoir les infos en avant-première et
            rejoindre les premiers centres et cavaliers testeurs.
          </p>
          <PreRegistrationForm />
        </div>
      </section>
      <section className="px-6 py-20 bg-gray-50 w-full">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            En savoir plus bientôt...
          </h2>
          <p className="text-gray-600">
            Revenez très vite pour découvrir tout ce qu&apos;Equita-Planner vous
            prépare.
          </p>
        </div>
      </section>
    </section>
  );
}
