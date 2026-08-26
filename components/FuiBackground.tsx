"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * FuiBackground
 * Ambient, continuously-animated futuristic FUI/HUD background.
 * Layers (back -> front): grid -> drifting technical text/markers (3 depth layers)
 * -> radial vignette (keeps the center dark/uncluttered) -> scan sweep.
 * Pure canvas, no external assets. Respects prefers-reduced-motion.
 */

type Frag = {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  layer: number;
  flicker: number; // per-fragment flicker phase
  rotation: number; // slight tilt, in radians
};

type Marker = {
  kind: "bracket" | "circle" | "bar" | "wave";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  val: number; // for progress bars
};

const HEX = "0123456789ABCDEF";
const randHex = (n: number) =>
  Array.from({ length: n }, () => HEX[Math.floor(Math.random() * 16)]).join("");
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function makeToken(): string {
  const kind = Math.floor(Math.random() * 7);
  switch (kind) {
    case 0:
      return `0x${randHex(6)}`;
    case 1:
      return `SYS-${Math.floor(rand(100, 999))}::${pick([
        "SYNC",
        "IDLE",
        "LINK",
        "CORE",
        "NULL",
        "AUTH",
      ])}`;
    case 2:
      return `T+${String(Math.floor(rand(0, 23))).padStart(2, "0")}:${String(
        Math.floor(rand(0, 59))
      ).padStart(2, "0")}:${String(Math.floor(rand(0, 59))).padStart(2, "0")}`;
    case 3:
      return `${Math.floor(rand(0, 100))}.${Math.floor(rand(0, 9))}%`;
    case 4:
      return `DB::${randHex(4)}-${randHex(4)}`;
    case 5:
      return `X${Math.floor(rand(-999, 999))} Y${Math.floor(rand(-999, 999))} Z${Math.floor(
        rand(-99, 99)
      )}`;
    default:
      return pick([
        "UPLINK_STABLE",
        "CACHE_SYNC",
        "NODE_ACTIVE",
        "PROTOCOL_7",
        "REC_LOG",
        "SEC.LVL_3",
        "SIGNAL_OK",
        "GRID_REF",
        "PKT_LOSS_0",
        "ANALYZING",
      ]);
  }
}

