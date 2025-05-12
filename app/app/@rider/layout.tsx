import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mon espace cavalier Equita-Planner",
  description: "Equita-Planner",
};

export default function StableRiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
