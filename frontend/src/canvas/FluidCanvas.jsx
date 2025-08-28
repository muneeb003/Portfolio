import React, { useEffect, useRef } from "react";
import bitmoji from "./bitmoji.png"; // <-- replace with your image path

/**
 * MemojiTiltCorrected
 * - Keeps image centered
 * - Tilts (3D) toward cursor direction using rotate3d(axisX, axisY, 0, angle)
 * - Smooth spring-like interpolation for natural motion
 *
 * Props you can tweak:
 *  - size: px width of the image
 *  - maxTilt: max degrees of tilt (18 is a balanced default)
 *  - easing: smoothing factor (0.05 slow/floaty, 0.12 snappier)
 */
export default function MemojiTiltCorrected({
  size = 220,
  maxTilt = 18,
  easing = 0.09,
}) {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);

  // persistent animation state
  const current = useRef({ ax: 0, ay: 0, angle: 0 });
  const target = useRef({ ax: 0, ay: 0, angle: 0 });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // utility
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const onPointerMove = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0].clientX);
      const y = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (x == null || y == null) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      // vector from center to cursor
      let dx = x - cx;
      let dy = y - cy;

      // normalize to [-1,1] (relative to half-dimensions)
      const nx = clamp(dx / (w / 2), -1, 1);
      const ny = clamp(dy / (h / 2), -1, 1);

      // magnitude (0..~1.414) -> clamp to 1
      const magnitude = Math.min(1, Math.hypot(nx, ny));

      // axis perpendicular to the direction vector (so we rotate "toward" the cursor)
      // axis = (-ny, nx)  (note: we don't set z-axis)
      let ax = -ny;
      let ay = nx;

      // normalize axis (only if non-zero)
      const len = Math.hypot(ax, ay);
      if (len > 0.0001) {
        ax /= len;
        ay /= len;
      } else {
        ax = 0;
        ay = 0;
      }

      // target angle proportional to distance from center
      const angle = magnitude * maxTilt; // degrees

      // set targets
      target.current.ax = ax;
      target.current.ay = ay;
      target.current.angle = angle;
    };

    const onPointerLeave = () => {
      // reset gently to neutral
      target.current.ax = 0;
      target.current.ay = 0;
      target.current.angle = 0;
    };

    // animation loop — lerp current values toward target values
    const tick = () => {
      current.current.ax += (target.current.ax - current.current.ax) * easing;
      current.current.ay += (target.current.ay - current.current.ay) * easing;
      current.current.angle +=
        (target.current.angle - current.current.angle) * easing;

      // apply rotate3d using current axis and angle.
      // Keep wrapper centered via translate; here we only change rotation.
      const ax = current.current.ax.toFixed(4);
      const ay = current.current.ay.toFixed(4);
      const a = current.current.angle.toFixed(3);

      img.style.transform = `rotate3d(${ax}, ${ay}, 0, ${a}deg)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    // set base styles on wrapper & img
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.style.position = "fixed";
      wrapper.style.top = "50%";
      wrapper.style.left = "50%";
      wrapper.style.transform = "translate(-50%,-50%)";
      wrapper.style.perspective = "1200px";
      wrapper.style.zIndex = 1000;
      wrapper.style.pointerEvents = "none";
    }

    img.style.width = `${size}px`;
    img.style.height = "auto";
    img.style.transformOrigin = "50% 50%";
    img.style.willChange = "transform";
    img.style.pointerEvents = "none";
    img.style.userSelect = "none";

    // pointer events (covers mouse + touch)
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointercancel", onPointerLeave);

    // start
    rafRef.current = requestAnimationFrame(tick);

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointercancel", onPointerLeave);
    };
  }, [size, maxTilt, easing]);

  return (
    <div ref={wrapperRef}>
      <img ref={imgRef} src={bitmoji} alt="avatar" />
    </div>
  );
}