export default function FuiBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isLightRef = useRef(theme === "light");

  useEffect(() => {
    isLightRef.current = theme === "light";
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frags: Frag[] = [];
    let markers: Marker[] = [];
    let rafId = 0;
    let scanY = 0;
    let gridOffset = 0;
    let glitchTimer = 0;
    let glitchActive = 0;

    const LAYER_COUNT = 3;

    function buildFrags() {
      const area = width * height;
      const density = Math.max(28, Math.min(70, Math.floor(area / 26000)));
      frags = Array.from({ length: density }, () => {
        const layer = Math.floor(rand(0, LAYER_COUNT));
        const speedBase = 0.12 + layer * 0.16;
        return {
          text: makeToken(),
          x: rand(0, width),
          y: rand(0, height),
          vx: -(speedBase + Math.random() * 0.15) * (Math.random() < 0.15 ? -1 : 1),
          vy: rand(-0.04, 0.04) * (layer + 1),
          size: 13 + layer * 2.6,
          alpha: 0.05 + layer * 0.045,
          layer,
          flicker: Math.random() * Math.PI * 2,
          // slight diagonal tilt, mostly consistent direction with a little variety
          rotation: rand(-10, -4) * (Math.PI / 180) * (Math.random() < 0.85 ? 1 : -1),
        };
      });
    }

    function buildMarkers() {
      const count = Math.max(8, Math.min(18, Math.floor((width * height) / 90000)));
      markers = Array.from({ length: count }, () => ({
        kind: pick(["bracket", "circle", "bar", "wave"] as Marker["kind"][]),
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.08, -0.02),
        vy: rand(-0.02, 0.02),
        size: rand(18, 42),
        alpha: rand(0.05, 0.12),
        val: Math.random(),
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildFrags();
      buildMarkers();
    }

    function distFromCenter(x: number, y: number) {
      const cx = width / 2;
      const cy = height / 2;
      const dx = (x - cx) / (width / 2);
      const dy = (y - cy) / (height / 2);
      return Math.sqrt(dx * dx + dy * dy);
    }

    function drawGrid(isLight: boolean) {
      const spacing = 64;
      gridOffset = (gridOffset + 0.05) % spacing;
      ctx!.save();
      ctx!.strokeStyle = isLight
        ? "rgba(60,90,120,0.06)"
        : "rgba(140,170,200,0.05)";
      ctx!.lineWidth = 1;
      for (let x = -spacing + gridOffset; x < width + spacing; x += spacing) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
        ctx!.stroke();
      }
      for (let y = -spacing + gridOffset * 0.6; y < height + spacing; y += spacing) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawMarker(m: Marker, isLight: boolean) {
      const edgeFade = Math.min(1, distFromCenter(m.x, m.y));
      const a = m.alpha * (0.35 + 0.65 * edgeFade);
      const rgb = isLight ? "20,110,130" : "120,200,220";
      ctx!.save();
      ctx!.strokeStyle = `rgba(${rgb},${a})`;
      ctx!.fillStyle = `rgba(${rgb},${a})`;
      ctx!.lineWidth = 1;
      const { x, y, size } = m;
      if (m.kind === "bracket") {
        const s = size;
        ctx!.beginPath();
        ctx!.moveTo(x + s * 0.25, y);
        ctx!.lineTo(x, y);
        ctx!.lineTo(x, y + s * 0.6);
        ctx!.moveTo(x + s, y);
        ctx!.lineTo(x + s * 1.25, y);
        ctx!.lineTo(x + s * 1.25, y + s * 0.6);
        ctx!.stroke();
      } else if (m.kind === "circle") {
        ctx!.beginPath();
        ctx!.arc(x, y, size * 0.3, 0, Math.PI * 1.4);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      } else if (m.kind === "bar") {
        const w = size * 1.6;
        ctx!.strokeRect(x, y, w, 3);
        ctx!.fillRect(x, y, w * m.val, 3);
      } else {
        ctx!.beginPath();
        const w = size * 1.8;
        for (let i = 0; i <= w; i += 3) {
          const yy = y + Math.sin(i * 0.4 + m.val * 10) * 3;
          if (i === 0) ctx!.moveTo(x + i, yy);
          else ctx!.lineTo(x + i, yy);
        }
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawFrag(f: Frag, t: number, isLight: boolean) {
      const edgeFade = Math.min(1, distFromCenter(f.x, f.y) * 1.15);
      const flicker = 0.85 + 0.15 * Math.sin(t * 0.002 + f.flicker);
      let a = f.alpha * (0.3 + 0.7 * edgeFade) * flicker;
      let dx = 0;
      if (glitchActive > 0 && Math.random() < 0.02) {
        dx = rand(-3, 3);
        a *= 1.4;
      }
      const rgb = isLight ? "20,80,100" : "150,215,230";
      ctx!.save();
      ctx!.translate(f.x + dx, f.y);
      ctx!.rotate(f.rotation);
      ctx!.font = `${f.size}px "Courier New", monospace`;
      ctx!.fillStyle = `rgba(${rgb},${Math.min(a, 0.22)})`;
      ctx!.fillText(f.text, 0, 0);
      ctx!.restore();
    }

    function step(t: number) {
      const isLight = isLightRef.current;
      ctx!.clearRect(0, 0, width, height);

      // base background
      const grd = ctx!.createLinearGradient(0, 0, width, height);
      if (isLight) {
        grd.addColorStop(0, "#f3f5f8");
        grd.addColorStop(1, "#eaedf2");
      } else {
        grd.addColorStop(0, "#07080a");
        grd.addColorStop(1, "#0d0f12");
      }
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, width, height);

      drawGrid(isLight);

      for (const m of markers) {
        if (!reduceMotion) {
          m.x += m.vx;
          m.y += m.vy;
          if (m.x < -40) m.x = width + 40;
          if (m.y < -40) m.y = height + 40;
          if (m.y > height + 40) m.y = -40;
        }
        drawMarker(m, isLight);
      }

      for (const f of frags) {
        if (!reduceMotion) {
          f.x += f.vx;
          f.y += f.vy;
          if (f.x < -120) f.x = width + 60;
          if (f.x > width + 120) f.x = -60;
          if (f.y < -20) f.y = height + 20;
          if (f.y > height + 20) f.y = -20;
        }
        drawFrag(f, t, isLight);
      }

      // horizontal scan sweep
      if (!reduceMotion) {
        scanY += 0.6;
        if (scanY > height + 80) scanY = -80;
      }
      const scanGrad = ctx!.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, "rgba(120,210,230,0)");
      scanGrad.addColorStop(0.5, "rgba(120,210,230,0.035)");
      scanGrad.addColorStop(1, "rgba(120,210,230,0)");
      ctx!.fillStyle = scanGrad;
      ctx!.fillRect(0, scanY - 40, width, 80);

      // vignette: keep center clean & uncluttered, matching the page tone
      const vgRgb = isLight ? "243,245,248" : "6,7,9";
      const vg = ctx!.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.62
      );
      vg.addColorStop(0, `rgba(${vgRgb},0.94)`);
      vg.addColorStop(0.45, `rgba(${vgRgb},0.55)`);
      vg.addColorStop(1, `rgba(${vgRgb},0)`);
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, width, height);

      // occasional subtle glitch band
      if (!reduceMotion) {
        glitchTimer -= 1;
        if (glitchTimer <= 0) {
          glitchTimer = rand(180, 420);
          glitchActive = 10;
        }
        if (glitchActive > 0) {
          glitchActive -= 1;
          const gy = rand(0, height);
          ctx!.fillStyle = "rgba(150,220,235,0.04)";
          ctx!.fillRect(0, gy, width, rand(1, 3));
        }
      }

      rafId = requestAnimationFrame(step);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    rafId = requestAnimationFrame(step);

    if (reduceMotion) {
      // draw a single static frame, no loop
      cancelAnimationFrame(rafId);
      step(0);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* CRT-style scanline texture */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* fine grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}