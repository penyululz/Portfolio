// Renders scripts/og-image.svg to public/og-image.png (1200x630). Usage: npm run og
import sharp from "sharp";

await sharp("scripts/og-image.svg").resize(1200, 630).png().toFile("public/og-image.png");
console.log("public/og-image.png written");
