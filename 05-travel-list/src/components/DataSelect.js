import { useState } from "react";

export default function DateSelect() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <div>
      <input
        type="range"
        min="0"
        max="10"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <span>step: {step}</span>

      <button onClick={() => setCount((v) => v - step)}>-</button>
      <input
        type="text"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={() => setCount((v) => v + step)}>+</button>
    </div>
  );
}
