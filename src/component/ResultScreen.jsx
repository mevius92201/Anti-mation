import { motion } from "framer-motion";
import { FORTUNES } from "../data/Fortunes";
function ResultScreen({ onReset }) {
  const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  console.log(fortune);
  return (
    <motion.div
      className="result-screen"
      aria-label="抽籤結果"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>
        {fortune.luck} | {fortune.yokai}
      </h2>
      <p>{fortune.text}</p>
      <motion.img
        src={fortune.img}
        alt={fortune.yokai}
        className="yokai-img"
        draggable="false"
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <button className="reset-button" onClick={onReset}>
        再抽一次
      </button>
    </motion.div>
  );
}
export default ResultScreen;
