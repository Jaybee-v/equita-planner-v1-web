"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UserRole } from "@/enums/UserRole";
import { successSonnerVariant } from "@/lib/sonner-variants";
import User from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { accountSettingsSchema } from "../schema/accountSettingsSchema";
import updateUserSettingsStatus from "../services/update-user-settings-status";

type AccountDataCardProps = {
  user: User;
};

export const AccountDataCard = ({ user }: AccountDataCardProps) => {
  const [type, setType] = useState<
    "allstableNotifications" | "emailNotifications" | "close"
  >("close");

  const form = useForm<z.infer<typeof accountSettingsSchema>>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      userId: user.id,
      allStableNotifications: user.userSetting?.allStableNotifications,
      emailNotifications: user.userSetting?.emailNotifications,
    },
  });

  const updateUserSettingsStatusAction = async (
    type: "allstableNotifications" | "emailNotifications"
  ) => {
    if (!user.userSetting) {
      return;
    }
    const response = await updateUserSettingsStatus(user.userSetting.id, type);
    console.log(response);
    toast.success(response, {
      ...successSonnerVariant,
    });
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="size-6" /> Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <section className="space-y-2">
          <article>
            <p className="text-sm font-medium">Email</p>
            <p>{user.email}</p>
          </article>
        </section>
        <h2 className="text-sm font-medium py-2">Notifications</h2>
        <Form {...form}>
          <form className="space-y-4 px-2 md:px-8">
            {user.role === UserRole.RIDER && (
              <section>
                <Dialog
                  open={type === "allstableNotifications"}
                  onOpenChange={() => setType("close")}
                >
                  <DialogTrigger asChild>
                    <section className="flex items-center justify-between gap-2">
                      <article className="flex flex-col gap-2 leading-3">
                        <p className="font-semibold">
                          Alertes changements d&apos;horaires, nouvelles
                          activités etc ...
                        </p>
                        <p className="font-extralight text-muted-foreground">
                          Je souhaite recevoir toutes les nofitications de mon
                          club
                        </p>
                      </article>
                      <Switch
                        checked={form.getValues("allStableNotifications")}
                        onCheckedChange={() =>
                          setType("allstableNotifications")
                        }
                      />
                    </section>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Recevoir toutes les notifications de mon club
                      </DialogTitle>
                      {!form.getValues("allStableNotifications") ? (
                        <DialogDescription>
                          Vous recevrez toutes les notifications de mon club
                        </DialogDescription>
                      ) : (
                        <DialogDescription>
                          Vous ne recevrez plus les notifications de mon club
                        </DialogDescription>
                      )}
                    </DialogHeader>
                    <DialogFooter className="grid grid-cols-2 gap-2">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button
                        type="button"
                        variant={
                          form.getValues("allStableNotifications")
                            ? "destructive"
                            : "success"
                        }
                        onClick={() => {
                          updateUserSettingsStatusAction(
                            "allstableNotifications"
                          );
                          form.setValue(
                            "allStableNotifications",
                            !form.getValues("allStableNotifications")
                          );

                          setType("close");
                        }}
                      >
                        <Bell className="w-4 h-4" />
                        {form.getValues("allStableNotifications")
                          ? "Désactiver"
                          : "Activer"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </section>
            )}
            <section>
              <Dialog
                open={type === "emailNotifications"}
                onOpenChange={() => setType("close")}
              >
                <DialogTrigger asChild>
                  <section className="flex items-center justify-between gap-2">
                    <article className="flex flex-col gap-2 leading-3">
                      <p className="font-semibold">Notifications par email</p>

                      <p className="font-extralight text-muted-foreground">
                        Je souhaite recevoir les notifications par email
                      </p>
                    </article>

                    <Switch
                      checked={form.getValues("emailNotifications")}
                      onCheckedChange={() => setType("emailNotifications")}
                    />
                  </section>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications par email
                    </DialogTitle>
                    {form.getValues("emailNotifications") ? (
                      <DialogDescription>
                        Vous recevrez les notifications par email
                      </DialogDescription>
                    ) : (
                      <DialogDescription>
                        Vous ne recevrez plus les notifications par email
                      </DialogDescription>
                    )}
                  </DialogHeader>
                  <section></section>
                  <DialogFooter className="grid grid-cols-2 gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Annuler</Button>
                    </DialogClose>
                    <Button
                      type="button"
                      variant={
                        form.getValues("emailNotifications")
                          ? "destructive"
                          : "success"
                      }
                      onClick={() => {
                        updateUserSettingsStatusAction("emailNotifications");
                        form.setValue(
                          "emailNotifications",
                          !form.getValues("emailNotifications")
                        );
                        setType("close");
                      }}
                    >
                      <Bell className="w-4 h-4" />
                      {form.getValues("emailNotifications")
                        ? "Désactiver"
                        : "Activer"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </section>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
