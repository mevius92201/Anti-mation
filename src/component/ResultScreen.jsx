import { motion } from "framer-motion";
import { FORTUNES } from "../data/Fortunes";
function ResultScreen({ onReset }) {
  const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  console.log(fortune);
  return (
    <div className="result-screen-wrapper">
      <div className="result-screen-container">
        <motion.div
          className="result-screen"
          aria-label="抽籤結果"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="result-title">
            {fortune.number}
            {fortune.luck}
          </div>

          <p className="result-poem">{fortune.poem}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifySelf: "flex-end",
              paddingRight: "4rem",
            }}
          >
            <p className="result-text">願望：{fortune.text.hope}</p>
            <p className="result-text">健康：{fortune.text.illness}</p>
            <p className="result-text">愛情：{fortune.text.love}</p>
            <p className="result-text">
              等待之人：{fortune.text.thePerseonYouWait}
            </p>
            <p className="result-text">失物：{fortune.text.lostItem}</p>
            <p className="result-text">旅行：{fortune.text.travel}</p>
            <p className="result-text">金錢：{fortune.text.money}</p>
            <p className="result-text">方位：{fortune.text.position}</p>
          </div>
          <motion.img
            src={fortune.img}
            alt={fortune.yokai}
            className="yokai-img"
            draggable="false"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>
      <button className="reset-button" onClick={onReset}>
        再抽一次
      </button>
    </div>
  );
}
export default ResultScreen;
