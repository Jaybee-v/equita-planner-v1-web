"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotificationActionsProps {
  notificationId: string;
}

export default function NotificationActions({
  notificationId,
}: NotificationActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const handleAction = async (action: NotificationAction) => {
  // setIsLoading(true);
  // try {
  // const result = await updateNotificationStatus(notificationId, action);
  // } catch (error) {
  // } finally {
  // setIsLoading(false);
  // }
  // };

  return (
    <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-100">
      <Button
        variant="outline"
        className="px-6"
        // onClick={() => handleAction(NotificationAction.REJECT)}
        disabled={isLoading}
      >
        <X className="mr-2 h-4 w-4" />
        Refuser
      </Button>
      <Button
        className="px-6 bg-green-600 hover:bg-green-700"
        // onClick={() => handleAction(NotificationAction.ACCEPT)}
        disabled={isLoading}
      >
        <Check className="mr-2 h-4 w-4" />
        Accepter
      </Button>
    </div>
  );
}
