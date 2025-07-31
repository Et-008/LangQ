"use client";

import React, { useEffect, useRef } from "react";

const PI2 = Math.PI * 2;
const isTouch = "ontouchstart" in window;
const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

interface Vector {
  x: number;
  y: number;
  //   distanceTo: (vector: Vector, abs?: boolean) => number;
}

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  distanceTo(vector: Vector, abs = false) {
    const distance = Math.sqrt(
      Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2)
    );
    return abs ? Math.abs(distance) : distance;
  }
}

interface ParticleOptions {
  x: number;
  y: number;
  radius: number;
  size: number;
  angle: number;
  color: string;
  speed?: number;
  targetSize?: number;
}

class Particle {
  position: Vector;
  shift: Vector;
  speed: number;
  angle: number;
  color?: string;
  size: number;
  targetSize: number;
  orbit: number;
  options: ParticleOptions;
  closest: Vector[] = [];

  constructor(options: ParticleOptions) {
    this.options = options;
    this.position = this.shift = new Vector(options.x, options.y);
    this.speed = options.speed || 0.01 + Math.random() * 0.04;
    this.angle = options.angle || 0;

    const colorSplit = options.color.split(",");
    this.color = colorSplit
      .map((c) => {
        let val = Math.round(parseInt(c, 10) + (Math.random() * 100 - 50));
        return Math.min(255, Math.max(0, val));
      })
      .join(", ");

    this.size = 1 + Math.random() * options.size;
    this.targetSize = options.targetSize || options.size;
    this.orbit = options.radius * 0.5 + options.radius * 0.5 * Math.random();
  }

  update(target: Vector, index: number) {
    this.angle += this.speed;
    this.shift.x += (target.x - this.shift.x) * this.speed;
    this.shift.y += (target.y - this.shift.y) * this.speed;
    this.position.x = this.shift.x + Math.cos(index + this.angle) * this.orbit;
    this.position.y = this.shift.y + Math.sin(index + this.angle) * this.orbit;

    if (!isSafari) {
      this.size += (this.targetSize - this.size) * 0.03;
      if (Math.round(this.size) === Math.round(this.targetSize)) {
        this.targetSize = 1 + Math.random() * this.options.size;
      }
    }
  }
}

interface CanvasOptions {
  count: number;
  speed: number;
  width: number | (() => number);
  height: number | (() => number);
  size: number;
  radius: number;
  background: string | string[];
  maxDistance: number;
  color: string;
}

const CanvasParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const options: CanvasOptions = {
    count: 25,
    speed: 0.3,
    width: () => window.innerWidth,
    height: () => window.innerHeight,
    size: 15,
    radius: 6,
    color: "30, 180, 1",
    maxDistance: 100,
    background: ["0, 0, 0", "0, 0, 0"],
  };

  const dpr = window.devicePixelRatio || 1;
  let particles: Particle[] = [];
  let target = new Vector();

  const setupCanvas = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    const width =
      typeof options.width === "function" ? options.width() : options.width;
    const height =
      typeof options.height === "function" ? options.height() : options.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    target = new Vector(canvas.width / 5, canvas.height / 2);
    setupParticles(canvas);
  };

  const setupParticles = (canvas: HTMLCanvasElement) => {
    particles = [];
    const between = PI2 / options.count;
    const max = Math.max(canvas.width, canvas.height);

    for (let i = 0; i < options.count; i++) {
      const angle = (i + 1) * between;
      const x = Math.cos(angle) * max + canvas.width / 5;
      const y = Math.sin(angle) * max + canvas.height / 2;

      particles.push(
        new Particle({
          x,
          y,
          radius: options.radius,
          size: options.size,
          angle,
          color: options.color,
        })
      );
    }
  };

  const findClosest = () => {
    particles.forEach((p, i) => {
      p.closest = [];
      particles.forEach((q, j) => {
        if (i !== j) {
          const distance = p.position.distanceTo(q.position);
          if (distance < options.maxDistance) {
            const vector = new Vector(q.position.x, q.position.y);
            (vector as any).opacity = 1 - distance / options.maxDistance;
            p.closest.push(vector);
          }
        }
      });
    });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createRadialGradient(
      ctx.canvas.width / 5,
      ctx.canvas.height / 2,
      0,
      ctx.canvas.width / 5,
      ctx.canvas.height / 2,
      Math.max(ctx.canvas.width, ctx.canvas.height) / 2
    );

    if (Array.isArray(options.background)) {
      options.background.forEach((color, i) => {
        gradient.addColorStop(
          (i + 1) / options.background.length,
          `rgb(${color})`
        );
      });
    }

    ctx.globalAlpha = 0.1;
    ctx.globalCompositeOperation = "darken";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (options.maxDistance > 0) findClosest();

    particles.forEach((particle, index) => {
      const color = particle.color || options.color;
      particle.update(target, index);

      ctx.globalAlpha = 0.3;
      ctx.globalCompositeOperation = "lighten";
      ctx.fillStyle = `rgb(${color})`;
      ctx.beginPath();
      ctx.arc(
        particle.position.x,
        particle.position.y,
        particle.size,
        0,
        PI2,
        false
      );
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 0.2;
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      particle.closest.forEach((closest) => {
        ctx.lineWidth = particle.size * 2 * (closest as any).opacity;
        ctx.strokeStyle = `rgba(${color}, ${(closest as any).opacity})`;
        ctx.beginPath();
        ctx.moveTo(particle.position.x, particle.position.y);
        ctx.lineTo((closest as any).x, (closest as any).y);
        ctx.stroke();
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => setupCanvas(ctx, canvas);
    handleResize();

    const animate = () => {
      draw(ctx);
      requestAnimationFrame(animate);
    };
    animate();

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        if (e.touches.length === 1) {
          e.preventDefault();
          target = new Vector(
            e.touches[0].pageX * dpr,
            e.touches[0].pageY * dpr
          );
        }
      } else {
        target = new Vector(e.clientX * dpr, e.clientY * dpr);
      }
    };

    const resetTarget = () => {
      target = new Vector(canvas.width / 5, canvas.height / 2);
    };

    if (isTouch) {
      canvas.addEventListener("touchstart", handleMove, false);
      canvas.addEventListener("touchmove", handleMove, false);
    } else {
      window.addEventListener("mousemove", handleMove, false);
      window.addEventListener("mouseout", resetTarget, false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (isTouch) {
        canvas.removeEventListener("touchstart", handleMove);
        canvas.removeEventListener("touchmove", handleMove);
      } else {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseout", resetTarget);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-1]"
    />
  );
};

export default CanvasParticles;
