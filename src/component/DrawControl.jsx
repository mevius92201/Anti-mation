import { useState, useEffect, useRef } from "react";

const FillDuration = 5000;
export default function DrawControl({
  onProgressChange = () => {},
  onHoldChange = () => {},
  disabled = false,
}) {
  const [progress, setProgress] = useState(0); //最多100，最小0
  const [holdButton, setHoldButton] = useState(false);
  const holdButtonRef = useRef(false);
  const pointerIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const rafRef = useRef(0); //目前動作的raf id

  const updateProgress = (now) => {
    const elapsed = now - startTimeRef.current;
    const ratio = Math.min(elapsed / FillDuration, 1);
    const newProgress = Math.round(ratio * 100);

    setProgress(newProgress);
    onProgressChange(newProgress);

    if (newProgress < 100 && holdButtonRef.current) {
      rafRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  const onPointerDown = (e) => {
    console.log("PointerDown!");
    if (disabled) return; // 如果禁用，則不處理事件
    if (e.pointerType === `mouse` && e.button !== 0) return; // 左鍵按下
    e.preventDefault?.();
    if (pointerIdRef.current !== null) return; // 如果已經有按下，不處理新的按下事件

    setProgress(0);
    onProgressChange(0);
    setHoldButton(true);
    holdButtonRef.current = true;
    onHoldChange(true);
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);

    startTimeRef.current = performance.now();

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const stopProgress = (e) => {
    if (pointerIdRef.current != null && e) {
      try {
        e.currentTarget.releasePointerCapture?.(pointerIdRef.current);
      } catch (error) {}
    }
    pointerIdRef.current = null;
    setHoldButton(false);
    holdButtonRef.current = false;
    onHoldChange(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  return (
    <div className="controls" aria-label="抽籤控制區">
      <div className="progress" aria-live="off">
        <div className="progress__track">
          <div
            className="progress__fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress__label">{progress}%</span>
      </div>

      <button
        className="hold-btn"
        type="button"
        aria-label="長按注入靈力"
        onPointerDown={onPointerDown}
        disabled={disabled}
        onPointerUp={stopProgress}
        onPointerCancel={stopProgress}
        onPointerLeave={(e) => {
          if (holdButtonRef.current) stopProgress(e);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {disabled ? `啊啊` : `長按注入靈力`}
      </button>
    </div>
  );
}
