import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("Loading fonts...");
  const pixelifyData = readFileSync(
    join(__dirname, "fonts", "PixelifySans-SemiBold.ttf")
  );
  const dotgothicData = readFileSync(
    join(__dirname, "fonts", "DotGothic16-Regular.ttf")
  );

  console.log("Generating OG image...");
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#F4F1EA",
          fontFamily: "Pixelify Sans",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            backgroundColor: "#E85D04",
                            color: "#F4F1EA",
                            padding: "5px 12px 4px",
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                          },
                          children: "EST. 2026",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            color: "#5C564A",
                            fontSize: "14px",
                            letterSpacing: "0.08em",
                          },
                          children:
                            "— A FIELD GUIDE TO JAPANESE SELF-MADE KEYBOARDS",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "128px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      lineHeight: 0.9,
                      letterSpacing: "-0.02em",
                    },
                    children: "Build Guide",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "56px",
                      color: "#E85D04",
                      fontFamily: "DotGothic16",
                      lineHeight: 1,
                    },
                    children: "ビルドガイド横丁",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderTop: "2px solid #D8D2C2",
                paddingTop: "24px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "#5C564A",
                      fontFamily: "DotGothic16",
                    },
                    children:
                      "秋葉原の路地裏を歩くように、ビルドガイドをあれこれ眺める場所。",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "22px",
                      color: "#8B8473",
                      fontWeight: 600,
                    },
                    children: "yokocho.build",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Pixelify Sans",
          data: pixelifyData,
          weight: 600,
          style: "normal" as const,
        },
        {
          name: "DotGothic16",
          data: dotgothicData,
          weight: 400,
          style: "normal" as const,
        },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  const outDir = join(__dirname, "..", "public");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "og.png"), png);
  console.log("Generated public/og.png (1200x630)");
}

main();
