"use client";

import { useRef, useState, type PointerEvent } from "react";
import { animals } from "@/data/vector-lesson";

const initialPosition = { size: 0.35, ferocity: 0.45 };

export default function AnimalMap() {
  const [position, setPosition] = useState(initialPosition);
  const dragging = useRef(false);
  const nearest = [...animals].sort(
    (a, b) =>
      Math.hypot(a.size - position.size, a.ferocity - position.ferocity) -
      Math.hypot(b.size - position.size, b.ferocity - position.ferocity),
  )[0];
  const distance = Math.hypot(
    nearest.size - position.size,
    nearest.ferocity - position.ferocity,
  );

  function move(event: PointerEvent<SVGSVGElement>) {
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse(),
    );
    const clamp = (value: number) =>
      Math.round(Math.max(0, Math.min(1, value)) * 100) / 100;
    setPosition({
      size: clamp((point.x - 50) / 530),
      ferocity: clamp((330 - point.y) / 270),
    });
  }

  return (
    <figure className="border-y border-neutral-200 py-6">
      <p className="text-sm font-medium text-neutral-900">
        Animal map — move the mystery animal
      </p>
      <p className="mt-2 text-xs text-neutral-500 sm:hidden">
        Swipe across the diagram to see all animals, or use the sliders below.
      </p>
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Interactive animal diagram; scroll horizontally on small screens"
      >
        <svg
          viewBox="0 0 640 400"
          className="mt-4 min-w-150 w-full touch-pan-x cursor-crosshair"
          role="img"
          aria-label="Interactive animal map. Drag the question mark, or use the labelled sliders below to change its coordinates."
          onPointerDown={(event) => {
            dragging.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            move(event);
          }}
          onPointerMove={(event) => {
            if (dragging.current) move(event);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((value) => (
            <g key={value}>
              <line
                x1={50 + value * 530}
                x2={50 + value * 530}
                y1="60"
                y2="330"
                stroke="#e5e5e5"
              />
              <line
                x1="50"
                x2="580"
                y1={330 - value * 270}
                y2={330 - value * 270}
                stroke="#e5e5e5"
              />
            </g>
          ))}
          <text x="580" y="365" textAnchor="end" fontSize="12" fill="#525252">
            Size →
          </text>
          <text x="50" y="35" fontSize="12" fill="#525252">
            Ferocity ↑
          </text>
          <line
            x1={50 + position.size * 530}
            y1={330 - position.ferocity * 270}
            x2={50 + nearest.size * 530}
            y2={330 - nearest.ferocity * 270}
            stroke="#262626"
            strokeDasharray="4 4"
          />
          {animals.map((animal) => (
            <g key={animal.name}>
              <circle
                cx={50 + animal.size * 530}
                cy={330 - animal.ferocity * 270}
                r="5"
                fill={nearest.name === animal.name ? "#171717" : "#a3a3a3"}
              />
              <text
                x={50 + animal.size * 530}
                y={
                  330 -
                  animal.ferocity * 270 +
                  (animal.name === "Goldfish" ? -14 : 20)
                }
                textAnchor={animal.name === "Goldfish" ? "start" : "middle"}
                fontSize="12"
                fill="#525252"
              >
                {animal.name}
              </text>
            </g>
          ))}
          <circle
            cx={50 + position.size * 530}
            cy={330 - position.ferocity * 270}
            r="12"
            fill="#171717"
          />
          <text
            x={50 + position.size * 530}
            y={334 - position.ferocity * 270}
            textAnchor="middle"
            fill="white"
            fontSize="14"
          >
            ?
          </text>
        </svg>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Size: {position.size.toFixed(2)}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={position.size}
            onChange={(event) =>
              setPosition({ ...position, size: Number(event.target.value) })
            }
            className="mt-2 block w-full accent-neutral-900"
          />
        </label>
        <label className="text-sm">
          Ferocity: {position.ferocity.toFixed(2)}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={position.ferocity}
            onChange={(event) =>
              setPosition({ ...position, ferocity: Number(event.target.value) })
            }
            className="mt-2 block w-full accent-neutral-900"
          />
        </label>
      </div>
      <p className="mt-4 text-sm" aria-live="polite">
        Nearest animal: <strong>{nearest.name}</strong> · Distance:{" "}
        {distance.toFixed(2)}
      </p>
      <button
        type="button"
        onClick={() => setPosition(initialPosition)}
        className="mt-3 text-sm underline underline-offset-4"
      >
        Reset position
      </button>
      <figcaption>
        The question mark is a mystery animal. Its position declares its two
        numbers. Similarity is the distance between two points.
      </figcaption>
    </figure>
  );
}
