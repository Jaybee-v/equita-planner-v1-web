import { Button } from "@/components/ui/button";
import Stable from "@/types/Stable";
import { File, Phone, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MyStableCardProps = {
  stable: Stable;
};

export const MyStableCard = ({ stable }: MyStableCardProps) => {
  if (!stable) return null;

  return (
    <div className="max-w-sm mx-auto bg-white rounded drop-shadow-2xl">
      <h3 className="text-lg font-semibold border-b py-3 px-6">
        Mon centre équestre
      </h3>
      <section className="rounded-b-2xl relative">
        {stable.picture1 ? (
          <Image
            src={process.env.NEXT_PUBLIC_BACKEND_URL + stable.picture1}
            alt={stable.name}
            width={500}
            height={500}
            className="rounded-b w-full h-full object-cover"
          />
        ) : (
          <section className="rounded-b w-full h-48 bg-gray-200">
            <p className="text-muted-foreground text-sm italic p-4">
              Aucune photo disponible
            </p>
          </section>
        )}
        <span className="absolute bottom-0 left-0 bg-gray-900/50 text-white px-2 py-1 w-full text-2xl font-bold ps-4 rounded-b">
          {stable.name}
        </span>
      </section>
      <section className="p-6 space-y-4">
        <article className="flex items-center gap-2 text-muted-foreground">
          <Pin />

          <p className="text-sm">
            {stable.numStreet} {stable.street}, {stable.zip} {stable.city}
          </p>
        </article>
        <article className="flex  items-center  gap-2 text-muted-foreground">
          <Phone />
          <p className="text-sm">{stable.phone}</p>
        </article>
      </section>
      <section className="px-6 py-2">
        <Link href={`/app/stable/${stable.slug}?id=${stable.id}`}>
          <Button>
            <File />
            <span className="font-bold">{stable.name}</span>
          </Button>
        </Link>
      </section>
    </div>
  );
};
