import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { TutorialConfig } from "../App";

interface TutorialScreenProps {
  config: TutorialConfig;
  onComplete: () => void;
  onBack: () => void;
}

type SubjectCategory =
  | "anime"
  | "animal"
  | "food"
  | "human"
  | "object"
  | "default";

function getSubjectCategory(subject: string): SubjectCategory {
  const s = subject.toLowerCase();
  const anime = [
    "naruto",
    "sasuke",
    "pikachu",
    "goku",
    "vegeta",
    "luffy",
    "ichigo",
    "kakashi",
    "hinata",
    "sakura",
    "dragon ball",
    "one piece",
    "bleach",
    "pokemon",
    "anime",
    "manga",
    "ninja",
  ];
  const animal = [
    "goat",
    "cat",
    "dog",
    "lion",
    "horse",
    "elephant",
    "bird",
    "rabbit",
    "fox",
    "wolf",
    "tiger",
    "bear",
    "cow",
    "sheep",
    "pig",
    "duck",
    "owl",
    "deer",
    "fish",
    "whale",
    "dolphin",
    "monkey",
    "gorilla",
    "giraffe",
    "zebra",
    "panda",
    "koala",
    "penguin",
    "eagle",
    "parrot",
    "snake",
  ];
  const food = [
    "cake",
    "pizza",
    "sushi",
    "burger",
    "apple",
    "banana",
    "bread",
    "cookie",
    "donut",
    "cupcake",
    "ice cream",
    "sandwich",
    "taco",
    "pasta",
    "ramen",
    "noodle",
    "muffin",
    "pie",
    "waffle",
    "pancake",
    "strawberry",
    "cherry",
    "grape",
    "orange",
    "lemon",
    "pear",
    "pineapple",
    "watermelon",
    "mango",
    "chocolate",
    "candy",
  ];
  const human = [
    "human",
    "person",
    "man",
    "woman",
    "girl",
    "boy",
    "face",
    "portrait",
    "people",
    "figure",
    "baby",
    "child",
    "adult",
    "elder",
    "self portrait",
  ];
  const object = [
    "car",
    "house",
    "tree",
    "flower",
    "boat",
    "ship",
    "plane",
    "bicycle",
    "train",
    "rocket",
    "building",
    "castle",
    "chair",
    "table",
    "lamp",
    "phone",
    "guitar",
    "violin",
    "sword",
    "umbrella",
    "hat",
    "shoe",
    "bag",
    "ball",
    "star",
    "sun",
    "moon",
    "cloud",
    "mountain",
    "wave",
  ];

  if (anime.some((k) => s.includes(k))) return "anime";
  if (animal.some((k) => s.includes(k))) return "animal";
  if (food.some((k) => s.includes(k))) return "food";
  if (human.some((k) => s.includes(k))) return "human";
  if (object.some((k) => s.includes(k))) return "object";
  return "default";
}

