"use client";
import { NotificationType } from "@/enums/NotificationType";
import Notification from "@/types/Notification";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, Info, User, X } from "lucide-react";
import Image from "next/image";
import { IoTrophySharp } from "react-icons/io5";
type NotificationCardProps = {
  notification: Notification;
  onClick?: () => void;
  simple?: boolean;
};

export const NotificationCard = ({
  notification,
  onClick,
  simple = false,
}: NotificationCardProps) => {
  if (simple) {
    return (
      <article
        onClick={onClick}
        className="flex gap-2 md:gap-6 px-4 md:px-8 py-1"
      >
        {notification.type === NotificationType.SUCCESS && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-green-600/40 rounded-full flex items-center justify-center">
              <IoTrophySharp size={20} color="green" />
            </article>
          </section>
        )}
        {notification.type === NotificationType.SYSTEM && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-blue-300/40 rounded-full flex items-center justify-center">
              <Info size={20} color="blue" />
            </article>
          </section>
        )}
        {notification.type === NotificationType.AFFILIATION_REQUEST && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-sky-600/40 rounded-full flex items-center justify-center">
              <User size={20} color="sky" />
            </article>
          </section>
        )}
        {notification.type ===
          NotificationType.AFFILIATION_REQUEST_APPROVED && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-green-600/40 rounded-full flex items-center justify-center">
              <Check size={20} color="green" />
            </article>
          </section>
        )}
        {notification.type === NotificationType.VALIDATION && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-green-600/40 rounded-full flex items-center justify-center">
              <Check size={20} color="green" />
            </article>
          </section>
        )}
        {notification.type === NotificationType.INFO && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-amber-600/40 rounded-full flex items-center justify-center">
              <Info size={20} color="orange" />
            </article>
          </section>
        )}
        {notification.type ===
          NotificationType.AFFILIATION_REQUEST_REJECTED && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-red-600/40 rounded-full flex items-center justify-center">
              <X size={20} color="red" />
            </article>
          </section>
        )}
        {notification.type === NotificationType.FROM_STABLE && (
          <section>
            <article className="w-6 h-6 md:w-8 md:h-8 bg-teal-300/40 rounded-full flex items-center justify-center ">
              <Image
                src="/svg/stable.svg"
                alt="stable"
                width={20}
                height={20}
                className=""
              />
            </article>
          </section>
        )}
        <section className="w-full">
          <h3 className="font-bold text-sm md:text-base">
            {notification.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-500">
            {notification.message}
          </p>
          <p className="text-[11px] text-gray-500 md:text-xs italic mt-1">
            il y a{" "}
            {formatDistanceToNow(new Date(notification.createdAt), {
              locale: fr,
            })}
          </p>
        </section>
      </article>
    );
  }

  return (
    <article
      onClick={onClick}
      className="bg-background border shadow relative rounded-xl transition-all duration-300 cursor-pointer flex gap-4 p-2 w-full"
    >
      {notification.type === NotificationType.SUCCESS && (
        <section>
          <article className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center  shadow-md shadow-gray-700">
            <IoTrophySharp size={20} color="white" />
          </article>
        </section>
      )}
      {notification.type === NotificationType.SYSTEM && (
        <section>
          <article className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center shadow-md shadow-gray-700">
            <Info size={20} color="white" />
          </article>
        </section>
      )}
      {notification.type === NotificationType.AFFILIATION_REQUEST && (
        <section>
          <article className="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center  shadow-md shadow-gray-700">
            <User size={20} color="white" />
          </article>
        </section>
      )}
      {notification.type === NotificationType.AFFILIATION_REQUEST_APPROVED && (
        <section>
          <article className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center  shadow-md shadow-gray-700">
            <Check size={20} color="white" />
          </article>
        </section>
      )}
      {notification.type === NotificationType.VALIDATION && (
        <section>
          <article className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md shadow-gray-700">
            <Check size={20} color="white" />
          </article>
        </section>
      )}

      {notification.type === NotificationType.INFO && (
        <section>
          <article className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center  shadow-md shadow-gray-700">
            <Info size={20} color="white" />
          </article>
        </section>
      )}

      {notification.type === NotificationType.AFFILIATION_REQUEST_REJECTED && (
        <section>
          <article className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center  shadow-md shadow-gray-700">
            <X size={20} color="white" />
          </article>
        </section>
      )}
      {notification.type === NotificationType.FROM_STABLE && (
        <section>
          <article className="w-8 h-8 bg-teal-300 rounded-full flex items-center justify-center  shadow-md shadow-gray-700">
            <Image
              src="/svg/stable.svg"
              alt="stable"
              width={20}
              height={20}
              className=""
            />
          </article>
        </section>
      )}

      <section className="w-full">
        <h3 className="font-bold text-sm">{notification.title}</h3>
        <p className="text-xs text-gray-500">{notification.message}</p>

        <p className="text-xs text-gray-500 text-end italic mt-1">
          il y a{" "}
          {formatDistanceToNow(new Date(notification.createdAt), {
            locale: fr,
          })}
        </p>
      </section>
    </article>
  );
};
