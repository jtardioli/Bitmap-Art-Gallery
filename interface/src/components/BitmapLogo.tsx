import React from "react";
import styles from "../styles/Animations/NavLogoAnimation.module.css";

const BitmapLogo = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay1} `}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay2}`}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink}  ${styles.blinkDelay3} `}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay4} `}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay5} `}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay6} `}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay7} `}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay8} `}
      ></div>
      <div
        className={`w-5 h-5 bg-slate-100 ${styles.blink} ${styles.blinkDelay9} `}
      ></div>
    </div>
  );
};

export default BitmapLogo;
