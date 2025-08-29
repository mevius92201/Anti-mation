import OmikujiBox from "./component/OmikujiBox";
import DrawControl from "./component/DrawControl";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ResultScreen from "./component/ResultScreen";
import { FORTUNES } from "./data/Fortunes";

function App() {
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle, drawing, result
  const [currentFortune, setCurrentFortune] = useState(null);

  const handleDraw = () => {
    if (phase === "drawing" || phase === "result") return;
    const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    setCurrentFortune(fortune);
    setPhase("drawing");
    setIsCharging(false);
    console.log(fortune.luck, fortune.number);
  };

  const handleDrawEnd = () => {
    setPhase("result");
  };
  const handleReset = () => {
    setPhase("idle");
    setChargeProgress(0);
    setIsCharging(false);
    setCurrentFortune(null);
  };

  return (
    <div className="app">
      <div className="stage" role="main" aria-label="百鬼御籤舞台">
        <AnimatePresence mode="wait">
          {phase !== "result" && (
            <OmikujiBox
              key="box"
              progress={chargeProgress}
              isShaking={isCharging}
              phase={phase}
              onDraw={handleDraw}
              fortune={currentFortune}
              onShowResult={handleDrawEnd}
            />
          )}
          {phase === "result" && (
            <ResultScreen
              key="result"
              onReset={handleReset}
              fortune={currentFortune}
            />
          )}
        </AnimatePresence>
      </div>

      {phase !== "result" && (
        <DrawControl
          onProgressChange={setChargeProgress}
          onHoldChange={setIsCharging}
          disabled={phase === "drawing"}
          onRelease={handleDraw}
        />
      )}
    </div>
  );
}

export default App;
