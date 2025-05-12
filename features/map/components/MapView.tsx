"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import createAffiliation from "@/features/rider/services/create-affiliation";
import { StableImagesDisplayer } from "@/features/stable/components/StableImagesDisplayer";
import findStablesByCoordinates from "@/features/stable/services/stables-by-geoloc";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import { Check, Pin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type MapViewProps = {
  rider: Rider | null;
};

export const MapView = ({ rider }: MapViewProps) => {
  const router = useRouter();
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [stables, setStables] = useState<Stable[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          setCoordinates([position.coords.latitude, position.coords.longitude]);

          const request = await findStablesByCoordinates([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setStables(request);
          console.log(request);
          // setLoading(false);
        },
        (error) => {
          setError(error.message);
          // setLoading(false);
        }
      );
    };
    fetchCoordinates();
  }, []);

  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/features/map/components/Map").then((mod) => mod.Map),
        {
          loading: () => (
            <p>Nous recherchons le club proche de votre position ...</p>
          ),
          ssr: false,
        }
      ),
    [coordinates]
  );

  const handleCreateAffiliation = async (stableId: string) => {
    if (!rider) return;

    const request = await createAffiliation({
      stableId,
      riderId: rider.id,
    });
    if ("error" in request) {
      setError(request.error);
      toast.error("Une erreur est survenue", {
        description: request.error,
        ...errorSonnerVariant,
      });
      return;
    } else {
      toast.success("Félicitation  !", {
        description: request.message,
        ...successSonnerVariant,
      });
      router.refresh();
    }

    console.log(request);
  };

  if (rider && rider.affiliationRequests.length > 0) return null;

  return (
    <div className="relative">
      <div className="rounded-lg shadow-lg w-full h-80">
        <Map coordinates={coordinates} markers={stables} />
      </div>

      <section>
        {stables.length > 0 ? (
          <section className="p-4 space-y-4">
            <h2 className="text-xl font-semibold tracking-wide">
              Les écuries et clubs que nous avons trouvés
            </h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stables.map((stable) => (
                <Dialog key={"stable-dialog-" + stable.id}>
                  <DialogTrigger>
                    <section className="bg-white border p-4 shadow rounded-xl h-full w-full flex flex-col gap-2 justify-between hover:bg-primary/10 transition-colors duration-300 cursor-pointer relative">
                      <article className="flex w-full max-sm:justify-center items-center gap-2">
                        {stable.logoUrl ? (
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_BACKEND_URL +
                              stable.logoUrl
                            }
                            alt={stable.name}
                            width={100}
                            height={100}
                            className="max-sm:absolute top-1/5 left-4 z-10"
                          />
                        ) : (
                          <span className="bg-gray-300 rounded-full w-10 h-10 z-10"></span>
                        )}
                        <h3 className="z-50 max-sm:text-center">
                          {stable.name}
                        </h3>
                      </article>
                      <article className="flex flex-col leading-4 text-gray-500 italic">
                        <span>
                          {stable.numStreet} {stable.street}
                        </span>
                        <span>
                          {stable.zip} {stable.city}
                        </span>
                      </article>
                    </section>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex gap-2 items-center">
                        {" "}
                        {stable.logoUrl ? (
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_BACKEND_URL +
                              stable.logoUrl
                            }
                            alt={stable.name}
                            width={100}
                            height={100}
                          />
                        ) : (
                          <span className="bg-gray-300 rounded-full w-10 h-10"></span>
                        )}
                        {stable.name} est ton club ?
                      </DialogTitle>
                      <DialogDescription>
                        Si{" "}
                        <span className="font-bold underline">
                          {stable.name}
                        </span>{" "}
                        est ton club, tu peux faire une demande pour le
                        rejoindre. <br />
                        <span className="text-amber-600">
                          Le gestionnaire du compte devra alors valider ta
                          demande pour te donner accès à toutes les activitiés.
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <section className="space-y-4">
                      <StableImagesDisplayer
                        images={[
                          stable.picture1 ?? "",
                          stable.picture2 ?? "",
                          stable.picture3 ?? "",
                        ]}
                        name={stable.name}
                      />
                      <section>
                        <p className="font-semibold flex gap-2 items-center">
                          <Pin />
                          Adresse
                        </p>
                        <article className="flex flex-col leading-4 text-gray-500">
                          <span>
                            {stable.numStreet} {stable.street}
                          </span>
                          <span>
                            {stable.zip} {stable.city}
                          </span>
                        </article>
                      </section>
                    </section>
                    <DialogFooter className="grid grid-cols-2 gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Annuler</Button>
                      </DialogClose>
                      {rider && (
                        <DialogClose asChild>
                          <Button
                            onClick={() => handleCreateAffiliation(stable.id)}
                          >
                            <Check />
                            Rejoindre le club
                          </Button>
                        </DialogClose>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </section>
          </section>
        ) : (
          <section>
            <p>Aucune écuries trouvées</p>
          </section>
        )}
      </section>
    </div>
  );
};