function generateSteps(
  subject: string,
  mode: TutorialConfig["mode"],
  category: SubjectCategory,
) {
  const s = subject;

  const stepsByCategory: Record<
    SubjectCategory,
    { title: string; desc: string }[]
  > = {
    anime: [
      {
        title: "Head & Hair Guidelines",
        desc: `Lightly draw a circle for ${s}'s head. Add a vertical center line and horizontal eye line. Sketch rough spiky hair guidelines outward from the top of the head — this defines the character's iconic silhouette. Keep everything very faint.`,
      },
      {
        title: "Body Outline",
        desc: `Sketch ${s}'s body in an energetic stance. Draw the torso as a tapered rectangle, add arm and leg guidelines. For ninja/fighter characters, lean the body slightly forward with raised arms to suggest action. Erase any stray guide lines.`,
      },
      {
        title: "Character Details",
        desc: `Add ${s}'s signature details: large expressive eyes along the eye line, the headband with its symbol, whisker marks or tattoos, clothing folds and fabric details on the ninja outfit. These distinctive features are what make the character recognizable.`,
      },
      mode === "outline"
        ? {
            title: "Bold Outline",
            desc: `Go over every line with confident dark strokes. Vary your line weight — thicker on the outside silhouette, thinner for interior details. This gives your ${s} drawing a clean, finished look.`,
          }
        : mode === "pencil"
          ? {
              title: "Pencil Shading",
              desc: `Shade ${s} in black and white. Dark areas: under the chin, inside the clothing folds, behind the hair spikes. Use cross-hatching for deeper shadows. Leave bright highlights on the forehead and eyes white.`,
            }
          : {
              title: "Character Colours",
              desc: `Paint ${s} with their iconic colours! Use bold anime-style flat colouring — bright oranges and yellows for Naruto, keep shadows and highlights crisp rather than blended. Add the coloured headband and bright eyes last.`,
            },
      {
        title: "Final Touches",
        desc: `Add energy lines or speed lines around ${s} to convey motion. Refine the hair spikes, sharpen the eyes with bright catchlight dots, and clean up the linework. Sign your artwork — it's complete! 🎉`,
      },
    ],
    animal: [
      {
        title: "Body Shape Guides",
        desc: `Start with a large oval in the centre for ${s}'s body, and a smaller circle at one end for the head. Add a small circle for the muzzle/snout. These guide ovals determine the animal's overall proportions — keep strokes very light.`,
      },
      {
        title: "Legs & Main Outline",
        desc: "Draw four rectangular legs extending from the body oval 2014 two in front, two behind. Connect the head circle to the body with a short neck curve. Sketch the outline of the tail. Erase the inner guide ovals and refine the body silhouette into a smooth shape.",
      },
      {
        title: "Features & Details",
        desc: `Add ${s}'s characteristic features: horns curving upward, a short beard below the chin, rounded ears on top of the head, nostrils, and a small eye. For a goat specifically, add the distinctive rectangular pupils. Include hoof lines at the bottom of each leg.`,
      },
      mode === "outline"
        ? {
            title: "Clean Outline",
            desc: `Trace over your ${s} with bold final lines. The outer silhouette should be thicker than interior fur/texture lines. Erase all construction lines. A clean outline drawing of an animal looks great as a simple study.`,
          }
        : mode === "pencil"
          ? {
              title: "Fur & Shading",
              desc: `Shade ${s} using short pencil strokes that follow the direction of fur growth. Darker values under the belly, behind the ears, and at the leg joints. Use lighter hatching on the flanks. Leave the top of the back lighter to show the light source above.`,
            }
          : {
              title: "Animal Colours",
              desc: `Colour ${s} with natural tones — light grey/white/tan for a goat. Use a slightly darker shade for the hooves, horns, and beard. Add a warm pink for the inner ears and muzzle. Layer a gentle shadow tone along the belly and underside.`,
            },
      {
        title: "Final Touches",
        desc: `Add any remaining texture details — a few fur texture lines on the body, finishing the pupils, and a small highlight dot in the eye to bring it to life. Review the overall silhouette and clean up any rough edges. Your ${s} drawing is done! 🎉`,
      },
    ],
    food: [
      {
        title: "Basic Shape Guides",
        desc: `For ${s}, start with simple geometric guides. For a cake: draw a wide rectangle for the base tier, a smaller rectangle centred on top for the second tier. For a pizza: draw a circle. For fruit: start with the appropriate oval/circle shape. Keep these very light.`,
      },
      {
        title: "Main Structure",
        desc: `Refine the ${s} outline from your guides. For a cake: add slight curves to soften the rectangular tiers, add an ellipse top surface to give the 3D effect, draw a plate ellipse at the base. For pizza: add irregular crust edge. Make the shape feel appetizing!`,
      },
      {
        title: "Textures & Toppings",
        desc: `Now the fun part — add all the delicious details to ${s}! For cake: draw wavy frosting drips down the sides, add candles on top with small flame shapes, draw texture lines on each tier to suggest different cake flavours. For pizza: add toppings, sauce swirls, and cheese blobs.`,
      },
      mode === "outline"
        ? {
            title: "Final Line Art",
            desc: `Go over your ${s} drawing with confident dark lines. Use thicker lines for the outer shape and thinner decorative lines for frosting patterns or texture details. A clean line drawing of food looks elegant and appetizing.`,
          }
        : mode === "pencil"
          ? {
              title: "Light & Shadow",
              desc: `Shade ${s} in pencil. Imagine light coming from the top-left. The front-facing sides are lighter, the undersides and sides in shadow are darker. Use gentle hatching on frosting areas, heavier shading under tiers and around the plate.`,
            }
          : {
              title: "Delicious Colours",
              desc: `Colour ${s} with vibrant, mouth-watering colours! For cake: golden/cream sponge layers, white or pastel frosting, bright coloured candles. For pizza: warm reds, oranges, and yellows. Make it look so good you want to eat it! Add a white highlight line on the frosting.`,
            },
      {
        title: "Final Touches",
        desc: `Add the finishing details to your ${s}: a tiny highlight on the icing to make it look glossy, final candle flames, a shadow beneath the plate to ground it. Step back and admire your delicious artwork! 🎉`,
      },
    ],
    human: [
      {
        title: "Head Construction",
        desc: `Draw a vertical oval for ${s}'s head. Add a vertical centre line and divide it horizontally at the mid-point — eyes sit here. Add a line halfway between the eye line and chin for the nose, and halfway again for the mouth. Lightly sketch the jaw shape.`,
      },
      {
        title: "Face Outline & Neck",
        desc: `Refine the head shape of ${s}: wider at the temples, narrowing at the cheeks, with a defined jawline and chin. Add the neck below — width roughly matching the jaw. The ears sit between the eye and nose guide lines on the sides of the head. Erase construction ovals.`,
      },
      {
        title: "Facial Features",
        desc: `Place the features of ${s} along the guide lines. Eyes: almond shapes on the eye line, with irises and pupils. Nose: simple bridge and nostril shapes at the nose line. Mouth: upper lip M-shape, lower lip curve at the mouth line. Eyebrows above the eyes. Add hair outline.`,
      },
      mode === "outline"
        ? {
            title: "Line Weight",
            desc: `Finalize ${s}'s portrait with varied line weights. Thicker lines define the outer face, eyes, and hair. Thinner, lighter lines for nose and lip details. This contrast gives portraits depth and realism without shading.`,
          }
        : mode === "pencil"
          ? {
              title: "Portrait Shading",
              desc: `Shade ${s}'s face with smooth pencil gradients. Dark: under the brow ridge, down the side of the nose, under the lower lip, along the jaw. Use a blending stump for skin areas. Hair should be darkest, with lighter strands drawn with individual strokes.`,
            }
          : {
              title: "Skin & Hair Tones",
              desc: `Apply colour to ${s}'s portrait. Start with a base skin tone, then add a warmer blush on the cheeks and cooler shadow tone on the sides of the face. Colour the eyes distinctly — iris ring, dark pupil, white sclera, pink tear duct. Colour hair from root (darker) to tip (lighter).`,
            },
      {
        title: "Final Touches",
        desc: `Add the last details to ${s}'s portrait: a bright catchlight dot in each eye to bring them to life, subtle eyelashes along the upper lid, refined eyebrows. Check that facial features are symmetrical and the expression reads clearly. Beautiful work! 🎉`,
      },
    ],
    object: [
      {
        title: "Basic Geometry",
        desc: `Break ${s} into its simplest geometric shapes. A house = rectangle + triangle. A car = rectangle with smaller rectangle cab + 2 circles for wheels. A tree = triangle + rectangle trunk. Draw these guide shapes lightly to establish proportions and placement.`,
      },
      {
        title: "Refined Outline",
        desc: `Transform the guide shapes of ${s} into a more realistic outline. Round corners where needed, add perspective lines if drawing at an angle, refine the overall silhouette. For a house: add a chimney, define the roofline. For a car: curve the roof, add bumpers.`,
      },
      {
        title: "Details & Features",
        desc: `Add the characteristic details that make ${s} identifiable. For a house: windows with cross panes, a door with a handle, brick texture lines on the walls. For a car: windshield, side windows, wheel rims, headlights. These details transform a shape into a recognizable object.`,
      },
      mode === "outline"
        ? {
            title: "Technical Lines",
            desc: `Draw the final outline of ${s} with clean, confident strokes. Use a ruler for straight edges if needed. Thicker lines for main structural edges, thinner for surface details. Objects look great as precise, clean line drawings.`,
          }
        : mode === "pencil"
          ? {
              title: "Texture & Shadow",
              desc: `Add shading to ${s}. Decide on a light source direction and shade accordingly. For a house: one wall in shadow, the roof slightly darker. Use hatching for brick/surface texture. Shade beneath the object to create a ground shadow.`,
            }
          : {
              title: "Colours & Materials",
              desc: `Colour ${s} to show its materials. For a house: warm brick red walls, grey roof tiles, cream window frames, brown wooden door. For a car: bold body colour with darker shadow tones on the underside, grey tyre rubber, silver rims. Add a sky or ground to complete the scene.`,
            },
      {
        title: "Final Touches",
        desc: `Complete your drawing of ${s} with final refinements: add cast shadows on the ground beneath the object, any remaining small details, and clean up the linework. Consider adding a simple environment — a path, clouds, or trees. Excellent work! 🎉`,
      },
    ],
    default: [
      {
        title: "Basic Shapes",
        desc: `Start with light pencil strokes. Block in the basic geometric shapes for ${s} — circles for rounded forms, rectangles for main body sections. Keep your lines very faint, this is just a guide.`,
      },
      {
        title: "Main Outline",
        desc: `Using your guide shapes, draw the main ${s} outline. Connect the basic shapes with smooth, flowing lines. Focus on the overall silhouette before adding any details. Erase the guide lines.`,
      },
      {
        title: "Add Details",
        desc: `Now add the character details of ${s} — distinctive features, textures, patterns, or markings. Work from large details to small ones. Stay light-handed at this stage.`,
      },
      mode === "outline"
        ? {
            title: "Refine the Outline",
            desc: "Go over your outline with confident, darker strokes. Clean up any rough lines. Use varying line weights — thicker for shadows, thinner for highlights.",
          }
        : mode === "pencil"
          ? {
              title: "Pencil Shading",
              desc: `Apply B&W shading to ${s}. Use hatching and cross-hatching for dark areas. Leave highlights white. Build value gradually — start very light, then layer darker.`,
            }
          : {
              title: "Apply Colour",
              desc: `Time to colour ${s}! Start with flat base colours. Work from light to dark, adding shadows and highlights. Blend colours at edges for a smooth finish.`,
            },
      {
        title: "Final Touches",
        desc: `Review your drawing of ${s} and make final refinements. Add any missing details, sharpen important edges, soften others. Sign your work! 🎉`,
      },
    ],
  };

  return stepsByCategory[category];
}

