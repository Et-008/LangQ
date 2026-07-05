"use client";

import { useEffect } from "react";
import { initCrisp } from "@/utils/crisp";

export default function CrispInitializer() {
  useEffect(() => {
    initCrisp();
  }, []);

  return null;
}
