import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  return (
    <div>
      <Steps></Steps>
      <Steps></Steps>
    </div>
  );
}

function Steps() {
  let [step, setStep] = useState(1);

  let [test, setTest] = useState({ name: "john" });

  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step === 1) {
      return;
    }
    setStep((currentStep) => currentStep - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
    }
    // test.name = "bob";
    // setTest({ name: "NoName" });
  }

  function toggleClose() {
    setIsOpen((_isOpen) => !_isOpen);
  }

  return (
    <>
      <button onClick={toggleClose}>&times;</button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            step {step}: {messages[step - 1]}
            <br />
            name: {test.name}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7951f4" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button style={{ backgroundColor: "#5982f4" }} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