// --- SVG components per category ---

function AnimeSVG({
  step,
  mode,
}: { step: number; mode: TutorialConfig["mode"] }) {
  const stroke =
    mode === "pencil" ? "#444" : mode === "outline" ? "#111" : "#1a1a2e";
  const sw = mode === "outline" ? 2.5 : 2;
  const skinFill = mode === "colour" ? "#FFDAB9" : "none";
  const clothFill = mode === "colour" ? "#FF6B00" : "none";
  const hairFill = mode === "colour" ? "#FFD700" : "none";

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      height="100%"
      style={{ maxHeight: 340 }}
      role="img"
      aria-label="anime character tutorial"
    >
      <title>Anime character drawing step {step}</title>
      <rect width="400" height="340" fill="white" />

      {/* Step 1: guide circle + body rectangle */}
      {step >= 1 && (
        <g stroke="#ccc" strokeWidth="1" strokeDasharray="5 3" fill="none">
          <circle cx="200" cy="75" r="40" />
          <rect x="170" y="120" width="60" height="100" />
          {/* hair spike guides */}
          <line x1="200" y1="35" x2="195" y2="10" />
          <line x1="200" y1="35" x2="218" y2="8" />
          <line x1="200" y1="35" x2="230" y2="20" />
          <line x1="200" y1="35" x2="175" y2="12" />
          <line x1="200" y1="35" x2="162" y2="25" />
        </g>
      )}

      {/* Step 2: main body outline */}
      {step >= 2 && (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          {/* Head */}
          <path
            d="M162 75 Q162 35 200 33 Q238 35 238 75 Q238 108 220 115 L200 118 L180 115 Q162 108 162 75Z"
            fill={skinFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Spiky hair */}
          <path
            d="M165 65 Q160 45 168 30 Q178 15 185 20 Q188 10 195 8 Q200 5 200 8 Q202 4 210 8 Q216 5 218 12 Q228 6 232 20 Q240 30 238 50"
            fill={hairFill !== "none" ? hairFill : "none"}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Torso */}
          <path
            d="M178 118 L168 130 L165 230 L235 230 L232 130 L222 118Z"
            fill={clothFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Arms */}
          <path
            d="M168 135 Q145 165 140 195"
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
          <path
            d="M232 135 Q255 165 260 195"
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
          {/* Legs */}
          <path
            d="M185 230 Q183 270 180 300"
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
          <path
            d="M215 230 Q217 270 220 300"
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
        </g>
      )}

      {/* Step 3: face details */}
      {step >= 3 && (
        <g stroke={stroke} strokeWidth={1.5}>
          {/* Eyes - large anime style */}
          <ellipse
            cx="185"
            cy="78"
            rx="9"
            ry="11"
            fill={mode === "colour" ? "#6AA" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <ellipse
            cx="215"
            cy="78"
            rx="9"
            ry="11"
            fill={mode === "colour" ? "#6AA" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <ellipse cx="185" cy="80" rx="5" ry="6" fill={stroke} />
          <ellipse cx="215" cy="80" rx="5" ry="6" fill={stroke} />
          {/* Nose */}
          <path
            d="M198 92 L202 98 L196 98"
            fill="none"
            stroke={stroke}
            strokeWidth={1}
          />
          {/* Mouth - small smile */}
          <path
            d="M191 108 Q200 114 209 108"
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Whisker marks */}
          <line
            x1="162"
            y1="95"
            x2="178"
            y2="92"
            stroke={stroke}
            strokeWidth={1}
          />
          <line
            x1="162"
            y1="100"
            x2="178"
            y2="100"
            stroke={stroke}
            strokeWidth={1}
          />
          <line
            x1="222"
            y1="92"
            x2="238"
            y2="95"
            stroke={stroke}
            strokeWidth={1}
          />
          <line
            x1="222"
            y1="100"
            x2="238"
            y2="100"
            stroke={stroke}
            strokeWidth={1}
          />
          {/* Headband */}
          <rect
            x="158"
            y="58"
            width="84"
            height="12"
            rx="3"
            fill={mode === "colour" ? "#334" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Headband symbol */}
          <circle
            cx="200"
            cy="64"
            r="4"
            fill="none"
            stroke={mode === "colour" ? "#aaa" : stroke}
            strokeWidth={1}
          />
          <path
            d="M196 64 L200 60 L204 64"
            fill="none"
            stroke={mode === "colour" ? "#aaa" : stroke}
            strokeWidth={0.8}
          />
        </g>
      )}

      {/* Step 4: shading/colour */}
      {step >= 4 && mode === "pencil" && (
        <g opacity="0.4">
          {[0, 3, 6, 9, 12].map((d) => (
            <line
              key={d}
              x1={170 + d}
              y1={130}
              x2={163 + d}
              y2={155}
              stroke="#888"
              strokeWidth="0.7"
            />
          ))}
          {[0, 3, 6, 9].map((d) => (
            <line
              key={d}
              x1={225 + d}
              y1={130}
              x2={232 + d}
              y2={155}
              stroke="#888"
              strokeWidth="0.7"
            />
          ))}
          <path
            d="M162 75 Q155 85 162 100"
            fill="none"
            stroke="#aaa"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>
      )}
      {step >= 4 && mode === "colour" && (
        <g>
          <ellipse
            cx="175"
            cy="100"
            rx="9"
            ry="5"
            fill="#FFB6C1"
            opacity="0.5"
          />
          <ellipse
            cx="225"
            cy="100"
            rx="9"
            ry="5"
            fill="#FFB6C1"
            opacity="0.5"
          />
          <path
            d="M165 230 Q160 265 158 300 L185 300 L185 230Z"
            fill="#FF6B00"
            opacity="0.9"
          />
          <path
            d="M215 230 Q220 265 222 300 L248 300 L235 230Z"
            fill="#FF6B00"
            opacity="0.9"
          />
        </g>
      )}

      {/* Step 5: final */}
      {step >= 5 && (
        <g>
          <circle cx="179" cy="72" r="2.5" fill="white" />
          <circle cx="209" cy="72" r="2.5" fill="white" />
          {/* Energy lines */}
          {[30, 60, 90, 120, 150, 210, 240, 270, 300, 330].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + Math.cos(rad) * 130;
            const y1 = 170 + Math.sin(rad) * 110;
            const x2 = 200 + Math.cos(rad) * 145;
            const y2 = 170 + Math.sin(rad) * 122;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={mode === "colour" ? "#FFD700" : "#ccc"}
                strokeWidth="1.5"
              />
            );
          })}
          <text
            x="330"
            y="325"
            fontSize="11"
            fill="#ccc"
            fontFamily="sans-serif"
          >
            ✓ Done!
          </text>
        </g>
      )}
    </svg>
  );
}

