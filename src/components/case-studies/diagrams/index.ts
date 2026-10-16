import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import AssetflowDiagram from "./AssetflowDiagram.astro";

/** Architecture diagram per case study slug, shown at the top of the technical deep dive. */
export const diagrams: Record<string, AstroComponentFactory | undefined> = {
  assetflow: AssetflowDiagram,
};
