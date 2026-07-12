"use client";

import { useEffect } from "react";

export default function OverlookMount() {
  useEffect(() => {
    import("overlookly-a11y").then(({ overlookly }) => {
      overlookly();
    });
  }, []);

  return null;
}