function AnimalSVG({
  step,
  mode,
}: { step: number; mode: TutorialConfig["mode"] }) {
  const stroke =
    mode === "pencil" ? "#555" : mode === "outline" ? "#222" : "#3a2a0a";
  const sw = mode === "outline" ? 2.5 : 2;
  const bodyFill = mode === "colour" ? "#D2B48C" : "none";
  const hornFill = mode === "colour" ? "#8B6914" : "none";

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      height="100%"
      style={{ maxHeight: 340 }}
      role="img"
      aria-label="animal tutorial"
    >
      <title>Animal drawing step {step}</title>
      <rect width="400" height="340" fill="white" />

      {step >= 1 && (
        <g stroke="#ccc" strokeWidth="1" strokeDasharray="5 3" fill="none">
          {/* Body oval */}
          <ellipse cx="210" cy="185" rx="110" ry="65" />
          {/* Head circle */}
          <circle cx="95" cy="155" r="45" />
          {/* Muzzle */}
          <ellipse cx="70" cy="165" rx="22" ry="16" />
        </g>
      )}

      {step >= 2 && (
        <g stroke={stroke} strokeWidth={sw} fill="none">
          {/* Body */}
          <ellipse
            cx="210"
            cy="185"
            rx="110"
            ry="65"
            fill={bodyFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Head */}
          <circle
            cx="95"
            cy="155"
            r="45"
            fill={bodyFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Neck connection */}
          <path
            d="M105 195 Q130 205 140 195"
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
          {/* Muzzle */}
          <ellipse
            cx="68"
            cy="165"
            rx="22"
            ry="16"
            fill={mode === "colour" ? "#E8D5B0" : "none"}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Legs */}
          <rect
            x="130"
            y="238"
            width="22"
            height="70"
            rx="4"
            fill={bodyFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          <rect
            x="162"
            y="238"
            width="22"
            height="70"
            rx="4"
            fill={bodyFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          <rect
            x="238"
            y="238"
            width="22"
            height="70"
            rx="4"
            fill={bodyFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          <rect
            x="270"
            y="238"
            width="22"
            height="70"
            rx="4"
            fill={bodyFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Tail */}
          <path
            d="M318 165 Q340 145 335 125 Q328 110 320 120"
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
          />
        </g>
      )}

      {step >= 3 && (
        <g stroke={stroke} strokeWidth={1.5}>
          {/* Eye */}
          <ellipse
            cx="80"
            cy="148"
            rx="7"
            ry="6"
            fill={mode === "colour" ? "#8B6914" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <ellipse cx="80" cy="149" rx="3" ry="4" fill={stroke} />
          {/* Nostril */}
          <ellipse cx="58" cy="168" rx="4" ry="3" fill={stroke} opacity="0.6" />
          {/* Ear */}
          <path
            d="M100 115 Q95 92 108 88 Q118 90 115 110"
            fill={mode === "colour" ? "#C8A87A" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Horns */}
          <path
            d="M108 112 Q112 88 106 72"
            fill={hornFill}
            stroke={stroke}
            strokeWidth={2}
          />
          <path
            d="M120 110 Q128 86 125 70"
            fill={hornFill}
            stroke={stroke}
            strokeWidth={2}
          />
          {/* Beard */}
          <path
            d="M60 178 Q62 195 68 200 Q72 195 74 178"
            fill={mode === "colour" ? "#BBA060" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Hoof details */}
          {[130, 162, 238, 270].map((x) => (
            <line
              key={x}
              x1={x + 11}
              y1={295}
              x2={x + 11}
              y2={308}
              stroke={stroke}
              strokeWidth={1.5}
            />
          ))}
        </g>
      )}

      {step >= 4 && mode === "pencil" && (
        <g opacity="0.35">
          {[0, 4, 8, 12, 16].map((d) => (
            <line
              key={d}
              x1={100 + d}
              y1={180}
              x2={100 + d}
              y2={200}
              stroke="#888"
              strokeWidth="0.8"
            />
          ))}
          <ellipse
            cx="210"
            cy="220"
            rx="100"
            ry="15"
            fill="#ccc"
            opacity="0.3"
          />
        </g>
      )}
      {step >= 4 && mode === "colour" && (
        <g>
          {/* Shadow under belly */}
          <ellipse
            cx="210"
            cy="240"
            rx="100"
            ry="12"
            fill="#B89060"
            opacity="0.3"
          />
          {/* Ear inner pink */}
          <path
            d="M103 112 Q107 94 110 90 Q114 92 112 108"
            fill="#FFB6C1"
            opacity="0.7"
            stroke="none"
          />
        </g>
      )}

      {step >= 5 && (
        <g>
          {/* Eye highlight */}
          <circle cx="77" cy="145" r="2" fill="white" />
          {/* Ground shadow */}
          <ellipse
            cx="200"
            cy="315"
            rx="130"
            ry="8"
            fill="#ddd"
            opacity="0.5"
          />
          <text
            x="330"
            y="335"
            fontSize="11"
            fill="#ccc"
            fontFamily="sans-serif"
          >
            ✓ Done!
          </text>
        </g>
      )}
    </svg>
  );
}

function FoodSVG({
  step,
  mode,
}: { step: number; mode: TutorialConfig["mode"] }) {
  const stroke =
    mode === "pencil" ? "#555" : mode === "outline" ? "#222" : "#5a2a0a";
  const sw = mode === "outline" ? 2.5 : 2;
  const tier1Fill = mode === "colour" ? "#F5DEB3" : "none";
  const tier2Fill = mode === "colour" ? "#FFE4B5" : "none";
  const frostFill = mode === "colour" ? "#FFFAF0" : "none";

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      height="100%"
      style={{ maxHeight: 340 }}
      role="img"
      aria-label="food tutorial"
    >
      <title>Food drawing step {step}</title>
      <rect width="400" height="340" fill="white" />

      {step >= 1 && (
        <g stroke="#ccc" strokeWidth="1" strokeDasharray="5 3" fill="none">
          {/* Base tier guide */}
          <rect x="110" y="200" width="180" height="80" />
          {/* Top tier guide */}
          <rect x="140" y="130" width="120" height="75" />
          {/* Plate guide */}
          <ellipse cx="200" cy="285" rx="105" ry="15" />
        </g>
      )}

      {step >= 2 && (
        <g stroke={stroke} strokeWidth={sw}>
          {/* Plate */}
          <ellipse
            cx="200"
            cy="285"
            rx="105"
            ry="15"
            fill={mode === "colour" ? "#F0F0F0" : "none"}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Base tier */}
          <path
            d="M112 200 L112 278 Q112 285 200 285 Q288 285 288 278 L288 200 Z"
            fill={tier1Fill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Top tier */}
          <path
            d="M142 130 L142 202 Q142 207 200 207 Q258 207 258 202 L258 130 Z"
            fill={tier2Fill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Top surface ellipse */}
          <ellipse
            cx="200"
            cy="130"
            rx="58"
            ry="12"
            fill={mode === "colour" ? "#FFF8E1" : "none"}
            stroke={stroke}
            strokeWidth={sw}
          />
        </g>
      )}

      {step >= 3 && (
        <g stroke={stroke} strokeWidth={1.5}>
          {/* Frosting drips on top tier */}
          {[155, 175, 200, 225, 245].map((x, i) => (
            <path
              key={x}
              d={`M${x} 140 Q${x + (i % 2 === 0 ? -4 : 4)} ${148 + i * 2} ${x} ${156 + i * 2}`}
              fill={frostFill}
              stroke={stroke}
              strokeWidth={1.5}
            />
          ))}
          {/* Frosting drips on base tier */}
          {[125, 148, 170, 200, 230, 255, 278].map((x, i) => (
            <path
              key={x}
              d={`M${x} 205 Q${x + (i % 2 === 0 ? -5 : 5)} ${213 + i} ${x} ${220 + i * 1.5}`}
              fill={frostFill}
              stroke={stroke}
              strokeWidth={1.5}
            />
          ))}
          {/* Candles */}
          <rect
            x="175"
            y="100"
            width="10"
            height="32"
            rx="2"
            fill={mode === "colour" ? "#FF6B9D" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <rect
            x="200"
            y="94"
            width="10"
            height="38"
            rx="2"
            fill={mode === "colour" ? "#FFD700" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <rect
            x="225"
            y="100"
            width="10"
            height="32"
            rx="2"
            fill={mode === "colour" ? "#6BCB77" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Flames */}
          <ellipse
            cx="180"
            cy="96"
            rx="5"
            ry="7"
            fill={mode === "colour" ? "#FF6B00" : "none"}
            stroke={stroke}
            strokeWidth={1}
          />
          <ellipse
            cx="205"
            cy="90"
            rx="5"
            ry="7"
            fill={mode === "colour" ? "#FFD700" : "none"}
            stroke={stroke}
            strokeWidth={1}
          />
          <ellipse
            cx="230"
            cy="96"
            rx="5"
            ry="7"
            fill={mode === "colour" ? "#FF4040" : "none"}
            stroke={stroke}
            strokeWidth={1}
          />
          {/* Decorations */}
          <circle
            cx="155"
            cy="165"
            r="6"
            fill={mode === "colour" ? "#FF6B9D" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <circle
            cx="245"
            cy="165"
            r="6"
            fill={mode === "colour" ? "#6BCB77" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Tier line texture */}
          <line
            x1="112"
            y1="240"
            x2="288"
            y2="240"
            stroke={stroke}
            strokeWidth={0.8}
            strokeDasharray="8 5"
          />
        </g>
      )}

      {step >= 4 && mode === "pencil" && (
        <g opacity="0.4">
          {[0, 5, 10, 15, 20, 25].map((d) => (
            <line
              key={d}
              x1={112}
              y1={205 + d}
              x2={125}
              y2={205 + d}
              stroke="#aaa"
              strokeWidth="0.7"
            />
          ))}
          <rect
            x="112"
            y="200"
            width="20"
            height="78"
            fill="#bbb"
            opacity="0.3"
          />
          <rect
            x="268"
            y="200"
            width="20"
            height="78"
            fill="#bbb"
            opacity="0.3"
          />
        </g>
      )}
      {step >= 4 && mode === "colour" && (
        <g>
          {/* Highlight line on frosting */}
          <path
            d="M145 132 Q180 126 215 132"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            opacity="0.7"
          />
          <path
            d="M115 202 Q155 196 200 202 Q245 196 285 202"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>
      )}

      {step >= 5 && (
        <g>
          {/* Glossy highlight on plate */}
          <path
            d="M145 281 Q175 275 195 281"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.6"
          />
          {/* Shadow under plate */}
          <ellipse
            cx="200"
            cy="298"
            rx="100"
            ry="8"
            fill="#ddd"
            opacity="0.5"
          />
          <text
            x="330"
            y="330"
            fontSize="11"
            fill="#ccc"
            fontFamily="sans-serif"
          >
            ✓ Done!
          </text>
        </g>
      )}
    </svg>
  );
}

function HumanFaceSVG({
  step,
  mode,
}: { step: number; mode: TutorialConfig["mode"] }) {
  const stroke =
    mode === "pencil" ? "#555" : mode === "outline" ? "#222" : "#2E1A0E";
  const sw = mode === "outline" ? 2.5 : 2;
  const skinFill = mode === "colour" ? "#FDDCB5" : "none";
  const hairFill = mode === "colour" ? "#5C3317" : "none";

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      height="100%"
      style={{ maxHeight: 340 }}
      role="img"
      aria-label="face portrait tutorial"
    >
      <title>Face drawing step {step}</title>
      <rect width="400" height="340" fill="white" />

      {step >= 1 && (
        <g stroke="#ccc" strokeWidth="1" strokeDasharray="5 3" fill="none">
          {/* Head oval */}
          <ellipse cx="200" cy="165" rx="90" ry="110" />
          {/* Centre line */}
          <line x1="200" y1="55" x2="200" y2="275" />
          {/* Eye line */}
          <line x1="110" y1="165" x2="290" y2="165" />
          {/* Nose line */}
          <line x1="110" y1="205" x2="290" y2="205" />
          {/* Mouth line */}
          <line x1="110" y1="230" x2="290" y2="230" />
        </g>
      )}

      {step >= 2 && (
        <g stroke={stroke} strokeWidth={sw}>
          {/* Face shape */}
          <path
            d="M120 140 Q110 165 118 195 Q128 235 160 258 Q180 270 200 270 Q220 270 240 258 Q272 235 282 195 Q290 165 280 140 Q268 100 200 92 Q132 100 120 140Z"
            fill={skinFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Ears */}
          <path
            d="M112 155 Q100 165 108 185 Q112 190 118 185"
            fill={skinFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          <path
            d="M288 155 Q300 165 292 185 Q288 190 282 185"
            fill={skinFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Neck */}
          <path
            d="M170 265 L165 310"
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
          <path
            d="M230 265 L235 310"
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
        </g>
      )}

      {step >= 3 && (
        <g stroke={stroke} strokeWidth={1.5}>
          {/* Eyes */}
          <path
            d="M148 165 Q165 155 182 165 Q165 175 148 165Z"
            fill={mode === "colour" ? "#fff" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <path
            d="M218 165 Q235 155 252 165 Q235 175 218 165Z"
            fill={mode === "colour" ? "#fff" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <circle
            cx="165"
            cy="165"
            r="8"
            fill={mode === "colour" ? "#7B4F2E" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <circle
            cx="235"
            cy="165"
            r="8"
            fill={mode === "colour" ? "#7B4F2E" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <circle cx="165" cy="165" r="4" fill={stroke} />
          <circle cx="235" cy="165" r="4" fill={stroke} />
          {/* Eyebrows */}
          <path
            d="M145 150 Q165 142 183 148"
            fill="none"
            stroke={stroke}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d="M217 148 Q235 142 255 150"
            fill="none"
            stroke={stroke}
            strokeWidth={2}
            strokeLinecap="round"
          />
          {/* Nose */}
          <path
            d="M193 185 Q188 205 193 208 Q200 212 207 208 Q212 205 207 185"
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Mouth */}
          <path
            d="M175 232 Q188 225 200 228 Q212 225 225 232"
            fill="none"
            stroke={stroke}
            strokeWidth={2}
          />
          <path
            d="M178 232 Q200 245 222 232"
            fill={mode === "colour" ? "#E07070" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Hair */}
          <path
            d="M120 138 Q128 90 160 78 Q180 68 200 66 Q220 68 240 78 Q272 90 280 138 Q255 110 200 108 Q145 110 120 138Z"
            fill={hairFill}
            stroke={stroke}
            strokeWidth={sw}
          />
        </g>
      )}

      {step >= 4 && mode === "pencil" && (
        <g opacity="0.4">
          {/* Shadow side of face */}
          <path
            d="M120 140 Q112 165 120 200 Q128 225 145 240"
            fill="none"
            stroke="#999"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.3"
          />
          {/* Under-nose shadow */}
          <ellipse cx="200" cy="212" rx="14" ry="4" fill="#aaa" opacity="0.5" />
          {/* Under-lip shadow */}
          <ellipse cx="200" cy="244" rx="20" ry="5" fill="#aaa" opacity="0.4" />
        </g>
      )}
      {step >= 4 && mode === "colour" && (
        <g>
          <ellipse
            cx="155"
            cy="195"
            rx="14"
            ry="8"
            fill="#FFB6A0"
            opacity="0.5"
          />
          <ellipse
            cx="245"
            cy="195"
            rx="14"
            ry="8"
            fill="#FFB6A0"
            opacity="0.5"
          />
          {/* Ear inner */}
          <path
            d="M113 158 Q106 165 111 178"
            fill="none"
            stroke="#FFB6A0"
            strokeWidth="3"
            opacity="0.7"
          />
          <path
            d="M287 158 Q294 165 289 178"
            fill="none"
            stroke="#FFB6A0"
            strokeWidth="3"
            opacity="0.7"
          />
        </g>
      )}

      {step >= 5 && (
        <g>
          <circle cx="160" cy="159" r="3" fill="white" />
          <circle cx="230" cy="159" r="3" fill="white" />
          {/* Eyelashes */}
          {[148, 154, 160, 167, 174, 180].map((x) => (
            <line
              key={x}
              x1={x}
              y1={158}
              x2={x - 2}
              y2={150}
              stroke={stroke}
              strokeWidth="1"
            />
          ))}
          {[218, 224, 230, 237, 244, 250].map((x) => (
            <line
              key={x}
              x1={x}
              y1={158}
              x2={x + 2}
              y2={150}
              stroke={stroke}
              strokeWidth="1"
            />
          ))}
          <text
            x="330"
            y="330"
            fontSize="11"
            fill="#ccc"
            fontFamily="sans-serif"
          >
            ✓ Done!
          </text>
        </g>
      )}
    </svg>
  );
}

function ObjectSVG({
  step,
  mode,
}: { step: number; mode: TutorialConfig["mode"] }) {
  const stroke =
    mode === "pencil" ? "#555" : mode === "outline" ? "#222" : "#3a2010";
  const sw = mode === "outline" ? 2.5 : 2;
  const wallFill = mode === "colour" ? "#D2691E" : "none";
  const roofFill = mode === "colour" ? "#8B2222" : "none";
  const doorFill = mode === "colour" ? "#8B4513" : "none";
  const winFill = mode === "colour" ? "#ADD8E6" : "none";

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      height="100%"
      style={{ maxHeight: 340 }}
      role="img"
      aria-label="object tutorial"
    >
      <title>Object drawing step {step}</title>
      <rect width="400" height="340" fill="white" />

      {step >= 1 && (
        <g stroke="#ccc" strokeWidth="1" strokeDasharray="5 3" fill="none">
          {/* House body */}
          <rect x="100" y="165" width="200" height="130" />
          {/* Roof triangle */}
          <polygon points="80,165 200,65 320,165" />
          {/* Chimney */}
          <rect x="240" y="80" width="28" height="55" />
        </g>
      )}

      {step >= 2 && (
        <g stroke={stroke} strokeWidth={sw}>
          {/* Walls */}
          <rect
            x="100"
            y="165"
            width="200"
            height="130"
            fill={wallFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Roof */}
          <polygon
            points="80,165 200,65 320,165"
            fill={roofFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Chimney */}
          <rect
            x="240"
            y="82"
            width="28"
            height="55"
            fill={roofFill}
            stroke={stroke}
            strokeWidth={sw}
          />
          {/* Ground line */}
          <line
            x1="60"
            y1="295"
            x2="340"
            y2="295"
            stroke={stroke}
            strokeWidth={sw}
          />
        </g>
      )}

      {step >= 3 && (
        <g stroke={stroke} strokeWidth={1.5}>
          {/* Door */}
          <path
            d="M178 295 L178 235 Q178 225 190 225 Q202 225 202 235 L202 295Z"
            fill={doorFill}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Door handle */}
          <circle
            cx="198"
            cy="263"
            r="4"
            fill={mode === "colour" ? "#FFD700" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Left window */}
          <rect
            x="115"
            y="185"
            width="50"
            height="45"
            rx="3"
            fill={winFill}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <line
            x1="140"
            y1="185"
            x2="140"
            y2="230"
            stroke={stroke}
            strokeWidth={1}
          />
          <line
            x1="115"
            y1="207"
            x2="165"
            y2="207"
            stroke={stroke}
            strokeWidth={1}
          />
          {/* Right window */}
          <rect
            x="235"
            y="185"
            width="50"
            height="45"
            rx="3"
            fill={winFill}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <line
            x1="260"
            y1="185"
            x2="260"
            y2="230"
            stroke={stroke}
            strokeWidth={1}
          />
          <line
            x1="235"
            y1="207"
            x2="285"
            y2="207"
            stroke={stroke}
            strokeWidth={1}
          />
          {/* Chimney smoke */}
          <path
            d="M252 80 Q248 65 255 55 Q260 42 254 32"
            fill="none"
            stroke="#bbb"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {/* Roof ridge line */}
          <line
            x1="200"
            y1="65"
            x2="200"
            y2="165"
            stroke={stroke}
            strokeWidth={0.8}
            strokeDasharray="4 3"
          />
          {/* Brick texture suggestion */}
          {[180, 200, 220, 240, 260].map((y) => (
            <line
              key={y}
              x1="100"
              y1={y}
              x2="300"
              y2={y}
              stroke={stroke}
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}
        </g>
      )}

      {step >= 4 && mode === "pencil" && (
        <g opacity="0.4">
          {/* Right wall shadow */}
          <rect
            x="280"
            y="165"
            width="20"
            height="130"
            fill="#aaa"
            opacity="0.4"
          />
          {/* Roof shadow right side */}
          <polygon points="200,65 320,165 300,165" fill="#aaa" opacity="0.3" />
        </g>
      )}
      {step >= 4 && mode === "colour" && (
        <g>
          {/* Sky gradient suggestion */}
          <rect
            x="60"
            y="40"
            width="280"
            height="30"
            fill="#87CEEB"
            opacity="0.2"
            rx="4"
          />
          {/* Window light */}
          <rect
            x="116"
            y="186"
            width="48"
            height="43"
            fill="#FFFACD"
            opacity="0.3"
            rx="2"
          />
          <rect
            x="236"
            y="186"
            width="48"
            height="43"
            fill="#FFFACD"
            opacity="0.3"
            rx="2"
          />
          {/* Highlight on roof */}
          <line
            x1="82"
            y1="163"
            x2="200"
            y2="67"
            stroke="white"
            strokeWidth="3"
            opacity="0.4"
          />
        </g>
      )}

      {step >= 5 && (
        <g>
          {/* Ground shadow */}
          <ellipse
            cx="200"
            cy="298"
            rx="130"
            ry="8"
            fill="#ddd"
            opacity="0.5"
          />
          {/* Path to door */}
          <path
            d="M178 295 L160 320 M202 295 L220 320"
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Tree silhouette left */}
          <circle
            cx="75"
            cy="240"
            r="22"
            fill={mode === "colour" ? "#228B22" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <rect
            x="71"
            y="260"
            width="8"
            height="35"
            fill={mode === "colour" ? "#8B4513" : "none"}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <text
            x="330"
            y="330"
            fontSize="11"
            fill="#ccc"
            fontFamily="sans-serif"
          >
            ✓ Done!
          </text>
        </g>
      )}
    </svg>
  );
}

function DefaultSVG({
  step,
  mode,
  subject,
}: { step: number; mode: TutorialConfig["mode"]; subject: string }) {
  const strokeColor =
    mode === "pencil" ? "#555" : mode === "outline" ? "#222" : "#2E6BFF";
  const fillHead = mode === "colour" ? "#FFDAB9" : "none";
  const fillBody = mode === "colour" ? "#87CEEB" : "none";
  const strokeWidth = mode === "outline" ? 2 : 1.5;

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      height="100%"
      style={{ maxHeight: 340 }}
      role="img"
      aria-label={`${subject} drawing tutorial`}
    >
      <title>
        {subject} drawing tutorial step {step}
      </title>
      <rect width="400" height="340" fill="white" />
      {step >= 1 && (
        <g stroke="#bbb" strokeWidth="1" strokeDasharray="4 3" fill="none">
          <circle cx="200" cy="80" r="45" />
          <rect x="165" y="130" width="70" height="100" />
        </g>
      )}
      {step >= 2 && (
        <g>
          <circle
            cx="200"
            cy="80"
            r="45"
            fill={fillHead}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d="M170 138 Q160 180 162 232 Q185 245 215 245 Q238 232 238 182 L230 138 Z"
            fill={fillBody}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d="M170 145 Q140 175 138 200"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d="M230 145 Q260 175 262 200"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d="M185 245 Q183 285 180 310"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d="M215 245 Q217 285 220 310"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </g>
      )}
      {step >= 3 && (
        <g>
          <ellipse
            cx="185"
            cy="76"
            rx="7"
            ry="8"
            fill={mode === "colour" ? "#4A3728" : "none"}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <ellipse
            cx="215"
            cy="76"
            rx="7"
            ry="8"
            fill={mode === "colour" ? "#4A3728" : "none"}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <circle cx="187" cy="77" r="3" fill={strokeColor} />
          <circle cx="217" cy="77" r="3" fill={strokeColor} />
          <path
            d="M197 85 Q200 95 203 85"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth - 0.5}
          />
          <path
            d="M188 100 Q200 110 212 100"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d="M156 68 Q170 35 200 32 Q230 35 244 68"
            fill={mode === "colour" ? "#6B4C2A" : "none"}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </g>
      )}
      {step >= 4 && mode === "colour" && (
        <g>
          <circle cx="200" cy="80" r="45" fill="#FFDAB9" opacity="0.7" />
          <path
            d="M170 138 Q160 180 162 232 Q185 245 215 245 Q238 232 238 182 L230 138 Z"
            fill="#87CEEB"
            opacity="0.7"
          />
          <ellipse
            cx="175"
            cy="96"
            rx="10"
            ry="6"
            fill="#FFB6C1"
            opacity="0.5"
          />
          <ellipse
            cx="225"
            cy="96"
            rx="10"
            ry="6"
            fill="#FFB6C1"
            opacity="0.5"
          />
        </g>
      )}
      {step >= 5 && (
        <g>
          <circle cx="182" cy="73" r="2" fill="white" />
          <circle cx="212" cy="73" r="2" fill="white" />
          <text
            x="340"
            y="320"
            fontSize="12"
            fill="#ccc"
            fontFamily="sans-serif"
          >
            ✓ Done!
          </text>
        </g>
      )}
    </svg>
  );
}

function StepSVG({
  step,
  mode,
  subject,
}: { step: number; mode: TutorialConfig["mode"]; subject: string }) {
  const category = getSubjectCategory(subject);
  if (category === "anime") return <AnimeSVG step={step} mode={mode} />;
  if (category === "animal") return <AnimalSVG step={step} mode={mode} />;
  if (category === "food") return <FoodSVG step={step} mode={mode} />;
  if (category === "human") return <HumanFaceSVG step={step} mode={mode} />;
  if (category === "object") return <ObjectSVG step={step} mode={mode} />;
  return <DefaultSVG step={step} mode={mode} subject={subject} />;
}

export function TutorialScreen({
  config,
  onComplete,
  onBack,
}: TutorialScreenProps) {
  const category = getSubjectCategory(config.subject);
  const steps = generateSteps(config.subject, config.mode, category);
  const [currentStep, setCurrentStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const goNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setAnimKey((k) => k + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setAnimKey((k) => k + 1);
    }
  }, [currentStep]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const modeLabel =
    config.mode === "pencil"
      ? "Pencil Shading (B&W)"
      : config.mode === "colour"
        ? "Colouring"
        : "Outline";

  const modeColor =
    config.mode === "pencil"
      ? "bg-gray-500/20 text-gray-300"
      : config.mode === "colour"
        ? "bg-purple-500/20 text-purple-300"
        : "bg-blue-500/20 text-blue-300";

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-[#0E1117]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-white/40 hover:text-white/80 transition-colors"
            data-ocid="tutorial.back.button"
          >
            <ChevronLeft className="w-4 h-4" />
            Exit
          </button>
          <div className="text-center">
            <h1 className="font-display font-bold text-xl text-white">
              Drawing: {config.subject}
            </h1>
            <span className={`text-xs px-2 py-0.5 rounded-full ${modeColor}`}>
              {modeLabel}
            </span>
          </div>
          <div className="text-white/40 text-sm">
            {currentStep + 1}/{steps.length}
          </div>
        </div>

        <Progress
          value={progress}
          className="h-1.5 bg-white/10 mb-6"
          data-ocid="tutorial.progress"
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-2xl relative"
            style={{ minHeight: 340 }}
          >
            {config.uploadedImage && currentStep === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src={config.uploadedImage}
                  alt="Reference"
                  className="w-full h-full object-contain opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400 text-sm font-medium">
                    Reference image
                  </p>
                </div>
              </div>
            )}
            {config.imageUrl && (
              <div className="absolute top-2 right-2 z-10 flex flex-col items-center gap-0.5">
                <img
                  src={config.imageUrl}
                  alt="Reference"
                  className="w-20 h-20 rounded-lg object-contain bg-gray-100 border border-gray-200 shadow-md"
                  style={{ opacity: 0.55 }}
                />
                <span className="text-[9px] text-gray-400 font-medium tracking-wide uppercase">
                  Reference
                </span>
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={animKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <StepSVG
                  step={currentStep + 1}
                  mode={config.mode}
                  subject={config.subject}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex-1 space-y-2">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className={`rounded-xl p-3 transition-all ${
                    i === currentStep
                      ? "glass border border-[#4FA7FF]/30 bg-[#4FA7FF]/5"
                      : i < currentStep
                        ? "opacity-40 glass-dark"
                        : "opacity-20 glass-dark"
                  }`}
                  data-ocid={`tutorial.step.item.${i + 1}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < currentStep
                          ? "bg-green-500 text-white"
                          : i === currentStep
                            ? "bg-[#4FA7FF] text-white"
                            : "bg-white/10 text-white/40"
                      }`}
                    >
                      {i < currentStep ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-semibold text-sm ${i === currentStep ? "text-white" : "text-white/50"}`}
                      >
                        {s.title}
                      </p>
                      {i === currentStep && (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-white/60 text-xs mt-1 leading-relaxed"
                        >
                          {s.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={goPrev}
                disabled={currentStep === 0}
                variant="outline"
                className="flex-1 border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
                data-ocid="tutorial.prev.button"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </Button>
              <Button
                onClick={goNext}
                className="flex-1 bg-gradient-to-r from-[#4FA7FF] to-[#7B3CFF] hover:opacity-90 text-white font-semibold"
                data-ocid="tutorial.next.button"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Complete <CheckCircle className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-white/20 text-xs text-center">
              Use arrow keys to navigate steps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
