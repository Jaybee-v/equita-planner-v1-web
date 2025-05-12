"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationType } from "@/enums/NotificationType";
import Notification from "@/types/Notification";
import { Bell, ChevronLeft, ChevronRight, Filter, Loader2 } from "lucide-react";
import { useState } from "react";
import findNotificationsByUserId from "../services/find-notifications-by-user-id";
import { NotificationCard } from "./NotificationCard";

type NotificationsPageViewProps = {
  notifications: Notification[];
  totalCount: number;
};

export const NotificationsPageView = ({
  notifications: receivedNotifications,
  totalCount,
}: NotificationsPageViewProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [type, setType] = useState<NotificationType | "">("");
  const [notifications, setNotifications] = useState<Notification[]>(
    receivedNotifications
  );
  const [isLoading, setIsLoading] = useState(false);

  const requestNotifications = async (data: {
    page: number;
    limit: number;
    type: NotificationType | "";
  }) => {
    setIsLoading(true);
    const response = await findNotificationsByUserId(data);
    if ("error" in response) {
      setIsLoading(false);
      return;
    }
    setPage(data.page);
    setLimit(data.limit);
    setType(data.type);
    setNotifications(response.notifications);
    setIsLoading(false);
  };

  return (
    <div className="grid  gap-4">
      <aside className="col-span-2 space-y-2">
        <section className="bg-white rounded shadow-md">
          <section className="border-b p-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell size={24} /> Notifications
            </h1>
            <p className="text-sm text-gray-500">{totalCount} notifications</p>
          </section>
          <section className="flex items-end justify-center gap-6 pt-10 pb-6 relative">
            <section className="flex">
              <h2 className="text-lg font-bold flex items-center gap-2 absolute top-2 left-2">
                <Filter size={20} />
                Filtres
              </h2>
              <Select
                defaultValue="5"
                onValueChange={(value) => {
                  requestNotifications({ page: 1, limit: Number(value), type });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col gap-2"></div>
            </section>
            {Math.ceil(totalCount / limit) > 1 && (
              <section className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => {
                    requestNotifications({ page: page - 1, limit, type });
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Select
                  value={page.toString()}
                  onValueChange={(value) => {
                    requestNotifications({ page: Number(value), limit, type });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Page ${page}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({
                      length: Math.ceil(totalCount / limit),
                    }).map((_, index) => (
                      <SelectItem key={index} value={(index + 1).toString()}>
                        {`Page ${index + 1}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === Math.ceil(totalCount / limit)}
                  onClick={() => {
                    requestNotifications({ page: page + 1, limit, type });
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </section>
            )}
          </section>
        </section>
        <section className="bg-slate-200 rounded p-6 grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            notifications.map((notification) => (
              <section
                key={notification.id}
                className="bg-white py-2 rounded shadow-md"
              >
                <NotificationCard notification={notification} simple />
              </section>
            ))
          )}
          {Math.ceil(totalCount / limit) > 1 && (
            <section className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => {
                  requestNotifications({ page: page - 1, limit, type });
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Select
                value={page.toString()}
                onValueChange={(value) => {
                  requestNotifications({ page: Number(value), limit, type });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Page ${page}`} />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({
                    length: Math.ceil(totalCount / limit),
                  }).map((_, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      {`Page ${index + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                disabled={page === Math.ceil(totalCount / limit)}
                onClick={() => {
                  requestNotifications({ page: page + 1, limit, type });
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </section>
          )}
        </section>
      </aside>
      <aside></aside>
    </div>
  );
};
