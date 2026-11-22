"use client";

import { usePathname } from "next/navigation";
import AMI from "@/components/ami/AMI";

export default function AMIWrapper() {
  const pathname = usePathname();

  if (pathname === "/anish-tailor") {
    return null;
  }

  return <AMI />;
}