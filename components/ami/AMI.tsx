"use client";

import { useState } from "react";

import AMIButton from "./AMIButton";
import AMIOverlay from "./AMIOverlay";

export default function AMI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AMIButton
        onClick={() => setOpen(true)}
      />

      <AMIOverlay
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}