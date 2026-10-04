"use client";

import { useRef, useState, type ReactNode } from "react";
import { height, minimumPoint, startPoint } from "@/data/gradient-lesson";

export function SecantExplorer({ deltaLabel, slopeLabel, curveLabel }: { deltaLabel: ReactNode; slopeLabel: ReactNode; curveLabel: ReactNode }) {
  const [delta, setDelta] = useState(2.4);
  const px = (x: number) => 55 + (x - 0.4) * 100;
  const py = (h: number) => 30 + (13 - h) * 20;
  const qx = 1 + delta;
  const qh = (qx - 4) ** 2;
  const slope = (qh - 9) / delta;
  const curve = Array.from({ length: 121 }, (_, i) => {
    const x = 0.4 + i / 24;
    return `${i ? "L" : "M"}${px(x)},${py((x - 4) ** 2)}`;
  }).join(" ");
  return <div>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Secant and tangent; scroll horizontally on small screens">
      <svg viewBox="0 0 640 350" className="min-w-[560px] w-full" role="img" aria-label="As delta x shrinks, Q approaches P and the secant approaches the tangent">
        <defs><clipPath id="secant-clip"><rect x="35" y="20" width="580" height="300" /></clipPath></defs>
        <line x1="55" y1="310" x2="600" y2="310" stroke="#a3a3a3" />
        <g clipPath="url(#secant-clip)">
          <path d={curve} fill="none" stroke="#6a7f94" strokeWidth="2.5" />
          <line x1={px(0.4)} y1={py(12.6)} x2={px(2.7)} y2={py(-1.2)} stroke="#262626" strokeWidth="2" strokeDasharray="6 4" />
          <line x1={px(0.4)} y1={py(9 + slope * -0.6)} x2={px(Math.min(5.35, qx + 0.7))} y2={py(9 + slope * (Math.min(5.35, qx + 0.7) - 1))} stroke="var(--accent)" strokeWidth="2" />
          <path d={`M${px(1)} ${py(9)} H${px(qx)} V${py(qh)}`} fill="none" stroke="#a3a3a3" strokeDasharray="4 4" />
        </g>
        <circle cx={px(1)} cy={py(9)} r="5" fill="var(--accent)" />
        <circle cx={px(qx)} cy={py(qh)} r="5" fill="#262626" />
        <text x={px(1) - 12} y={py(9) - 12} fontSize="13" fill="#525252">P</text>
        <text x={px(qx) + 10} y={py(qh) + 18} fontSize="13" fill="#525252">Q</text>
        <text x="600" y="335" textAnchor="end" fontSize="13" fill="#737373">Position →</text>
      </svg>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-2 border-y border-neutral-200 py-4 text-sm">
      <p>{deltaLabel} = <output htmlFor="secant-delta">{delta.toFixed(2)}</output></p>
      <p className="accent-text">Secant {slopeLabel} = <output htmlFor="secant-delta">{slope.toFixed(2)}</output></p>
      <p>Tangent slope = −6.00</p>
    </div>
    <label htmlFor="secant-delta" className="mt-5 block text-sm text-neutral-900">Change the distance between P and Q</label>
    <input id="secant-delta" type="range" min="0.05" max="3" step="0.05" value={delta} onChange={(event) => setDelta(Number(event.target.value))} className="mt-3 w-full accent-[var(--accent)]" />
    <p className="mt-2 text-xs text-neutral-500">Smaller distance ← · {curveLabel} · → Larger distance</p>
  </div>;
}

export function BowlExplorer() {
  const [angle, setAngle] = useState(0.7);
  const [tilt, setTilt] = useState(0.75);
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; y: number } | null>(null);
  function project(x: number, y: number): [number, number] {
    const dx = x - 4;
    const dy = y - 2;
    const rx = dx * Math.cos(angle) - dy * Math.sin(angle);
    const ry = dx * Math.sin(angle) + dy * Math.cos(angle);
    return [320 + rx * 38 * zoom, 255 + (ry * Math.cos(tilt) - height(x, y) * 0.14 * Math.sin(tilt)) * 38 * zoom];
  }
  function gridLine(fixed: number, alongX: boolean) {
    return Array.from({ length: 33 }, (_, i) => {
      const moving = -4 + i / 4;
      const point = alongX ? project(4 + moving, 2 + fixed) : project(4 + fixed, 2 + moving);
      return `${i ? "L" : "M"}${point.join(",")}`;
    }).join(" ");
  }
  const [sx, sy] = project(...startPoint);
  const [mx, my] = project(...minimumPoint);
  return <div>
    <svg viewBox="0 0 640 400" className="w-full cursor-grab touch-none active:cursor-grabbing" role="img" aria-label="Rotatable wireframe bowl. Drag to rotate or use the labelled controls below."
      onPointerDown={(event) => { drag.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerMove={(event) => {
        if (!drag.current) return;
        const previous = drag.current;
        setAngle((value) => value + (event.clientX - previous.x) * 0.01);
        setTilt((value) => Math.max(0.3, Math.min(1.3, value - (event.clientY - previous.y) * 0.008)));
        drag.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
    >
      <defs><clipPath id="bowl-clip"><rect x="10" y="10" width="620" height="380" /></clipPath></defs>
      <g clipPath="url(#bowl-clip)">
        {Array.from({ length: 17 }, (_, i) => -4 + i / 2).map((value) => <g key={value}>
          <path d={gridLine(value, true)} fill="none" stroke="var(--accent-border)" strokeWidth="1" />
          <path d={gridLine(value, false)} fill="none" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1" />
        </g>)}
        <circle cx={mx} cy={my} r="5" fill="#262626" />
        <circle cx={sx} cy={sy} r="6" fill="var(--accent)" stroke="white" strokeWidth="2" />
        <text x={mx + 10} y={my + 20} fontSize="14" fill="#525252">Minimum</text>
        <text x={sx + 10} y={sy - 12} fontSize="14" fill="var(--accent)">You are here</text>
      </g>
    </svg>
    <p className="text-sm text-neutral-500">Drag to rotate the surface, or use these controls.</p>
    <div className="mt-4 grid gap-4 sm:grid-cols-3">
      <label className="text-xs text-neutral-600">Rotation<input aria-label="Surface rotation" type="range" min="-3.14" max="3.14" step="0.01" value={angle} onChange={(event) => setAngle(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>
      <label className="text-xs text-neutral-600">Tilt<input aria-label="Surface tilt" type="range" min="0.3" max="1.3" step="0.01" value={tilt} onChange={(event) => setTilt(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>
      <label className="text-xs text-neutral-600">Zoom<input aria-label="Surface zoom" type="range" min="0.7" max="1.3" step="0.05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>
    </div>
    <button type="button" onClick={() => { setAngle(0.7); setTilt(0.75); setZoom(1); }} className="mt-4 border border-neutral-300 px-3 py-1 text-sm text-neutral-600 hover:border-neutral-900">Reset view</button>
  </div>;
}
