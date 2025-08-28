import React, { useEffect, useRef } from "react";
import bitmoji from "./emoji.png"; // update with your path

export default function MemojiTiltCorrected({
  size = 220,
  maxTilt = 30,
  easing = 0.1,
}) {
  const imgRef = useRef(null);
  const rafRef = useRef(null);

  const current = useRef({ ax: 0, ay: 0, angle: 0 });
  const target = useRef({ ax: 0, ay: 0, angle: 0 });

  useEffect(() => {
    const img = imgRef.current;
    const section = img.closest(".topSection"); // 🔑 limit to topSection only

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const onPointerMove = (e) => {
      const rect = section.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const nx = clamp(dx / (rect.width / 2), -1, 1);
      const ny = clamp(dy / (rect.height / 2), -1, 1);

      const magnitude = Math.min(1, Math.hypot(nx, ny));

      let ax = -ny;
      let ay = nx;

      const len = Math.hypot(ax, ay);
      if (len > 0.0001) {
        ax /= len;
        ay /= len;
      } else {
        ax = 0;
        ay = 0;
      }

      const angle = magnitude * maxTilt;
      target.current = { ax, ay, angle };
    };

    const onPointerLeave = () => {
      target.current = { ax: 0, ay: 0, angle: 0 };
    };

    const tick = () => {
      current.current.ax += (target.current.ax - current.current.ax) * easing;
      current.current.ay += (target.current.ay - current.current.ay) * easing;
      current.current.angle +=
        (target.current.angle - current.current.angle) * easing;

      const ax = current.current.ax.toFixed(4);
      const ay = current.current.ay.toFixed(4);
      const a = current.current.angle.toFixed(3);

      img.style.transform = `rotate3d(${ax}, ${ay}, 0, ${a}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onPointerMove);
    section.addEventListener("mouseleave", onPointerLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onPointerMove);
      section.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [maxTilt, easing]);

  return (
    <img
      ref={imgRef}
      src={bitmoji}
      alt="bitmoji"
      style={{
        width: `${size}px`,
        height: "auto",
        transformOrigin: "center",
        willChange: "transform",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}
