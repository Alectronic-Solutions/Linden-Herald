import type { MetadataRoute } from "next";
import { asset } from "@/lib/utils";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Linden Herald",
    short_name: "Linden Herald",
    description: "A weekly newspaper serving Linden and eastern San Joaquin County since 1959.",
    start_url: asset("/"),
    display: "standalone",
    background_color: "#FAF7F0",
    theme_color: "#1B4D3E",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
