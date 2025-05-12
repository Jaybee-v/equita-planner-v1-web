import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Equita-Planner",
  description: "Equita-Planner",
};

export default function StableHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
