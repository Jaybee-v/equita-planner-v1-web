"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InviteRidersByEmail } from "@/features/user/components/InviteRidersByEmail";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import { Bell, ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import getStableRiders from "../services/get-stable-riders";
import { RiderTable } from "./RiderTable";

type StableRiderListProps = {
  riders: Rider[];
  total: number;
  stable: Stable;
};

export const StableRiderList = ({
  riders: receivedRiders,
  total,
  stable,
}: StableRiderListProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [riders, setRiders] = useState<Rider[]>(receivedRiders);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (index: number) => {
    setIsLoading(true);
    const request = await getStableRiders({
      stableId: stable.id,
      page: index,
      limit: limit,
    });
    if ("error" in request) {
      setIsLoading(false);
      return;
    }
    setRiders(request.data.approved.map((affiliation) => affiliation.rider));
    setPage(index);
    setIsLoading(false);
  };

  const handleLimitChange = async (index: number) => {
    setIsLoading(true);
    const request = await getStableRiders({
      stableId: stable.id,
      page: 1,
      limit: index,
    });
    if ("error" in request) {
      setIsLoading(false);
      return;
    }
    setRiders(request.data.approved.map((affiliation) => affiliation.rider));
    setPage(1);
    setLimit(index);
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col-reverse md:flex-row gap-2 md:gap-4">
      <section className="col-span-2 flex flex-col gap-4 justify-between bg-white rounded drop-shadow-md py-2">
        <section className=" rounded drop-shadow-md 0 h-fit bg-white">
          <section className="py-2 px-4 space-y-2 border-b">
            <Label htmlFor="search">Rechercher un cavalier</Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un cavalier"
            />
          </section>
          {isLoading ? (
            <div className="flex items-center justify-center h-42">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <section>
              <RiderTable riders={riders} />
              <article className="flex items-center justify-end gap-4 px-12 border-t py-2 bg-slate-100">
                <p className="text-muted-foreground text-sm">
                  Total de cavaliers
                </p>
                <p className="text-lg font-bold">{total}</p>
              </article>
            </section>
          )}
        </section>
        <section className="flex items-center justify-evenly ">
          {total / limit > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                <ChevronLeft />
              </Button>
              <Select
                defaultValue={page.toString()}
                onValueChange={(value) => handlePageChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: total / limit }, (_, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      Page {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                disabled={page === total / limit}
                onClick={() => handlePageChange(page + 1)}
              >
                <ChevronRight />
              </Button>
            </>
          )}
          <Select
            defaultValue={limit.toString()}
            onValueChange={(value) => handleLimitChange(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </section>
      </section>
      <section className="w-full bg-white rounded shadow drop-shadow-xl p-6 space-y-6">
        <h3 className="text-lg font-bold">
          <Bell /> Envoyez des notifications
        </h3>
        <section className="grid gap-4">
          <InviteRidersByEmail />

          <Button variant="outline">
            <Plus />
            Ajouter un cavalier
          </Button>
        </section>
      </section>
    </section>
  );
};
