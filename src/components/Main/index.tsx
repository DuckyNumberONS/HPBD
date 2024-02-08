"use client";
import React, { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import Link from "next/link";

interface Confetto {
  color: { front: string; back: string };
  dimensions: { x: number; y: number };
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  velocity: { x: number; y: number };
}

const Main: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let canvas = canvasRef.current;
    let ctx: any = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let cx = ctx.canvas.width / 2;
    let cy = ctx.canvas.height / 2;

    let confetti: Confetto[] = [];
    const confettiCount = 300;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
      { front: "red", back: "darkred" },
      { front: "green", back: "darkgreen" },
      { front: "blue", back: "darkblue" },
      { front: "yellow", back: "darkyellow" },
      { front: "orange", back: "darkorange" },
      { front: "pink", back: "darkpink" },
      { front: "purple", back: "darkpurple" },
      { front: "turquoise", back: "darkturquoise" },
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = ctx.canvas.width / 2;
      cy = ctx.canvas.height / 2;
    };

    const randomRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const initConfetti = () => {
      for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          color: colors[Math.floor(randomRange(0, colors.length))],
          dimensions: {
            x: randomRange(10, 20),
            y: randomRange(10, 30),
          },
          position: {
            x: randomRange(0, canvas.width),
            y: canvas.height - 1,
          },
          rotation: randomRange(0, 2 * Math.PI),
          scale: { x: 1, y: 1 },
          velocity: {
            x: randomRange(-25, 25),
            y: randomRange(0, -50),
          },
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(
          confetto.velocity.y + gravity,
          terminalVelocity
        );
        confetto.velocity.x +=
          Math.random() > 0.5 ? Math.random() : -Math.random();

        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;

        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle =
          confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      if (confetti.length <= 10) initConfetti();

      window.requestAnimationFrame(render);
    };

    initConfetti();
    render();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const audio = new Howl({
    src: ["/music/HPNY.mp3"],
  });
  const [popupMeme, setPopupMeme] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    audio.play();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
        {popup ? (
          <div className="name">
            <h3 className="xl:text-[63px] lg:text-[50px] md:text-[40px] sm:text-35px text-30px ">
              Em có muốn xem một chút bói toán khum
            </h3>
            <button className="mt-10 border-2 p-5 rounded-xl bg- shadow-md hover:animate-bounce">
              <h3 className="xl:text-[33px] lg:text-[30px] md:text-[28px] sm:text-26px cursor-pointer">
                <Link href="/tarot">
                  Ấn vào đây để xem qua tử vi năm 20 tuổi
                </Link>
              </h3>
            </button>
          </div>
        ) : (
          <h3 className="name xl:text-[93px] lg:text-[70px] md:text-[50px] sm:text-35px text-30px ">
            Happy Birthday <br /> Nguyệt Anh
          </h3>
        )}
      </div>
      <canvas className="confetti" ref={canvasRef}></canvas>
    </div>
  );
};

export default Main;
