import { useState } from "react";

export default function InfoTooltip() {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        relative
        cursor-pointer
        transition-all duration-300 ease-in-out
        ${hover ? "w-64 h-40 rounded-md bg-blue-600 p-4" : "w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center"}
        text-white
        select-none
      `}
    >
      {hover ? (
        <div className="text-sm">
          <h3 className="font-bold mb-2">How to Play</h3>
          <p>
            Click a square to place your mark. You can only have 3 marks at a time. Getting 3 in a row scores a point. First to 3 wins!
          </p>
        </div>
      ) : (
        <span className="font-bold text-lg">i</span>
      )}
    </div>
  );
}
