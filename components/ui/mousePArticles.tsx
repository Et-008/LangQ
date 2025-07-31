"use client";

import React, { useEffect, useRef, useState } from "react";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const MouseParticles: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1, y: -1 });
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.pageX, y: e.pageY };
      setActive(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setActive(false);
      }, 200); // 1 second after last movement
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1, y: -1 };
      setActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const interval = setInterval(() => {
      const { x, y } = mousePos.current;
      if (!active || x < 0 || y < 0 || !wrapRef.current) return;

      const size = getRandomInt(10, 30);
      const range = 15;

      const ball = document.createElement("div");
      ball.className = "particle-ball";
      ball.style.left = `${getRandomInt(x - range - size, x + range)}px`;
      ball.style.top = `${getRandomInt(y - range - size, y + range)}px`;
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      ball.style.backgroundColor = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;

      wrapRef.current.appendChild(ball);
      ball.addEventListener("animationend", () => ball.remove());
    }, 20);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [active]);

  return <div ref={wrapRef} className="pointer-events-none inset-0 z-40"></div>;
};

export default MouseParticles;
