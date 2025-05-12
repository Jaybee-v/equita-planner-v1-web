import { AffiliationRequestStatus } from "@/enums/AffiliationRequest";
import { StableImagesCarousel } from "@/features/stable/components/StableImagesCarousel";
import { Instructor } from "@/types/Instructor";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import { Map, Smartphone, Star } from "lucide-react";
import Image from "next/image";

type WelcomeHeaderProps = {
  auth: {
    user: User | null;
    instructor: Instructor | null;
    rider: Rider | null;
    stable: Stable | null;
  };
  isSuccessSignin?: boolean;
  isRiderPage?: boolean;
};

export const WelcomeHeader = ({
  auth,
  isSuccessSignin,
  isRiderPage,
}: WelcomeHeaderProps) => {
  const { user, instructor, rider, stable } = auth;

  if (isRiderPage && rider) {
    return (
      <section className="col-span-3 md:flex justify-between w-full bg-white rounded drop-shadow-2xl p-8">
        <section className="leading-5">
          <h1 className="font-bold md:text-2xl">
            Profil de <span>{rider.name}</span>
          </h1>
          <p className="font-extralight text-muted-foreground">
            Cavalier affilié au club depuis le{" "}
            {rider.affiliationRequests &&
              rider.affiliationRequests.length > 0 && (
                <span className="font-bold capitalize">
                  {new Date(
                    rider.affiliationRequests[0].createdAt
                  ).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
          </p>
        </section>
        <section>
          <p className="text-muted-foreground text-sm font-light max-md:mt-6">
            Aujourd&apos;hui:{" "}
            <span className="capitalize">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </section>
      </section>
    );
  }

  if (isSuccessSignin) {
    return (
      <section className="col-span-3 md:flex justify-between w-full bg-white rounded drop-shadow-2xl p-8">
        <section className="leading-5">
          <h1 className="font-bold md:text-2xl">
            Bienvenue sur <span>Equita-Planner</span>
          </h1>
          <p className="font-extralight text-muted-foreground">
            Bienvenue sur ton espace cavalier
          </p>
        </section>
        <section>
          <p className="text-muted-foreground text-sm font-light max-md:mt-6">
            Aujourd&apos;hui:{" "}
            <span className="capitalize">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </section>
      </section>
    );
  }

  if (!user && stable) {
    return (
      <div className="bg-white rounded drop-shadow-2xl p-8 space-y-4 relative">
        <section className="col-span-3 md:flex justify-between w-full relative py-4">
          <section className="absolute bottom-0 right-0">
            {rider &&
              rider.affiliationRequests[0].stableId === stable.id &&
              rider.affiliationRequests[0].status ===
                AffiliationRequestStatus.APPROVED && (
                <span className="bg-green-50 text-green-600 px-6 py-2 rounded-lg flex items-center gap-2">
                  <Star size={15} />
                  C&apos;est ton club
                </span>
              )}
          </section>
          <section className="leading-5">
            <h1 className="font-bold md:text-2xl flex items-center gap-2">
              {stable.logoUrl && (
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_URL + stable.logoUrl}
                  alt={stable.name}
                  width={500}
                  height={500}
                  className="w-10 h-10"
                />
              )}
              {stable.name}
            </h1>
            <p>Bienvenue sur la page du club</p>
          </section>
          <section>
            <p className="text-muted-foreground text-sm font-light max-md:mt-6">
              Aujourd&apos;hui:{" "}
              <span className="capitalize">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </section>
        </section>
        <section className="grid grid-cols-3 gap-4">
          <aside className="col-span-2">
            <StableImagesCarousel
              images={[stable.picture1, stable.picture2, stable.picture3]}
            />
          </aside>
          <aside className="flex justify-end items-end">
            <section className="space-y-2 shadow shadow-slate-300 w-fit p-4 rounded-lg bg-slate-100">
              <article className="flex gap-4">
                <Map size={30} />
                <article>
                  <p>
                    {stable.numStreet} {stable.street}
                  </p>
                  <p>
                    {stable.zip} {stable.city}
                  </p>
                </article>
              </article>
              <article className="flex gap-4">
                <Smartphone size={30} />
                <p>{stable.phone}</p>
              </article>
            </section>
          </aside>
        </section>
      </div>
    );
  }

  if (rider) {
    return (
      <section className="col-span-3 md:flex justify-between w-full bg-white rounded drop-shadow-2xl p-8">
        <section className="leading-5">
          <h1 className="font-bold md:text-2xl">Bonjour, {rider.name} !</h1>
          <p className="font-extralight text-muted-foreground">
            Bienvenue sur ton espace cavalier
          </p>
        </section>
        <section>
          <p className="text-muted-foreground text-sm font-light max-md:mt-6">
            Aujourd&apos;hui:{" "}
            <span className="capitalize">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </section>
      </section>
    );
  }
  if (stable) {
    return (
      <section className="col-span-3 md:flex justify-between w-full bg-white rounded drop-shadow-2xl p-8">
        <section className="leading-5">
          <h1 className="font-bold md:text-2xl">Bonjour, {stable.name} !</h1>
          <p className="font-extralight text-muted-foreground">
            Bienvenue sur votre espace de gestion de vos activités équestres
          </p>
        </section>
        <section>
          <p className="text-muted-foreground text-sm font-light max-md:mt-6">
            Aujourd&apos;hui:{" "}
            <span className="capitalize">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </section>
      </section>
    );
  }
  if (instructor && instructor.stable) {
    return (
      <section className="col-span-3 md:flex justify-between w-full bg-white rounded drop-shadow-2xl p-8">
        <section className="leading-5">
          <h1 className="font-bold md:text-2xl">
            Bonjour, {instructor.name} !
          </h1>
          <p className="font-extralight text-muted-foreground">
            Bienvenue sur votre espace moniteur{" "}
            <span className="font-bold">{instructor.stable.name}</span>
          </p>
        </section>
        <section>
          <p className="text-muted-foreground text-sm font-light max-md:mt-6">
            Aujourd&apos;hui:{" "}
            <span className="capitalize">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </section>
      </section>
    );
  }
};
