import React, { useEffect, useRef } from "react";
import "./style.css";
import * as THREE from "three";
import { displayShader, vertexShader, fluidShader } from "./Shaders.js";
function FluidCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const config = {
      brushSize: 15.0,
      brushStrength: 0.5,
      distortionAmount: 1.5,
      fluidDecay: 0.98,
      trailLength: 0.8,
      stopDecay: 0.85,
      color1: "#e6fffb",
      color2: "#c9a7c4ff",
      color3: "#868eadff",
      color4: "#c9efff",
      colorIntensity: 1.0,
      softness: 2.0,
    };

    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    }

    // --- Setup Three.js
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const fluidTarget1 = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }
    );

    const fluidTarget2 = fluidTarget1.clone();
    let currentFluidTarget = fluidTarget1;
    let previousFluidTarget = fluidTarget2;
    let frameCount = 0;

    // Fluid shader
    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: config.brushSize },
        uBrushStrength: { value: config.brushStrength },
        uFluidDecay: { value: config.fluidDecay },
        uTrailLength: { value: config.trailLength },
        uStopDecay: { value: config.stopDecay },
      },
      vertexShader,
      fragmentShader: fluidShader,
    });

    // Display shader
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iFluid: { value: null },
        uDistortionAmount: { value: config.distortionAmount },
        uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
        uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
        uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
        uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
        uColorIntensity: { value: config.colorIntensity },
        uSoftness: { value: config.softness },
      },
      vertexShader,
      fragmentShader: displayShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
    const displayPlane = new THREE.Mesh(geometry, displayMaterial);

    // Mouse interaction
    let mouseX = 0,
      mouseY = 0,
      prevMouseX = 0,
      prevMouseY = 0,
      lastMoveTime = 0;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX - rect.left;
      mouseY = rect.height - (e.clientY - rect.top);
      lastMoveTime = performance.now();

      fluidMaterial.uniforms.iMouse.value.set(
        mouseX,
        mouseY,
        prevMouseX,
        prevMouseY
      );
    };

    const handleMouseLeave = () => {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      fluidMaterial.uniforms.iTime.value = time;
      displayMaterial.uniforms.iTime.value = time;
      fluidMaterial.uniforms.iFrame.value = frameCount;

      if (performance.now() - lastMoveTime > 100) {
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
      }

      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
      renderer.setRenderTarget(currentFluidTarget);
      renderer.render(fluidPlane, camera);

      displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayPlane, camera);

      [currentFluidTarget, previousFluidTarget] = [
        previousFluidTarget,
        currentFluidTarget,
      ];
      frameCount++;
    }

    animate();

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      fluidMaterial.uniforms.iResolution.value.set(width, height);
      displayMaterial.uniforms.iResolution.value.set(width, height);
      fluidTarget1.setSize(width, height);
      fluidTarget2.setSize(width, height);
      frameCount = 0;
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
      fluidTarget1.dispose();
      fluidTarget2.dispose();
    };
  }, []);
  return <div ref={containerRef} className="gradient-canvas"></div>;
}

export default FluidCanvas;
