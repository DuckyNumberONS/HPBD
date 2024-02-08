"use client";
import React, { useEffect, useState } from "react";
import "./style.css";

const Tarot = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#250001";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  const frontImages = [
    "/images/Aquarius/1.png",
    "/images/Aquarius/2.png",
    "/images/Aquarius/3.png",
    "/images/Aquarius/4.png",
  ];
  const [flipped, setFlipped] = useState(Array(frontImages.length).fill(false));

  const handleCardClick = (index: number) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !prevFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className="mains">
      <h1>Chọn một lá bài...</h1>
      <section className="container">
        {Array.from(Array(frontImages.length).keys()).map((index) => (
          <div
            key={index}
            className={`card${flipped[index] ? " flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <figure className="back">
              <img
                src="https://i.pinimg.com/736x/f1/c2/97/f1c2976d18d184dd688d855678cb4516--oracle-cards-tarot-cards.jpg"
                className="image-custom"
              />
            </figure>
            <figure className="front">
              <img
                src={frontImages[index]}
                className="image-custom"
                alt={`Card ${index + 1}`}
              />
            </figure>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Tarot;
