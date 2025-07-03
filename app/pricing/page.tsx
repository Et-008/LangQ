"use client";

import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import { Button, ShimmerButton } from "@/components/ui/button";
import { redirectWithAnchor } from "@/components/hero";

interface FallingTextProps {
  text?: string;
  revealText?: string;
  highlightWords?: string[];
  trigger?: "auto" | "scroll" | "click" | "hover";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = "",
  revealText = "",
  highlightWords = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const textRef2 = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    if (!textRef2.current) return;
    const words = text.split(" ");

    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => hw == word);
        return `<span
          class="inline-block mx-[2px] select-none ${
            isHighlighted ? "text-cyan-500 font-bold" : ""
          }"
        >
          ${word}
        </span>`;
      })
      .join(" ");

    const newHTML2 = revealText
      ?.split(" ")
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span
          class="inline-block mx-[2px] select-none ${
            isHighlighted ? "text-cyan-500 font-bold" : ""
          }"
        >
          ${word}
        </span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;
    textRef2.current.innerHTML = newHTML2;
  }, [text, highlightWords]);

  useEffect(() => {
    if (trigger === "auto") {
      setTimeout(() => {
        setEffectStarted(true);
      }, 2500);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;

    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      boundaryOptions
    );
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height,
      boundaryOptions
    );
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height,
      boundaryOptions
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -25,
      width,
      50,
      boundaryOptions
    );

    if (!textRef.current) return;

    const wordBodies = Array.from(textRef.current.querySelectorAll("span")).map(
      (elem) => {
        const rect = elem.getBoundingClientRect();

        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: "transparent" },
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2,
        });
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: 0,
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

        return { elem, body };
      }
    );

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${
        body.position.x - body.bounds.max.x + body.bounds.min.x / 2
      }px`;
      elem.style.top = `${
        body.position.y - body.bounds.max.y + body.bounds.min.y / 2
      }px`;
      elem.style.transform = "none";
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-pointer text-center pt-8 overflow-hidden"
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        id="text-container"
        className="inline-block bg-black"
        style={{
          fontSize,
          lineHeight: 1.4,
          maxWidth: "400px",
        }}
      />
      <div
        ref={textRef2}
        id="text-container-2"
        className="inline-block absolute"
        style={{
          fontSize,
          lineHeight: 1.4,
          width: "400px",
          height: "269px",
          left: "356px",
          zIndex: -1,
        }}
      />

      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
};

function PricingPage() {
  function redirectToSignupPage() {
    const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/sign-up`;
    redirectWithAnchor(url, true);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto p-6 absolute ">
        <div className="flex flex-col gap-20">
          <div
            key={"Starter"}
            className="flex flex-col rounded-2xl p-6 shadow-lg border transition-all border-primary scale-105 justify-center z-30"
          >
            <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Free for everyone
            </div>
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <p className="text-3xl font-semibold mb-4">$0/mo</p>
            <ul className="space-y-2 mb-6">
              {[
                "1000 translations",
                "30 Languages",
                "10 Projects",
                "Instant translation",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <ShimmerButton onClick={redirectToSignupPage}>
              Get Started Now
            </ShimmerButton>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              * No credit card required
            </p>
          </div>

          <div key={"Starter"} className="flex flex-col gap-2 text-center">
            Want to know more?
            <Button>Request a Call back</Button>
          </div>
        </div>
      </div>
      <FallingText
        // text="We want to show big user growth to investors or the public."
        text="We offer everything free, we’ll figure out monetization later."
        // revealText="The best marketing is a product people can use immediately."
        revealText="We give a reasonable free plan, contact us for a custom one!"
        highlightWords={[
          "everything",
          "free",
          "growth",
          "accessible",
          "all",
          "contact",
          "us",
        ]}
        //   highlightClass="highlighted"
        trigger="auto"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
    </>
  );
}

export default PricingPage;
