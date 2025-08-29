import { motion } from "framer-motion";
import { useEffect } from "react";
import omikujiBox from "../assets/images/omikuji_box.png";
import omikujiStickNormal from "../assets/images/omikuji_stick_normal.png";
import omikujiStickBest from "../assets/images/omikuji_stick_best.png";

function getStickImg(luck) {
  const normalList = ["小凶", "凶", "大凶"];
  const bestList = ["大吉", "中吉", "吉", "末吉"];
  if (normalList.includes(luck)) {
    return omikujiStickNormal;
  }
  if (bestList.includes(luck)) {
    return omikujiStickBest;
  }
  return omikujiStickNormal;
}
export default function OmikujiBox({
  progress,
  isShaking,
  phase,
  onDraw,
  onShowResult,
  fortune,
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
      {phase === "drawing" ? (
        <img
          src={omikujiBox}
          alt="御籤籤筒"
          className="omikuji-img"
          draggable="false"
          // style={{ boxShadow: "0 0 1.5rem 0.3rem #f0e68c"  }}
        />
      ) : (
        <img
          src={omikujiBox}
          alt="御籤籤筒"
          className="omikuji-img"
          draggable="false"
        />
      )}
      {phase === "drawing" && (
        <div className="omikuji-stick-container">
          <motion.img
            src={getStickImg(fortune?.luck)}
            alt="御籤籤支"
            className="omikuji-stick"
            draggable="false"
            initial={{ y: 80, opacity: 0.7 }}
            animate={{ y: -40, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
}
