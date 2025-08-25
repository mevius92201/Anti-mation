import { motion } from "framer-motion";
import { useEffect } from "react";
import omikujiBox from "../assets/images/omikuji_box.png";
import omikujiStick from "../assets/images/omikuji_stick.png";
export default function OmikujiBox({
  progress,
  isShaking,
  phase,
  onDraw,
  onShowResult,
}) {
  useEffect(() => {
    if (phase === "drawing") {
      const timer = setTimeout(() => {
        onShowResult();
      }, 2000);
      console.log(phase);
      return () => clearTimeout(timer);
    }
  }, [phase, onShowResult]);

  console.log(phase);
  return (
    <div className="omikuji-box" aria-label="籤筒">
      <img
        src={omikujiBox}
        alt="御籤籤筒"
        className="omikuji-img"
        draggable="false"
      />
      {phase === "drawing" && (
        <motion.img
          src={omikujiStick}
          alt="御籤籤筒"
          className="omikuji-stick"
          draggable="false"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: -40, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
