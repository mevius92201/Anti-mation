import OmikujiBox from "./component/OmikujiBox";
import DrawControl from "./component/DrawControl";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ResultScreen from "./component/ResultScreen";

function App() {
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle, drawing, result

  const handleDraw = () => {
    if (phase === "drawing" || phase === "result") return;
    setPhase("drawing");
  };
  const handleDrawEnd = () => {
    setPhase("result");
  };
  const handleReset = () => {
    setPhase("idle");
    setChargeProgress(0);
    setIsCharging(false);
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
              onShowResult={handleDrawEnd}
            />
          )}
          {phase === "result" && (
            <ResultScreen key="result" onReset={handleReset} />
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
