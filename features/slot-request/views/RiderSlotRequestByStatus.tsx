"use client";
import { Button } from "@/components/ui/button";
import { Status } from "@/enums/Status";
import SlotRequest from "@/types/SlotRequest";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { SlotRequestCard } from "../components/SlotRequestCard";
import findSlotsRequestByRiderIdAndStatus from "../services/find-by-rider-id-and-status";

type RiderSlotRequestByStatusProps = {
  status: Status;
  slotRequests: SlotRequest[];
  count: number;
  riderId: string;
};

export const RiderSlotRequestByStatus = ({
  status,
  slotRequests: receivedSlots,
  count,
  riderId,
}: RiderSlotRequestByStatusProps) => {
  const [page, setPage] = useState(1);
  const [slotRequests, setSlotRequests] =
    useState<SlotRequest[]>(receivedSlots);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (value: number) => {
    setIsLoading(true);
    const response = await findSlotsRequestByRiderIdAndStatus({
      riderId: riderId,
      status: status,
      page: value,
    });
    setIsLoading(false);
    if ("error" in response) {
      console.error(response.error);
    } else {
      console.log(response);
      setSlotRequests(response.slotRequests);
      setPage(value);
    }
  };

  if (status === Status.PENDING) {
    return (
      <section>
        {slotRequests.length > 0 ? (
          <section>
            {isLoading ? (
              <section className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin" />
              </section>
            ) : (
              <section className="space-y-2 md:space-y-4">
                {slotRequests.map((request) => (
                  <SlotRequestCard
                    riderView
                    key={request.id}
                    slotRequest={request}
                  />
                ))}
              </section>
            )}
            {count > 3 ? (
              <section className="flex items-center gap-2 justify-between py-2 border-b">
                <Button
                  type="button"
                  variant={"outline"}
                  size="icon"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                <p className="text-muted-foreground text-sm font-light">
                  {page * 3 - 3 + slotRequests.length} / {count}
                </p>
                <Button
                  type="button"
                  variant={"outline"}
                  size="icon"
                  disabled={page === count / 3}
                  onClick={() => handlePageChange(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </section>
            ) : null}
          </section>
        ) : (
          <section>
            <p>Aucune demande en attente</p>
          </section>
        )}
      </section>
    );
  }

  if (status === Status.APPROVED) {
    return (
      <section className="py-2">
        {slotRequests.length > 0 ? (
          <section>
            {isLoading ? (
              <section className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin" />
              </section>
            ) : (
              <section className="space-y-2 md:space-y-4">
                {slotRequests.map((request) => (
                  <SlotRequestCard
                    riderView
                    key={request.id}
                    slotRequest={request}
                  />
                ))}
              </section>
            )}
            {count > 3 ? (
              <section className="flex items-center gap-2 justify-between py-2 border-b">
                <Button
                  type="button"
                  variant={"outline"}
                  size="icon"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                <p className="text-muted-foreground text-sm font-light">
                  {page} / {Math.ceil(count / 3)}
                </p>
                <Button
                  type="button"
                  variant={"outline"}
                  size="icon"
                  disabled={page === count / 3}
                  onClick={() => handlePageChange(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </section>
            ) : null}
          </section>
        ) : (
          <section>
            <p>Aucune demande acceptée</p>
          </section>
        )}
      </section>
    );
  }

  if (status === Status.REJECTED) {
    return (
      <section>
        {slotRequests.length > 0 ? (
          <section>
            {isLoading ? (
              <section className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin" />
              </section>
            ) : (
              <section>
                {slotRequests.map((request) => (
                  <SlotRequestCard
                    riderView
                    key={request.id}
                    slotRequest={request}
                  />
                ))}
              </section>
            )}
            {count > 3 ? (
              <section className="flex items-center gap-2 justify-between py-2 border-b">
                <Button
                  type="button"
                  variant={"outline"}
                  size="icon"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                <p className="text-muted-foreground text-sm font-light">
                  {page} / {Math.ceil(count / 3)}
                </p>
                <Button
                  type="button"
                  variant={"outline"}
                  size="icon"
                  disabled={page === count / 3}
                  onClick={() => handlePageChange(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </section>
            ) : null}
          </section>
        ) : (
          <section>
            <p>Aucune demande refusée</p>
          </section>
        )}
      </section>
    );
  }
};
